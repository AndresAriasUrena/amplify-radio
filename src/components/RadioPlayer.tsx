'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  Radio
} from 'lucide-react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const radioUrl = "https://s2.radio.co/s83b86382e/listen";

  const togglePlay = async () => {
    if (!audioRef.current) return;

    setIsLoading(true);
    
    try {
      if (isPlaying) {
        // Pausar: detener completamente y limpiar el src
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
        setIsPlaying(false);
      } else {
        // Reproducir: reconectar al stream en vivo
        audioRef.current.src = radioUrl + '?t=' + Date.now(); // Agregar timestamp para evitar cache
        audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error al reproducir la radio:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Manejar errores de conexión intentando reconectar
  const handleError = () => {
    console.error('Error de conexión al stream');
    setIsLoading(false);
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg border-t border-gray-700 z-50">
      <audio
        ref={audioRef}
        preload="none"
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
        }}
        onPause={() => setIsPlaying(false)}
        onError={handleError}
        onStalled={handleError}
        onSuspend={handleError}
      />
      
      <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        {/* Información de la radio */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-red-500" />
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">Radio en Vivo</p>
              <p className="text-xs text-gray-400 truncate">
                {isPlaying ? 'Transmisión en directo' : 'Pausado'}
              </p>
            </div>
          </div>
          {isPlaying && (
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-red-500 animate-pulse rounded-full"></div>
              <div className="w-1 h-4 bg-red-500 animate-pulse rounded-full animation-delay-200"></div>
              <div className="w-1 h-4 bg-red-500 animate-pulse rounded-full animation-delay-400"></div>
            </div>
          )}
        </div>

        {/* Controles principales */}
        <div className="flex items-center space-x-4">
          {/* Botón anterior (deshabilitado) */}
          <button
            disabled
            className="p-2 rounded-full bg-gray-700 text-gray-500 cursor-not-allowed"
            title="Anterior (no disponible para radio en vivo)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Botón play/pause */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            title={isPlaying ? 'Pausar' : 'Reproducir en vivo'}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Botón siguiente (deshabilitado) */}
          <button
            disabled
            className="p-2 rounded-full bg-gray-700 text-gray-500 cursor-not-allowed"
            title="Siguiente (no disponible para radio en vivo)"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Control de volumen */}
        <div className="flex items-center space-x-3 min-w-0 flex-1 justify-end">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center space-x-2 w-24">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer radio-volume-slider"
              title={`Volumen: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer; 