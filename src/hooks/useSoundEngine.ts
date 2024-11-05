import { useCallback, useRef } from 'react';
import * as Tone from 'tone';

const funNotes = ['C4', 'E4', 'G4', 'B4', 'D5'];
const funChords = [
  ['C4', 'E4', 'G4'],
  ['G4', 'B4', 'D5'],
  ['F4', 'A4', 'C5'],
  ['A4', 'C5', 'E5']
];

export function useSoundEngine() {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  
  if (!synthRef.current) {
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.2,
        release: 1
      }
    }).toDestination();
    synthRef.current.volume.value = -10; // Slightly quieter
  }
  
  const playRandomNote = useCallback(() => {
    if (!synthRef.current) return;
    
    if (Math.random() > 0.7) {
      const chord = funChords[Math.floor(Math.random() * funChords.length)];
      synthRef.current.triggerAttackRelease(chord, '16n');
    } else {
      const note = funNotes[Math.floor(Math.random() * funNotes.length)];
      synthRef.current.triggerAttackRelease(note, '16n');
    }
  }, []);

  return { playRandomNote };
}