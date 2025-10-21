import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const testFirebaseConnection = async () => {
  try {
    console.log("Testing Firebase connection...");
    
    // Test adding a simple document
    const testDoc = await addDoc(collection(db, "test"), {
      message: "Hello Firebase!",
      timestamp: Timestamp.now()
    });
    
    console.log("✅ Firebase connection successful! Document ID:", testDoc.id);
    return { success: true, id: testDoc.id };
  } catch (error) {
    console.error("❌ Firebase connection failed:", error);
    return { success: false, error };
  }
};