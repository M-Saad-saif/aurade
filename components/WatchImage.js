'use client';
import { useState } from 'react';
export default function WatchImage({ src, alt, className = '', priority = false }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
        <span>AURADE</span>
        <small>Photo temporarily unavailable</small>
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
