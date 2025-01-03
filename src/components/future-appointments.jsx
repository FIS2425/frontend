import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, ClockIcon, UserIcon, HospitalIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export default function FutureAppointments({ appointments, loading }) {
  if (loading) {
    return (
      <Spinner>
        <div className="text-center text-gray-500">
          Loading appointments, please wait...
        </div>
      </Spinner>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No appointments found 😕.
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle>{appointment.specialty.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{format(parseISO(appointment.appointmentDate), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center mb-2">
                <ClockIcon className="mr-2 h-4 w-4" />
                <span>{format(parseISO(appointment.appointmentDate), 'h:mm a')}</span>
              </div>
              <div className="flex items-center mb-2">
                <UserIcon className="mr-2 h-4 w-4" />
                <span className="truncate" title={appointment.doctorId}>
                  Doctor: {appointment.doctorId}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <HospitalIcon className="mr-2 h-4 w-4" />
                <span className="truncate" title={appointment.clinicId}>
                  Clinic: {appointment.clinicId}
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold">
                Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
