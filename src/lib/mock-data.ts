import { Story, Chapter, Comment } from './types';

export const MOCK_AUTHORS = [
  { id: 'a1', name: 'Althea Penrose', avatar: 'https://i.pravatar.cc/150?u=a1' },
  { id: 'a2', name: 'Silas Thorne', avatar: 'https://i.pravatar.cc/150?u=a2' },
  { id: 'a3', name: 'Elena Vane', avatar: 'https://i.pravatar.cc/150?u=a3' },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'cm1',
    authorName: 'ReaderX',
    authorAvatar: 'https://i.pravatar.cc/150?u=rx',
    content: 'Wow, what a great start! I love the atmosphere of the Emerald Forest.',
    timestamp: '2 hours ago'
  },
  {
    id: 'cm2',
    authorName: 'FantasyFan',
    authorAvatar: 'https://i.pravatar.cc/150?u=ff',
    content: "Kaelen seems like an interesting protagonist. Can't wait to see what happens next!",
    timestamp: '1 hour ago'
  },
  {
    id: 'cm3',
    authorName: 'InkWorm',
    authorAvatar: 'https://i.pravatar.cc/150?u=iw',
    content: "The world building here is top notch. Definitely adding to my library.",
    timestamp: '30 mins ago'
  }
];

export const MOCK_STORIES: Story[] = [
  {
    id: 's1',
    title: 'The Emerald Dragon’s Awakening',
    author: MOCK_AUTHORS[0],
    cover: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf1cd085-b818-4a2a-8bee-e60db74553f9/story-cover-1-e7cbe20d-1776743236128.webp',
    description: 'In a world where dragons were thought to be extinct, one egg remains hidden deep within the Emerald forest. When a young rogue accidentally stumbles upon it, a destiny long forgotten begins to stir.',
    genre: 'Fantasy',
    rating: 4.8,
    rank: 1,
    tags: ['Epic', 'Dragons', 'Magic'],
    lastUpdated: '2 hours ago',
    status: 'Ongoing',
    totalChapters: 45,
    lastChapterRead: 12,
    likes: 12500,
    commentsCount: 840,
    subscribers: 5600,
    readerCount: 45000,
    views: 145200,
    followers: 12400,
    comments: [...MOCK_COMMENTS]
  },
  {
    id: 's2',
    title: 'Whispers in the Rain',
    author: MOCK_AUTHORS[1],
    cover: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf1cd085-b818-4a2a-8bee-e60db74553f9/story-cover-2-a76cbd21-1776743235886.webp',
    description: 'Two strangers find themselves trapped under the same umbrella during a monsoon in Neo-Seoul. As the rain continues to fall, secrets they thought were buried begin to surface.',
    genre: 'Romance',
    rating: 4.5,
    rank: 2,
    tags: ['Modern', 'Drama', 'Emotional'],
    lastUpdated: '1 day ago',
    status: 'Ongoing',
    totalChapters: 22,
    lastChapterRead: 22,
    likes: 8900,
    commentsCount: 420,
    subscribers: 3200,
    readerCount: 28000,
    views: 89000,
    followers: 8200,
    comments: [MOCK_COMMENTS[0], MOCK_COMMENTS[1]]
  },
  {
    id: 's3',
    title: 'Shadow of the Iron Lantern',
    author: MOCK_AUTHORS[2],
    cover: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf1cd085-b818-4a2a-8bee-e60db74553f9/mystery-novel-1-7a821ba7-1776742928859.webp',
    description: 'Detective Elias must solve a series of murders that lead him into the deepest, most fog-shrouded parts of the forbidden woods.',
    genre: 'Mystery',
    rating: 4.9,
    rank: 3,
    tags: ['Suspense', 'Thriller', 'Noir'],
    lastUpdated: '3 days ago',
    status: 'Ongoing',
    totalChapters: 30,
    likes: 15400,
    commentsCount: 1200,
    subscribers: 7800,
    readerCount: 52000,
    views: 210500,
    followers: 15600,
    comments: [MOCK_COMMENTS[1], MOCK_COMMENTS[2]]
  },
  {
    id: 's4',
    title: 'Neon Odyssey: Emerald Skies',
    author: MOCK_AUTHORS[0],
    cover: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf1cd085-b818-4a2a-8bee-e60db74553f9/scifi-novel-1-0aa9727d-1776742928742.webp',
    description: 'The year is 2450. Earth is a memory, and humanity survives on Dyson Spheres. A young engineer discovers a signal from a planet that shouldn’t exist.',
    genre: 'Sci-Fi',
    rating: 4.7,
    rank: 4,
    tags: ['Space', 'Cyberpunk', 'Adventure'],
    lastUpdated: '5 hours ago',
    status: 'Completed',
    totalChapters: 120,
    likes: 11200,
    commentsCount: 650,
    subscribers: 4900,
    readerCount: 39000,
    views: 132000,
    followers: 9800,
    comments: [MOCK_COMMENTS[0], MOCK_COMMENTS[2]]
  },
  {
    id: 's5',
    title: 'Summit of the Soul',
    author: MOCK_AUTHORS[1],
    cover: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf1cd085-b818-4a2a-8bee-e60db74553f9/adventure-novel-1-87bdc0c6-1776742927850.webp',
    description: 'Arthur has spent his life running from his past. To find redemption, he must climb the Peak of Gods, where no man has survived for a thousand years.',
    genre: 'Adventure',
    rating: 4.6,
    rank: 5,
    tags: ['Inspirational', 'Wilderness', 'Journey'],
    lastUpdated: '12 hours ago',
    status: 'Ongoing',
    totalChapters: 56,
    likes: 9500,
    commentsCount: 510,
    subscribers: 3800,
    readerCount: 31000,
    views: 76000,
    followers: 5400,
    comments: [MOCK_COMMENTS[1]]
  },
  {
    id: 's6',
    title: 'Golems of the Green Glade',
    author: MOCK_AUTHORS[2],
    cover: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf1cd085-b818-4a2a-8bee-e60db74553f9/litrpg-novel-1-9f2a3708-1776742928986.webp',
    description: 'Logged into "World of Emeralds" with a broken interface, Kael must use his knowledge of glitches to survive the first dungeon.',
    genre: 'LitRPG',
    rating: 4.4,
    rank: 6,
    tags: ['Gaming', 'Action', 'System'],
    lastUpdated: '1 hour ago',
    status: 'Ongoing',
    totalChapters: 89,
    likes: 7800,
    commentsCount: 390,
    subscribers: 2900,
    readerCount: 25000,
    views: 54000,
    followers: 4200,
    comments: [MOCK_COMMENTS[0]]
  }
];

export const MOCK_CHAPTERS: Chapter[] = [
  {
    id: 'c1',
    storyId: 's1',
    title: 'The Forest Whispers',
    number: 1,
    status: 'Published',
    publishedAt: '2023-10-01',
    content: `
      <p>The Emerald Forest was never truly silent. Even in the dead of night, the canopy hummed with a life that few dared to witness. Kaelen adjusted his hood, the damp moss beneath his boots muffling his footsteps. He wasn't supposed to be this deep into the forbidden zone, but the rumors of a "glowing relic" were too tempting for a thief of his caliber.</p>
      
      <p>A sudden snap of a twig made him freeze. His heart hammered against his ribs like a trapped bird. He held his breath, listening to the rhythmic chirping of bioluminescent crickets. Nothing. Just the wind.</p>
      
      <p>As he pushed through a thicket of thorn-bushes, the ground suddenly sloped downward. He tumbled, sliding down a muddy embankment until he landed in a soft bed of ferns. Groaning, he sat up and wiped the grime from his eyes.</p>
      
      <p>That's when he saw it.</p>
      
      <p>In the center of the hollow, nestled between the roots of an ancient Elder Tree, sat a stone structure that looked like a giant, petrified inkwell. But it wasn't the stone that caught his eye—it was the faint, pulsating emerald light emanating from within its depths.</p>
      
      <p>"By the gods," he whispered, his greed momentarily eclipsed by awe. He approached the relic, his hand trembling as he reached out to touch the smooth, dark stone. As his fingertips made contact, the emerald glow intensified, surging through his veins like liquid fire.</p>
      
      <p>The forest didn't just whisper then. It screamed.</p>
    `
  }
];