'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function ScheduleModal({ isOpen, onClose, selectedDate, selectedHour, onSave, existingSchedule }) {
  const [startTime, setStartTime] = useState(existingSchedule?.startTime || `${selectedHour.toString().padStart(2, '0')}:00`);
  const [endTime, setEndTime] = useState(existingSchedule?.endTime || `${(selectedHour + 2).toString().padStart(2, '0')}:00`);

  useEffect(() => {
    if (existingSchedule) {
      setStartTime(existingSchedule.startTime);
      setEndTime(existingSchedule.endTime);
    } else {
      setStartTime(`${selectedHour.toString().padStart(2, '0')}:00`);
      setEndTime(`${(selectedHour + 2).toString().padStart(2, '0')}:00`);
    }
  }, [existingSchedule, selectedHour]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date: selectedDate, startTime, endTime });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>
              {existingSchedule ? 'Edit Schedule' : 'Create New Schedule'}
            </DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Selected Date and Time</Label>
            <Input
              id="date"
              value={`${format(selectedDate, 'dd/MM/yyyy', { locale: es })} - ${selectedHour}:00`}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <Button type="submit">
            {existingSchedule ? 'Update Schedule' : 'Save Schedule'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
