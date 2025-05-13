    "use client";

    import { UserButton, useUser } from "@clerk/nextjs";
    import Image from "next/image";
    import React from "react";

    function ProfilePage() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) return <div>Loading...</div>;

    if (!isSignedIn) return <div>You are not signed in</div>;

    return (
        <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <div className="flex items-center gap-6 bg-slate-100 p-6 rounded-lg shadow">

                <div className="w-50 h-50 items-center">
          <UserButton />
        </div>
            
            <div>
            <p className="text-xl font-semibold">Name: {user.fullName}</p>
            <p className="text-md text-gray-700">Email: {user.primaryEmailAddress?.emailAddress}</p>
            <p className="text-sm text-gray-500 mt-1">User ID: {user.id}</p>
            </div>
        </div>
        </div>
    );
    }

    export default ProfilePage;
