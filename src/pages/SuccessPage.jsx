import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function ClinicaCompletada() {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/app'); // Redirige a la página principal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <CardTitle className="text-2xl font-bold text-center">
            Clínica Creada Correctamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            La clínica ha sido registrada con éxito en nuestro sistema.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleAccept}>Aceptar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
