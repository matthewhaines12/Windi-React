import React, { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { render } from "@testing-library/react";
import {
  LocationProvider,
  useLocation,
  LocationData,
  LocationContext,
} from "../Components/LocationContext";

// Mock LocationData for testing
const mockLocationData: LocationData = {
  locations: []
};

describe("LocationProvider", () => {
  test("renders children", () => {
    const { getByText } = render(
      <LocationProvider>
        <div>Test</div>
      </LocationProvider>
    );
    expect(getByText("Test")).toBeDefined(); // Check if element is defined
  });

  test("provides location context and state management", () => {
    const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
      <LocationContext.Provider
        value={{ locationData: mockLocationData, setLocationData: jest.fn() }}
      >
        {children}
      </LocationContext.Provider>
    );

    const { result } = renderHook(() => useLocation(), { wrapper });

    expect(result.current.locationData).toEqual(mockLocationData);
    expect(typeof result.current.setLocationData).toBe("function");
  });
});

describe("useLocation", () => {
  test("throws error when used outside LocationProvider", () => {
    let result;
    try {
      result = renderHook(() => useLocation());
    } catch (error) {
      expect(error).toBeDefined();
    }
    expect(result).toBeUndefined();
  });

  test("returns location context and state management", () => {
    // Define mock location data
    const mockLocationData = {
      locations: [],
    };

    // Define wrapper component
    const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
      <LocationProvider>{children}</LocationProvider>
    );

    // Render the hook with the wrapper
    const { result } = renderHook(() => useLocation(), { wrapper });

    // Log the obtained location data to inspect its value
    console.log("Location Data:", result.current.locationData);

    // Expectations
    expect(result.current.locationData).toEqual(mockLocationData); // Check if location data matches mock data
    expect(typeof result.current.setLocationData).toBe("function"); // Check if setLocationData is a function
  });
});
