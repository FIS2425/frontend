import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PatientEdit from '@/forms/patient/formsEdit';
import PasswordChange from '@/components/forms/password-change';
import { Enable2FA } from '@/components/enable-2fa';
import { getPatientById, updatePatient } from '@/services/patient';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

function PatientEditPage({ initialPatient = {} }) {
  const { id } = useParams();
  const [patient, setPatient] = useState(initialPatient);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const initialPatientRef = useRef(null);
  const { userData } = useAuth();
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await getPatientById(userData.patientid);
        const data = response.data;
        if (data.birthdate) {
          data.birthdate = format(new Date(data.birthdate), 'yyyy-MM-dd');
        }
        setPatient(data);
        initialPatientRef.current = data;
      } catch (error) {
        console.error('Error al obtener el paciente:', error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const validateDNI = (dni) => {
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    if (!dniRegex.test(dni)) {
      return false;
    }
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const number = dni.slice(0, 8);
    const letter = dni.slice(8, 9);
    return letters[parseInt(number) % 23] === letter;
  };

  const validateForm = () => {
    let newErrors = {};
    if (!patient.name) newErrors.name = 'El nombre es requerido';
    if (!patient.surname) newErrors.surname = 'El apellido es requerido';
    if (!patient.birthdate) newErrors.birthdate = 'La fecha de nacimiento es requerida';
    if (!patient.dni) newErrors.dni = 'El DNI es requerido';
    else if (!validateDNI(patient.dni)) newErrors.dni = 'El DNI no es válido';
    if (!patient.city) newErrors.city = 'La ciudad es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(patient);
    if (validateForm()) {
      updatePatient(id, patient)
        .then(() => {
          console.log('Paciente actualizado con éxito');
        })
        .catch((error) => {
          console.error('Error al actualizar el paciente:', error);
        });
      setIsEditing(false);
    } else {
      console.log('Formulario inválido');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setPatient(initialPatientRef.current);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <Card className="w-full max-w-md lg:min-w-[600px] rounded-lg shadow-sm">
      <CardHeader className="items-start">
        <CardTitle>Edit Patient</CardTitle>
        <CardDescription>Edit patient</CardDescription>
      </CardHeader>
      <CardContent>
        <PatientEdit
          patient={patient}
          isEditing={isEditing}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={errors}
        />
      </CardContent>
      <CardFooter className="flex flex-wrap gap-4 p-4 [&>*]:grow fit-content">
        <PasswordChange />
        <Enable2FA />
      </CardFooter>
    </Card>
  );
}

export default PatientEditPage;
