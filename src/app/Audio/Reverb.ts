// src/app/audio/AudioManager.ts
let audioContext: AudioContext | null = null;
let convolver: ConvolverNode | null = null;
let dryGain: GainNode | null = null;
let wetGain: GainNode | null = null;
let sourceNode: MediaElementAudioSourceNode | null = null;
let currentAudioEl: HTMLAudioElement | null = null;

export const AudioManager = {
  init(audioEl: HTMLAudioElement) {
    if (audioContext) return; // evita recriar

    audioContext = new AudioContext();
    currentAudioEl = audioEl;
    sourceNode = audioContext.createMediaElementSource(audioEl);

    dryGain = audioContext.createGain();
    wetGain = audioContext.createGain();
    convolver = audioContext.createConvolver();

    // carregar IR
    fetch("/impulse-responses/ir-hall.wav")
      .then(res => res.arrayBuffer())
      .then(data => audioContext!.decodeAudioData(data))
      .then(buffer => {
        if (convolver) convolver.buffer = buffer;
      });

    // conexões
    sourceNode.connect(dryGain!);
    sourceNode.connect(convolver!);
    convolver!.connect(wetGain!);
    dryGain!.connect(audioContext.destination);
    wetGain!.connect(audioContext.destination);
  },

  setReverbWet(wet: number) {
    if (dryGain && wetGain) {
      dryGain.gain.value = 1 - wet;
      wetGain.gain.value = wet;
    }
  }
};
