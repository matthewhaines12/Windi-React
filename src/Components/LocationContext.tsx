// This file contains the location context and state management for the location data.
// It provides a custom hook to access the location context and a provider component to wrap the
// application with the context.

import React, { createContext, useContext, ReactNode, useState } from "react";

interface Location {
  lng: number;
  lat: number;
}

interface LocationData {
  locations: Location[];
}

interface LocationContextType {
  locationData: LocationData;
  setLocationData: (newLocationData: LocationData) => void; // Function to update the location data
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Custom hook to use the location context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

// Provides location context and state management
export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locationData, setLocationData] = useState<LocationData>({
    locations: [], // Initialize state for location data
  });

  // Set up the context value and wrap children with it
  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};
