import React, { useRef, useEffect } from "react";
// Importe o hook do store
import usePlayerStore from '../store/playerStore'; // Ajuste o caminho
// Se estiver usando Tone.js
import * as Tone from 'tone';

// Use a versão Tone.js que corrigimos anteriormente, mas com a leitura do store
const useAudioFxTone = (audioRef) => {
  // Não precisamos mais de useState para isFxEnabled e wetLevel AQUI.
  // O hook só vai APLICAR o estado que vem do store.

  // Refs para armazenar as instâncias do Tone.js (isso continua igual)
  const toneSourceRef = useRef<Tone.MediaElement | null>(null);
  const reverbNodeRef = useRef<Tone.Reverb | null>(null);
  const dryGainToneRef = useRef<Tone.Gain | null>(null);
  const wetGainToneRef = useRef<Tone.Gain | null>(null);

  // --- LER o estado do STORE ---
  // Assine o estado do efeito do store
  const { isFxEnabled, wetLevel } = usePlayerStore(state => ({
      isFxEnabled: state.isFxEnabled,
      wetLevel: state.wetLevel,
  }));
   // Você pode pegar as actions aqui também se quiser, mas não é necessário para este hook,
   // pois ele apenas *aplica* o estado que as actions definem. As actions serão chamadas na UI.


  // Efeito para inicializar o grafo de áudio (continua similar, mas usa refs)
  useEffect(() => {
      // ... (mesma lógica de inicialização do Tone.js, criação de nodes, carregamento do IR, conexões)
      // Referencie as refs corretamente (ex: toneSourceRef.current, reverbNodeRef.current)
      // A função de limpeza também permanece similar (desconectar nodes)

      if (!audioRef.current) {
        console.log("ToneFx: Audio element not available yet.");
        return;
      }

      console.log("ToneFx: Inicializando Tone.js...");

      if (Tone.context.state !== 'running') {
          console.log("ToneFx: Iniciando AudioContext do Tone.js (pode precisar de interação do usuário).");
           // CHAME Tone.start() em resposta a um clique do usuário NO SEU BOTÃO DE PLAY PRINCIPAL
           // ou em alguma outra interação inicial. Não dependa apenas deste useEffect.
          Tone.start().then(() => {
               console.log("ToneFx: AudioContext do Tone.js rodando.");
          }).catch(e => console.error("ToneFx: Erro ao iniciar AudioContext:", e));
      }

      if (!toneSourceRef.current) {
          toneSourceRef.current = new Tone.MediaElement(audioRef.current);
           // Desconectar a conexão padrão direta se existir para evitar dry duplicado
          toneSourceRef.current.toDestination().disconnect(); // Importante!
          console.log("ToneFx: Tone.MediaElement criado e desconectado do destino padrão.");
      }
      const source = toneSourceRef.current;

      if (!reverbNodeRef.current) {
          reverbNodeRef.current = new Tone.Reverb({ decay: 1.5, preDelay: 0.01, wet: 1 }); // wet: 1 no node, controlamos o mix com os nós de ganho
           console.log("ToneFx: Tone.Reverb node criado.");
          // Carrega o IR após criar o nó
          console.log("ToneFx: Carregando Impulse Response com Tone.Reverb.load...");
          reverbNodeRef.current.load('/reverb/1a_marble_hall.wav')
              .then(() => console.log("ToneFx: Impulse Response carregado com sucesso."))
              .catch((e) => console.error("ToneFx: Erro ao carregar o impulse response:", e));
      }
      const reverb = reverbNodeRef.current;

       if (!dryGainToneRef.current) dryGainToneRef.current = new Tone.Gain(1);
       if (!wetGainToneRef.current) wetGainToneRef.current = new Tone.Gain(0);
       const dryGainTone = dryGainToneRef.current;
       const wetGainTone = wetGainToneRef.current;
       console.log("ToneFx: Dry/Wet Gain nodes criados.");

       // Fazer as conexões AQUI, apenas uma vez na inicialização do grafo
       // source -> dryGainTone -> Tone.Destination
       // source -> reverb -> wetGainTone -> Tone.Destination
       // Verificar se não estão já conectados para evitar duplicidade
       try {
            source.connect(dryGainTone);
            source.connect(reverb);
            reverb.connect(wetGainTone);
            dryGainTone.toDestination();
            wetGainTone.toDestination();
            console.log("ToneFx: Nodes conectados ao destino.");
       } catch (e) {
           // Pode dar erro se tentar conectar duas vezes. Log para debug.
           console.warn("ToneFx: Erro ou aviso ao conectar nodes (podem já estar conectados):", e);
       }


      // Função de limpeza: Desconectar e dispor objetos Tone.js
      return () => {
        console.log("ToneFx: Limpando Tone.js resources...");
         // Desconectar todos os nós do destino e entre si
         if (source) source.disconnect();
         if (reverb) reverb.disconnect();
         if (dryGainTone) dryGainTone.disconnect();
         if (wetGainTone) wetGainTone.disconnect();

         // Dispor nós de ganho e reverb (libera memória)
         if (reverb) { reverb.dispose(); reverbNodeRef.current = null; }
         if (dryGainTone) { dryGainTone.dispose(); dryGainToneRef.current = null; }
         if (wetGainTone) { wetGainTone.dispose(); wetGainToneRef.current = null; }
         // Cuidado ao dispor o source se audioRef ainda for usado em outros lugares
         // if (source) { source.dispose(); toneSourceRef.current = null;}

         console.log("ToneFx: Limpeza completa.");
      };

    }, [audioRef]); // Depende apenas da ref do elemento de áudio


    // Efeito para CONTROLAR os ganhos baseados no estado do STORE
    useEffect(() => {
      const wetGainTone = wetGainToneRef.current;
      const dryGainTone = dryGainToneRef.current;

      // Apenas ajuste os ganhos se os nós existirem e o contexto estiver rodando
      if (wetGainTone && dryGainTone && Tone.context.state === 'running') {
        const now = Tone.context.currentTime;
        const rampTime = 0.05; // Rampa um pouco mais longa para transições audíveis

        if (isFxEnabled) {
          // FX ON: Wet = wetLevel, Dry = 1 - wetLevel
          wetGainTone.gain.linearRampToValueAtTime(wetLevel, now + rampTime);
          dryGainTone.gain.linearRampToValueAtTime(1 - wetLevel, now + rampTime);
           console.log(`ToneFx: State ON. wet gain: ${wetLevel.toFixed(2)}, dry gain: ${(1 - wetLevel).toFixed(2)}`);
        } else {
          // FX OFF: Wet = 0, Dry = 1
           wetGainTone.gain.linearRampToValueAtTime(0, now + rampTime);
           dryGainTone.gain.linearRampToValueAtTime(1, now + rampTime);
           console.log(`ToneFx: State OFF. wet gain: 0.00, dry gain: 1.00`);
        }
      } else {
          console.log("ToneFx: Nodes de ganho não disponíveis ou contexto parado para ajustar FX.");
      }
      // Este effect depende do estado lido do store
    }, [isFxEnabled, wetLevel]); // Roda quando isFxEnabled ou wetLevel mudam no store

    // O hook NÃO PRECISA retornar isFxEnabled, toggleFx, wetLevel, setWetLevel
    // porque eles já estão no store e podem ser acessados diretamente.
    // Ele apenas precisa garantir que o grafo de áudio é criado e que os ganhos são atualizados
    // com base no estado do store.
    // Se precisar expor algo, talvez apenas se o IR carregou, etc.
    return {
        // Você pode retornar o estado de carregamento do IR, se quiser que a UI saiba
        // irLoaded: convolverNodeRef.current?.buffer !== null // Exemplo (precisaria gerenciar esse estado no hook ou store)
    };
}

// Exporte o hook para ser usado no componente que renderiza o audio
export default useAudioFxTone;