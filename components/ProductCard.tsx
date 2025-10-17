"use client";

import { Monitor, Laptop, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
    <motion.div
      className="card group flex flex-col relative overflow-hidden cursor-pointer h-full"
      onClick={handleProductClick}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-tech-cyan/5 via-cyan-glow/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Pulsing glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-r from-tech-cyan/20 via-cyan-glow/20 to-tech-cyan/20 blur-xl" />
      </motion.div>
      
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
            <h3 className="text-xl font-semibold text-slate-100 group-hover:text-tech-cyan transition-colors duration-300 dark:text-slate-100 dark:group-hover:text-tech-cyan light:text-slate-800 light:group-hover:text-tech-cyan">
              {product.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mt-1 dark:text-slate-500 light:text-slate-600">
              {(product.releaseYear ?? "TBD")} • {product.popularity}% Rating
            </p>
          </div>
          <span className="badge shrink-0 ml-2">
            {product.category}
          </span>
        </div>
        
        <p className="text-slate-400 mb-4 leading-relaxed text-sm line-clamp-2 dark:text-slate-400 light:text-slate-600">
          {product.description}
        </p>
        
        <div className="flex gap-2 mb-4 flex-wrap">
          {product.platforms && product.platforms.includes("Windows") && (
            <motion.div 
              className="flex items-center gap-1.5 border border-tech-cyan/30 bg-tech-cyan/10 px-3 py-1.5 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Monitor className="w-3.5 h-3.5 text-tech-cyan" />
              <span className="text-xs font-medium text-tech-cyan uppercase tracking-wider">Windows</span>
            </motion.div>
          )}
          {product.platforms && product.platforms.includes("Mac") && (
            <motion.div 
              className="flex items-center gap-1.5 border border-slate-400/30 bg-slate-400/10 px-3 py-1.5 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Laptop className="w-3.5 h-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600" />
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider dark:text-slate-300 light:text-slate-600">Mac</span>
            </motion.div>
          )}
        </div>

        {/* Requirements Toggle */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            setShowRequirements(!showRequirements);
          }}
          className="flex items-center gap-2 text-sm text-tech-cyan hover:text-cyan-glow font-medium mb-3 transition-colors duration-300 uppercase tracking-wider"
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
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-white/5 bg-midnight-700/50 rounded-lg p-4 mb-5 text-sm backdrop-blur-sm dark:border-white/5 dark:bg-midnight-700/50 light:border-tech-cyan/20 light:bg-white/50"
          >
            {product.requirements.windows && (
              <div className="mb-3 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-neon-blue" />
                  <span className="font-semibold text-slate-200 uppercase tracking-wider text-xs">Windows:</span>
                </div>
                <p className="text-slate-400 text-xs ml-6 leading-relaxed dark:text-slate-400 light:text-slate-600">{product.requirements.windows}</p>
              </div>
            )}
            {product.requirements.mac && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Laptop className="w-4 h-4 text-slate-300 dark:text-slate-300 light:text-slate-600" />
                  <span className="font-semibold text-slate-200 uppercase tracking-wider text-xs dark:text-slate-200 light:text-slate-700">Mac:</span>
                </div>
                <p className="text-slate-400 text-xs ml-6 leading-relaxed dark:text-slate-400 light:text-slate-600">{product.requirements.mac}</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <Link
        href={`/contact?product=${encodeURIComponent(product.name)}`}
        className="btn-primary text-center block mt-auto relative z-10 text-sm"
        onClick={(event) => event.stopPropagation()}
      >
        Request Installation
      </Link>
    </motion.div>
  );
}
