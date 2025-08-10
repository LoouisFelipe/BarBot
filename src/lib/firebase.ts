'use client';
import {initializeApp, type FirebaseApp} from 'firebase/app';
import {getAuth, type Auth} from 'firebase/auth';
import {getFirestore, type Firestore} from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

// Inicializa o Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Usa um App ID consistente para o caminho do banco de dados
export const appId = firebaseConfig.projectId;
export const dbRootPath = `artifacts/${appId}`;

export {app, auth, db};
