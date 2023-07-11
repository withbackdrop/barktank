import { QueryConstraint, WhereFilterOp } from '@firebase/firestore';
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  setDoc,
  DocumentData,
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
} from 'firebase/firestore';

import firebaseApp from '@/firebase/config';

const db = getFirestore(firebaseApp);

export function getWhereQueryConstraint(fieldPath: string, opStr: WhereFilterOp, value: any): QueryConstraint {
  return where(fieldPath, opStr, value);
}

export async function getFirestoreCollectionDocumentById<T>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() } as unknown as T;
}

export async function getFirestoreCollectionDocumentsByWhereConditions<T>(
  collectionName: string,
  whereConditions: QueryConstraint[]
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...whereConditions);

  const docsSnap = await getDocs(q);

  const documents = [];
  docsSnap.forEach((_doc) => {
    documents.push({ id: _doc.id, ..._doc.data() });
  });

  return documents;
}

export async function getFirstFirestoreCollectionDocumentByWhereConditions<T>(
  collectionName: string,
  whereConditions: QueryConstraint[]
): Promise<T> {
  const documents = await getFirestoreCollectionDocumentsByWhereConditions<T>(collectionName, whereConditions);
  if (!documents) {
    return null;
  }

  return documents[0];
}

export async function updateFirestoreCollectionDocumentById<T>(
  collectionName: string,
  id: string,
  data: DocumentData
): Promise<T | null> {
  const ref = doc(db, collectionName, id);

  await updateDoc(ref, {
    ...data,
    updatedAt: Date.now(),
  } as any);

  return getFirestoreCollectionDocumentById(collectionName, id);
}

export async function createFirestoreCollectionDocumentById(collectionName: string, id: string, data: DocumentData) {
  const ref = doc(db, collectionName, id);
  await setDoc(ref, {
    id,
    ...data,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  } as any);
}

export async function createFirestoreCollectionDocument(collectionName: string, data: DocumentData) {
  const ref = collection(db, collectionName);

  return addDoc(ref, {
    ...data,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  } as any);
}

export async function deleteFirestoreCollectionDocumentById(collectionName: string, id: string): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
