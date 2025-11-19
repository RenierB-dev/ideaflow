'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Crown, Mail } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  isPro: boolean;
  joinedAt: string;
  lastActive: string;
  ideasSaved: number;
  analysesViewed: number;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // TODO: Replace with actual API call
      // Placeholder data
      setUsers([
        {
          id: '1',
          email: 'sarah@example.com',
          name: 'Sarah Johnson',
          isPro: true,
          joinedAt: '2025-01-15',
          lastActive: '2025-11-19',
          ideasSaved: 12,
          analysesViewed: 25,
        },
        {
          id: '2',
          email: 'john@example.com',
          name: 'John Smith',
          isPro: true,
          joinedAt: '2025-02-20',
          lastActive: '2025-11-18',
          ideasSaved: 8,
          analysesViewed: 15,
        },
        {
          id: '3',
          email: 'emma@example.com',
          name: 'Emma Davis',
          isPro: false,
          joinedAt: '2025-10-10',
          lastActive: '2025-11-17',
          ideasSaved: 3,
          analysesViewed: 2,
        },
      ]);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">
          {users.length} total users · {users.filter(u => u.isPro).length} Pro subscribers
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    {user.isPro && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{user.email}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Joined</p>
                      <p className="font-medium">{new Date(user.joinedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Active</p>
                      <p className="font-medium">{new Date(user.lastActive).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ideas Saved</p>
                      <p className="font-medium">{user.ideasSaved}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Analyses Viewed</p>
                      <p className="font-medium">{user.analysesViewed}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
