import { useEffect, useRef } from "react";
import usePlayerStore from "@/app/store/playerStore";

export const useWebAudioReverb = (audioRef: React.RefObject<HTMLAudioElement>) => {
  const reverbWet = usePlayerStore((s) => s.reverbWet);
  const audioContextRef = useRef<AudioContext | null>(null);
  const convolverRef = useRef<ConvolverNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const wetGainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const context = new AudioContext();
    const source = context.createMediaElementSource(audioRef.current);
    const convolver = context.createConvolver();
    const dryGain = context.createGain();
    const wetGain = context.createGain();

    // Carrega o IR (Impulse Response) — você pode usar um IR de reverb de igreja, sala, plate, etc.
    fetch("/impulse-responses/ir-hall.wav")
      .then(res => res.arrayBuffer())
      .then(data => context.decodeAudioData(data))
      .then(buffer => {
        convolver.buffer = buffer;
      });

    // Liga os nodes
    source.connect(dryGain);
    source.connect(convolver);

    convolver.connect(wetGain);

    dryGain.connect(context.destination);
    wetGain.connect(context.destination);

    // Salva refs
    audioContextRef.current = context;
    convolverRef.current = convolver;
    dryGainRef.current = dryGain;
    wetGainRef.current = wetGain;
    sourceRef.current = source;

    return () => {
      context.close();
    };
  }, [audioRef]);

  // Atualiza o mix dry/wet quando o estado muda
  useEffect(() => {
    if (dryGainRef.current && wetGainRef.current) {
      dryGainRef.current.gain.value = 1 - reverbWet;
      wetGainRef.current.gain.value = reverbWet;
    }
  }, [reverbWet]);
};
