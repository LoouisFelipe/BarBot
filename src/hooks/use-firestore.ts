"use client"
import { useEffect, useReducer } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
  FirestoreError,
} from 'firebase/firestore';

interface State<T> {
  data?: T[];
  error?: FirestoreError;
  isLoading: boolean;
}

const initialState = {
  data: undefined,
  error: undefined,
  isLoading: true,
};

type Action<T> =
  | { type: 'SUCCESS'; payload: T[] }
  | { type: 'ERROR'; payload: FirestoreError };

const dataReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'SUCCESS':
      return { ...state, data: action.payload, isLoading: false, error: undefined };
    case 'ERROR':
      return { ...state, data: undefined, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export function useCollection<T>(path: string, queryConstraints: QueryConstraint[] = []) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const constraintsJSON = JSON.stringify(queryConstraints);

  useEffect(() => {
    const q = query(collection(db, path), ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        dispatch({ type: 'SUCCESS', payload: data });
      },
      (error) => {
        dispatch({ type: 'ERROR', payload: error });
      }
    );

    return () => unsubscribe();
  }, [path, constraintsJSON, queryConstraints]);

  return state;
}
