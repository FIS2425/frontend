import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getDoctorData, getCurrentDoctorData, updateSpecialty, deleteDoctor } from '@/services/staff';

export function Staff({ isCurrentUser }) {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const data = isCurrentUser ? await getCurrentDoctorData() : await getDoctorData(doctorId);
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctorData();
  }, [doctorId, isCurrentUser]);

  const handleUpdateSpecialty = async () => {
    try {
      await updateSpecialty(doctorId || doctor.id);
    } catch (error) {
      console.error('Error updating specialty:', error);
    }
  };

  const handleDeleteDoctor = async () => {
    try {
      await deleteDoctor(doctorId || doctor.id);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">Doctor Details</h1>
      {doctor && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <p className="text-lg"><strong>Name:</strong> {doctor.name}</p>
          <p className="text-lg"><strong>Surname:</strong> {doctor.surname}</p>
          <p className="text-lg"><strong>Specialty:</strong> {doctor.specialty}</p>
          <p className="text-lg"><strong>DNI:</strong> {doctor.dni}</p>
          <p className="text-lg"><strong>Clinic ID:</strong> {doctor.clinicId}</p>
          <p className="text-lg"><strong>Active:</strong> {doctor.active ? 'Yes' : 'No'}</p>
          <p className="text-lg"><strong>User ID:</strong> {doctor.userId}</p>
        </div>
      )}
      {doctor && doctor.role === 'clinicadmin' && (
        <div className="flex gap-4 mt-4">
          <Button onClick={handleUpdateSpecialty} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Specialty</Button>
          <Button onClick={handleDeleteDoctor} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete Doctor</Button>
        </div>
      )}
    </div>
  );
}