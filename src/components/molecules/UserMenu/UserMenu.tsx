import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { UserAvatar } from '@/components/molecules/UserAvatar/UserAvatar';

type UserDropdownProps = {
  user: User;
  onLogout: () => void;
};

export const UserDropdown: React.FC<UserDropdownProps> = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 flex items-center justify-center transition-transform cursor-pointer overflow-hidden"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden hover:scale-105 transition-transform">
          <UserAvatar user={user} />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold">{user.displayName}</p>
            <p className="text-sm text-gray-600 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
