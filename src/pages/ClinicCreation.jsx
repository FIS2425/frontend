import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlansCreatedClinic } from './PlansCreatedClinic';
import { registerClinic } from '@/services/payments';
import { registerPayment } from '@/services/payments';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export function ClinicCreation() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    district: '',
    plan: '',
    active: false,
    postalCode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectPlan = (planId) => {
    setFormData((prevData) => ({
      ...prevData,
      plan: planId,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.district.trim()) newErrors.district = 'El distrito es requerido';
    if (!formData.plan) newErrors.plan = 'Debe seleccionar un plan';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'El código postal es requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let id = await registerClinic(formData);
        let urlStripe = await registerPayment({
          planId: formData.plan,
          clinicId: id,
        });
        window.location.href = urlStripe;
      } catch (error) {
        console.error('Error al registrar la clínica:', error);
        setErrors({ submit: 'Error al registrar la clínica. Inténtelo de nuevo más tarde.'});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      {/* Columna 1: Campos del Formulario */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Información de la Clínica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleChange} />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

            <Label htmlFor="district">Distrito</Label>
            <Input id="district" name="district" value={formData.district} onChange={handleChange} />
            {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}

            <Label htmlFor="postalCode">Código Postal</Label>
            <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Registrar</Button>
        </CardFooter>
      </Card>

      {/* Columna 2: Planes */}
      <Card className="w-full">
        <CardContent>
          <PlansCreatedClinic onSelectPlan={handleSelectPlan} selectedPlan={formData.plan} />
          {errors.plan && <p className="text-red-500 text-sm text-center">{errors.plan}</p>}
        </CardContent>
      </Card>
    </form>
  );
}
