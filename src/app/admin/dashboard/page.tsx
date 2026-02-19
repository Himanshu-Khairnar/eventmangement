"use client"; // 🎟️ Must be a client component to use hooks
import EventDashboard from '@/components/EventDashboard';
import { useAuth } from "@/context/AuthContext"; // 🛰️ Import our hook
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth(); // 📡 Grab user info and loading state
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, send them back to login
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
       <EventDashboard displayName={user?.displayName || "Admin"}/>
     </div>
  );
}
