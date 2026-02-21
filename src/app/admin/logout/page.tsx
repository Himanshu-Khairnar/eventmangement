"use client"
import { auth } from "@/firebase/clientApp";

const handleLogout = async () => {
  await auth.signOut();
  console.log("Logged out");
};

export default function Logout() {
  return (
     <div className="space-y-6">
<button onClick={handleLogout}>
  Logout
</button>
      </div>  
  );
}