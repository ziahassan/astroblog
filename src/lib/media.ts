// src/lib/media.ts
import Parser from 'rss-parser';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  publishDate: Date;
  url: string;
  type: 'podcast' | 'youtube' | 'guest' | 'music';
  thumbnail?: string;
  duration?: string;
  platform?: string;
  price?: string; // For music releases
}

// YouTube API functions
export async function getYouTubeVideos(apiKey: string, channelId: string): Promise<MediaItem[]> {
  try {
    // Get channel's uploads playlist
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );
    
    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.statusText}`);
    }
    
    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    
    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist');
    }
    
    // Get videos from uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.statusText}`);
    }
    
    const videosData = await videosResponse.json();
    
    return videosData.items.map((item: any): MediaItem => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishDate: new Date(item.snippet.publishedAt),
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      type: 'youtube',
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      platform: 'YouTube'
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

// Podcast RSS functions
export async function getPodcastEpisodes(rssUrl: string): Promise<MediaItem[]> {
  try {
    const parser = new Parser({
      customFields: {
        item: ['itunes:duration', 'itunes:image']
      }
    });
    
    const feed = await parser.parseURL(rssUrl);
    
    return feed.items.map((item: any): MediaItem => ({
      id: item.guid || item.link || item.title,
      title: item.title || 'Untitled Episode',
      description: item.contentSnippet || item.content || item.description || '',
      publishDate: new Date(item.pubDate || item.isoDate || Date.now()),
      url: item.link || item.enclosure?.url || '#',
      type: 'podcast',
      thumbnail: item['itunes:image']?.href || feed.image?.url,
      duration: item['itunes:duration'],
      platform: 'Podcast'
    }));
  } catch (error) {
    console.error('Error fetching podcast episodes:', error);
    return [];
  }
}

// Music releases from content collection
export async function getMusicReleases(): Promise<MediaItem[]> {
  try {
    const { getCollection } = await import('astro:content');
    const musicEntries = await getCollection('music');
    
    return musicEntries.map((entry): MediaItem => ({
      id: entry.slug,
      title: entry.data.title,
      description: entry.data.description || '',
      publishDate: entry.data.releaseDate,
      url: entry.data.url,
      type: 'music',
      thumbnail: entry.data.thumbnail,
      platform: entry.data.platform,
      price: entry.data.price
    }));
  } catch (error) {
    console.error('Error fetching music releases:', error);
    return [];
  }
}

// Guest appearances (manual for now)
export async function getGuestAppearances(): Promise<MediaItem[]> {
  // For now, return empty array - we'll add a content collection for this
  return [];
}

// Combine all media sources
export async function getAllMediaItems(): Promise<MediaItem[]> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  const channelId = import.meta.env.YOUTUBE_CHANNEL_ID || 'UCYourChannelId'; // We'll get this from your channel
  const podcastRssUrl = import.meta.env.PODCAST_RSS_URL;

  const [youtubeVideos, podcastEpisodes, guestAppearances, musicReleases] = await Promise.all([
    apiKey && channelId ? getYouTubeVideos(apiKey, channelId) : Promise.resolve([]),
    podcastRssUrl ? getPodcastEpisodes(podcastRssUrl) : Promise.resolve([]),
    getGuestAppearances(),
    getMusicReleases()
  ]);

  // Combine and sort by date (newest first)
  const allItems = [...youtubeVideos, ...podcastEpisodes, ...guestAppearances, ...musicReleases];
  
  return allItems.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}