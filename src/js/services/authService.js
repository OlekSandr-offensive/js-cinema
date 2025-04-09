import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase-config/firebase-config';
import { updateHeaderUI } from '../components';
import { initLibraryState } from '../utils';
import { state } from '../state';

const provider = new GoogleAuthProvider();

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}

export async function signInWithGoogle() {
  try {
    const userCredential = await signInWithRedirect(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Exit error:', error.message);
    throw error;
  }
}

export function listenForAuthChanges() {
  onAuthStateChanged(auth, async user => {
    if (user) {
      state.user = { uid: user.uid, email: user.email };
      state.isAuthenticated = true;
      updateHeaderUI();

      await initLibraryState();
    } else {
      state.user = null;
      state.isAuthenticated = false;
      updateHeaderUI();

      state.libraryMovies = { watched: [], queue: [] };
      state.sets = { watched: new Set(), queue: new Set() };
    }
  });
}
