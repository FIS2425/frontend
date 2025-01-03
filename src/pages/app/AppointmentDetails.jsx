import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAppointmentById } from '@/services/appointment';

export function AppointmentDetails() {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      setLoading(true);
      const data = await getAppointmentById(appointmentId);
      setAppointment(data);
      setLoading(false);
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!appointment) {
    return <div>No appointment found</div>;
  }

  return (
    <div>
      <h2>Appointment Details</h2>
      <p>Doctor: {appointment.doctor}</p>
      <p>Specialty: {appointment.specialty}</p>
    </div>
  );
}
