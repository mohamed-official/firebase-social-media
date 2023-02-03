import { useToast } from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/firebase";

export function useAddComment({ postId, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function addComment(comment) {
    setLoading(true);
    const id = uuidv4();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, {
      comment,
      id,
      postId,
      uid: uid,
      createdAt: Date.now(),
    });
    setLoading(false);
  }

  return { addComment, isLoading };
}

export function useComments(postId) {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  );
  const [comments, isLoading, error] = useCollectionData(q);

  if (error) throw error;

  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deleteComment() {
    setLoading(true);
    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);
    toast({
      title: "Comment deleted successfully.",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 2000,
    });
    setLoading(false);
  }

  return { deleteComment, isLoading };
}
