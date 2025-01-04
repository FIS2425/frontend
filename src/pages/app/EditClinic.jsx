import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Edit, Save, X } from 'lucide-react';
import { getClinicById } from '@/services/payments';
import { updateClinic } from '@/services/payments';
import { getDoctorsBySpeciality } from '@/services/staff';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

export function ClinicaEdicion({ clinicaInicial = {} }) {
  const { id } = useParams();
  const [clinica, setClinica] = useState(clinicaInicial);
  const [editando, setEditando] = useState(false);
  const [errors, setErrors] = useState({});
  const clinicaInicialRef = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClinica(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    setLoading(true);
    const fetchClinic = async () => {
      try {
        const response = await getClinicById(id);
        const data = response.data;
        setClinica(data);
        clinicaInicialRef.current = data;
      } catch (error) {
        console.error('Error al obtener datos de la clinicas:', error);
      }
    };
    fetchClinic();

    const fetchDoctors = async () => {
      try {
        const clinicId = id;
        const doctorsfetched = await getDoctorsBySpeciality({clinicId});
        setDoctors(doctorsfetched.data);
      } catch (error) {
        setLoading(false);
        console.error('Error al obtener datos de los doctores:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [id]);

  const validateForm = () => {
    let newErrors = {};
    if (!clinica.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!clinica.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!clinica.district.trim()) newErrors.district = 'El distrito es requerido';
    if (!clinica.postalCode.trim()) newErrors.postalCode = 'El código postal es requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateClinic(id, clinica)
        .then(() => {
          console.log('Paciente actualizado con éxito');
        })
        .catch((error) => {
          console.error('Error al actualizar el paciente:', error);
        });
      setEditando(false);
    }
  };

  const handleCancel = () => {
    setClinica(clinicaInicialRef.current);
    setEditando(false);
    setErrors({});
  };

  const handleUpdatePlan = () => {
    console.log('Actualizar plan');
  };

  const handleCardClick = (doctorId) => {
    navigate(`/app/staff/${doctorId}`);
  };

  if (loading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <Card className="w-full max-w-2xl mx-auto h-fit">
        <CardHeader>
          <CardTitle>Información de la Clínica</CardTitle>
          <CardDescription>Visualiza y edita los detalles de tu clínica</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              {editando ? (
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={clinica.name}
                  onChange={handleChange}
                  className={errors.name ? 'border-red-500' : ''}
                />
              ) : (
                <p className="mt-1">{clinica.name}</p>
              )}
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="city">Ciudad</Label>
              {editando ? (
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={clinica.city}
                  onChange={handleChange}
                  className={errors.city ? 'border-red-500' : ''}
                />
              ) : (
                <p className="mt-1">{clinica.city}</p>
              )}
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label htmlFor="district">Distrito</Label>
              {editando ? (
                <Input
                  type="text"
                  id="district"
                  name="district"
                  value={clinica.district}
                  onChange={handleChange}
                  className={errors.district ? 'border-red-500' : ''}
                />
              ) : (
                <p className="mt-1">{clinica.district}</p>
              )}
              {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
            </div>

            <div>
              <Label htmlFor="plan">Plan</Label>
              <p className="mt-1">{clinica.plan}</p>
            </div>

            <div>
              <Label htmlFor="postalCode">Código Postal</Label>
              {editando ? (
                <Input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={clinica.postalCode}
                  onChange={handleChange}
                  className={errors.postalCode ? 'border-red-500' : ''}
                />
              ) : (
                <p className="mt-1">{clinica.postalCode}</p>
              )}
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>

            <div>
              <Label htmlFor="countryCode">Código de País</Label>
              <p className="mt-1">{clinica.countryCode}</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          {editando ? (
            <>
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancelar
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" /> Guardar
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4">
                <Button type="button" variant="outline" onClick={() => setEditando(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Button>
                <Button type="button" onClick={handleUpdatePlan}>
                  <Edit className="mr-2 h-4 w-4" /> Actualizar plan
                </Button>
              </div>
            </>
          )}
        </CardFooter>
      </Card>

      <div className="flex justify-center mt-8">
        <Card className="w-full max-w-md mt-4">
          <CardHeader>
            <CardTitle>Doctors List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 w-full">
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <Card
                    key={doctor._id}
                    className="carddoctor w-full cursor-pointer"
                    onClick={() => handleCardClick(doctor._id)}
                  >
                    <CardHeader>
                      <CardTitle>
                        {doctor.name} {doctor.surname}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Specialty: {doctor.specialty}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No doctors available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
