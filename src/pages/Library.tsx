import React, { useState } from 'react';
import { MOCK_STORIES } from '@/lib/mock-data';
import { StoryCard } from '@/components/story/StoryCard';
import { 
  BookMarked, 
  Clock, 
  Bell, 
  Search,
  BookOpen,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Library = () => {
  const followedStories = MOCK_STORIES.filter(s => s.lastChapterRead !== undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStories = followedStories.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center mr-4">
                <BookMarked className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-sans font-black">My Library</h1>
                <p className="text-muted-foreground">You are following {followedStories.length} stories</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search library..." 
                  className="pl-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-emerald-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded-full cursor-pointer text-white border-none">All Stories</Badge>
            <Badge variant="outline" className="px-4 py-1.5 rounded-full cursor-pointer hover:bg-muted border-muted-foreground/20">Unread</Badge>
            <Badge variant="outline" className="px-4 py-1.5 rounded-full cursor-pointer hover:bg-muted border-muted-foreground/20">Completed</Badge>
            <Badge variant="outline" className="px-4 py-1.5 rounded-full cursor-pointer hover:bg-muted border-muted-foreground/20">On Hiatus</Badge>
          </div>
        </header>

        {/* Notifications / Alerts */}
        <section className="mb-12">
          <div className="bg-emerald-600/5 border border-emerald-600/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Bell className="w-32 h-32 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-emerald-600 font-bold mb-4">
                <Bell className="w-5 h-5" />
                <span>New Updates</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-2xl border shadow-sm group hover:border-emerald-600 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <img src={MOCK_STORIES[0].cover} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">New chapter available for <span className="text-emerald-600">{MOCK_STORIES[0].title}</span></p>
                      <p className="text-xs text-muted-foreground">Chapter 46: The Final Gateway • 2 hours ago</p>
                    </div>
                  </div>
                  <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white">Read Now</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {filteredStories.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No stories found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              {searchTerm ? `We couldn't find any stories matching "${searchTerm}" in your library.` : "You haven't followed any stories yet. Start exploring to build your library!"}
            </p>
            {!searchTerm && (
              <Button asChild className="mt-6 rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link to="/">Explore Stories</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};