import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/mode-toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';

export function Landing() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-around">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card flex flex-col justify-center items-center gap-y-3">
        <Link to="/app">
          <Button>
            Go to App
          </Button>
        </Link>
        <ModeToggle />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Línea azul separadora */}
      <div className="w-full my-8 border-t-2 border-blue-500"></div>

      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-8`}>
        <Card className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">Basic Plan</CardTitle>
            <CardDescription className="text-lg mb-4">$10/month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-4">
              <li>1 Clinic</li>
              <li>2 Doctors</li>
              <li>350 Patients</li>
              <li>PDF (20MB max)</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center mt-auto">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Subscribe</Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">Advanced Plan</CardTitle>
            <CardDescription className="text-lg mb-4">$50/month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-4">
              <li>3 Clinics</li>
              <li>15 Doctors/Clinic</li>
              <li>1000 Patients/Clinic</li>
              <li>CSV, XML, JSON</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center mt-auto">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Subscribe</Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">Professional Plan</CardTitle>
            <CardDescription className="text-lg mb-4">$100/month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-4">
              <li>6 Clinics</li>
              <li>35 Doctors/Clinic</li>
              <li>5000 Patients/Clinic</li>
              <li>DICOM, HL7, FHIR</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center mt-auto">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Subscribe</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}