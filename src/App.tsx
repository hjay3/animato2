import React from 'react';
import { Scene } from './components/Scene';

export function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center">
      <div className="w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-75"></div>
        <div className="absolute inset-0 bg-pink-500/5 rounded-full blur-xl animate-pulse delay-150"></div>
        <Scene />
      </div>
    </div>
  );
}