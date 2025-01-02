import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import logo from '@/assets/cloudmedix.png';
import {useState} from 'react';

export function Landing() {
  const [setSelectedPlan] = useState(null);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const isMobile = useIsMobile();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSelectAddOn = (addonName) => {
    setSelectedAddOn((prevSelectedAddOn) => (prevSelectedAddOn === addonName ? null : addonName));
  };

  const plans = [
    {
      plan: 'Basic',
      clinics: 1,
      doctors: 2,
      patients: 350,
      format: 'PDF (20MB max)',
      fileSizes: '20MB max',
      price: '€0.0/month per user',
      addons: [
        {
          name: '+Doctors and +Patients',
          description: 'Add-On to buy more doctors and patients',
          availableFor: 'BASIC',
          price: '€9.99 / user per month',
          features: {
            doctorsPerClinic: true,
            patientsPerClinic: true,
          },
          usageLimits: {
            maxDoctorsPerClinic: '+1 doctor',
            maxPatientsPerClinic: '+100 patients',
          },
        },
      ],
    },
    {
      plan: 'Advanced',
      clinics: 3,
      doctors: 15,
      patients: 1000,
      format: 'PDF, CSV, XML, JSON',
      fileSizes: '1GB max',
      price: '€5.0/month per user',
      addons: [],
    },
    {
      plan: 'Professional',
      clinics: 6,
      doctors: 35,
      patients: 5000,
      format: 'PDF, CSV, XML, JSON, DICOM, HL7, FHIR',
      fileSizes: '10GB max',
      price: '€10.0/month per user',
      addons: [
        {
          name: 'Reminder Service',
          description: 'Add-On to enable patient appointment reminders',
          availableFor: 'PROFESSIONAL',
          price: '€29.99 / user per month',
        },
      ],
    },
    {
      plan: 'Enterprise',
      clinics: 'Unlimited',
      doctors: 'Unlimited',
      patients: 'Unlimited',
      format: 'All formats',
      price: 'Contact us',
      addons: [],
    },
  ];

  return (
    <div className="flex flex-col items-center mb-16">
      <div className="flex justify-around">
        <a href="https://github.com/FIS2425" target="_blank">
          <img src={logo} className="logohome" alt="CloudMedix logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-4">CloudMedix</h1>
      <div className="card flex flex-col justify-center items-center gap-y-3">
        <Link to="/app">
          <Button>
            Go to App
          </Button>
        </Link>
        <p>
          CloudMedix is a cloud-native, microservices-based platform designed to clinic management. With CloudMedix, healthcare providers can efficiently handle patient appointments, manage multiple medical specialties, and maintain detailed patient histories. The platform offers real-time scheduling, secure access to clinical data, and seamless communication between doctors, patients, and clinic staff.
        </p>
      </div>
      <div className="w-full my-8 border-t-2 border-blue-500"></div>
      <h1 className="text-3xl font-bold mb-6">Pricing</h1>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-4'} gap-7`}>
        {plans.map((plan) => (
          <Card key={plan.plan} className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-65">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">{plan.plan} Plan</CardTitle>
              <CardDescription className="text-lg mb-4">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-8">
                <li>{plan.clinics} Clinics</li>
                <li>{plan.doctors} Doctors/Clinic</li>
                <li>{plan.patients} Patients/Clinic</li>
                <li>Format: {plan.format}</li>
                <li>Max File Size: {plan.fileSizes}</li>
              </ul>
              {plan.addons.length > 0 && (
                <div className="text-sm">
                  <h3 className="text-xl font-bold mb-2">Add-Ons</h3>
                  {plan.addons.map((addon) => (
                    <div key={addon.name} className="mb-4">
                      <input
                        type="radio"
                        name="addon"
                        checked={selectedAddOn === addon.name}
                        onClick={() => handleSelectAddOn(addon.name)}
                        className="form-radio h-4 w-4 text-blue-600 mr-2"
                      />
                      <span className="font-semibold">{addon.name}</span>
                      <p>{addon.description}</p>
                      <p>Precio: {addon.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center items-center mt-auto">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => handleSelectPlan(plan.plan)}>
                Subscribe
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}