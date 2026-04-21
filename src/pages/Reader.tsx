import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  MessageSquare, 
  Heart, 
  Share2, 
  User,
  Clock,
  Eye,
  Users,
  BookmarkPlus,
  Play,
  Star,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { MOCK_STORIES, MOCK_CHAPTERS } from '@/lib/mock-data';
import { ReaderSettings, Comment } from '@/lib/types';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find story or fallback to first one
  const story = useMemo(() => 
    MOCK_STORIES.find(s => s.id === id) || MOCK_STORIES[0], 
    [id]
  );
  
  const chapter = MOCK_CHAPTERS[0]; // Simplified for mock
  
  const [viewMode, setViewMode] = useState<'info' | 'reader'>('info');
  const [comments, setComments] = useState<Comment[]>(story.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 18,
    lineHeight: 1.6,
    fontFamily: 'sans',
    theme: 'light'
  });

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    toast.success(isFollowed ? 'Unfollowed story' : 'Following story!');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from library' : 'Saved to library!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      authorName: 'You',
      authorAvatar: 'https://i.pravatar.cc/150?u=user',
      content: newComment,
      timestamp: 'Just now'
    };
    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('Comment posted!');
  };

  const InfoView = () => (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={story.cover} 
            alt={story.title} 
            className="w-full h-full object-cover blur-sm scale-110 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-end relative z-10 pb-12">
          <Button 
            variant="ghost" 
            className="absolute top-8 left-4 text-foreground md:left-0"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <div className="flex flex-col md:flex-row items-end gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-48 md:w-64 aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden border-4 border-background shrink-0"
            >
              <img src={story.cover} alt={story.title} className="w-full h-full object-cover" />
            </motion.div>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                {story.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-emerald-600/10 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                {story.title}
              </h1>
              <div className="flex items-center space-x-6 text-sm font-medium">
                <span className="flex items-center text-emerald-600"><User className="w-4 h-4 mr-2" /> {story.author.name}</span>
                <span className="flex items-center text-muted-foreground"><Clock className="w-4 h-4 mr-2" /> {story.lastUpdated}</span>
                <span className="flex items-center text-yellow-500"><Star className="w-4 h-4 mr-2 fill-yellow-500" /> {story.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Synopsis */}
          <section>
            <h3 className="text-2xl font-bold mb-4">Synopsis</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {story.description}
            </p>
          </section>

          {/* Engagement Data */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/30 rounded-3xl border border-emerald-600/10">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <Eye className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black">{(story.views / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Views</p>
            </div>
            <div className="text-center space-y-1 border-x border-border/50">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black">{(story.followers / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Followers</p>
            </div>
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <Heart className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black">{(story.likes / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Likes</p>
            </div>
            <div className="text-center space-y-1 border-l border-border/50">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black">{story.commentsCount}</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Comments</p>
            </div>
          </section>

          {/* Comments Section */}
          <section className="pt-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Reader Comments</h3>
              <span className="px-3 py-1 bg-muted rounded-full text-xs font-bold">{comments.length} Comments</span>
            </div>

            <div className="mb-10 space-y-4">
              <Textarea 
                placeholder="Add your thoughts..." 
                className="min-h-[120px] bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-emerald-600 text-lg rounded-2xl"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handlePostComment} className="px-8 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Post Comment</Button>
              </div>
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={comment.id} 
                  className="flex space-x-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <img src={comment.authorAvatar} alt={comment.authorName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">{comment.authorName}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <button className="text-xs font-bold hover:text-emerald-600 flex items-center">
                        <Heart className="w-3 h-3 mr-1" /> Like
                      </button>
                      <button className="text-xs font-bold hover:text-emerald-600 flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" /> Reply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="hidden lg:block space-y-8">
          <div className="p-6 bg-card border rounded-3xl space-y-6">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Status</p>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                <span className="font-bold">{story.status}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Total Chapters</p>
              <span className="font-bold">{story.totalChapters} Chapters</span>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Category</p>
              <span className="font-bold text-emerald-600">{story.genre}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Written by</p>
                <p className="font-bold">{story.author.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ReaderInterface = () => (
    <div className={`min-h-screen pt-24 pb-32 ${
      settings.theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 
      settings.theme === 'sepia' ? 'bg-[#f4ecd8] text-[#5b4636]' : 
      'bg-white text-zinc-900'
    }`}>
      {/* Reader Header */}
      <div className="fixed top-[57px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setViewMode('info')} className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col">
              <h2 className="text-sm font-bold truncate max-w-[150px] md:max-w-md">{story.title}</h2>
              <p className="text-xs text-muted-foreground">Chapter {chapter.number}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button 
              className={`rounded-full shadow-lg ${isFollowed ? 'bg-muted text-foreground hover:bg-muted/80' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              size="sm"
              onClick={handleFollow}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFollowed ? 'fill-emerald-400' : ''}`} />
              {isFollowed ? 'Following' : 'Follow'}
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[115px] right-4 z-50 w-72 p-6 bg-card border rounded-xl shadow-2xl"
          >
            <h3 className="font-bold mb-4">Reading Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">Font Size ({settings.fontSize}px)</label>
                <Slider 
                  value={[settings.fontSize]} 
                  min={12} 
                  max={32} 
                  step={1} 
                  onValueChange={([v]) => setSettings({...settings, fontSize: v})}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">Line Height ({settings.lineHeight})</label>
                <Slider 
                  value={[settings.lineHeight * 10]} 
                  min={12} 
                  max={25} 
                  step={1} 
                  onValueChange={([v]) => setSettings({...settings, lineHeight: v / 10})}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">Font Family</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={settings.fontFamily === 'serif' ? 'default' : 'outline'} 
                    size="sm"
                    className={settings.fontFamily === 'serif' ? 'bg-emerald-600 text-white' : ''}
                    onClick={() => setSettings({...settings, fontFamily: 'serif'})}
                  >
                    Serif
                  </Button>
                  <Button 
                    variant={settings.fontFamily === 'sans' ? 'default' : 'outline'} 
                    size="sm"
                    className={settings.fontFamily === 'sans' ? 'bg-emerald-600 text-white' : ''}
                    onClick={() => setSettings({...settings, fontFamily: 'sans'})}
                  >
                    Sans
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={settings.theme === 'light' ? 'default' : 'outline'} 
                    size="sm"
                    className={`bg-white text-zinc-900 border ${settings.theme === 'light' ? 'ring-2 ring-emerald-600' : ''}`}
                    onClick={() => setSettings({...settings, theme: 'light'})}
                  >
                    A
                  </Button>
                  <Button 
                    variant={settings.theme === 'sepia' ? 'default' : 'outline'} 
                    size="sm"
                    className={`bg-[#f4ecd8] text-[#5b4636] ${settings.theme === 'sepia' ? 'ring-2 ring-emerald-600' : ''}`}
                    onClick={() => setSettings({...settings, theme: 'sepia'})}
                  >
                    A
                  </Button>
                  <Button 
                    variant={settings.theme === 'dark' ? 'default' : 'outline'} 
                    size="sm"
                    className={`bg-zinc-900 text-zinc-100 ${settings.theme === 'dark' ? 'ring-2 ring-emerald-600' : ''}`}
                    onClick={() => setSettings({...settings, theme: 'dark'})}
                  >
                    A
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Content */}
      <main className="container mx-auto px-4 mt-12 max-w-3xl">
        <header className="mb-12 text-center">
          <p className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-4">Chapter {chapter.number}</p>
          <h1 className="text-3xl md:text-5xl font-sans font-black mb-6 leading-tight">{chapter.title}</h1>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <span className="flex items-center"><User className="w-4 h-4 mr-2" /> {story.author.name}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {chapter.publishedAt}</span>
          </div>
        </header>

        <div 
          className={`reader-body transition-all duration-300 leading-relaxed ${settings.fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}
          style={{ 
            fontSize: `${settings.fontSize}px`, 
            lineHeight: settings.lineHeight 
          }}
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />

        <div className="mt-16 flex items-center justify-between border-t border-b py-8">
          <Button variant="ghost" className="h-auto py-4">
            <ChevronLeft className="w-6 h-6 mr-2" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Previous</p>
              <p className="font-bold">None</p>
            </div>
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hover:text-emerald-600"><Heart className="w-5 h-5" /></Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hover:text-emerald-600"><Share2 className="w-5 h-5" /></Button>
          </div>
          <Button variant="ghost" className="h-auto py-4 text-emerald-600">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Next Chapter</p>
              <p className="font-bold">Chapter 2</p>
            </div>
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {viewMode === 'info' ? (
          <motion.div 
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InfoView />
          </motion.div>
        ) : (
          <motion.div 
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReaderInterface />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            {/* Bottom Left: Save */}
            <Button 
              variant="outline" 
              size="lg" 
              className={`rounded-full px-4 md:px-8 border-2 transition-all shrink-0 ${isSaved ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background hover:border-emerald-600'}`}
              onClick={handleSave}
            >
              <BookmarkPlus className={`w-5 h-5 md:mr-2 ${isSaved ? 'fill-white' : ''}`} />
              <span className="hidden md:inline">{isSaved ? 'Saved to Library' : 'Save to Library'}</span>
            </Button>

            {/* Bottom Center: Read */}
            <Button 
              size="lg" 
              className="flex-1 max-w-md rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/20 font-black text-lg h-14 md:h-16 group"
              onClick={() => {
                if (viewMode === 'info') {
                  setViewMode('reader');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  // If already reading, maybe scroll to top or show next chapter
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              {viewMode === 'info' ? (
                <>
                  <Play className="w-6 h-6 mr-3 fill-white" />
                  START READING
                </>
              ) : (
                <>
                  CONTINUE READING
                </>
              )}
            </Button>

            {/* Bottom Right: Share */}
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-4 md:px-8 bg-background border-2 hover:border-emerald-600 transition-all shrink-0"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};