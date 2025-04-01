import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
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

export async function getLibraryMovies(type) {
  try {
    const userId = state.user.uid;
    const q = query(collection(db, 'users', userId, type));
    const querySnapshot = await getDocs(q);

    const movies = querySnapshot.docs.map(doc => doc.data());
    return movies;
  } catch (error) {
    console.error('Error getting library:', error);
    throw error;
  }
}
