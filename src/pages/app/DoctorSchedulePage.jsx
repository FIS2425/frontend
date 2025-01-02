'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/calendar';
import { ScheduleModal } from '@/components/schedule-modal';
import { startOfWeek } from 'date-fns';
import { DatePickerWithPresets } from '@/components/ui/date-picker-with-presets';
import { workshifts } from '@/services/workshift';
import { transformDatesToSchedule } from '@/utils/utils';

const workshiftsList = await workshifts();

const initialSchedules =  workshiftsList.map(({ startDate, endDate }) => transformDatesToSchedule(startDate, endDate));

export function DoctorSchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [schedules, setSchedules] = useState(initialSchedules);

  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleDateSelect = (date, hour) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setSelectedSchedule(null);
    openModal();
  };

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setSelectedDate(schedule.date);
    setSelectedHour(parseInt(schedule.startTime.split(':')[0]));
    openModal();
  };

  const handleSaveSchedule = (newSchedule) => {
    setSchedules(prevSchedules => {
      if (selectedSchedule) {
        // Update existing schedule
        return prevSchedules.map(schedule => 
          (schedule === selectedSchedule) ? newSchedule : schedule
        );
      } else {
        // Add new schedule
        return [...prevSchedules, newSchedule];
      }
    });
    closeModal();
  };

  const handleWeekChange = (newDate) => {
    setCurrentWeek(startOfWeek(newDate, { weekStartsOn: 1 }));
  };

  return (
    <div className="flex min-h-dvh max-h-dvh flex-col p-8 h-full w-full">
      <div className="w-full flex p-4 justify-center gap-8">
        <DatePickerWithPresets date={currentWeek} setDate={handleWeekChange} />
        <Button onClick={openModal}>Add Schedule</Button>
      </div>
      <Calendar 
        onDateSelect={handleDateSelect} 
        onScheduleSelect={handleScheduleSelect}
        schedules={schedules} 
        currentWeek={currentWeek}
        onWeekChange={setCurrentWeek}
      />
      {(selectedDate && selectedHour !== null) || selectedSchedule ? (
        <ScheduleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedDate={selectedSchedule?.date || selectedDate}
          selectedHour={selectedSchedule ? parseInt(selectedSchedule.startTime.split(':')[0]) : selectedHour}
          onSave={handleSaveSchedule}
          existingSchedule={selectedSchedule}
        />
      ) : null}
    </div>
  );
}
