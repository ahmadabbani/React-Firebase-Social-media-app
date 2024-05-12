import { uuidv4 } from "@firebase/util";
import {
  setDoc,
  doc,
  collection,
  orderBy,
  query,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useToast } from "@chakra-ui/react";
import { db } from "../lib/Firebase";
import { useState, useEffect, useCallback } from "react";

const useAddPost = () => {
  const [isLoading, setLoading] = useState();
  const toast = useToast();
  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    toast({
      title: "Post added!",
      status: "success",
      isClosable: "true",
      position: "top",
      duration: 4000,
    });
    setLoading(false);
  }
  return { addPost, isLoading };
};

const useToggleLike = ({ id, isLiked, uid }) => {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
};

const useShowPosts = (uid = null) => {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("userid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
};

const usePost = (id) => {
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q);
  return { post, isLoading };
};

const useDeletePost = (id) => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deletePost() {
    setLoading(true);
    //Delete post
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);

    //Delete comments related to the post
    const q = query(collection(db, "comments"), where("postId", "==", id));

    // It is required to get the data before deleting them in firestore
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

    toast({
      title: "Post deleted!",
      status: "success",
      isClosable: "true",
      position: "top",
      duration: 4000,
    });
    setLoading(false);
  }

  return { deletePost, isLoading };
};

const useTotalLikes = (id) => {
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "posts"), where("userid", "==", id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let totalLikes = 0;
      querySnapshot.forEach((doc) => {
        let postData = doc.data();
        totalLikes += postData.likes.length;
      });
      setTotal(totalLikes);
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [id]);

  return { total, isLoading };
};

export {
  useAddPost,
  useShowPosts,
  useToggleLike,
  useDeletePost,
  usePost,
  useTotalLikes,
};
