import React from 'react';
import { Link } from 'react-router-dom';
import { Star, User, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Story } from '@/lib/types';
import { motion } from 'framer-motion';

interface StoryCardProps {
  story: Story;
  index?: number;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/reader/${story.id}`}>
        <Card className="group overflow-hidden border-none bg-transparent shadow-none hover:cursor-pointer">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <img 
              src={story.cover} 
              alt={story.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white text-xs line-clamp-3">{story.description}</p>
            </div>
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-emerald-600 border-none font-semibold">
                <Star className="w-3 h-3 mr-1 fill-emerald-600" />
                {story.rating}
              </Badge>
            </div>
          </div>
          <CardContent className="pt-4 px-0">
            <h3 className="font-bold text-base leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1">
              {story.title}
            </h3>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <User className="w-3 h-3 mr-1" />
              <span className="truncate">{story.author.name}</span>
            </div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground/80">
              <Clock className="w-3 h-3 mr-1" />
              <span>{story.lastUpdated}</span>
            </div>
            {story.lastChapterRead && (
              <div className="mt-3">
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600" 
                    style={{ width: `${(story.lastChapterRead / story.totalChapters) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] mt-1 text-muted-foreground font-medium">
                  Progress: {story.lastChapterRead}/{story.totalChapters} Ch.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};