'use client';

import { useState, useEffect, useCallback } from 'react';
import PodcastCard from '../UI/PodcastCard';
import { IoFilter, IoClose, IoReload } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import RSSService from '@/lib/rssService';
import { PodcastShow } from '@/types/podcast';

interface PodcastGridProps {
  onOpenFilters?: () => void;
}

export default function PodcastGrid({ onOpenFilters }: PodcastGridProps) {
  const [podcasts, setPodcasts] = useState<PodcastShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingHistorical, setLoadingHistorical] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allPodcasts, setAllPodcasts] = useState<PodcastShow[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchPodcasts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Usar carga progresiva
      await RSSService.getAllPodcastsProgressive((partialShows, isComplete) => {
        setAllPodcasts(partialShows);
        setPodcasts(partialShows);
        
        if (isComplete) {
          setLoading(false);
          setLoadingHistorical(false);
        } else {
          // Los podcasts actuales se han cargado, ahora cargando historiales
          setLoading(false);
          setLoadingHistorical(true);
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar podcasts');
      setLoading(false);
      setLoadingHistorical(false);
    }
  }, []);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  // Precargar las primeras imágenes para mejorar rendimiento
  useEffect(() => {
    const priorityImages = [
      '/assets/podcast/la-telaraña.avif',
      '/assets/podcast/doble-click.avif',
      '/assets/podcast/ciudad-canibal.avif'
    ];
    
    priorityImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  const handleRetry = () => {
    setError(null);
    fetchPodcasts();
  };

  if (error) {
    return (
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-[#E5754C] mb-2">
              Error al cargar podcasts
            </h3>
            <p className="text-[#C7C7C7] mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="text-[#E5754C] border-[1.4px] border-[#E5754C] px-4 py-2 rounded-full hover:shadow-[#E5754C] hover:shadow-sm transition-all duration-300 flex items-center gap-2"
            >
              <IoReload className="w-4 h-4" />
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-lexend font-semibold text-xl">NUESTROS PODCASTS</h2>
          </div>
          <div className="h-0.5 w-full bg-[#E5754C] my-4" />
          
          <p className="text-[#C7C7C7]/50 mt-1">
            {loading && podcasts.length === 0 
              ? 'Cargando podcasts actuales...' 
              : loadingHistorical
              ? `${podcasts.length} podcast${podcasts.length !== 1 ? 's' : ''} disponible${podcasts.length !== 1 ? 's' : ''} (cargando historiales...)`
              : `${podcasts.length} podcast${podcasts.length !== 1 ? 's' : ''} disponible${podcasts.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {loading && podcasts.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-[#232323] aspect-[16/11] rounded-2xl mb-4"></div>
              <div className="h-4 bg-[#232323] rounded mb-2"></div>
              <div className="h-4 bg-[#232323] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}

      {podcasts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {podcasts.map((podcast, index) => (
            <PodcastCard 
              key={podcast.id} 
              podcast={podcast} 
              priority={index < 3}
            />
          ))}
        </div>
      )}

      {!loading && podcasts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#C7C7C7] text-lg">
            No se encontraron podcasts
          </p>
        </div>
      )}
    </div>
  );
}