import { db } from "@/lib/firebaseAdmin";

export async function getAllEvents() {
  const snapshot = await db.collection("events").get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function createEvent(data: any) {
  const docRef = await db.collection("events").add({
    ...data,
    createdAt: new Date(),
  });
  return docRef.id;
}