import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const ProfilePage = async () => {
    const session = await auth.api.getSession({
    headers: await headers()

});
console.log(session) ; 
    return (
        <div>
            This is profile
            <Link 
            href="/profile/update-profile" 
            className='bg-green-600 py-2 px-10'
            >
                আপডেট 
            </Link>
        </div>
    );
};

export default ProfilePage;