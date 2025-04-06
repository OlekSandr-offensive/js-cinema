import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { state } from '../state/state';

const db = getFirestore();

export async function addMovieToLibrary(movie, type) {
  try {
    const userId = state.user.uid;
    const docRef = doc(db, 'users', userId, type, movie.id.toString());
    await setDoc(docRef, movie);
    return true;
  } catch (error) {
    console.error('Error adding movie to library:', error);
    throw error;
  }
}

export async function removeMovieFromLibrary(movieId, type) {
  try {
    const userId = state.user.uid;
    const docRef = doc(db, 'users', userId, type, movieId.toString());
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting movie from library:', error);
    throw error;
  }
}

export async function getLibraryMovies() {
  try {
    const userId = state.user.uid;
    const watchedSnap = await getDocs(
      collection(db, 'users', userId, 'watched')
    );
    const queueSnap = await getDocs(collection(db, 'users', userId, 'queue'));

    const watched = watchedSnap.docs.map(doc => doc.data());
    const queue = queueSnap.docs.map(doc => doc.data());

    return { watched, queue };
  } catch (error) {
    console.error('Error getting library:', error);
    throw error;
  }
}
