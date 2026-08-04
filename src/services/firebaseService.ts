import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export type SupportedCollection = 
  | 'news' 
  | 'jobs' 
  | 'banners' 
  | 'gallery' 
  | 'leadership' 
  | 'heroSlides' 
  | 'featured_videos' 
  | 'messages';

/**
 * Unified Create Document function for all collections
 */
export async function createFirebaseDoc<T extends Record<string, any>>(
  collectionName: SupportedCollection, 
  data: T
): Promise<string> {
  try {
    const payload = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, collectionName), payload);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionName);
  }
}

/**
 * Unified Update Document function for all collections
 */
export async function updateFirebaseDoc<T extends Record<string, any>>(
  collectionName: SupportedCollection, 
  docId: string, 
  data: Partial<T>
): Promise<void> {
  const path = `${collectionName}/${docId}`;
  try {
    const payload = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(doc(db, collectionName, docId), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Unified Delete Document function for all collections
 */
export async function deleteFirebaseDoc(
  collectionName: SupportedCollection, 
  docId: string
): Promise<void> {
  const path = `${collectionName}/${docId}`;
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Unified Rename / Title Update function for all collections
 */
export async function renameFirebaseDoc(
  collectionName: SupportedCollection,
  docId: string,
  newTitle: string,
  titleField: string = 'title'
): Promise<void> {
  return updateFirebaseDoc(collectionName, docId, { [titleField]: newTitle });
}

/**
 * Unified Clear / Batch Delete function for an entire collection
 */
export async function clearFirebaseCollection(
  collectionName: SupportedCollection
): Promise<number> {
  try {
    const snap = await getDocs(collection(db, collectionName));
    let count = 0;
    for (const d of snap.docs) {
      await deleteDoc(doc(db, collectionName, d.id));
      count++;
    }
    return count;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, collectionName);
  }
}

/**
 * Unified Fetch All Documents function for any collection
 */
export async function fetchFirebaseCollection<T>(
  collectionName: SupportedCollection
): Promise<(T & { id: string })[]> {
  try {
    const snap = await getDocs(collection(db, collectionName));
    return snap.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as T)
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionName);
  }
}

// Collection-specific wrapper helpers for conveniency and type-safety
export const newsService = {
  create: (data: any) => createFirebaseDoc('news', data),
  update: (id: string, data: any) => updateFirebaseDoc('news', id, data),
  delete: (id: string) => deleteFirebaseDoc('news', id),
  rename: (id: string, newTitle: string) => renameFirebaseDoc('news', id, newTitle, 'title'),
  clearAll: () => clearFirebaseCollection('news'),
};

export const jobsService = {
  create: (data: any) => createFirebaseDoc('jobs', data),
  update: (id: string, data: any) => updateFirebaseDoc('jobs', id, data),
  delete: (id: string) => deleteFirebaseDoc('jobs', id),
  rename: (id: string, newTitle: string) => renameFirebaseDoc('jobs', id, newTitle, 'title'),
  clearAll: () => clearFirebaseCollection('jobs'),
};

export const bannersService = {
  create: (data: any) => createFirebaseDoc('banners', data),
  update: (id: string, data: any) => updateFirebaseDoc('banners', id, data),
  delete: (id: string) => deleteFirebaseDoc('banners', id),
  rename: (id: string, newTitle: string) => renameFirebaseDoc('banners', id, newTitle, 'title'),
  clearAll: () => clearFirebaseCollection('banners'),
};

export const galleryService = {
  create: (data: any) => createFirebaseDoc('gallery', data),
  update: (id: string, data: any) => updateFirebaseDoc('gallery', id, data),
  delete: (id: string) => deleteFirebaseDoc('gallery', id),
  rename: (id: string, newTitle: string) => renameFirebaseDoc('gallery', id, newTitle, 'title'),
  clearAll: () => clearFirebaseCollection('gallery'),
};

export const leadershipService = {
  create: (data: any) => createFirebaseDoc('leadership', data),
  update: (id: string, data: any) => updateFirebaseDoc('leadership', id, data),
  delete: (id: string) => deleteFirebaseDoc('leadership', id),
  rename: (id: string, newName: string) => renameFirebaseDoc('leadership', id, newName, 'name'),
  clearAll: () => clearFirebaseCollection('leadership'),
};

export const heroSlidesService = {
  create: (data: any) => createFirebaseDoc('heroSlides', data),
  update: (id: string, data: any) => updateFirebaseDoc('heroSlides', id, data),
  delete: (id: string) => deleteFirebaseDoc('heroSlides', id),
  rename: (id: string, newTitle: string) => renameFirebaseDoc('heroSlides', id, newTitle, 'title'),
  clearAll: () => clearFirebaseCollection('heroSlides'),
};

export const featuredVideosService = {
  create: (data: any) => createFirebaseDoc('featured_videos', data),
  update: (id: string, data: any) => updateFirebaseDoc('featured_videos', id, data),
  delete: (id: string) => deleteFirebaseDoc('featured_videos', id),
  rename: (id: string, newTitle: string) => renameFirebaseDoc('featured_videos', id, newTitle, 'title'),
  clearAll: () => clearFirebaseCollection('featured_videos'),
};

export const messagesService = {
  create: (data: any) => createFirebaseDoc('messages', data),
  update: (id: string, data: any) => updateFirebaseDoc('messages', id, data),
  delete: (id: string) => deleteFirebaseDoc('messages', id),
  clearAll: () => clearFirebaseCollection('messages'),
};
