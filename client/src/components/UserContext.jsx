import axios from "axios";
import moment from "moment";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [searchedDentists, setSearchedDentists] = useState([]);
  const [searchedLocations, setSearchedLocations] = useState("");
  const [searchedServices, setSearchedServices] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [searchedTime, setSearchedTime] = useState("");
  const [searchedDate, setSearchedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAvailable, setSelectedAvailable] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  useEffect(() => {
    axios.get("/all-dentists").then(({ data }) => {
      getLocation(data);
      getService(data);
      getDentist(data);
    });
  }, [selectedLocation]);

  useEffect(() => {
    axios.get("/all-dentists").then(({ data }) => {
      getDentist(data);
    });
  }, [selectedService]);

  const getLocation = async (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (result.includes(data[i].location)) continue;
      result.push(data[i].location);
    }
    setSearchedLocations(result);
  };

  const getService = async (data) => {
    let tempService = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].location != selectedLocation) continue;
      for (let j = 0; j < data[i].services.length; j++) {
        if (tempService.includes(data[i].services[j])) continue;
        tempService.push(data[i].services[j]);
      }
    }
    setSearchedServices(tempService);
  };

  const getDentist = async (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].location != selectedLocation) continue;
      for (let j = 0; j < data[i].services.length; j++) {
        if (data[i].services[j] != selectedService) continue;
        result.push(data[i]);
      }
    }
    setSearchedDentists(result);
  };

  const setLocation = async (location) => {
    setSelectedLocation(location);
  };

  const setService = async (service) => {
    setSelectedService(service);
  };

  const setDentist = async (dentist) => {
    setSelectedDentist(dentist);
  };

  const setDate = async (date) => {
    setSelectedDate(date);
  };

  const setTimeSlot = async (time) => {
    setSelectedTimeSlot(time);
  };

  const setPickedAvailable = async (available) => {
    setSelectedAvailable(available);
  }

  const reset = async () => {
    setSelectedLocation("");
    setSelectedService("");
    setSelectedDentist("");
    setSelectedDate("");
    setSelectedTimeSlot("");
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        searchedDentists,
        setSearchedDentists,
        searchedLocations,
        setSearchedLocations,
        profilePhoto,
        setProfilePhoto,
        description,
        setDescription,
        searchedServices,
        setSearchedServices,
        searchedTime,
        setSearchedTime,
        searchedDate,
        setSearchedDate,
        selectedService,
        selectedLocation,
        selectedDentist,
        selectedDate,
        selectedTimeSlot,
        setLocation,
        setService,
        setDentist,
        setDate,
        setTimeSlot,
        setPickedAvailable,
        selectedAvailable,
        reset,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
