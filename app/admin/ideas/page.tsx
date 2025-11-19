'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Trash2, Edit, TrendingUp } from 'lucide-react';

interface Idea {
  id: string;
  problem: string;
  category: string;
  painScore: number;
  validationScore: number;
  upvotes: number;
  comments: number;
  isFeatured: boolean;
  createdAt: string;
}

export default function IdeasManagement() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      // TODO: Replace with actual API call
      // Placeholder data
      setIdeas([
        {
          id: '1',
          problem: 'Need a tool to automate social media posting for small businesses',
          category: 'SaaS',
          painScore: 9,
          validationScore: 85,
          upvotes: 342,
          comments: 67,
          isFeatured: true,
          createdAt: '2025-11-18',
        },
        {
          id: '2',
          problem: 'Freelancers struggle to track time across multiple projects',
          category: 'Productivity',
          painScore: 8,
          validationScore: 78,
          upvotes: 287,
          comments: 54,
          isFeatured: false,
          createdAt: '2025-11-17',
        },
        {
          id: '3',
          problem: 'E-commerce sellers need better inventory management',
          category: 'E-commerce',
          painScore: 7,
          validationScore: 72,
          upvotes: 198,
          comments: 42,
          isFeatured: false,
          createdAt: '2025-11-16',
        },
      ]);
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = (ideaId: string) => {
    setIdeas(ideas.map(idea =>
      idea.id === ideaId ? { ...idea, isFeatured: !idea.isFeatured } : idea
    ));
  };

  const deleteIdea = (ideaId: string) => {
    if (confirm('Are you sure you want to delete this idea?')) {
      setIdeas(ideas.filter(idea => idea.id !== ideaId));
    }
  };

  const filteredIdeas = ideas.filter(idea =>
    idea.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Idea Management</h1>
          <p className="text-muted-foreground">
            {ideas.length} total ideas · {ideas.filter(i => i.isFeatured).length} featured
          </p>
        </div>
        <Button>
          Add New Idea
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search ideas by problem or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredIdeas.map((idea) => (
          <Card key={idea.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{idea.category}</Badge>
                    {idea.isFeatured && (
                      <Badge className="bg-yellow-500">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mb-3">{idea.problem}</h3>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Pain Score</p>
                      <p className="font-bold text-red-600">{idea.painScore}/10</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Validation</p>
                      <p className="font-bold text-green-600">{idea.validationScore}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Upvotes</p>
                      <p className="font-medium">{idea.upvotes}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Comments</p>
                      <p className="font-medium">{idea.comments}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-medium">{new Date(idea.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant={idea.isFeatured ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFeatured(idea.id)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {idea.isFeatured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteIdea(idea.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Most Popular</p>
              <p className="font-semibold">SaaS Tools</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Highest Pain</p>
              <p className="font-semibold">Avg: 7.8/10</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-sm text-muted-foreground mb-1">This Week</p>
              <p className="font-semibold">24 New Ideas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
