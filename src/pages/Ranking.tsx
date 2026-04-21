import React, { useState } from 'react';
import { MOCK_STORIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, TrendingUp, Trophy, Award, Filter, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Ranking = () => {
  const [filter, setFilter] = useState('popular-week');
  
  const rankedStories = [...MOCK_STORIES].sort((a, b) => a.rank - b.rank);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center mr-4 shadow-lg shadow-emerald-600/20">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-sans font-black">Inkwell Rankings</h1>
                <p className="text-muted-foreground">The best of the best, updated daily.</p>
              </div>
            </div>
            <Button variant="outline" className="hidden md:flex">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <Tabs defaultValue="popular-week" className="w-full" onValueChange={setFilter}>
            <TabsList className="bg-muted/50 p-1 rounded-full h-12">
              <TabsTrigger value="popular-week" className="rounded-full px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Popular This Week</TabsTrigger>
              <TabsTrigger value="top-rated" className="rounded-full px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Top Rated</TabsTrigger>
              <TabsTrigger value="all-time" className="rounded-full px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">All Time Bests</TabsTrigger>
              <TabsTrigger value="rising" className="rounded-full px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Rising Stars</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        <div className="space-y-4">
          {rankedStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/reader/${story.id}`}>
                <div className="group bg-card hover:bg-muted/30 p-4 md:p-6 rounded-2xl border transition-all flex items-center space-x-6">
                  <div className="flex flex-col items-center justify-center w-12 shrink-0">
                    <span className={`text-2xl font-black font-sans ${
                      index === 0 ? 'text-yellow-500 scale-125' : 
                      index === 1 ? 'text-zinc-400 scale-110' : 
                      index === 2 ? 'text-amber-600 scale-105' : 
                      'text-muted-foreground/50'
                    }`}>
                      #{index + 1}
                    </span>
                    {index < 3 && <Award className={`w-4 h-4 mt-1 ${
                      index === 0 ? 'text-yellow-500' : 
                      index === 1 ? 'text-zinc-400' : 
                      'text-amber-600'
                    }`} />}
                  </div>

                  <div className="w-16 h-24 md:w-20 md:h-28 shrink-0 overflow-hidden rounded-lg shadow-md">
                    <img src={story.cover} alt={story.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-[10px] h-4 font-bold border-emerald-600/20 text-emerald-600 uppercase">
                        {story.genre}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        {story.status}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold truncate group-hover:text-emerald-600 transition-colors font-sans">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">by {story.author.name}</p>
                    
                    <div className="hidden md:flex items-center space-x-6">
                      <div className="flex items-center text-xs font-medium">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1.5" />
                        {story.rating} Rating
                      </div>
                      <div className="flex items-center text-xs font-medium">
                        <TrendingUp className="w-4 h-4 text-emerald-600 mr-1.5" />
                        {Math.floor(Math.random() * 1000) + 500} Reading
                      </div>
                      <div className="flex items-center text-xs font-medium text-muted-foreground">
                        <BookOpen className="w-4 h-4 mr-1.5" />
                        {story.totalChapters} Chapters
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};