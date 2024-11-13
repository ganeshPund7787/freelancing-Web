import React, { lazy, Suspense } from "react";
import "./global.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./layout/Layout";
import { useAppSelectore } from "./App/store";
import ProtectRoute from "./components/ProtectRoutes/ProtectRoute";
import { CivilProtectRoute } from "./components/ProtectRoutes/CivilProtectRoute";
import ClientProtectRoute from "./components/ProtectRoutes/ClientProtectRoute";

// Lazy loaded components
const SelectRoleFoeSignUp = lazy(
  () => import("./pages/BothUserPages/SelectRoleFoeSignUp")
);
const Profile = lazy(() => import("./pages/civilUser/Profile"));
const ClientProfile = lazy(() => import("./pages/client User/ClientProfile"));
const CreateJobPost = lazy(
  () => import("./components/ClientUser/CreateJobPost")
);
const Messages = lazy(() => import("./pages/BothUserPages/Messages"));
const Home = lazy(() => import("./pages/BothUserPages/Home"));
const Search = lazy(() => import("./pages/BothUserPages/Search"));
const SignIn = lazy(() => import("./pages/BothUserPages/SignIn"));
const SignUp = lazy(() => import("./pages/civilUser/SignUp"));
const SignUpClient = lazy(() => import("./pages/client User/SignUpClient"));
const Media = lazy(() => import("./pages/BothUserPages/Media"));
const UserProfile = lazy(() => import("./pages/BothUserPages/UserProfile"));

const App: React.FC = () => {
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const { Client } = useAppSelectore((state) => state.client);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<span>Loading...</span>}>
        <Routes>
          <Route
            element={
              CurrentCivilUser || Client ? <Navigate to={"/"} /> : <Outlet />
            }
          >
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up-user" element={<SignUp />} />
            <Route path="/sign-up-client" element={<SignUpClient />} />
            <Route path="/select-role" element={<SelectRoleFoeSignUp />} />
          </Route>

          <Route element={<ProtectRoute />}>
            <Route
              path="/"
              element={
                <Layout showHero={false}>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/messages"
              element={
                <Layout showHero={false}>
                  <Messages />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout showHero={false}>
                  <Search />
                </Layout>
              }
            />
            <Route
              path="/media"
              element={
                <Layout showHero={false}>
                  <Media />
                </Layout>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <Layout showHero={false}>
                  <UserProfile />
                </Layout>
              }
            />
          </Route>

          <Route element={<CivilProtectRoute />}>
            <Route
              path="/user-profile"
              element={
                <Layout showHero={false}>
                  <Profile />
                </Layout>
              }
            />
          </Route>

          <Route element={<ClientProtectRoute />}>
            <Route
              path="/client-profile"
              element={
                <Layout showHero={false}>
                  <ClientProfile />
                </Layout>
              }
            />
            <Route
              path="/create-job-post"
              element={
                <Layout showHero={false}>
                  <CreateJobPost />
                </Layout>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
