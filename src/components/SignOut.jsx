"use client"
import { signOut } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';

const SignOut = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    
      const handleSignOut = async () => {
        setMenuOpen(false);
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
              router.refresh();
            },
          },
        });
      };
    return (
        <div>
            <button
                  role="menuitem"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  সাইন আউট
                </button>
        </div>
    );
};

export default SignOut;