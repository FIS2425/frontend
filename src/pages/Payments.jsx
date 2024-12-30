'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw } from 'lucide-react';

export function Payments() {
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Current Plan</CardTitle>
            </div>
            <Button>
              <RefreshCw className="w-full"  /> Update Plan
            </Button>

          </CardHeader>
          <CardContent>
            <div className="space-y-4">

              <div className="flex justify-between">
                
                <span className="font-semibold">Plan:</span>
                <span>Professional</span>
              </div>
              <div className="text-left">
                <span className="font-semibold">Characteristics:</span>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Up to 50 patients</li>
                  <li>Advanced appointment scheduling</li>
                  <li>Electronic health records</li>
                  <li>Billing management</li>
                  <li>Prescription management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your recent payments and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-04-15</TableCell>
                  <TableCell>Professional</TableCell>
                  <TableCell>$200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-03-15</TableCell>
                  <TableCell>Enterprise</TableCell>
                  <TableCell>$500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-02-15</TableCell>
                  <TableCell>Basic</TableCell>
                  <TableCell>$100.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

