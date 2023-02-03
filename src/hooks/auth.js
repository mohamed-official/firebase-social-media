import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { auth, db } from "../lib/firebase";
import isUsernameExists from "../utils/isUsernameExists";

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = "/protected/home" }) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Save user to context
          dispatch({
            type: actionTypes.SET_USER,
            user: userCredential.user,
          });
          localStorage.setItem("user", JSON.stringify(userCredential.user));
          // Redirect to home page
          navigate("/protected/home");
        }
      );
      toast({
        title: "Logged in successfully.",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Login failed.",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  }
  return { login, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  async function register({
    username,
    email,
    password,
    redirectTo = "/protected/home",
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast({
        title: "This username is already exists.",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return false;
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // Update username
            updateProfile(userCredential?.user, {
              displayName: username,
            });
            // Create user doc in firestore
            setDoc(doc(db, "users", userCredential.user.uid), {
              id: userCredential.user.uid,
              username: username,
              avatar: "",
              createdAt: Date.now(),
            });
            // Save user to context
            dispatch({
              type: actionTypes.SET_USER,
              user: userCredential.user,
            });
            localStorage.setItem("user", JSON.stringify(userCredential.user));
            // Redirect to home page
            navigate("/protected/home");
          }
        );

        toast({
          title: "Account created successfully.",
          description: "Logged in successfully.",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        // navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Account create failed.",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }

    setLoading(false);
  }

  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const toast = useToast();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  async function logout() {
    if (await signOut()) {
      toast({
        title: "Logged out successfully.",
        status: "success",
        isClosable: true,
        position: "top",
        duration: "5000",
      });
      localStorage.removeItem("user");
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });
      navigate("/");
    } else {
    }
  }

  return { logout, isLoading };
}
