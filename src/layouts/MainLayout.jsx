import { Link, Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <main className="flex-1 mt-[64px]">
      <nav className="flex justify-between fixed top-0 left-0 w-full bg-secondary shadow-md p-5 z-10">
        <div />
        <div className="flex align-items-center gap-x-4">
          <Link to="/" className="text-secondary-foreground hover:underline hover:text-secondary-foreground">
            Home
          </Link>
          <Link to="/about" className="text-secondary-foreground hover:underline hover:text-secondary-foreground">
            About
          </Link>
        </div>
      </nav>
      <Outlet />
    </main>
  );
}
