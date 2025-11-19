'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dailySignups = [
  { date: 'Nov 13', signups: 12, pro: 2 },
  { date: 'Nov 14', signups: 15, pro: 3 },
  { date: 'Nov 15', signups: 18, pro: 1 },
  { date: 'Nov 16', signups: 22, pro: 4 },
  { date: 'Nov 17', signups: 19, pro: 2 },
  { date: 'Nov 18', signups: 25, pro: 5 },
  { date: 'Nov 19', signups: 20, pro: 3 },
];

const categoryData = [
  { name: 'SaaS', value: 145 },
  { name: 'E-commerce', value: 87 },
  { name: 'Productivity', value: 62 },
  { name: 'Health', value: 34 },
  { name: 'Other', value: 14 },
];

const conversionFunnel = [
  { stage: 'Visitors', count: 5420 },
  { stage: 'Signups', count: 1247 },
  { stage: 'Active Users', count: 892 },
  { stage: 'Viewed Analysis', count: 234 },
  { stage: 'Pro Upgrades', count: 89 },
];

const COLORS = ['#0070f3', '#7c3aed', '#10b981', '#f59e0b', '#6b7280'];

export default function AnalyticsDashboard() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Detailed insights into user behavior and platform performance
        </p>
      </div>

      {/* Daily Signups Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Daily Signups & Pro Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySignups}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="signups" stroke="#0070f3" strokeWidth={2} name="Total Signups" />
              <Line type="monotone" dataKey="pro" stroke="#10b981" strokeWidth={2} name="Pro Upgrades" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Ideas by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="count" fill="#0070f3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Session Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8m 24s</div>
            <p className="text-xs text-green-600 mt-1">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ideas per User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2</div>
            <p className="text-xs text-green-600 mt-1">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Email Open Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42%</div>
            <p className="text-xs text-red-600 mt-1">-3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Referral Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18%</div>
            <p className="text-xs text-green-600 mt-1">+8% from last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
