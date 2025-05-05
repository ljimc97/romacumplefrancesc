import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain.firebaseapp.com",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
