export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface Story {
  id: string;
  title: string;
  author: Author;
  cover: string;
  description: string;
  genre: string;
  rating: number;
  rank: number;
  tags: string[];
  lastUpdated: string;
  status: 'Ongoing' | 'Completed' | 'Hiatus';
  totalChapters: number;
  lastChapterRead?: number;
  // Engagement metrics
  likes: number;
  commentsCount: number;
  subscribers: number;
  readerCount: number;
  // New specific fields requested
  views: number;
  followers: number;
  comments: Comment[];
}

export interface Chapter {
  id: string;
  storyId: string;
  title: string;
  content: string;
  number: number;
  publishedAt: string;
  status: 'Draft' | 'Published';
}

export interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: 'serif' | 'sans';
  theme: 'light' | 'dark' | 'sepia';
}