import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

import { Button } from '@/components/ui/button';

export default function ModeToggle({ variant = 'icon', ...props }) {
  const { theme, setTheme } = useTheme();

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="ghost" onClick={toggleTheme} {...props}>
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-transform" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-transform" />
      )}
      {variant === 'text' && <span className="text-base">Toggle Mode</span>}
    </Button>
  );
}
