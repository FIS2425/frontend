import '@/styles/App.css';
import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import MainLayout from '@/layouts/MainLayout';

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Doing nested routes allows to avoid re-rendering re-used components */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
