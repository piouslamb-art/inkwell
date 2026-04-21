import React, { useState, useRef } from 'react';
import { 
  Plus, 
  FileText, 
  Settings, 
  BarChart3, 
  Users, 
  MessageSquare,
  ImageIcon,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Save,
  Eye,
  Layout,
  UploadCloud,
  X,
  GripVertical,
  BookOpen,
  Image as LucideImage
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_STORIES } from '@/lib/mock-data';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'list' | 'create-choice' | 'create-story' | 'create-comic' | 'upload-chapter' | 'upload-comic-episode';

const COMIC_COVER_PLACEHOLDER = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf1cd085-b818-4a2a-8bee-e60db74553f9/comic-cover-placeholder-03e2c11a-1776747169435.webp";
const COMIC_PANEL_PLACEHOLDER = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf1cd085-b818-4a2a-8bee-e60db74553f9/comic-panel-placeholder-0da1244f-1776747169701.webp";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('my-stories');
  const [view, setView] = useState<View>('list');
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<any>(MOCK_STORIES[0]);
  const [comicPanels, setComicPanels] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePanelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPanels: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setComicPanels(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePanel = (index: number) => {
    setComicPanels(prev => prev.filter((_, i) => i !== index));
  };

  const stats = [
    { label: 'Total Views', value: '1.2M', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Followers', value: '45.8K', icon: <Users className="w-5 h-5" /> },
    { label: 'Comments', value: '8.2K', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  // Extend mock data for display purposes in the dashboard
  const displayStories = [
    ...MOCK_STORIES.slice(0, 1).map(s => ({ ...s, type: 'novel' as const })),
    {
      id: 'comic-1',
      title: 'Shadow of the Emerald',
      author: { name: 'Althea Penrose', avatar: '' },
      cover: COMIC_COVER_PLACEHOLDER,
      status: 'Ongoing',
      totalChapters: 12,
      lastUpdated: '2 days ago',
      type: 'comic' as const
    },
    ...MOCK_STORIES.slice(1, 2).map(s => ({ ...s, type: 'novel' as const }))
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-sans font-black mb-2">Publishing Hub</h1>
            <p className="text-muted-foreground">Welcome back, <span className="text-foreground font-bold">Althea Penrose</span>. Ready to create your next masterpiece?</p>
          </div>
          {view === 'list' && (
            <Button 
              className="h-12 px-8 rounded-full shadow-lg shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 text-white" 
              onClick={() => setView('create-choice')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Project
            </Button>
          )}
        </div>

        {view === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-none bg-emerald-600/5">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-black">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {view === 'list' && (
            <aside className="w-full lg:w-64 space-y-2">
              {[
                { id: 'my-stories', label: 'My Projects', icon: <FileText className="w-4 h-4" /> },
                { id: 'stats', label: 'Statistics', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'comments', label: 'Comments', icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id 
                      ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/20' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </aside>
          )}

          <main className="flex-1">
            <AnimatePresence mode="wait">
              {view === 'create-choice' && (
                <motion.div
                  key="create-choice"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-2xl mx-auto"
                >
                  <Button variant="ghost" className="mb-6" onClick={() => setView('list')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card 
                      className="border-2 border-transparent hover:border-emerald-600 cursor-pointer transition-all group overflow-hidden"
                      onClick={() => setView('create-story')}
                    >
                      <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BookOpen className="w-10 h-10" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-sans">Novel</h3>
                          <p className="text-sm text-muted-foreground mt-2">Write chapters with rich text editing and character bios.</p>
                        </div>
                        <Button variant="outline" className="w-full">Start Writing</Button>
                      </CardContent>
                    </Card>

                    <Card 
                      className="border-2 border-transparent hover:border-emerald-600 cursor-pointer transition-all group overflow-hidden"
                      onClick={() => setView('create-comic')}
                    >
                      <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Layout className="w-10 h-10" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-sans">Comic</h3>
                          <p className="text-sm text-muted-foreground mt-2">Upload image sequences and manage series episodes.</p>
                        </div>
                        <Button variant="outline" className="w-full">Start Drawing</Button>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {view === 'create-story' && (
                <motion.div
                  key="create-story"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Button variant="ghost" className="mb-6" onClick={() => setView('create-choice')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Card className="border-none shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-sans">Create New Novel</CardTitle>
                      <CardDescription>Fill out the details below to start your new writing journey.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Novel Title</label>
                            <Input placeholder="Enter a catchy title..." className="h-12 bg-muted/30 border-none focus-visible:ring-emerald-600" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Genre</label>
                            <Input placeholder="e.g. Fantasy, Romance..." className="h-12 bg-muted/30 border-none focus-visible:ring-emerald-600" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Blurb / Description</label>
                            <Textarea placeholder="What is your story about?" className="min-h-[150px] bg-muted/30 border-none focus-visible:ring-emerald-600 font-sans" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block">Cover Image</label>
                          <div 
                            className={`aspect-[2/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                              coverPreview ? 'border-none' : 'hover:border-emerald-600 hover:bg-emerald-600/5'
                            }`}
                            onClick={() => document.getElementById('cover-upload')?.click()}
                          >
                            {coverPreview ? (
                              <img src={coverPreview} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                              <>
                                <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
                                <p className="text-sm font-medium">Click to upload cover</p>
                                <p className="text-xs text-muted-foreground mt-1">Recommended size: 600x900px</p>
                              </>
                            )}
                            <input 
                              type="file" 
                              id="cover-upload" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={handleFileUpload}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4 pt-6 border-t">
                        <Button variant="ghost" onClick={() => setView('create-choice')}>Cancel</Button>
                        <Button className="px-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => {
                          toast.success('Novel profile created!');
                          setView('list');
                        }}>Save Novel Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {view === 'create-comic' && (
                <motion.div
                  key="create-comic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Button variant="ghost" className="mb-6" onClick={() => setView('create-choice')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Card className="border-none shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-sans">Create New Comic</CardTitle>
                      <CardDescription>Establish your comic series and prepare for your first episode.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Comic Title</label>
                            <Input placeholder="Enter series title..." className="h-12 bg-muted/30 border-none focus-visible:ring-emerald-600" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category / Genre</label>
                            <Select>
                              <SelectTrigger className="h-12 bg-muted/30 border-none">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="action">Action</SelectItem>
                                <SelectItem value="comedy">Comedy</SelectItem>
                                <SelectItem value="fantasy">Fantasy</SelectItem>
                                <SelectItem value="horror">Horror</SelectItem>
                                <SelectItem value="romance">Romance</SelectItem>
                                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Synopsis</label>
                            <Textarea placeholder="What is your comic about?" className="min-h-[150px] bg-muted/30 border-none focus-visible:ring-emerald-600 font-sans" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block">Series Cover</label>
                          <div 
                            className={`aspect-[2/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                              coverPreview ? 'border-none' : 'hover:border-emerald-600 hover:bg-emerald-600/5'
                            }`}
                            onClick={() => document.getElementById('comic-cover-upload')?.click()}
                          >
                            {coverPreview ? (
                              <img src={coverPreview} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                              <>
                                <Layout className="w-12 h-12 text-muted-foreground mb-4" />
                                <p className="text-sm font-medium">Upload Series Thumbnail</p>
                                <p className="text-xs text-muted-foreground mt-1">Portrait (600x900px recommended)</p>
                              </>
                            )}
                            <input 
                              type="file" 
                              id="comic-cover-upload" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={handleFileUpload}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4 pt-6 border-t">
                        <Button variant="ghost" onClick={() => setView('create-choice')}>Cancel</Button>
                        <Button className="px-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => {
                          toast.success('Comic series created!');
                          setView('list');
                        }}>Initialize Comic Series</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {view === 'upload-chapter' && (
                <motion.div
                  key="upload-chapter"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Button variant="ghost" className="mb-6" onClick={() => setView('list')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Publish
                  </Button>
                  <Card className="border-none shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-sans">Upload New Chapter</CardTitle>
                        <CardDescription>Adding to: <span className="text-emerald-600 font-bold">{selectedStory.title}</span></CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline"><Eye className="w-4 h-4 mr-2" /> Preview</Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => {
                          toast.success('Chapter published successfully!');
                          setView('list');
                        }}><Save className="w-4 h-4 mr-2" /> Publish Chapter</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Chapter Title</label>
                          <Input placeholder="Enter chapter title..." className="h-12 bg-muted/30 border-none focus-visible:ring-emerald-600" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Chapter Number</label>
                          <Input type="number" placeholder="e.g. 46" className="h-12 bg-muted/30 border-none focus-visible:ring-emerald-600" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Chapter Content</label>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold">B</Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 italic">I</Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 underline">U</Button>
                          </div>
                        </div>
                        <Textarea 
                          placeholder="Start writing your masterpiece..." 
                          className="min-h-[500px] bg-muted/30 border-none focus-visible:ring-emerald-600 font-sans text-lg p-8 leading-relaxed"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">Status:</span>
                          <Select defaultValue="published">
                            <SelectTrigger className="w-[150px] bg-background border-none h-9">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-xs text-muted-foreground">Word count: 0 words</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {view === 'upload-comic-episode' && (
                <motion.div
                  key="upload-comic-episode"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Button variant="ghost" className="mb-6" onClick={() => setView('list')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Publish
                  </Button>
                  <Card className="border-none shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-sans">Upload Episode</CardTitle>
                        <CardDescription>Adding to: <span className="text-emerald-600 font-bold">{selectedStory.title}</span></CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline"><Eye className="w-4 h-4 mr-2" /> Preview</Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => {
                          toast.success('Episode published successfully!');
                          setView('list');
                        }}><Save className="w-4 h-4 mr-2" /> Publish Episode</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Episode Title</label>
                          <Input placeholder="Enter episode title..." className="h-12 bg-muted/30 border-none focus-visible:ring-emerald-600" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Episode #</label>
                          <Input type="number" placeholder="e.g. 12" className="h-12 bg-muted/30 border-none focus-visible:ring-emerald-600" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block">Comic Panels (Image Sequence)</label>
                        <div 
                          className="border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:bg-emerald-600/5 hover:border-emerald-600 transition-all cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <UploadCloud className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-lg font-bold">Drag and drop panels or click to browse</p>
                            <p className="text-sm text-muted-foreground">Upload multiple images in the order they should appear.</p>
                          </div>
                          <input 
                            type="file" 
                            multiple 
                            className="hidden" 
                            ref={fileInputRef} 
                            accept="image/*" 
                            onChange={handlePanelUpload}
                          />
                        </div>

                        {comicPanels.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
                            {comicPanels.map((panel, idx) => (
                              <div key={idx} className="relative group aspect-[3/4] rounded-lg overflow-hidden border">
                                <img src={panel} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button size="icon" variant="destructive" className="rounded-full" onClick={() => removePanel(idx)}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                                  {idx + 1}
                                </div>
                                <div className="absolute bottom-2 right-2 cursor-grab">
                                  <GripVertical className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                        <p className="text-sm text-muted-foreground">Total Panels: <span className="font-bold text-foreground">{comicPanels.length}</span></p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">Status:</span>
                          <Select defaultValue="draft">
                            <SelectTrigger className="w-[150px] bg-background border-none h-9">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {view === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-sans font-bold">My Projects</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {displayStories.map((story: any) => (
                      <Card key={story.id} className="group overflow-hidden hover:border-emerald-600/50 transition-colors">
                        <CardContent className="p-0 flex flex-col md:flex-row">
                          <div className="w-full md:w-32 aspect-[2/3] md:aspect-auto shrink-0 overflow-hidden bg-muted">
                            <img src={story.cover} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="bg-emerald-600/5 text-emerald-600 border-emerald-600/20">{story.status}</Badge>
                                <Badge variant="secondary" className="bg-slate-100 text-slate-700 capitalize">
                                  {story.type === 'comic' ? <Layout className="w-3 h-3 mr-1" /> : <FileText className="w-3 h-3 mr-1" />}
                                  {story.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{story.totalChapters} {story.type === 'comic' ? 'Episodes' : 'Chapters'}</span>
                              </div>
                              <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="w-4 h-4" /></Button>
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-sans">{story.title}</h3>
                            <div className="flex items-center space-x-6 text-sm text-muted-foreground mt-auto">
                              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Published</span>
                              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Updated {story.lastUpdated}</span>
                            </div>
                          </div>
                          <div className="bg-muted/30 p-6 flex flex-col justify-center space-y-2 border-l">
                            <Button 
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                              onClick={() => {
                                setSelectedStory(story);
                                setView(story.type === 'comic' ? 'upload-comic-episode' : 'upload-chapter');
                              }}
                            >
                              {story.type === 'comic' ? 'Upload Episode' : 'Write Chapter'}
                            </Button>
                            <Button variant="outline" className="w-full border-emerald-600/20 text-emerald-600 hover:bg-emerald-600/5">
                              {story.type === 'comic' ? 'Manage Episodes' : 'Manage Chapters'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};