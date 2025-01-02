export const specialties = ['family_medicine', 'nursing', 'physiotherapy', 'gynecology', 'pediatrics', 
  'dermatology', 'cardiology', 'neurology', 'orthopedics', 'psychiatry', 'endocrinology', 
  'oncology', 'radiology', 'surgery', 'ophthalmology', 'urology', 
  'anesthesiology', 'otolaryngology', 'gastroenterology', 'other'];

const specialtiesWithLabelsNoDefault = specialties.map(specialty => ({
  label: specialty.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
  value: specialty
}));

export const specialtiesWithLabels = [{ label: 'Select specialty', value: '' }, ...specialtiesWithLabelsNoDefault];

export function transformDatesToSchedule(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatTime = (date) => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return {
    date: startDate,
    startTime: formatTime(start),
    endTime: formatTime(end)
  };
}

export function calculateDuration(startTime, endTime) {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  return endTotalMinutes - startTotalMinutes;
}