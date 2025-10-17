/**
 * Cache utility for API responses with localStorage
 * Implements 24-hour cache with background refresh
 */

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export class APICache {
  /**
   * Get cached data if available and not expired
   */
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const entry: CacheEntry<T> = JSON.parse(cached);
      const now = Date.now();

      // Return data even if expired (stale-while-revalidate pattern)
      return entry.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Check if cached data is expired
   */
  static isExpired(key: string): boolean {
    if (typeof window === 'undefined') return true;

    try {
      const cached = localStorage.getItem(key);
      if (!cached) return true;

      const entry: CacheEntry<unknown> = JSON.parse(cached);
      return Date.now() > entry.expiresAt;
    } catch (error) {
      return true;
    }
  }

  /**
   * Set cache data with timestamp
   */
  static set<T>(key: string, data: T, duration: number = CACHE_DURATION): void {
    if (typeof window === 'undefined') return;

    try {
      const now = Date.now();
      const entry: CacheEntry<T> = {
        data,
        timestamp: now,
        expiresAt: now + duration,
      };

      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Cache set error:', error);
      // Handle quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        this.clear();
      }
    }
  }

  /**
   * Remove specific cache entry
   */
  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  /**
   * Clear all cache entries
   */
  static clear(): void {
    if (typeof window === 'undefined') return;
    
    // Only clear cache entries (preserve other localStorage data)
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Get cache metadata
   */
  static getMetadata(key: string): { timestamp: number; expiresAt: number } | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const entry: CacheEntry<unknown> = JSON.parse(cached);
      return {
        timestamp: entry.timestamp,
        expiresAt: entry.expiresAt,
      };
    } catch (error) {
      return null;
    }
  }
}

/**
 * Fetch with cache support
 * Returns cached data immediately, then optionally refreshes in background
 */
export async function fetchWithCache<T>(
  url: string,
  cacheKey: string,
  options?: RequestInit
): Promise<T> {
  // Try to get cached data first
  const cached = APICache.get<T>(cacheKey);
  const isExpired = APICache.isExpired(cacheKey);

  // If we have cached data and it's not expired, return it
  if (cached && !isExpired) {
    console.log(`✅ Using cached data for ${cacheKey}`);
    return cached;
  }

  // If we have cached data but it's expired, return it and refresh in background
  if (cached && isExpired) {
    console.log(`⚠️ Using stale cache for ${cacheKey}, refreshing in background...`);
    
    // Refresh in background (don't await)
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        APICache.set(cacheKey, data);
        console.log(`✅ Background refresh complete for ${cacheKey}`);
      })
      .catch(err => console.error('Background refresh failed:', err));

    return cached;
  }

  // No cache available, fetch fresh data
  console.log(`🔄 Fetching fresh data for ${cacheKey}`);
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  APICache.set(cacheKey, data);
  
  return data;
}
