import React from 'react';
import { motion } from 'motion/react';
import { Story, MediaType } from '../types';

interface StoryCardProps {
  story: Story;
  labels: { before: string; after: string; client: string };
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, labels }) => {
  const renderMedia = (url: string, type: MediaType, label: string) => {
    return (
      <div className="relative h-1/2 w-full overflow-hidden border-b-2 border-white/20">
        <div className="absolute top-4 left-4 z-10 bg-black/70 px-4 py-1 text-xs font-bold tracking-widest text-white backdrop-blur-sm">
          {label}
        </div>
        {type === 'video' ? (
          <video
            src={url}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={url}
            alt={label}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative flex h-screen w-full flex-col bg-black"
    >
      {renderMedia(story.beforeUrl, story.type, labels.before)}
      {renderMedia(story.afterUrl, story.type, labels.after)}
      
      <div className="absolute bottom-10 left-4 z-20">
        <p className="text-xs font-medium uppercase tracking-widest text-white/60">
          {labels.client}
        </p>
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
          {story.clientName}
        </h2>
      </div>
    </motion.div>
  );
};
