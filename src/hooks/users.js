import {
  arrayRemove,
  arrayUnion,
  doc,
  query,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useStateValue } from "../context/StateProvider";
import { db } from "../lib/firebase";

export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading, error] = useDocumentData(q);

  if (error) throw error;

  return { user, isLoading };
}

export function useFollowUser({ id, isFollowed, followerId }) {
  const [isLoading, setLoading] = useState(false);
  const [{}, dispatch] = useStateValue();

  async function followUser() {
    setLoading(true);
    const docRef = doc(db, "users", id);
    updateDoc(docRef, {
      followers: isFollowed ? arrayRemove(followerId) : arrayUnion(followerId),
    });
    setLoading(false);
  }

  return { followUser, isLoading };
}
