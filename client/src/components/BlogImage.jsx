import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogImage({ src, alt, className, fallbackClassName }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // If no src provided or image failed to load, show fallback
  if (!src || imageError) {
    return (
      <div
        className={cn(
          "aspect-video flex items-center justify-center bg-gradient-to-br from-muted to-muted/50",
          fallbackClassName,
          className,
        )}
      >
        <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <div className={cn("aspect-video overflow-hidden relative", className)}>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover group-hover:scale-105 transition-transform duration-200",
          imageLoading && "opacity-0",
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  );
}
