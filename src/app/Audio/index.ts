import { useEffect, useRef, useState } from "react";

type UseReverbOptions = {
  audioElement: HTMLAudioElement | null;
  impulseUrl: string;
  reverbAmount: number;
};

export const useReverb = ({ audioElement, impulseUrl, reverbAmount }: UseReverbOptions) => {
  const wetGainRef = useRef<GainNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    if (!audioElement) return;

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createMediaElementSource(audioElement);
    const convolver = context.createConvolver();
    const wetGain = context.createGain();
    const dryGain = context.createGain();

    wetGain.gain.value = reverbAmount;
    dryGain.gain.value = 1 - reverbAmount;

    wetGainRef.current = wetGain;
    dryGainRef.current = dryGain;

    fetch(impulseUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(impulseBuffer => {
        convolver.buffer = impulseBuffer;
      });

    source.connect(dryGain);
    source.connect(convolver);
    convolver.connect(wetGain);

    dryGain.connect(context.destination);
    wetGain.connect(context.destination);

    setAudioContext(context);

    return () => {
      context.close();
    };
  }, [audioElement, impulseUrl]);

  useEffect(() => {
    if (!audioContext || !wetGainRef.current || !dryGainRef.current) return;

    wetGainRef.current.gain.setValueAtTime(reverbAmount, audioContext.currentTime);
    dryGainRef.current.gain.setValueAtTime(1 - reverbAmount, audioContext.currentTime);
  }, [reverbAmount, audioContext]);
};
