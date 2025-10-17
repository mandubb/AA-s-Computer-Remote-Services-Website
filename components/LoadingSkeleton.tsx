/**
 * Loading skeleton components to prevent layout shifts
 */

export function ProductCardSkeleton() {
  return (
    <div className="card animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full aspect-video bg-slate-700/50 rounded-lg mb-4" />
      
      {/* Title skeleton */}
      <div className="h-6 bg-slate-700/50 rounded w-3/4 mb-3" />
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-700/50 rounded w-full" />
        <div className="h-4 bg-slate-700/50 rounded w-5/6" />
      </div>
      
      {/* Metadata skeleton */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-slate-700/50 rounded-full w-20" />
        <div className="h-6 bg-slate-700/50 rounded-full w-24" />
      </div>
      
      {/* Button skeleton */}
      <div className="h-12 bg-slate-700/50 rounded-full w-full" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="card animate-pulse">
      {/* Thumbnail skeleton with fixed aspect ratio */}
      <div className="relative w-full aspect-[16/9] bg-slate-700/50 rounded-lg mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 animate-shimmer" />
      </div>
      
      {/* Title skeleton */}
      <div className="h-6 bg-slate-700/50 rounded w-4/5 mb-3" />
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-700/50 rounded w-full" />
        <div className="h-4 bg-slate-700/50 rounded w-11/12" />
        <div className="h-4 bg-slate-700/50 rounded w-3/4" />
      </div>
      
      {/* Genre and platform badges */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-slate-700/50 rounded-full w-24" />
        <div className="h-6 bg-slate-700/50 rounded-full w-20" />
      </div>
      
      {/* Button skeleton */}
      <div className="h-11 bg-slate-700/50 rounded-full w-full" />
    </div>
  );
}

export function GameGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChatBotSkeleton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 animate-pulse">
      <div className="w-14 h-14 rounded-full bg-slate-700/50 shadow-lg" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto text-center space-y-8 animate-pulse">
        <div className="h-24 bg-slate-700/50 rounded w-2/3 mx-auto" />
        <div className="h-12 bg-slate-700/50 rounded w-1/2 mx-auto" />
        <div className="h-8 bg-slate-700/50 rounded w-1/3 mx-auto" />
        <div className="flex gap-4 justify-center">
          <div className="h-12 bg-slate-700/50 rounded-full w-40" />
          <div className="h-12 bg-slate-700/50 rounded-full w-40" />
        </div>
      </div>
    </div>
  );
}

export function FeatureCardSkeleton() {
  return (
    <div className="card text-center animate-pulse">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-slate-700/50" />
      </div>
      <div className="h-6 bg-slate-700/50 rounded w-3/4 mx-auto mb-3" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-700/50 rounded w-full" />
        <div className="h-4 bg-slate-700/50 rounded w-5/6 mx-auto" />
      </div>
    </div>
  );
}
