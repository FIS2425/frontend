import { zodResolver } from '@hookform/resolvers/zod';
import { conditionSchema } from '@/forms/history/schemas';
import { useForm } from 'react-hook-form';
import { addCondition, deleteCondition, editCondition } from '@/services/history';

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