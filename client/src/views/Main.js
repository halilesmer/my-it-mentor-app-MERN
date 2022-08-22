import { Route, Routes } from "react-router-dom";

import { AppProvider } from "../contexts/appContext";
import Chat from "./Chat";
import ErrorPage from "./ErrorPage";
import FavoritMentorsPage from "./FavoritMentorsPage";
import Home from "./Home";
import LoginPage from "./LoginPage";
import Mentors from "./Mentors";
import MentorsDetails from "../components/MentorsDetails";
import MentorsProfilePage from "./MentorsProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import React from "react";
import RegisterMenteePage from "../components/RegisterMenteePage";
import SignUpMentorPage from "../components/SignUpMentorPage";
import SignUpPage from "./SignUpPage";

// import Grid from "@mui/material/Grid";

const Main = () => {
  return (
    <main id="mainCon" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="chat/"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="mentors/" element={<Mentors />} />
          <Route path="favorit-mentor/" element={<FavoritMentorsPage />} />
          <Route path="register-page/" element={<SignUpPage />} />
          <Route
            path="register-page/mentor/"
            element={<SignUpMentorPage />}
          />
          <Route
            path="register-page/mentee/"
            element={<RegisterMenteePage />}
          />

          <Route path="/mentors/signin" element={<LoginPage />} />
          <Route path="mentors-profile/" element={<MentorsProfilePage />} />
          <Route
            path="*"
            element={<ErrorPage errorMsg="Something went wrong ..." />}
          />
        </Routes>
      </AppProvider>
    </main>
  );
};

export default Main;
