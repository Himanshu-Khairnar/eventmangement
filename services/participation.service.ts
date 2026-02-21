import { db } from "@/lib/firebaseAdmin";
import admin from "firebase-admin";

export async function getTeamsByEvent(eventId: string) {
  const snapshot = await db
    .collection("events")
    .doc(eventId)
    .collection("teams")
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addTeam(eventId: string, teamData: any) {
  const eventRef = db.collection("events").doc(eventId);

  // 1️⃣ Add team inside subcollection
  await eventRef.collection("teams").add(teamData);

  // 2️⃣ Increment team count atomically
  await eventRef.update({
    teamCount: admin.firestore.FieldValue.increment(1),
  });
}