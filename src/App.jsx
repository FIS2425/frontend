import '@/styles/App.css';
import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Landing } from '@/pages/Landing';
import { About } from '@/pages/About';
import { Home } from '@/pages/app/Home';
import { Login } from '@/pages/Login';
import { Logout } from '@/pages/Logout';
import { Verify2FA } from '@/pages/Verify2FA';
import { DoctorSchedulePage } from '@/pages/app/DoctorSchedulePage';
import PatientEditPage from '@/pages/app/PatientEdit';
import { Plans } from '@/pages/Plans';
import { SuccessPayment } from '@/pages/SuccessPayment';
import { Appointments } from '@/pages/app/Appointments';
import { AppointmentDetails } from '@/pages/app/AppointmentDetails';
import { ClinicalHistory } from '@/pages/app/ClinicalHistory';
import { Staff } from '@/pages/app/Staff';
import MainLayout from '@/layouts/MainLayout';
import AppLayout from '@/layouts/AppLayout';
import { RegisterStaff } from '@/pages/app/RegisterStaff';
import { SearchStaff } from '@/pages/app/SearchStaff';
import { AuthProvider, ProtectedRoute } from '@/components/auth-provider';
import { ClinicCreation } from '@/pages/app/ClinicCreation';
import { ClinicaEdicion } from '@/pages/app/EditClinic';
import { ClinicaCompletada } from '@/pages/app/SuccessPage';
import { RegisterPatient } from '@/pages/app/RegisterPatient';
import {PacienteRegistrado} from '@/pages/app/SuccessPagePatient';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider storageKey="vite-ui-theme">
        <Router>
          <Routes>
            {/* Doing nested routes allows to avoid re-rendering re-used components */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Landing />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="/app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Home />} />
              <Route path="staff/:doctorId" element={<Staff />} />
              <Route path="staff/me" element={
                <ProtectedRoute allowedRoles={['admin', 'clinicadmin', 'doctor']}>
                  <Staff me={true} />
                </ProtectedRoute>
              } />
              <Route path="register-staff" element={
                <ProtectedRoute allowedRoles={['admin', 'clinicadmin']}>
                  <RegisterStaff />
                </ProtectedRoute>
              } />

              <Route path="calendar" element={
                <ProtectedRoute allowedRoles={['clinicadmin', 'doctor']}>
                  <DoctorSchedulePage />
                </ProtectedRoute>
              } />

              <Route path="appointments" element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <Appointments />
                </ProtectedRoute>
              } />
              <Route path="appointments/:appointmentId" element={<AppointmentDetails />} />

              <Route path="history/:id" element={<ClinicalHistory />} />  
              <Route path="search-staff" element={
                <ProtectedRoute allowedRoles={['admin', 'clinicadmin', 'doctor']}>
                  <SearchStaff />
                </ProtectedRoute>
              } />

              <Route
                path="clinics/add"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'clinicadmin']}>
                    <ClinicCreation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="clinics/edit"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'clinicadmin']}>
                    <ClinicaEdicion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="clinics/success"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'clinicadmin']}>
                    <ClinicaCompletada />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="patients/edit" element={
                  <ProtectedRoute allowedRoles={['admin', 'clinicadmin','patient']}>
                    <PatientEditPage />
                  </ProtectedRoute>} />
              <Route path="patients/register-patient" element={
                <ProtectedRoute allowedRoles={['admin', 'clinicadmin', 'doctor']}>
                  <RegisterPatient />
                </ProtectedRoute>
              } 
              />
              <Route
                path="patients/success"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'clinicadmin','doctor']}>
                    <PacienteRegistrado />
                  </ProtectedRoute>
                }
              />
              <Route path="plans" element={
                <ProtectedRoute allowedRoles={['admin', 'clinicadmin']}>
                  <Plans />
                </ProtectedRoute>
              } />
              
            </Route>
            { /* Routes here have no layout ON PURPOSE */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/verify-2fa" element={<Verify2FA />} />

            <Route path="/success" element={
              <ProtectedRoute allowedRoles={['admin', 'clinicadmin']}>
                <SuccessPayment />
              </ProtectedRoute>
            } />
            <Route path="/cancel" element={
              <ProtectedRoute allowedRoles={['admin', 'clinicadmin']}>
                <Plans />
              </ProtectedRoute>
            } />

          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
