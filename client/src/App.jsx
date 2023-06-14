import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import IndexPage from "./components/pages/IndexPage";
import LocationPage from "./components/pages/LocationPage";
import StaffsPage from "./components/pages/StaffsPage";
import StaffDetail from "./components/StaffDetail";
import ServicesPage from "./components/pages/ServicesPage";
import Layout from "./components/Layout";
import { UserContextProvider } from "./components/UserContext";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import DentistsPage from "./components/pages/DentistsPage";
import DentistFormPage from "./components/pages/DentistFormPage";
import DateTimePage from "./components/pages/DateTimePage";
import InformationPage from "./components/pages/InformationPage";
import BookingsPage from "./components/pages/BookingsPage";
import AllBookingsPage from "./components/pages/AllBookingsPage";


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/dentists" element={<DentistsPage />} />
          <Route path="/account/dentists/new" element={<DentistFormPage />} />
          <Route path="/account/dentists/:id" element={<DentistFormPage />} />
          <Route path="/account/appointments" element={<ProfilePage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/all-dentists/:location" element={<LocationPage />} />
          <Route path="/staff" element={<StaffsPage />} />
          <Route path="/staff/:id" element={<StaffDetail />} />
          <Route path="/service" element={<ServicesPage />} />
          <Route path="/dateandtime" element={<DateTimePage />} />
          <Route path="/information" element={<InformationPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/all-bookings" element={<AllBookingsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
