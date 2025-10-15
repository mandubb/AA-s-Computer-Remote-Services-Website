"use client";

import { useState, useEffect, useCallback, useRef, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { Search, Loader2 } from "lucide-react";
import Reveal from "@/components/Reveal";

type ProductCardData = Parameters<typeof ProductCard>[0]["product"];

const GAMES_API_PROXY = "/api/games"; // Server-side proxy to avoid CORS
const LOCAL_GAMES_PATH = "/data/games.json";
const ITEMS_PER_PAGE = 12;
const EXCLUDED_NAME_KEYWORDS = ["demo", "beta", "alpha", "prototype", "test", "lite", "trial", "deluxe", "edition"] as const;

const SOFTWARE_PRODUCTS: ProductCardData[] = [
  // Productivity
  { name: "Microsoft Office Suite", description: "Complete productivity suite including Word, Excel, PowerPoint, and more.", requirements: { windows: "Windows 10 or later, 4GB RAM, 4GB disk space", mac: "macOS 10.14 or later, 4GB RAM, 10GB disk space" }, platforms: ["Windows", "Mac"], category: "Productivity", type: "software", releaseYear: 2021, popularity: 98 },
  { name: "Notion", description: "All-in-one workspace for notes, tasks, wikis, and databases.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.11 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Productivity", type: "software", releaseYear: 2024, popularity: 94 },
  { name: "WPS Office", description: "Free office suite compatible with Microsoft Office formats.", requirements: { windows: "Windows 7 or later, 1GB RAM, 1GB disk space", mac: "macOS 10.12 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Productivity", type: "software", releaseYear: 2023, popularity: 85 },
  { name: "Evernote", description: "Note-taking and organization app for capturing ideas and managing tasks.", requirements: { windows: "Windows 10 or later, 2GB RAM", mac: "macOS 10.13 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Productivity", type: "software", releaseYear: 2023, popularity: 87 },
  
  // Utilities
  { name: "WinRAR", description: "Powerful archive manager supporting RAR, ZIP, and other compression formats.", requirements: { windows: "Windows XP or later, 512MB RAM", mac: null }, platforms: ["Windows"], category: "Utilities", type: "software", releaseYear: 2023, popularity: 92 },
  { name: "7-Zip", description: "Free, open-source file archiver with high compression ratio.", requirements: { windows: "Windows XP or later, 512MB RAM", mac: null }, platforms: ["Windows"], category: "Utilities", type: "software", releaseYear: 2023, popularity: 90 },
  { name: "Rufus", description: "Create bootable USB drives from ISO images quickly and easily.", requirements: { windows: "Windows 7 or later, 512MB RAM", mac: null }, platforms: ["Windows"], category: "Utilities", type: "software", releaseYear: 2024, popularity: 88 },
  { name: "CCleaner", description: "System optimization and privacy tool to clean junk files and registry.", requirements: { windows: "Windows 7 or later, 1GB RAM", mac: "macOS 10.10 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Utilities", type: "software", releaseYear: 2023, popularity: 86 },
  { name: "Everything Search", description: "Lightning-fast file search engine for Windows.", requirements: { windows: "Windows XP or later, 512MB RAM", mac: null }, platforms: ["Windows"], category: "Utilities", type: "software", releaseYear: 2023, popularity: 84 },
  
  // Media
  { name: "VLC Media Player", description: "Free, open-source multimedia player for all formats.", requirements: { windows: "Windows 7 or later, 1GB RAM", mac: "macOS 10.10 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Media", type: "software", releaseYear: 2023, popularity: 95 },
  { name: "OBS Studio", description: "Free, open-source software for video recording and live streaming.", requirements: { windows: "Windows 10 or later, 4GB RAM, DirectX 10.1 compatible GPU", mac: "macOS 10.13 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Media", type: "software", releaseYear: 2024, popularity: 93 },
  { name: "Adobe Premiere Pro", description: "Industry-standard video editing software for professionals.", requirements: { windows: "Windows 10 (64-bit), 16GB RAM, 8GB disk space, GPU with 4GB VRAM", mac: "macOS 10.15 or later, 16GB RAM, 8GB disk space" }, platforms: ["Windows", "Mac"], category: "Media", type: "software", releaseYear: 2024, popularity: 96 },
  { name: "Audacity", description: "Free, open-source audio editor and recorder.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.9 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Media", type: "software", releaseYear: 2023, popularity: 89 },
  { name: "HandBrake", description: "Open-source video transcoder for converting video formats.", requirements: { windows: "Windows 10 or later, 4GB RAM", mac: "macOS 10.13 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Media", type: "software", releaseYear: 2023, popularity: 87 },
  
  // Design
  { name: "Adobe Photoshop", description: "Industry-leading image editing and graphic design software.", requirements: { windows: "Windows 10 (64-bit), 8GB RAM, 4GB disk space", mac: "macOS 10.15 or later, 8GB RAM, 4GB disk space" }, platforms: ["Windows", "Mac"], category: "Design", type: "software", releaseYear: 2024, popularity: 98 },
  { name: "Adobe Illustrator", description: "Vector graphics editor for creating logos, icons, and illustrations.", requirements: { windows: "Windows 10 (64-bit), 8GB RAM, 3GB disk space", mac: "macOS 10.15 or later, 8GB RAM, 3GB disk space" }, platforms: ["Windows", "Mac"], category: "Design", type: "software", releaseYear: 2024, popularity: 96 },
  { name: "Figma Desktop", description: "Collaborative interface design tool for teams.", requirements: { windows: "Windows 10 or later, 4GB RAM", mac: "macOS 10.13 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Design", type: "software", releaseYear: 2023, popularity: 93 },
  { name: "Canva Desktop", description: "Easy-to-use graphic design platform with templates and tools.", requirements: { windows: "Windows 10 or later, 4GB RAM", mac: "macOS 10.12 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Design", type: "software", releaseYear: 2023, popularity: 91 },
  { name: "AutoCAD", description: "Industry-leading CAD software for 2D and 3D design, drafting, and modeling.", requirements: { windows: "Windows 10/11 (64-bit), 16GB RAM, 10GB disk space, DirectX 11 compatible graphics", mac: "macOS 11 or later, 16GB RAM, 10GB disk space" }, platforms: ["Windows", "Mac"], category: "Design", type: "software", releaseYear: 2024, popularity: 92 },
  { name: "Blender", description: "Free 3D creation suite for modeling, animation, and rendering.", requirements: { windows: "Windows 8.1 or later, 8GB RAM, 2GB VRAM", mac: "macOS 10.13 or later, 8GB RAM" }, platforms: ["Windows", "Mac"], category: "Design", type: "software", releaseYear: 2024, popularity: 90 },
  
  // Development
  { name: "Visual Studio Code", description: "Free, powerful code editor with IntelliSense, debugging, and Git integration.", requirements: { windows: "Windows 7 or later, 1.6 GHz processor, 1GB RAM", mac: "macOS 10.11 or later, 1GB RAM" }, platforms: ["Windows", "Mac"], category: "Development", type: "software", releaseYear: 2024, popularity: 97 },
  { name: "Node.js", description: "JavaScript runtime built on Chrome's V8 engine for server-side development.", requirements: { windows: "Windows 8.1 or later, 2GB RAM", mac: "macOS 10.13 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Development", type: "software", releaseYear: 2024, popularity: 94 },
  { name: "Android Studio", description: "Official IDE for Android app development with emulator and tools.", requirements: { windows: "Windows 10 (64-bit), 8GB RAM, 8GB disk space", mac: "macOS 10.14 or later, 8GB RAM, 8GB disk space" }, platforms: ["Windows", "Mac"], category: "Development", type: "software", releaseYear: 2024, popularity: 92 },
  { name: "Git", description: "Distributed version control system for tracking code changes.", requirements: { windows: "Windows 7 or later, 512MB RAM", mac: "macOS 10.9 or later, 512MB RAM" }, platforms: ["Windows", "Mac"], category: "Development", type: "software", releaseYear: 2024, popularity: 96 },
  { name: "Docker Desktop", description: "Containerization platform for building and running applications.", requirements: { windows: "Windows 10 (64-bit), 4GB RAM, WSL 2", mac: "macOS 10.15 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Development", type: "software", releaseYear: 2024, popularity: 91 },
  
  // Antivirus & Security
  { name: "Avast Free Antivirus", description: "Comprehensive antivirus protection with real-time threat detection.", requirements: { windows: "Windows 10 or later, 2GB RAM, 2GB disk space", mac: "macOS 10.12 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Security", type: "software", releaseYear: 2024, popularity: 89 },
  { name: "Malwarebytes", description: "Advanced malware detection and removal tool.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.10 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Security", type: "software", releaseYear: 2024, popularity: 92 },
  { name: "Bitdefender", description: "Award-winning antivirus with multi-layer ransomware protection.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.12 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Security", type: "software", releaseYear: 2024, popularity: 93 },
  { name: "Kaspersky", description: "Powerful antivirus with advanced threat intelligence.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.12 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Security", type: "software", releaseYear: 2024, popularity: 90 },
  
  // Communication
  { name: "Zoom", description: "Video conferencing and online meeting platform for remote work.", requirements: { windows: "Windows 7 or later, Dual-core 2GHz or higher, 4GB RAM", mac: "macOS 10.10 or later, Dual-core 2GHz or higher, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Communication", type: "software", releaseYear: 2023, popularity: 95 },
  { name: "Slack", description: "Team collaboration and messaging platform for businesses.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.10 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Communication", type: "software", releaseYear: 2022, popularity: 91 },
  { name: "Discord", description: "Voice, video, and text communication platform for communities.", requirements: { windows: "Windows 7 or later, 2GB RAM", mac: "macOS 10.10 or later, 2GB RAM" }, platforms: ["Windows", "Mac"], category: "Communication", type: "software", releaseYear: 2023, popularity: 93 },
  { name: "Microsoft Teams", description: "Collaboration platform with chat, meetings, and file sharing.", requirements: { windows: "Windows 10 or later, 4GB RAM", mac: "macOS 10.12 or later, 4GB RAM" }, platforms: ["Windows", "Mac"], category: "Communication", type: "software", releaseYear: 2023, popularity: 92 },
];

// FreeToGame API response structure
interface FreeToGameResponse {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

// Local games structure
interface LocalGame {
  title: string;
  genre: string;
  release_date: string;
  platform: string;
  thumbnail: string;
  short_description: string;
}

// Unified game structure
interface Game {
  title: string;
  genre: string;
  release_date: string;
  platform: string;
  thumbnail: string;
  short_description: string;
  source: 'api' | 'local';
}

const isMainlineGame = (game: Game) => {
  const title = game.title.toLowerCase();
  const hasExcludedKeyword = EXCLUDED_NAME_KEYWORDS.some(
    (keyword) => title.includes(keyword)
  );
  return !hasExcludedKeyword;
};

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL params
  const [activeTab, setActiveTab] = useState<"software" | "game">(
    (searchParams.get("tab") as "software" | "game") || "software"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "All"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "popular">(
    (searchParams.get("sort") as "newest" | "oldest" | "popular") || "newest"
  );
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [games, setGames] = useState<Game[]>([]);
  const [totalGames, setTotalGames] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update URL when state changes
  const updateURL = useCallback((params: Record<string, string>) => {
    const url = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "All" && value !== "1") {
        url.set(key, value);
      }
    });
    const queryString = url.toString();
    router.push(queryString ? `?${queryString}` : "/products", { scroll: false });
  }, [router]);

  const fetchGames = useCallback(async (pageNum: number, search: string = '', category: string = 'All') => {
    setIsLoading(true);
    try {
      console.log('🎮 Fetching games from FreeToGame API and local JSON...');
      
      // Fetch from both sources in parallel
      const [apiResponse, localResponse] = await Promise.all([
        fetch(GAMES_API_PROXY).catch((err) => {
          console.error('❌ Games API proxy fetch failed:', err);
          return { ok: false };
        }),
        fetch(LOCAL_GAMES_PATH).catch((err) => {
          console.error('❌ Local JSON fetch failed:', err);
          return { ok: false };
        })
      ]);

      let apiGames: Game[] = [];
      let localGames: Game[] = [];

      // Parse FreeToGame API response
      if (apiResponse.ok) {
        try {
          const apiData: FreeToGameResponse[] = await (apiResponse as Response).json();
          console.log(`✅ FreeToGame API returned ${apiData.length} games`);
          
          apiGames = apiData
            .filter(game => game.platform.includes('Windows') || game.platform.includes('PC'))
            .map(game => ({
              title: game.title,
              genre: game.genre,
              release_date: game.release_date,
              platform: game.platform,
              thumbnail: game.thumbnail,
              short_description: game.short_description,
              source: 'api' as const
            }));
          
          console.log(`✅ Filtered to ${apiGames.length} PC games`);
        } catch (parseError) {
          console.error('❌ Failed to parse FreeToGame API response:', parseError);
        }
      } else {
        console.warn('⚠️ FreeToGame API request failed or returned non-OK status');
      }

      // Parse local JSON
      if (localResponse.ok) {
        try {
          const localData: LocalGame[] = await (localResponse as Response).json();
          localGames = localData.map(game => ({
            ...game,
            source: 'local' as const
          }));
          console.log(`✅ Loaded ${localGames.length} games from local JSON`);
        } catch (parseError) {
          console.error('❌ Failed to parse local JSON:', parseError);
        }
      } else {
        console.warn('⚠️ Local JSON request failed');
      }

      // Combine and deduplicate by title (case-insensitive)
      const combined = [...apiGames, ...localGames];
      const uniqueGames = new Map<string, Game>();
      
      combined.forEach(game => {
        const titleKey = game.title.toLowerCase().trim();
        if (!uniqueGames.has(titleKey) && isMainlineGame(game)) {
          uniqueGames.set(titleKey, game);
        }
      });

      let mergedGames = Array.from(uniqueGames.values());

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        mergedGames = mergedGames.filter(game =>
          game.title.toLowerCase().includes(searchLower) ||
          game.short_description.toLowerCase().includes(searchLower) ||
          game.genre.toLowerCase().includes(searchLower)
        );
      }

      // Apply category filter
      if (category !== 'All') {
        mergedGames = mergedGames.filter(game =>
          game.genre.toLowerCase() === category.toLowerCase()
        );
      }

      // Sort by release date (newest first)
      mergedGames.sort((a, b) => {
        const dateA = new Date(a.release_date).getTime() || 0;
        const dateB = new Date(b.release_date).getTime() || 0;
        return dateB - dateA;
      });

      console.log(`🎯 Final result: ${mergedGames.length} games (${apiGames.length} from API, ${localGames.length} from local)`);
      
      setGames(mergedGames);
      setTotalGames(mergedGames.length);
    } catch (error) {
      console.error('Error fetching games:', error);
      setGames([]);
      setTotalGames(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch games when dependencies change
  useEffect(() => {
    if (activeTab === "game") {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        fetchGames(currentPage, searchQuery, selectedCategory);
      }, searchQuery ? 500 : 0);

      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
      };
    }
  }, [activeTab, currentPage, searchQuery, selectedCategory, fetchGames]);

  // Update URL when state changes
  useEffect(() => {
    updateURL({
      tab: activeTab,
      category: selectedCategory,
      search: searchQuery,
      sort: sortOption,
      page: currentPage.toString(),
    });
  }, [activeTab, selectedCategory, searchQuery, sortOption, currentPage, updateURL]);

  const softwareCategories = ["All", "Productivity", "Utilities", "Media", "Design", "Development", "Security", "Communication"];
  const gameCategories = ["All", "MMORPG", "Shooter", "Strategy", "MOBA", "Racing", "Sports", "Social", "Sandbox", "Fighting", "Card", "Action RPG", "Battle Royale"];

  const categories = activeTab === "software" ? softwareCategories : gameCategories;
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Most Popular" },
  ];

  const filteredGames = useMemo(() => {
    const result = [...games];

    // Sort games based on selected option
    result.sort((a, b) => {
      const dateA = new Date(a.release_date).getTime() || 0;
      const dateB = new Date(b.release_date).getTime() || 0;

      if (sortOption === "newest") {
        return dateB - dateA;
      }
      if (sortOption === "oldest") {
        return dateA - dateB;
      }
      // For popularity, prioritize local games, then by date
      if (a.source === 'local' && b.source !== 'local') return -1;
      if (a.source !== 'local' && b.source === 'local') return 1;
      return dateB - dateA;
    });

    return result;
  }, [games, sortOption]);

  // Format game data for ProductCard component
  const formatGameForCard = (game: Game): ProductCardData => ({
    name: game.title,
    description: game.short_description || `${game.genre} game`,
    requirements: { windows: 'Free to play - Check system requirements on game page', mac: null },
    platforms: [game.platform],
    category: game.genre,
    type: 'game' as const,
    releaseYear: game.release_date ? new Date(game.release_date).getFullYear() : undefined,
    popularity: game.source === 'local' ? 95 : 85,
    background_image: game.thumbnail
  });

  const products = useMemo<ProductCardData[]>(() => {
    if (activeTab === "software") {
      return SOFTWARE_PRODUCTS;
    }

    return filteredGames.map((game) => formatGameForCard(game));
  }, [activeTab, filteredGames]);

  // Filter and paginate products
  const { paginatedProducts, totalPages } = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || 
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      if (sortOption === "newest") {
        return (b.releaseYear || 0) - (a.releaseYear || 0);
      }
      if (sortOption === "oldest") {
        return (a.releaseYear || 0) - (b.releaseYear || 0);
      }
      return b.popularity - a.popularity;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { paginatedProducts, totalPages };
  }, [products, searchQuery, selectedCategory, sortOption, currentPage]);

  const totalPagesForGames = Math.ceil(totalGames / ITEMS_PER_PAGE);
  const displayTotalPages = activeTab === "game" ? totalPagesForGames : totalPages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: "software" | "game") => {
    setActiveTab(tab);
    setSelectedCategory("All");
    setSearchQuery("");
    setSortOption("newest");
    setCurrentPage(1);
  };

  useEffect(() => {
    if (selectedCategory !== "All") {
      setCurrentPage(1);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption]);

  useEffect(() => {
    if (displayTotalPages > 0 && currentPage > displayTotalPages) {
      setCurrentPage(displayTotalPages);
    } else if (displayTotalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [displayTotalPages, currentPage]);

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
                onClick={() => handleTabChange("software")}
                className={`relative px-8 py-3 rounded-full font-medium uppercase tracking-[0.3em] text-sm transition-all duration-300 ${
                  activeTab === "software"
                    ? "text-midnight bg-gradient-to-r from-neon-cyan to-neon-blue shadow-neon"
                    : "text-slate-400 hover:text-neon-cyan"
                }`}
              >
                Software
              </button>
              <button
                onClick={() => handleTabChange("game")}
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
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product, index) => (
                <div
                  key={`${product.name}-${index}`}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {displayTotalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={displayTotalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </>
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-neon-cyan" />
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}
