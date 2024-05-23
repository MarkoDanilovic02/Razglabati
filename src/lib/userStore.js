import { doc, onSnapshot } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  unsubscribe: null,
  fetchUserInfo: (uid) => {
    if (!uid) {
      if (state.unsubscribe) state.unsubscribe();
      return set({ currentUser: null, isLoading: false });
    }

    const docRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          set({ currentUser: docSnap.data(), isLoading: false });
        } else {
          set({ currentUser: null, isLoading: false });
        }
      },
      (err) => {
        console.log(err);
        set({ currentUser: null, isLoading: false });
      }
    );

    set({ unsubscribe });
  },
}));
