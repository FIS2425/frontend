import '@/styles/history.css';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileIcon, ImageIcon, DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHistoryByPatientId } from '@/services/history';
import { useParams } from 'react-router-dom';
import { CardDiv, CardActions, AddIcon, EditIcon, RemoveIcon } from '@/components/history';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ConditionForm } from '@/forms/history/forms';
import { useConditionForm, handleConditionSubmit, handleDeleteCondition, handleEditCondition } from '@/utils/historyUtils';

function Conditions({ conditions, historyId, updateHistoryPart }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useConditionForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const handleOpenDialog = (condition = null) => {
    
    if (condition) {
      setSelectedCondition(condition);
      form.reset({
        ...condition,
        since: condition.since ? new Date(condition.since).toISOString().split('T')[0] : '',
        until: condition.until ? new Date(condition.until).toISOString().split('T')[0] : '',
      });
      setIsEditing(true);
    } else {
      form.reset({
        name: '',
        details: '',
        since: 'dd/mm/aaaa',
        until: 'dd/mm/aaaa',
      }
      );
      setIsEditing(false);
      setSelectedCondition(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setSelectedCondition(null);
  };

  const onSubmit = (values) => {
    if (isEditing && selectedCondition) {
      handleEditCondition(historyId, selectedCondition._id, values, handleCloseDialog, updateHistoryPart, setIsLoading, setError);
    } else {
      handleConditionSubmit(historyId, values, handleCloseDialog, updateHistoryPart, setIsLoading, setError);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDiv>
          <CardTitle>Conditions</CardTitle>
          <CardActions>
            <AddIcon onClick={() => handleOpenDialog()} />
          </CardActions>
        </CardDiv>
        <CardDescription>Current and past medical conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {conditions.map((condition, index) => (
            <li key={index} className="bg-muted p-4 rounded-lg">
              <CardDiv>
                <h3 className="font-semibold text-lg">{condition.name}</h3>
                <CardActions>
                  <EditIcon onClick={() => handleOpenDialog(condition)} />
                  <RemoveIcon onClick={() => handleDeleteCondition(historyId, condition._id, updateHistoryPart, setError)} />
                </CardActions>
              </CardDiv>
              <p className="text-sm text-muted-foreground">{condition.details}</p>
              <p className="text-sm text-muted-foreground mt-2">Since: {new Date(condition.since).toLocaleDateString('en-CA')}</p>
              {condition.until && <p className="text-sm text-muted-foreground">Until: {new Date(condition.until).toLocaleDateString('en-CA')}</p>}
            </li>
          ))}
        </ul>
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Condition' : 'Add Condition'}</DialogTitle>
            <DialogClose onClick={handleCloseDialog} />
          </DialogHeader>
          <ConditionForm form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function Treatments({ treatments }) {
  return (
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
                  <TableCell>{new Date(treatment.startDate).toLocaleDateString('en-CA')}</TableCell>
                  <TableCell>{new Date(treatment.endDate).toLocaleDateString('en-CA')}</TableCell>
                  <TableCell>{treatment.instructions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function Analytics({ analytics }) {
  return (
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
                <FileIcon className="h-5 w-5" style={{ color: 'var(--doc-icon-color)' }}/>
                <span>{analysis.originalName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{new Date(analysis.date).toLocaleDateString('en-CA')}</span>
                <Button variant="outline" size="sm" asChild>
                  <a href={analysis.url} target="_blank" rel="noopener noreferrer">View</a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Images({ images }) {
  return (
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
                <ImageIcon className="h-5 w-5 min-w-[20px] min-h-[20px]" style={{ color: 'var(--img-icon-color)' }}/>
                <span>{image.originalName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{new Date(image.date).toLocaleDateString('en-CA')}</span>
                <Button variant="outline" size="sm" asChild>
                  <a href={image.url} target="_blank" rel="noopener noreferrer">View</a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Allergies({ allergies }) {
  return (
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
  );
}

export function ClinicalHistory() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [historyId, setHistoryId] = useState('');
  const [conditions, setConditions] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [images, setImages] = useState([]);
  const [allergies, setAllergies] = useState([]);

  const updateHistoryPart = (part, data) => {
    switch (part) {
    case 'conditions':
      setConditions(data);
      break;
    case 'treatments':
      setTreatments(data);
      break;
    case 'analytics':
      setAnalytics(data);
      break;
    case 'images':
      setImages(data);
      break;
    case 'allergies':
      setAllergies(data);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      getHistoryByPatientId(id)
        .then((response) => {
          const data = response.data;
          setHistoryId(data._id);
          setConditions(data.currentConditions);
          setTreatments(data.treatments);
          setAnalytics(data.analytics);
          setImages(data.images);
          setAllergies(data.allergies);
        })
        .catch((err) => {
          setError('An error occurred. Please try again later.');
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchHistory();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
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
        <Conditions conditions={conditions} historyId={historyId} updateHistoryPart={updateHistoryPart}/>
        <Treatments treatments={treatments} />
        <Analytics analytics={analytics} />
        <Images images={images} />
        <Allergies allergies={allergies} />
      </div>
    </div>
  );
}