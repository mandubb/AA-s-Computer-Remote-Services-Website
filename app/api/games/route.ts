import { NextResponse } from 'next/server';

const FREETOGAME_API = 'https://www.freetogame.com/api/games';

export async function GET() {
  try {
    console.log('🎮 Proxying FreeToGame API request...');
    
    const response = await fetch(FREETOGAME_API, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`❌ FreeToGame API returned status: ${response.status}`);
      return NextResponse.json(
        { error: 'Failed to fetch games from FreeToGame API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`✅ Successfully fetched ${data.length} games from FreeToGame API`);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('❌ Error proxying FreeToGame API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
