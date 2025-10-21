import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// Types for our data
export interface BookingData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  astrologer: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Timestamp;
}

export interface ContactData {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}

// Booking Services
export class BookingService {
  private static collectionName = "bookings";

  // Create a new booking
  static async createBooking(bookingData: Omit<BookingData, 'id' | 'createdAt' | 'status'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...bookingData,
        status: 'pending',
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  // Get all bookings
  static async getAllBookings(): Promise<BookingData[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, this.collectionName), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BookingData));
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  }

  // Get bookings by email
  static async getBookingsByEmail(email: string): Promise<BookingData[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("email", "==", email),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BookingData));
    } catch (error) {
      console.error("Error fetching bookings by email:", error);
      throw error;
    }
  }

  // Update booking status
  static async updateBookingStatus(bookingId: string, status: BookingData['status']): Promise<void> {
    try {
      const bookingRef = doc(db, this.collectionName, bookingId);
      await updateDoc(bookingRef, { status });
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  }

  // Delete a booking
  static async deleteBooking(bookingId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  }
}

// Contact Services
export class ContactService {
  private static collectionName = "contacts";

  // Create a new contact message
  static async createContact(contactData: Omit<ContactData, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...contactData,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }

  // Get all contact messages
  static async getAllContacts(): Promise<ContactData[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, this.collectionName), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ContactData));
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }
}