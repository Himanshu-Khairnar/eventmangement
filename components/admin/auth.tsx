"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/clientApp";
import * as firebaseui from "firebaseui";
import 'firebaseui/dist/firebaseui.css';

const Auth = () => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const uiRef = useRef<firebaseui.auth.AuthUI | null>(null);
  
  // 1. Create a reference for the actual DOM element
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);

    if (!uiRef.current) {
      uiRef.current = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    }

    const uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any) => {
          const user = authResult.user;
          const saveUserAndRedirect = async () => {
            try {
              await setDoc(doc(db, "users", user.uid), {
                username: user.displayName || "New User",
                email: user.email,
                createdAt: serverTimestamp(),
              }, { merge: true });
              router.push("/admin/dashboard");
            } catch (error) {
              console.error("Error saving user:", error);
            }
          };
          saveUserAndRedirect();
          return false;
        },
      },
    };

    // 2. Check if the container element exists before starting
    if (containerRef.current) {
      uiRef.current.start(containerRef.current, uiConfig);
    }

    return () => {
      uiRef.current?.reset();
    };
    // 3. We run this when hasMounted changes to ensure the div is rendered
  }, [hasMounted, router]);

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* 4. Attach the containerRef here */}
      <div ref={containerRef}></div>
    </div>
  );
};

export default Auth;