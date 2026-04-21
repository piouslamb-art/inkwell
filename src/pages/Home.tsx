import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_STORIES } from '@/lib/mock-data';
import { StoryCard } from '@/components/story/StoryCard';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Heart, 
  MessageCircle, 
  Users, 
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = () => {
  // Calculate top stories based on engagement metrics
  // Formula: likes*2 + comments*3 + subscribers*5 + readerCount*1
  const topStories = useMemo(() => {
    return [...MOCK_STORIES]
      .sort((a, b) => {
        const scoreA = (a.likes || 0) * 2 + (a.commentsCount || 0) * 3 + (a.subscribers || 0) * 5 + (a.readerCount || 0);
        const scoreB = (b.likes || 0) * 2 + (b.commentsCount || 0) * 3 + (b.subscribers || 0) * 5 + (b.readerCount || 0);
        return scoreB - scoreA;
      })
      .slice(0, 5); // Take top 5 for hero
  }, []);

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % topStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [topStories.length]);

  const trending = MOCK_STORIES.slice(0, 4);
  const newReleases = MOCK_STORIES.slice(2, 6);
  const editorsPicks = MOCK_STORIES.slice(1, 5);

  const activeStory = topStories[currentHeroIndex];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero Showcase Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-[2rem] bg-zinc-950 text-white shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <img 
                src={activeStory.cover} 
                className="w-full h-full object-cover opacity-40 blur-[2px]"
                alt={activeStory.title}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

              {/* Hero Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-3 py-1 bg-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      {activeStory.genre}
                    </span>
                    <span className="text-emerald-500 font-bold flex items-center text-sm">
                      <Sparkles className="w-4 h-4 mr-1" /> Trending #1
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-black mb-6 leading-tight">
                    {activeStory.title}
                  </h1>
                  <p className="text-lg text-zinc-300 mb-8 line-clamp-3 max-w-xl font-sans leading-relaxed">
                    {activeStory.description}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex flex-wrap items-center gap-6 mb-10 text-zinc-400">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span className="font-medium text-white">{(activeStory.likes / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-sky-500" />
                      <span className="font-medium text-white">{activeStory.commentsCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-emerald-500" />
                      <span className="font-medium text-white">{(activeStory.subscribers / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-amber-500" />
                      <span className="font-medium text-white">{(activeStory.readerCount / 1000).toFixed(1)}k Reads</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button asChild size="lg" className="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white text-lg h-14 font-bold">
                      <Link to={`/reader/${activeStory.id}`}>Start Reading</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-lg h-14 font-bold">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-4">
            <div className="flex space-x-2">
              {topStories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentHeroIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentHeroIndex === i ? 'w-8 bg-emerald-600' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
            <div className="flex space-x-2 ml-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full border border-white/10 bg-black/20 hover:bg-emerald-600 text-white transition-colors"
                onClick={() => setCurrentHeroIndex((prev) => (prev - 1 + topStories.length) % topStories.length)}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full border border-white/10 bg-black/20 hover:bg-emerald-600 text-white transition-colors"
                onClick={() => setCurrentHeroIndex((prev) => (prev + 1) % topStories.length)}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-sans">Trending Now</h2>
              <p className="text-muted-foreground text-sm">Most popular stories this week</p>
            </div>
          </div>
          <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 font-bold">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trending.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </section>

      {/* Editor's Picks - Highlight */}
      <section className="bg-emerald-600/5 py-20 mb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center mr-4 shadow-lg shadow-emerald-600/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-sans">Editor's Picks</h2>
              <p className="text-muted-foreground text-sm">Hand-picked gems for you</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {editorsPicks.slice(0, 2).map((story, i) => (
              <Link key={story.id} to={`/reader/${story.id}`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row bg-background rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border"
                >
                  <div className="w-full md:w-1/3 aspect-[2/3]">
                    <img src={story.cover} alt={story.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-4">
                      {story.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-600/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 font-sans">{story.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 font-sans">
                      {story.description}
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img src={story.author.avatar} alt={story.author.name} />
                      </div>
                      <span className="font-medium text-sm">{story.author.name}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-sans">New Releases</h2>
              <p className="text-muted-foreground text-sm">Fresh from the inkwell</p>
            </div>
          </div>
          <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 font-bold">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {newReleases.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};