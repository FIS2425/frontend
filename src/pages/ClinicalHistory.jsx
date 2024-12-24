import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileIcon, ImageIcon, DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ClinicalHistory() {
  const [conditions] = useState([
    {
      name: 'Hypertension',
      details: 'High blood pressure',
      since: '01-01-2020'
    },
    {
      name: 'Diabetes',
      details: 'High blood sugar',
      since: '01-01-2020'
    }
  ]);

  const [treatments] = useState([
    {
      name: 'Insulin',
      startDate: '01-01-2020',
      endDate: '01-01-2021',
      instructions: 'Inject once a day'
    },
    {
      name: 'Metformin',
      startDate: '01-01-2020',
      endDate: '01-01-2021',
      instructions: 'Take with food'
    }
  ]);

  const [analytics] = useState([
    {
      name: 'analysis-172398379487.pdf',
      originalName: 'analysis.pdf',
      url: 'https://example.com',
      date: '01-01-2023'
    },
    {
      name: 'analysis2-172398379487.pdf',
      originalName: 'analysis2.pdf',
      url: 'https://example.com',
      date: '01-02-2023'
    },
  ]);
  
  const [images] = useState([
    {
      name: 'resonance-172398379487.fh7',
      originalName: 'resonance.fh7',
      url: 'https://example.com',
      date: '01-01-2023'
    },
    {
      name: 'xray-172398379487.png',
      originalName: 'xray.png',
      url: 'https://example.com',
      date: '01-02-2023'
    },
  ]);

  const [allergies] = useState(['Peanuts', 'Penicillin']);

  return (
    <div className="container mx-auto py-8 px-4 text-left">
    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patient Clinical History</h1>
        <Button variant="outline" className="px-4 py-2 text-base">
          <DownloadIcon className="mr-2 h-5 w-5" />
          Report
        </Button>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Conditions</CardTitle>
            <CardDescription>Current and past medical conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {conditions.map((condition, index) => (
                <li key={index} className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold text-lg">{condition.name}</h3>
                  <p className="text-sm text-muted-foreground">{condition.details}</p>
                  <p className="text-sm text-muted-foreground mt-2">Since: {condition.since}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Treatments</CardTitle>
            <CardDescription>Current and past treatments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Instructions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treatments.map((treatment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{treatment.name}</TableCell>
                      <TableCell>{treatment.startDate}</TableCell>
                      <TableCell>{treatment.endDate}</TableCell>
                      <TableCell>{treatment.instructions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Medical analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analytics.map((analysis, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileIcon className="h-5 w-5 text-blue-500" />
                    <span>{analysis.originalName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{analysis.date}</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={analysis.url} target="_blank" rel="noopener noreferrer">View</a>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Medical Images</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {images.map((image, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5 text-green-500" />
                    <span>{image.originalName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{image.date}</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={image.url} target="_blank" rel="noopener noreferrer">View</a>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allergies</CardTitle>
            <CardDescription>Known allergies and sensitivities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <Badge key={index} variant="secondary">{allergy}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}