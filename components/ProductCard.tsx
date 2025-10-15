"use client";

import { Monitor, Laptop, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  name: string;
  description: string;
  requirements: {
    windows: string | null;
    mac: string | null;
  };
  platforms: string[];
  category: string;
  type: "software" | "game";
  releaseYear?: number;
  popularity: number;
  background_image?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [showRequirements, setShowRequirements] = useState(false);

  const handleProductClick = () => {
    const event = new CustomEvent("aa-chat-product", {
      detail: {
        name: product.name,
        category: product.category,
        platforms: product.platforms,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <div
      className="card group flex flex-col relative overflow-hidden cursor-pointer h-full"
      onClick={handleProductClick}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-neon-blue/5 to-neon-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Game Poster */}
      {product.background_image && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={product.background_image}
            alt={`${product.name} poster`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/90 to-transparent opacity-70" />
        </div>
      )}
      
      <div className="flex-1 relative z-10 p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-100 group-hover:text-neon-cyan transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mt-1">
              {(product.releaseYear ?? "TBD")} • {product.popularity}% Rating
            </p>
          </div>
          <span className="badge shrink-0 ml-2">
            {product.category}
          </span>
        </div>
        
        <p className="text-slate-400 mb-4 leading-relaxed text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex gap-2 mb-4 flex-wrap">
          {product.platforms && product.platforms.includes("Windows") && (
            <div className="flex items-center gap-1.5 border border-neon-blue/30 bg-neon-blue/10 px-3 py-1.5 rounded-full">
              <Monitor className="w-3.5 h-3.5 text-neon-blue" />
              <span className="text-xs font-medium text-neon-blue uppercase tracking-wider">Windows</span>
            </div>
          )}
          {product.platforms && product.platforms.includes("Mac") && (
            <div className="flex items-center gap-1.5 border border-slate-400/30 bg-slate-400/10 px-3 py-1.5 rounded-full">
              <Laptop className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Mac</span>
            </div>
          )}
        </div>

        {/* Requirements Toggle */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            setShowRequirements(!showRequirements);
          }}
          className="flex items-center gap-2 text-sm text-neon-cyan hover:text-neon-magenta font-medium mb-3 transition-colors duration-300 uppercase tracking-wider"
        >
          {showRequirements ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Specs
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Specs
            </>
          )}
        </button>

        {showRequirements && (
          <div className="border border-white/5 bg-midnight-700/50 rounded-lg p-4 mb-5 text-sm backdrop-blur-sm">
            {product.requirements.windows && (
              <div className="mb-3 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-neon-blue" />
                  <span className="font-semibold text-slate-200 uppercase tracking-wider text-xs">Windows:</span>
                </div>
                <p className="text-slate-400 text-xs ml-6 leading-relaxed">{product.requirements.windows}</p>
              </div>
            )}
            {product.requirements.mac && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Laptop className="w-4 h-4 text-slate-300" />
                  <span className="font-semibold text-slate-200 uppercase tracking-wider text-xs">Mac:</span>
                </div>
                <p className="text-slate-400 text-xs ml-6 leading-relaxed">{product.requirements.mac}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Link
        href={`/contact?product=${encodeURIComponent(product.name)}`}
        className="btn-primary text-center block mt-auto relative z-10 text-sm"
        onClick={(event) => event.stopPropagation()}
      >
        Request Installation
      </Link>
    </div>
  );
}
