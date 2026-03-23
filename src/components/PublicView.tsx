import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Story, AppSettings } from '../types';
import { TRANSLATIONS } from '../constants';
import { StoryCard } from './StoryCard';

interface PublicViewProps {
  stories: Story[];
  settings: AppSettings;
}

export const PublicView: React.FC<PublicViewProps> = ({ stories, settings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lang = settings.publicLanguage;
  const labels = TRANSLATIONS[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowDown') {
        setCurrentIndex((prev) => (prev < stories.length - 1 ? prev + 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stories.length]);

  if (stories.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <p className="text-sm font-medium tracking-widest opacity-50">
          {lang === 'it' ? 'NESSUNA STORIA DISPONIBILE' : 'NENHUMA HISTÓRIA DISPONÍVEL'}
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <StoryCard
          key={stories[currentIndex].id}
          story={stories[currentIndex]}
          labels={{
            before: labels.before,
            after: labels.after,
            client: labels.client,
          }}
        />
      </AnimatePresence>

      <div className="absolute top-6 left-6 z-30">
        <h1 className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
          {settings.companyName}
        </h1>
      </div>

      <div className="absolute right-6 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-4">
        <button
          onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
          disabled={currentIndex === 0}
          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-20"
        >
          <ChevronUp size={24} />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev < stories.length - 1 ? prev + 1 : prev))}
          disabled={currentIndex === stories.length - 1}
          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-20"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      <div className="absolute bottom-6 right-6 z-30">
        <p className="text-[10px] font-bold tracking-widest text-white/40">
          {currentIndex + 1} / {stories.length}
        </p>
      </div>
    </div>
  );
};
