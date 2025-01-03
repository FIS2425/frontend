import { useState, useEffect } from 'react';
import { parseISO, isAfter, isBefore, isEqual } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import FutureAppointments from '@/components/future-appointments';
import PastAppointments from '@/components/past-appointments';
import { getAppointmentsByPatiendId } from '../../services/appointment';

export function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const patientId = 'f8b8d3e7-4bb7-4d1b-99a4-e3a8f0452f63'; // todo: get patient id from auth context
    const { data } = await getAppointmentsByPatiendId(patientId);
    setAppointments(data);
    setLoading(false);
  };

  const futureAppointments = appointments.filter(appointment =>
    isAfter(parseISO(appointment.appointmentDate), new Date())
  );

  const pastAppointments = appointments.filter(appointment =>
    !isAfter(parseISO(appointment.appointmentDate), new Date())
  );

  const filteredPastAppointments = pastAppointments.filter(appointment => {
    const appointmentDate = parseISO(appointment.appointmentDate);
    return (
      (selectedSpecialty === 'all' || appointment.specialty === selectedSpecialty) &&
      (selectedStatus === 'all' || appointment.status === selectedStatus) &&
      (!startDate || isAfter(appointmentDate, startDate) || isEqual(appointmentDate, startDate)) &&
      (!endDate || isBefore(appointmentDate, endDate) || isEqual(appointmentDate, endDate))
    );
  });

  const specialties = [
    'family_medicine',
    'nursing',
    'physiotherapy',
    'gynecology',
    'pediatrics',
    'dermatology',
    'cardiology',
    'neurology',
    'orthopedics',
    'psychiatry',
    'endocrinology',
    'oncology',
    'radiology',
    'surgery',
    'ophthalmology',
    'urology',
    'anesthesiology',
    'otolaryngology',
    'gastroenterology',
    'other'
  ];
  const statuses = ['pending', 'cancelled', 'completed', 'no-show'];

  return (
    <div className="flex min-h-dvh max-h-dvh flex-col p-8 h-full w-full">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      <Tabs defaultValue="future" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="future">Future Appointments</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="future">
          <FutureAppointments appointments={futureAppointments} loading={loading} />
        </TabsContent>
        <TabsContent value="past">
          <div className="mb-4 flex flex-wrap gap-4">
            <Select onValueChange={setSelectedSpecialty} value={selectedSpecialty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedStatus} value={selectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <DatePicker
                selected={startDate}
                onSelect={setStartDate}
                placeholderText="Start Date"
              />
              <span>to</span>
              <DatePicker
                selected={endDate}
                onSelect={setEndDate}
                placeholderText="End Date"
              />
            </div>
            <Button
              onClick={() => {
                setStartDate(undefined);
                setEndDate(undefined);
              }}
              variant="outline"
            >
              Clear Dates
            </Button>
          </div>
          <PastAppointments
            appointments={filteredPastAppointments}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
