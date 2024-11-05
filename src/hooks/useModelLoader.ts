import { useState, useCallback, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const MODEL_URLS = [
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/HAPPY!3D.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/sadness.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/flattery.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/stress.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/fear.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/embaressed.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/confoozed.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/joy.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/pride.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/boredom.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/relief.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/tmp1wsl42dg.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/tmp5.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/tmp1.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/worry.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/tmp4.obj',
  'https://qemqgbsrfkfkgtqpvurb.supabase.co/storage/v1/object/public/mhhGop1/tmp3.obj'
];

export function useModelLoader() {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const models = MODEL_URLS.map(url => useLoader(OBJLoader, url));
  
  const switchModel = useCallback(() => {
    setCurrentModelIndex(prev => (prev + 1) % models.length);
  }, [models.length]);

  useEffect(() => {
    const interval = setInterval(switchModel, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [switchModel]);

  return {
    currentModel: models[currentModelIndex]
  };
}