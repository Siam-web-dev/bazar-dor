"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await authClient.updateUser({
      name: name.trim(),
    });

    setLoading(false);

    if (error) {
      setError(error.message || "আপডেট করা যায়নি");
      return;
    }
    toast.success("নাম সফলভাবে আপডেট হয়েছে");

    // profile page server component, tai refresh dite hobe
    router.push("/profile");
    router.refresh();
  };

  if (isPending) {
    return <p className="mt-10 text-center">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col w-[40%] space-y-6">
        <h1>নাম আপডেট করুন</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-transparent"
            placeholder="আপনার নাম"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 py-2 px-10 rounded-xl disabled:opacity-60"
          >
             আপডেট করুন 
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;