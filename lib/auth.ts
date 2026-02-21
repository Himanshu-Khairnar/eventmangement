// lib/auth.ts
import { NextRequest } from "next/server";
import admin from "firebase-admin";
import { db } from "./firebaseAdmin";

export async function verifyAdmin(request: NextRequest) {
  console.log("INSIDE verifyAdmin");
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  
  const token = authHeader.split("Bearer ")[1];
  console.log("Token-",token);
  
  const decodedToken = await admin.auth().verifyIdToken(token);
  const uid = decodedToken.uid;
  console.log("UID:", uid);

  const userDoc = await db.collection("users").doc(uid).get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  const userData = userDoc.data();

  if (userData?.role !== "admin") {
    throw new Error("Forbidden");
  }

  return uid;
}