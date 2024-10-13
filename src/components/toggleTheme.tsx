'use client';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const darkMode = theme === 'dark';

  return (
    <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
      {darkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
    </Button>
  );
};

export default ToggleTheme;
