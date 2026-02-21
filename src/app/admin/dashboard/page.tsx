"use client"; 
import EventDashboard from '@/components/EventDashboard';
import { useAuth } from "@/context/AuthContext"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const token = await auth.currentUser?.getIdToken(true);

export default function Dashboard() {
  const { user, loading } = useAuth(); 
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);
  
  if (loading) return <p>Loading...</p>;
  
  console.log(token);
  return (
    <div className="space-y-6">
       <EventDashboard displayName={user?.displayName || "Admin"}/>
     </div>
  );
}
