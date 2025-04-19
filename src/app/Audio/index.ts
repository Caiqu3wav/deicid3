import React, { useRef, useEffect, useState } from "react";

const useAudioFx = (audioRef: React.RefObject<HTMLAudioElement | null>) => {
  const [isFxEnabled, setIsFxEnabled] = useState(false);
  const [wetLevel, setWetLevel] = useState(0.7); // controle de intensidade (0~1)

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const wetGainNodeRef = useRef<GainNode | null>(null);
  const dryGainNodeRef = useRef<GainNode | null>(null);
  const convolverNodeRef = useRef<ConvolverNode | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      console.log("Audio element not available yet.");
      return;
    }

    console.log("Inicializando Web Audio API...");

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log("AudioContext criado.");
    }

    const ctx = audioContextRef.current;
    // Cria o source node a partir do elemento de áudio
    if (!sourceNodeRef.current) {
      sourceNodeRef.current = ctx.createMediaElementSource(audioRef.current);
      console.log("MediaElementSource criado.");
   }
   const source = sourceNodeRef.current;

   wetGainNodeRef.current = ctx.createGain();
   dryGainNodeRef.current = ctx.createGain();
   convolverNodeRef.current = ctx.createConvolver();

   const wet = wetGainNodeRef.current;
   const dry = dryGainNodeRef.current;
   const conv = convolverNodeRef.current;
    
        //  IR customizado — ideal carregar um arquivo .wav aqui
        console.log("Iniciando fetch do impulse response...");
    fetch('/impulse/1a_marble_hall.wav')
        .then( async (res) => {
            console.log("Status do fetch IR:", res.status, res.ok);
            if (!res.ok) {
                 // Adiciona log para debug em caso de erro HTTP
                 return res.text().then(text => {
                     console.error(`Erro HTTP ao buscar IR: ${res.status}. Conteúdo:`, text.substring(0, 200) + '...'); // Log parcial do conteúdo
                     throw new Error(`HTTP error! status: ${res.status}`);
                 });
            }
            return res.arrayBuffer();
        })
        .then((data) => {
             console.log("ArrayBuffer IR recebido. Tamanho:", data.byteLength);
             return ctx.decodeAudioData(data);
        })
        .then((buffer) => {
            conv.buffer = buffer;
            console.log("Impulse response carregado e decodificado com sucesso.");
        })
        .catch((e) => {
            // Este é o catch que pegará o EncodingError ou erros de fetch
            console.error("Erro ao carregar/decodificar o impulse response:", e);
        });
    
        // Dry: direto para o destino
        source.connect(dry);
    source.connect(conv);

    // Conecta os nós de ganho ao destino (estes são recriados no re-run do efeito, mas o source é o mesmo)
    dry.connect(ctx.destination);
    wet.connect(ctx.destination);

    // Função de limpeza: Executada ao desmontar o componente ou antes de re-executar o efeito
    return () => {
      console.log("Limpando Web Audio API...");
      // Desconecta todos os nós do destino
      if (sourceNodeRef.current) {
          try {
             sourceNodeRef.current.disconnect();
          } catch (e) { console.warn("Error disconnecting source node:", e); }
      }
       if (dryGainNodeRef.current) {
          try {
              dryGainNodeRef.current.disconnect();
          } catch (e) { console.warn("Error disconnecting dry gain node:", e); }
       }
       if (wetGainNodeRef.current) {
           try {
               wetGainNodeRef.current.disconnect();
           } catch (e) { console.warn("Error disconnecting wet gain node:", e); e}
       }
        if (convolverNodeRef.current) {
           try {
              // Convolver geralmente não precisa desconectar explicitamente do destino se o wet/dry path for desconectado
              // conv -> wet -> destination
           } catch (e) { console.warn("Error disconnecting convolver node:", e); }
       }

      // Fecha o contexto de áudio se ele existe
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close()
            .then(() => {
                 console.log("AudioContext fechado.");
                 audioContextRef.current = null; // Resetar a referência
                 sourceNodeRef.current = null;
                 wetGainNodeRef.current = null;
                 dryGainNodeRef.current = null;
                 convolverNodeRef.current = null;
            })
            .catch(e => console.error("Erro ao fechar AudioContext:", e));
      }
       console.log("Limpeza finalizada.");
    };

  }, [audioRef]); // Apenas roda quando audioRef muda (geralmente uma vez no mount)

  // Este useEffect controla o ganho (wet/dry mix) baseado nos estados isFxEnabled e wetLevel
  useEffect(() => {
    const wet = wetGainNodeRef.current;
    const dry = dryGainNodeRef.current;

    if (wet && dry) {
      wet.gain.value = isFxEnabled ? wetLevel : 0;
      // Quando o FX está LIGADO, o DRY é 1 - wetLevel
      // Quando o FX está DESLIGADO, o DRY é 1 (som original completo)
      dry.gain.value = isFxEnabled ? 1 - wetLevel : 1;
      console.log(`FX Ativo: ${isFxEnabled}, wet gain: ${wet.gain.value.toFixed(2)}, dry gain: ${dry.gain.value.toFixed(2)}`);
    } else {
        console.log("Nodes de ganho não disponíveis para ajustar FX.");
    }
  }, [isFxEnabled, wetLevel]); // Depende de isFxEnabled e wetLevel

  const toggleFx = () => {
    setIsFxEnabled((prev) => !prev);
  };

  // Exponha setWetLevel para permitir controle externo da intensidade
  return { isFxEnabled, toggleFx, wetLevel, setWetLevel };
}

    export default useAudioFx;