import React, { createContext, useContext, ReactNode, useState } from 'react';

interface Location {
  lng: number;
  lat: number;
}

interface LocationData {
  locations: Location[];
}

interface LocationContextType {
  locationData: LocationData;
  setLocationData: (newLocationData: LocationData) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locationData, setLocationData] = useState<LocationData>({ locations: [] });

  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};