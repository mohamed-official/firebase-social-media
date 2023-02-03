import { useToast } from "@chakra-ui/react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/firebase";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      createdAt: Date.now(),
      likes: [],
    });
    toast({
      title: "Post added successfully.",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 2000,
    });
    setLoading(false);
  }

  return { addPost, isLoading };
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

export function useLikePost({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function likePost() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { likePost, isLoading };
}

export function usePost(postId) {
  const q = doc(db, "posts", postId);
  const [post, isLoading, error] = useDocumentData(q);

  return { post, isLoading };
}

export function useDeletePost(id) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deletePost() {
    setLoading(true);
    await deleteDoc(doc(db, "posts", id));
    const q = query(collection(db, "comments"), where("postId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
    toast({
      title: "Post deleted successfully.",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 2000,
    });
    setLoading(false);
  }

  return { deletePost, isLoading };
}
