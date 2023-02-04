import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LargeLoadingSpinner from "./components/Loading/Large";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Comments = lazy(() => import("./pages/Comments"));
const Layout = lazy(() => import("./components/Layout"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<LargeLoadingSpinner />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/protected"
          element={
            <Suspense fallback={<LargeLoadingSpinner />}>
              <Layout />
            </Suspense>
          }
        >
          <Route
            path="/protected/home"
            element={
              <Suspense fallback={<LargeLoadingSpinner />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/protected/me"
            element={
              <Suspense fallback={<LargeLoadingSpinner />}>
                <MyProfile />
              </Suspense>
            }
          />
          <Route
            path="/protected/profile/:id"
            element={
              <Suspense fallback={<LargeLoadingSpinner />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/protected/comments/:postId"
            element={
              <Suspense fallback={<LargeLoadingSpinner />}>
                <Comments />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
