import React from "react";
import "./global.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import SelectRoleFoeSignUp from "./pages/SelectRoleFoeSignUp";
import Layout from "./layout/Layout";
import { useAppSelectore } from "./App/store";
import ProtectRoute from "./components/ProtectRoute";
import Profile from "./pages/civilUser/Profile";
import { CivilProtectRoute } from "./components/CivilProtectRoute";
import ClientProtectRoute from "./components/ClientProtectRoute";
import ClientProfile from "./pages/client User/ClientProfile";
import CreateJobPost from "./components/ClientUser/CreateJobPost";
import Messages from "./pages/Messages";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/civilUser/SignUp";
import SignUpClient from "./pages/client User/SignUpClient";
import FindJobs from "./pages/FindJobs";
import Media from "./pages/Media";

const App: React.FC = () => {
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const { Client } = useAppSelectore((state) => state.client);
  return (
    <BrowserRouter>
      <ToastContainer />
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
            path="/find-jobs"
            element={
              <Layout showHero={false}>
                <FindJobs />
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
    </BrowserRouter>
  );
};

export default App;
