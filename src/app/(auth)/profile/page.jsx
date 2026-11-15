import SignOut from "@/components/SignOut";
import { auth } from "@/lib/auth";
import { Label, ProgressBar } from "@heroui/react";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";

const ProfileContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user ?? null;

  if (!user) {
    return <Link href="/signin">Sign In</Link>;
  }

  return (
    <div className="flex flex-col items-center mt-10 ">
      <div className="flex flex-col w-[40%] space-y-10  ">
        <div>
          <h1 className="font-bold mb-5">আমার প্রোফাইল</h1>
          <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between ">
          {/* img */}
          <div className="flex items-center">
            {user.image ? (
              // Google/GitHub image er jonno normal img use korlam,
              // jate next.config e domain add na korleo kaj kore
              <img
                src={user.image}
                alt={user.name || "Profile"}
                referrerPolicy="no-referrer"
                className="h-15 w-15 sm:h-20 sm:w-20 rounded-lg object-cover"
              />
            ) : (
              <span className="flex h-20 w-20 text-3xl items-center justify-center rounded-lg bg-green-200 font-semibold text-green-700">
                {user.name[0]?.toUpperCase()}
              </span>
            )}
          
          {/* name  */}
          
            <div className="ml-10">
              <h2 className="font-semibold"> {user.name} </h2>
              <p> {user.email} </p>
            </div>
          </div>
          {/* sign Out  */}
          <div>
            <SignOut></SignOut>
          </div>
        </div>
        
          <Link
            href="/profile/update-profile"
            className="bg-green-600 py-2 px-10 text-center rounded-xl"
          >
            আপডেট
          </Link>
        
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center mt-10">
          <ProgressBar isIndeterminate aria-label="Loading" className="w-64">
            <Label>Loading...</Label>
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;
