"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"software" | "game">("software");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "popular">("newest");

  const products = useMemo(
    () => [
    // SOFTWARE
    { name: "Microsoft Office Suite", description: "Complete productivity suite including Word, Excel, PowerPoint, and more.", requirements: { windows: "Windows 10 or later, 4GB RAM, 4GB disk space", mac: "macOS 10.14 or later, 4GB RAM, 10GB disk space" }, platforms: ["Windows", "Mac"], category: "Productivity", type: "software" as const, releaseYear: 2021, popularity: 98 },
    { name: "Adobe Creative Cloud", description: "Professional creative tools including Photoshop, Illustrator, Premiere Pro, and more.", requirements: { windows: "Windows 10 (64-bit), 8GB RAM, 4GB disk space", mac: "macOS 10.15 or later, 8GB RAM, 4GB disk space" }, platforms: ["Windows", "Mac"], category: "Creative", type: "software" as const, releaseYear: 2023, popularity: 95 },
    { name: "AutoCAD", description: "Industry-leading CAD software for 2D and 3D design, drafting, and modeling.", requirements: { windows: "Windows 10/11 (64-bit), 16GB RAM, 10GB disk space, DirectX 11 compatible graphics", mac: "macOS 11 or later, 16GB RAM, 10GB disk space" }, platforms: ["Windows", "Mac"], category: "Design", type: "software" as const, releaseYear: 2024, popularity: 92 },
    { name: "Visual Studio Code", description: "Free, powerful code editor with IntelliSense, debugging, and Git integration.", requirements: { windows: "Windows 7 or later, 1.6 GHz processor, 1GB RAM", mac: "macOS 10.11 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Development", type: "software" as const, releaseYear: 2024, popularity: 97 },
    { name: "Zoom", description: "Video conferencing and online meeting platform for remote work.", requirements: { windows: "Windows 7 or later, Dual-core 2GHz or higher, 4GB RAM", mac: "macOS 10.10 or later, Dual-core 2GHz or higher, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Communication", type: "software" as const, releaseYear: 2023, popularity: 93 },
    { name: "Spotify", description: "Stream millions of songs and podcasts with personalized playlists.", requirements: { windows: "Windows 7 or later, 1GB RAM", mac: "macOS 10.10 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Entertainment", type: "software" as const, releaseYear: 2022, popularity: 90 },
    { name: "VLC Media Player", description: "Free, open-source multimedia player for all formats.", requirements: { windows: "Windows 7 or later, 1GB RAM", mac: "macOS 10.10 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Media", type: "software" as const, releaseYear: 2023, popularity: 89 },
    { name: "Slack", description: "Team collaboration and messaging platform for businesses.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.10 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Communication", type: "software" as const, releaseYear: 2022, popularity: 91 },
    { name: "Notion", description: "All-in-one workspace for notes, tasks, wikis, and databases.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.11 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Productivity", type: "software" as const, releaseYear: 2024, popularity: 94 },
    { name: "Figma Desktop", description: "Collaborative interface design tool for teams.", requirements: { windows: "Windows 10 or later, 4GB RAM", mac: "macOS 10.13 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Design", type: "software" as const, releaseYear: 2023, popularity: 93 },
    { name: "Blender", description: "Free 3D creation suite for modeling, animation, and rendering.", requirements: { windows: "Windows 8.1 or later, 8GB RAM, 2GB VRAM", mac: "macOS 10.13 or later, 8GB RAM" }, platforms: ["Windows", "Mac"], category: "Creative", type: "software" as const, releaseYear: 2024, popularity: 88 },
    { name: "OBS Studio", description: "Free and open-source software for video recording and live streaming.", requirements: { windows: "Windows 10 or later, 4GB RAM, DirectX 10.1 compatible GPU", mac: "macOS 10.13 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Media", type: "software" as const, releaseYear: 2023, popularity: 87 },

    // GAMES
    { name: "Grand Theft Auto V", description: "Open-world action-adventure game set in Los Santos with thrilling story and online multiplayer.", requirements: { windows: "Windows 10, Intel Core i5 3470 @ 3.2GHz, 8GB RAM, NVIDIA GTX 660 2GB, 72GB disk space", mac: null }, platforms: ["Windows"], category: "Action", type: "game" as const, releaseYear: 2024, popularity: 99 },
    { name: "Red Dead Redemption 2", description: "Epic tale of life in America's unforgiving heartland. Stunning open-world western adventure.", requirements: { windows: "Windows 10, Intel Core i7-4770K, 12GB RAM, NVIDIA GTX 1060 6GB, 150GB disk space", mac: null }, platforms: ["Windows"], category: "Action", type: "game" as const, releaseYear: 2023, popularity: 96 },
    { name: "Cyberpunk 2077", description: "Open-world RPG set in Night City. Customize your character and explore a futuristic metropolis.", requirements: { windows: "Windows 10 (64-bit), Intel Core i7-4790, 12GB RAM, NVIDIA GTX 1060 6GB, 70GB SSD", mac: null }, platforms: ["Windows"], category: "RPG", type: "game" as const, releaseYear: 2024, popularity: 95 },
    { name: "The Witcher 3: Wild Hunt", description: "Award-winning RPG featuring Geralt of Rivia. Explore a vast open world filled with monsters and magic.", requirements: { windows: "Windows 7/8/10 (64-bit), Intel Core i5-2500K, 6GB RAM, NVIDIA GTX 660, 50GB disk space", mac: null }, platforms: ["Windows"], category: "RPG", type: "game" as const, releaseYear: 2023, popularity: 94 },
    { name: "Minecraft Java Edition", description: "Build, explore, and survive in infinite worlds. The original sandbox game with endless possibilities.", requirements: { windows: "Windows 7 or later, Intel Core i3-3210, 4GB RAM, Intel HD Graphics 4000, 1GB disk space", mac: "macOS 10.9 or later, Intel Core i3-3210, 4GB RAM, 1GB disk space" }, platforms: ["Windows", "Mac"], category: "Sandbox", type: "game" as const, releaseYear: 2022, popularity: 98 },
    { name: "Valorant", description: "Competitive 5v5 tactical shooter. Blend precise gunplay with unique agent abilities.", requirements: { windows: "Windows 7/8/10 (64-bit), Intel Core 2 Duo E8400, 4GB RAM, Intel HD 4000, 8GB disk space", mac: null }, platforms: ["Windows"], category: "Shooter", type: "game" as const, releaseYear: 2023, popularity: 93 },
    { name: "Fortnite", description: "Popular battle royale game. Drop in, loot, build, and be the last one standing.", requirements: { windows: "Windows 10 (64-bit), Intel Core i3-3225, 8GB RAM, Intel HD 4000, 30GB disk space", mac: "macOS 10.14.6 or later, Intel Core i3, 8GB RAM, 30GB disk space" }, platforms: ["Windows", "Mac"], category: "Shooter", type: "game" as const, releaseYear: 2024, popularity: 97 },
    { name: "League of Legends", description: "World's most popular MOBA. Choose your champion and battle in 5v5 strategic team fights.", requirements: { windows: "Windows 7 or later, 2 GHz processor, 2GB RAM, DirectX 9.0c compatible, 12GB disk space", mac: "macOS 10.12 or later, 2GB RAM, 12GB disk space" }, platforms: ["Windows", "Mac"], category: "Strategy", type: "game" as const, releaseYear: 2023, popularity: 96 },
    { name: "Elden Ring", description: "Epic fantasy action RPG from FromSoftware. Explore a vast world filled with danger and discovery.", requirements: { windows: "Windows 10, Intel Core i5-8400, 12GB RAM, NVIDIA GTX 1060 3GB, 60GB disk space", mac: null }, platforms: ["Windows"], category: "RPG", type: "game" as const, releaseYear: 2024, popularity: 97 },
    { name: "Counter-Strike 2", description: "The legendary tactical FPS reborn. Competitive 5v5 gameplay with precise mechanics.", requirements: { windows: "Windows 10, Intel Core i5, 8GB RAM, NVIDIA GTX 1060, 85GB disk space", mac: null }, platforms: ["Windows"], category: "Shooter", type: "game" as const, releaseYear: 2023, popularity: 92 },
    { name: "Stardew Valley", description: "Charming farming simulation RPG. Build your farm, explore caves, and build relationships.", requirements: { windows: "Windows Vista or later, 2GB RAM, 500MB disk space", mac: "macOS 10.10 or later, 2GB RAM, 500MB disk space" }, platforms: ["Windows", "Mac"], category: "Simulation", type: "game" as const, releaseYear: 2022, popularity: 91 },
    { name: "Civilization VI", description: "Turn-based strategy game. Build an empire that stands the test of time.", requirements: { windows: "Windows 7/8/10 (64-bit), Intel Core i3 2.5GHz, 4GB RAM, 12GB disk space", mac: "macOS 10.11 or later, 6GB RAM, 15GB disk space" }, platforms: ["Windows", "Mac"], category: "Strategy", type: "game" as const, releaseYear: 2023, popularity: 93 },
  ],
    []
  );

  const softwareCategories = ["All", "Productivity", "Creative", "Design", "Development", "Communication", "Entertainment", "Media"];
  const gameCategories = ["All", "Action", "RPG", "Shooter", "Strategy", "Sandbox", "Simulation"];

  const categories = activeTab === "software" ? softwareCategories : gameCategories;
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Most Popular" },
  ];

  const filteredProducts = useMemo(() => {
    const matching = products
      .filter((product) => product.type === activeTab)
      .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
      .filter((product) =>
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const sorted = [...matching];
    sorted.sort((a, b) => {
      if (sortOption === "newest") {
        return b.releaseYear - a.releaseYear;
      }
      if (sortOption === "oldest") {
        return a.releaseYear - b.releaseYear;
      }
      return b.popularity - a.popularity;
    });

    return sorted;
  }, [products, activeTab, selectedCategory, searchQuery, sortOption]);

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
            Browse our curated catalog of software and games. Request professional remote installation with just one click.
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
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Reveal key={index} delay={index * 50}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="card max-w-2xl mx-auto text-center py-16">
              <p className="text-xl text-slate-400 mb-4">No products found matching your criteria.</p>
              <p className="text-sm text-slate-500">Try adjusting your search or category filter.</p>
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
