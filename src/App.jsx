import '@/styles/App.css';
import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Landing } from '@/pages/Landing';
import { About } from '@/pages/About';
import { Home } from '@/pages/app/Home';
import { Login } from '@/pages/Login';
import MainLayout from '@/layouts/MainLayout';
import AppLayout from '@/layouts/AppLayout';

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Doing nested routes allows to avoid re-rendering re-used components */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Home />} />
          </Route>
          { /* Routes here have no layout ON PURPOSE */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
