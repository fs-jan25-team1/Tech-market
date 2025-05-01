import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
  } from '@/components/ui/dropdown-menu';
  import { SunMoon, Globe, Settings } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  
  interface SettingsDropdownProps {
    onToggleTheme: () => void;
    onToggleLanguage: () => void;
  }
  
  export const SettingsDropdown = ({ onToggleTheme, onToggleLanguage }: SettingsDropdownProps) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-12 h-12 border-l border-[#3B3E4A] flex items-center justify-center rounded-none"
          >
            <Settings className="h-5 w-5 text-[#75767F] hover:text-[#F1F2F9] transition-colors" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="w-36 border border-[#3B3E4A] bg-[#1E1E1E] text-white"
        >
          <DropdownMenuItem
            onClick={onToggleTheme}
            className="flex items-center gap-2 cursor-pointer hover:bg-[#2C2C2C]"
          >
            <SunMoon className="h-4 w-4" />
            <span>Theme</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onToggleLanguage}
            className="flex items-center gap-2 cursor-pointer hover:bg-[#2C2C2C]"
          >
            <Globe className="h-4 w-4" />
            <span>Language</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  