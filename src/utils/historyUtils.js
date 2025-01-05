import { zodResolver } from '@hookform/resolvers/zod';
import { conditionSchema } from '@/forms/history/schemas';
import { useForm } from 'react-hook-form';
import { addCondition } from '../../services/history';

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
    if (err.response && err.response.status === 400) {
      setError('An error occurred. Please try again later.');
    } else {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  } finally {
    setIsLoading(false);
  }
};