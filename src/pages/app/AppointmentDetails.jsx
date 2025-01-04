import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sun, Cloud, CloudRain, User, MapPin, Phone, Mail, Calendar, Clock } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/use-auth';

const mockAppointment = {
  id: '123456',
  patientId: 'P12345',
  patientName: 'John Doe',
  patientEmail: 'john.doe@example.com',
  patientPhone: '+1 (555) 123-4567',
  clinicId: 'C789',
  clinicName: 'City Health Clinic',
  clinicAddress: '123 Main St, Anytown, AN 12345',
  doctorId: 'D456',
  doctorName: 'Dr. Jane Smith',
  specialty: 'Cardiology',
  appointmentDate: '2025-01-15T10:30:00Z',
  status: 'scheduled',
  createdAt: '2025-01-01T09:00:00Z',
};

export function AppointmentDetails({ appointmentId }) {
  const [appointment, setAppointment] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const { userData } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setAppointment(mockAppointment);
      fetchWeather();
      setLoading(false);
    }, 1000);
    setUserRole(userData?.roles);
  }, [appointmentId]);

  const fetchWeather = async () => {
    try {
      // Replace with your actual API key and endpoint
      setWeather({
        main: 'clear',
        description: 'Light rain',
        temp: '10',
      });
    } catch (err) {
      console.error('Error fetching weather:', err);
    }
  };

  const handleAction = (action) => {
    // Implement action logic here
    console.log(`Appointment ${action}d`);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Spinner className="mb-4" />
        <div className="text-center text-gray-500">
          Loading appointment, please wait...
        </div>
      </div>
    );
  }

  if (!appointment) {
    return <div className="text-red-500">Error loading appointment details.</div>;
  }

  const WeatherIcon = () => {
    if (!weather) return null;
    switch (weather.main.toLowerCase()) {
    case 'clear':
      return <Sun className="w-6 h-6 text-yellow-400" />;
    case 'clouds':
      return <Cloud className="w-6 h-6 text-gray-400" />;
    case 'rain':
      return <CloudRain className="w-6 h-6 text-blue-400" />;
    default:
      return null;
    }
  };

  return (
    <div className="flex flex-col h-dvh max-h-dvh w-9/12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
        <div className='p-2'>
          <h2 className="text-2xl font-bold">{appointment.specialty} Appointment</h2>
          <p className="text-gray-500">Appointment ID: {appointment.id}</p>
        </div>
        <Badge variant={appointment.status === 'scheduled' ? 'default' : 'secondary'} className="text-lg self-center">
          {appointment.status}
        </Badge>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div>
          <h3 className="text-xl font-semibold mb-4">Appointment Details</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{format(new Date(appointment.appointmentDate), 'PPPP')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{format(new Date(appointment.appointmentDate), 'p')}</span>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>Dr. {appointment.doctorName}</span>
            </div>
            {weather && (
              <div className="flex items-center">
                <WeatherIcon />
                <span className="ml-2">{weather.description}, {weather.temp}°C</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Clinic Information</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 mt-1" />
              <span>{appointment.clinicName}<br />{appointment.clinicAddress}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+1 (555) 987-6543</span>
            </div>
          </div>
        </div>
      </div>

      {userRole === 'doctor' && (
        <>
          <Separator />
          <div className='p-4'>
            <h3 className="text-xl font-semibold mb-4">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{appointment.patientName}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>{appointment.patientEmail}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>{appointment.patientPhone}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {userRole === 'doctor' && (
        <div className="flex justify-end space-x-4">
          <Button onClick={() => handleAction('complete')}>Complete</Button>
          <Button variant="outline" onClick={() => handleAction('cancel')}>Cancel</Button>
          <Button variant="destructive" onClick={() => handleAction('no-show')}>No Show</Button>
        </div>
      )}
    </div>
  );
}
