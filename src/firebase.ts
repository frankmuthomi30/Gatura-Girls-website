import { initializeApp } from 'firebase/app';
import { 
  getFirestore, initializeFirestore, persistentLocalCache, 
  collection, 
  getDocs, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  setLogLevel
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import config from '../firebase-applet-config.json';

const app = initializeApp(config);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
}, config.firestoreDatabaseId || undefined);

export const auth = getAuth(app);

// Suppress internal Firebase SDK connection errors (e.g. Quota Exceeded)
// so they don't trigger the error overlay, allowing our fallback UI to handle it cleanly.
setLogLevel('silent');

export * from './services/firebaseService';

export { 
  collection, 
  getDocs, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
};
export type { User };
