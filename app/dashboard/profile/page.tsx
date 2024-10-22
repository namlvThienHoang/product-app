
"use client";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function UserProfile() {
    const { user } = useUser();


    if (!user) return <p>Please log in to view your profile.</p>;

    return (
        <div className="p-5">
            <h2 className="text-3xl font-medium">Hello Nextjs</h2>

            <p className="my-5 text-sm font-mono">
                Cookie-user: <pre>{JSON.stringify(user, undefined, 4)}</pre>
            </p>

            <Link
                href={"/login"}
                className="py-1 px-4 border border-black/75"
            >
                Login
            </Link>
        </div>
    );
}
