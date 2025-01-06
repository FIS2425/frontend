import { zodResolver } from '@hookform/resolvers/zod';
import { conditionSchema, treatmentSchema } from '@/forms/history/schemas';
import { useForm } from 'react-hook-form';
import { addCondition, deleteCondition, editCondition, addTreatment, editTreatment,
  deleteTreatment, uploadAnalytic, addAllergy, deleteAllergy
} from '@/services/history';

export const useConditionForm = () => {
  return useForm({
    resolver: zodResolver(conditionSchema),
    defaultValues: {
      name: '',
      details: '',
      since: 'dd/mm/aaaa',
      until: 'dd/mm/aaaa',
    },
  });
};

export const handleConditionSubmit = async (historyId, values, handleCloseDialog, updateHistoryPart, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    const response = await addCondition(historyId, values);
    if (response.status === 200) {
      handleCloseDialog();
      updateHistoryPart('conditions', response.data.currentConditions);
    }
  } catch (err) {
    setError('An error occurred. Please try again later.');
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

export const handleEditCondition = (historyId, conditionId, values, handleCloseDialog, updateHistoryPart, setIsLoading, setError) => {
  setIsLoading(true);
  editCondition(historyId, conditionId, values)
    .then((response) => {
      handleCloseDialog();
      updateHistoryPart('conditions', response.data.currentConditions);
    })
    .catch((err) => {
      setError('An error occurred. Please try again later.');
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const handleDeleteCondition = async (historyId, conditionId, updateHistoryPart, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    const response = await deleteCondition(historyId, conditionId);
    if (response.status === 200) {
      updateHistoryPart('conditions', response.data.currentConditions);
    }
  } catch (err) {
    setError('An error occurred. Please try again later.');
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

export const useTreatmentForm = () => {
  return useForm({
    resolver: zodResolver(treatmentSchema),
    defaultValues: {
      name: '',
      instructions: '',
      startDate: 'dd/mm/aaaa',
      endDate: 'dd/mm/aaaa',
    },
  });
};

export const handleTreatmentSubmit = async (historyId, values, handleCloseDialog, updateHistoryPart, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    const response = await addTreatment(historyId, values);
    if (response.status === 200) {
      handleCloseDialog();
      updateHistoryPart('treatments', response.data.treatments);
    }
  } catch (err) {
    setError('An error occurred. Please try again later.');
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

export const handleEditTreatment = (historyId, treatmentId, values, handleCloseDialog, updateHistoryPart, setIsLoading, setError) => {
  setIsLoading(true);
  editTreatment(historyId, treatmentId, values)
    .then((response) => {
      handleCloseDialog();
      updateHistoryPart('treatments', response.data.treatments);
    })
    .catch((err) => {
      setError('An error occurred. Please try again later.');
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const handleDeleteTreatment = async (historyId, treatmentId, updateHistoryPart, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    const response = await deleteTreatment(historyId, treatmentId);
    if (response.status === 200) {
      updateHistoryPart('treatments', response.data.treatments);
    }
  } catch (err) {
    setError('An error occurred. Please try again later.');
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

export const handleUploadAnalytic = async (historyId, formData, updateHistoryPart, setIsLoading, setError) => {
  uploadAnalytic(historyId, formData)
    .then((response) => {
      updateHistoryPart('analytics', response.data.analytics);
    })
    .catch((err) => {
      setError('An error occurred. Please try again later.');
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const handleAddAllergy = async (historyId, values, handleCloseDialog, updateHistoryPart, setIsLoading, setError) => {
  addAllergy(historyId, values)
    .then((response) => {
      handleCloseDialog();
      updateHistoryPart('allergies', response.data.allergies);
      
    })
    .catch((err) => {
      setError('An error occurred. Please try again later.');
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const handleDeleteAllergy = async (historyId, allergyName, updateHistoryPart, setIsLoading, setError) => {
  deleteAllergy(historyId, allergyName)
    .then((response) => {
      updateHistoryPart('allergies', response.data.allergies);
    })
    .catch((err) => {
      setError('An error occurred. Please try again later.');
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
