import { Link } from 'react-router';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/mode-toggle';

export function Landing() {
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
        <Link to="/app" asChild>
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
    </div>
  );
}
