export const specialties = ['family_medicine', 'nursing', 'physiotherapy', 'gynecology', 'pediatrics', 
  'dermatology', 'cardiology', 'neurology', 'orthopedics', 'psychiatry', 'endocrinology', 
  'oncology', 'radiology', 'surgery', 'ophthalmology', 'urology', 
  'anesthesiology', 'otolaryngology', 'gastroenterology', 'other'];

const specialtiesWithLabelsNoDefault = specialties.map(specialty => ({
  label: specialty.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
  value: specialty
}));

export const specialtiesWithLabels = [{ label: 'Select specialty', value: '' }, ...specialtiesWithLabelsNoDefault];