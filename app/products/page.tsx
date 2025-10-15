"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { Search, Loader2 } from "lucide-react";
import Reveal from "@/components/Reveal";

type ProductCardData = Parameters<typeof ProductCard>[0]["product"];

const API_KEY = "7cd9a059c2ea4dcfb8306dd7a823cc50";
const PAGE_SIZE = 9;
const EXCLUDED_NAME_KEYWORDS = ["demo", "beta", "alpha", "prototype", "test", "lite", "trial"] as const;

const SOFTWARE_PRODUCTS: ProductCardData[] = [
  { name: "Microsoft Office Suite", description: "Complete productivity suite including Word, Excel, PowerPoint, and more.", requirements: { windows: "Windows 10 or later, 4GB RAM, 4GB disk space", mac: "macOS 10.14 or later, 4GB RAM, 10GB disk space" }, platforms: ["Windows", "Mac"], category: "Productivity", type: "software", releaseYear: 2021, popularity: 98 },
  { name: "Adobe Creative Cloud", description: "Professional creative tools including Photoshop, Illustrator, Premiere Pro, and more.", requirements: { windows: "Windows 10 (64-bit), 8GB RAM, 4GB disk space", mac: "macOS 10.15 or later, 8GB RAM, 4GB disk space" }, platforms: ["Windows", "Mac"], category: "Creative", type: "software", releaseYear: 2023, popularity: 95 },
  { name: "AutoCAD", description: "Industry-leading CAD software for 2D and 3D design, drafting, and modeling.", requirements: { windows: "Windows 10/11 (64-bit), 16GB RAM, 10GB disk space, DirectX 11 compatible graphics", mac: "macOS 11 or later, 16GB RAM, 10GB disk space" }, platforms: ["Windows", "Mac"], category: "Design", type: "software", releaseYear: 2024, popularity: 92 },
  { name: "Visual Studio Code", description: "Free, powerful code editor with IntelliSense, debugging, and Git integration.", requirements: { windows: "Windows 7 or later, 1.6 GHz processor, 1GB RAM", mac: "macOS 10.11 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Development", type: "software", releaseYear: 2024, popularity: 97 },
  { name: "Zoom", description: "Video conferencing and online meeting platform for remote work.", requirements: { windows: "Windows 7 or later, Dual-core 2GHz or higher, 4GB RAM", mac: "macOS 10.10 or later, Dual-core 2GHz or higher, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Communication", type: "software", releaseYear: 2023, popularity: 93 },
  { name: "Spotify", description: "Stream millions of songs and podcasts with personalized playlists.", requirements: { windows: "Windows 7 or later, 1GB RAM", mac: "macOS 10.10 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Entertainment", type: "software", releaseYear: 2022, popularity: 90 },
  { name: "VLC Media Player", description: "Free, open-source multimedia player for all formats.", requirements: { windows: "Windows 7 or later, 1GB RAM", mac: "macOS 10.10 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Media", type: "software", releaseYear: 2023, popularity: 89 },
  { name: "Slack", description: "Team collaboration and messaging platform for businesses.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.10 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Communication", type: "software", releaseYear: 2022, popularity: 91 },
  { name: "Notion", description: "All-in-one workspace for notes, tasks, wikis, and databases.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.11 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Productivity", type: "software", releaseYear: 2024, popularity: 94 },
  { name: "Figma Desktop", description: "Collaborative interface design tool for teams.", requirements: { windows: "Windows 10 or later, 4GB RAM", mac: "macOS 10.13 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Design", type: "software", releaseYear: 2023, popularity: 93 },
  { name: "Blender", description: "Free 3D creation suite for modeling, animation, and rendering.", requirements: { windows: "Windows 8.1 or later, 8GB RAM, 2GB VRAM", mac: "macOS 10.13 or later, 8GB RAM" }, platforms: ["Windows", "Mac"], category: "Creative", type: "software", releaseYear: 2024, popularity: 88 },
];

interface Game {
  id: number;
  name: string;
  slug?: string;
  released: string | null;
  background_image?: string | null;
  genres: { id: number; name: string; slug: string }[];
  parent_games?: { id: number; name: string; slug: string }[];
  platforms?: { platform: { id: number; name: string; slug: string } }[];
  rating: number;
  ratings_count: number;
}

const isMainlineGame = (game: Game) => {
  const parentGames = Array.isArray(game.parent_games) ? game.parent_games : [];
  if (parentGames.length > 0) {
    return false;
  }

  const slug = game.slug?.toLowerCase() ?? "";
  const name = game.name.toLowerCase();
  const hasExcludedKeyword = EXCLUDED_NAME_KEYWORDS.some(
    (keyword) => slug.includes(keyword) || name.includes(keyword)
  );

  return !hasExcludedKeyword;
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"software" | "game">("software");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "popular">("newest");
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestSearchRef = useRef(searchQuery);
  const previousTabRef = useRef<"software" | "game">(activeTab);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastGameElementRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.1,
      }
    );
    observer.current.observe(node);
  }, [isLoading, hasMore]);

  // Cleanup observer on component unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const fetchGames = useCallback(async (pageNum: number, search: string = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&platforms=4&page=${pageNum}&page_size=${PAGE_SIZE}${search ? `&search=${encodeURIComponent(search)}` : ''}`
      );
      const data = await response.json();

      setGames(prevGames => {
        // Filter out duplicates based on game ID
        const existingIds = new Set(prevGames.map(game => game.id));
        const sanitizedResults = (data.results as Game[])
          .filter((game) => isMainlineGame(game))
          .map((game) => ({
            ...game,
            background_image: game.background_image ?? null,
            released: game.released ?? null,
            genres: Array.isArray(game.genres) ? game.genres : [],
            platforms: Array.isArray(game.platforms) ? game.platforms : [],
          }));

        const newGames = sanitizedResults.filter((game) => !existingIds.has(game.id));
        return [...prevGames, ...newGames];
      });

      setHasMore(Boolean(data.next));
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle search with debounce
  useEffect(() => {
    latestSearchRef.current = searchQuery;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setGames([]);
      setPage(1);
      fetchGames(1, searchQuery);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    };
  }, [searchQuery, fetchGames]);

  // Load more games when page changes
  useEffect(() => {
    if (page > 1) {
      fetchGames(page, searchQuery);
    }
  }, [page, searchQuery, fetchGames]);

  // Initial load
  useEffect(() => {
    const hasTabChanged = previousTabRef.current !== activeTab;
    previousTabRef.current = activeTab;

    if (!hasTabChanged) {
      return;
    }

    setGames([]);
    setPage(1);

    if (activeTab === "game") {
      fetchGames(1, latestSearchRef.current);
    } else {
      setHasMore(true);
    }
  }, [activeTab, fetchGames]);

  const softwareCategories = ["All", "Productivity", "Creative", "Design", "Development", "Communication", "Entertainment", "Media"];
  const gameCategories = ["All", "Action", "RPG", "Shooter", "Strategy", "Sandbox", "Simulation"];

  const categories = activeTab === "software" ? softwareCategories : gameCategories;
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Most Popular" },
  ];

  const filteredGames = useMemo(() => {
    const getReleaseTime = (value: string | null) =>
      value ? new Date(value).getTime() : 0;

    let result = [...games];
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((game: Game) => 
        game.genres.some(genre => 
          genre.name.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    // Sort games
    result.sort((a: Game, b: Game) => {
      if (sortOption === "newest") {
        return getReleaseTime(b.released) - getReleaseTime(a.released);
      }
      if (sortOption === "oldest") {
        return getReleaseTime(a.released) - getReleaseTime(b.released);
      }
      return (b.rating * b.ratings_count) - (a.rating * a.ratings_count);
    });

    return result;
  }, [games, selectedCategory, sortOption]);

  // Format game data for ProductCard component
  const formatGameForCard = (game: Game): ProductCardData => ({
    name: game.name,
    description: game.genres.map(g => g.name).join(', ') || 'Genres unavailable',
    requirements: { windows: 'Check system requirements on store page', mac: null },
    platforms: (game.platforms ?? []).map(p => p.platform.name),
    category: game.genres[0]?.name || 'Game',
    type: 'game' as const,
    releaseYear: game.released ? new Date(game.released).getFullYear() : undefined,
    popularity: Math.round(game.rating * 20), // Convert 5-star rating to 100 scale
    background_image: game.background_image ?? undefined
  });

  const products = useMemo<ProductCardData[]>(() => {
    if (activeTab === "software") {
      return SOFTWARE_PRODUCTS;
    }

    return filteredGames.map((game) => formatGameForCard(game));
  }, [activeTab, filteredGames]);

  // Filter products based on search query and category
  const filteredProducts = useMemo((): ProductCardData[] => {
    return products.filter((product) => {
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === 'All' || 
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <Reveal>
          <h1 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-[0.4em] mb-6">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Browse our catalog of software and games. Request professional remote installation with one click.
          </p>
        </Reveal>
      </section>

      <div className="container mx-auto px-6 pb-20">
        {/* Tab Switcher */}
        <Reveal delay={100}>
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full border border-white/10 bg-midnight-800/70 p-1.5 backdrop-blur-md">
              <button
                onClick={() => { setActiveTab("software"); setSelectedCategory("All"); setSearchQuery(""); setSortOption("newest"); }}
                className={`relative px-8 py-3 rounded-full font-medium uppercase tracking-[0.3em] text-sm transition-all duration-300 ${
                  activeTab === "software"
                    ? "text-midnight bg-gradient-to-r from-neon-cyan to-neon-blue shadow-neon"
                    : "text-slate-400 hover:text-neon-cyan"
                }`}
              >
                Software
              </button>
              <button
                onClick={() => { setActiveTab("game"); setSelectedCategory("All"); setSearchQuery(""); setSortOption("newest"); }}
                className={`relative px-8 py-3 rounded-full font-medium uppercase tracking-[0.3em] text-sm transition-all duration-300 ${
                  activeTab === "game"
                    ? "text-midnight bg-gradient-to-r from-neon-magenta to-neon-blue shadow-neon-magenta"
                    : "text-slate-400 hover:text-neon-magenta"
                }`}
              >
                Games
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortOption(option.value as typeof sortOption)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 border ${
                  sortOption === option.value
                    ? activeTab === "software"
                      ? "bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-neon-cyan border-neon-cyan/60 shadow-neon"
                      : "bg-gradient-to-r from-neon-magenta/20 to-neon-blue/20 text-neon-magenta border-neon-magenta/60 shadow-neon-magenta"
                    : "border-white/10 bg-midnight-800/60 text-slate-400 hover:border-neon-cyan/50 hover:text-neon-cyan"
                }`}
                disabled={isLoading}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Search Bar */}
        <Reveal delay={200}>
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab === "software" ? "software" : "games"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-midnight-800/70 border border-white/10 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
              />
            </div>
          </div>
        </Reveal>

        {/* Category Filter */}
        <Reveal delay={300}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-medium uppercase tracking-[0.25em] text-xs transition-all duration-300 ${
                  selectedCategory === cat
                    ? activeTab === "software"
                      ? "bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border-2 border-neon-cyan text-neon-cyan shadow-neon"
                      : "bg-gradient-to-r from-neon-magenta/20 to-neon-blue/20 border-2 border-neon-magenta text-neon-magenta shadow-neon-magenta"
                    : "border border-white/10 bg-midnight-800/50 text-slate-400 hover:border-neon-cyan/40 hover:text-neon-cyan"
                }`}
                disabled={isLoading}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Loading State */}
        {isLoading && activeTab === 'game' && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-neon-cyan" />
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => {
              // Add ref to the last element for infinite loading
              if (index === filteredProducts.length - 1 && activeTab === 'game' && hasMore) {
                return (
                  <div key={index} ref={lastGameElementRef}>
                    <Reveal delay={index * 50}>
                      <ProductCard product={product} />
                    </Reveal>
                  </div>
                );
              }
              return (
                <Reveal key={index} delay={index * 50}>
                  <ProductCard product={product} />
                </Reveal>
              );
            })}
          </div>
        ) : (
          <Reveal>
            <div className="card max-w-2xl mx-auto text-center py-16">
              <p className="text-xl text-slate-400 mb-4">
                {isLoading ? 'Loading...' : 'No products found matching your criteria.'}
              </p>
              {!isLoading && (
                <p className="text-sm text-slate-500">Try adjusting your search or category filter.</p>
              )}
            </div>
          </Reveal>
        )}

        {/* Custom Request Section */}
        <Reveal delay={400}>
          <section className="card max-w-3xl mx-auto text-center mt-20">
            <h2 className="font-display text-3xl font-bold uppercase tracking-[0.3em] mb-4 text-neon-cyan">
              Don&apos;t See What You Need?
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We can help you install and configure any software or game. Contact us with your specific requirements.
            </p>
            <a href="/contact" className="btn-primary">
              Request Custom Installation
            </a>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
