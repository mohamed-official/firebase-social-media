import { useToast } from "@chakra-ui/react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
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
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { db } from "../lib/firebase";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [{ posts }, dispatch] = useStateValue();

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      createdAt: Date.now(),
      likes: [],
    }).then(() => {
      dispatch({
        type: actionTypes.SET_POSTS,
        posts: [
          {
            ...post,
            id,
            createdAt: Date.now(),
            likes: [],
          },
          ...posts,
        ],
      });
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
  // Get comments count
  posts?.map(async (post) => {
    const q = query(collection(db, "comments"), where("postId", "==", post.id));
    const snapshot = await getCountFromServer(q);
    // Add count to post object
    const newPost = {
      ...post,
      commentsCount: snapshot.data().count,
    };
    return newPost;

    return post;
  });
  if (error) throw error;
  return { posts, isLoading };
}

export function useLikePost({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);
  const [{ posts }, dispatch] = useStateValue();

  async function likePost() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    }).then(() => {
      const newPosts = posts.map((post) => {
        if (post.id === id) {
          let updatedPost;
          if (isLiked) {
            updatedPost = {
              ...post,
              likes: [...post.likes].filter((id) => id !== uid),
            };
          } else {
            updatedPost = {
              ...post,
              likes: [...post.likes, uid],
            };
          }
          return updatedPost;
        }
        return post;
      });
      dispatch({
        type: actionTypes.SET_POSTS,
        posts: newPosts,
      });
      setLoading(false);
    });
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
  const [{ posts }, dispatch] = useStateValue();

  async function deletePost() {
    setLoading(true);
    await deleteDoc(doc(db, "posts", id));
    const q = query(collection(db, "comments"), where("postId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
    dispatch({
      type: actionTypes.SET_POSTS,
      posts: posts.filter((post) => post.id !== id),
    });
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
