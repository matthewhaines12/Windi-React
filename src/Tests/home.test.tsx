import { render, waitFor } from "@testing-library/react";
import HomeCurrentWeather from "../Components/HomeCurrent";
import { LocationContext, LocationProvider } from "../Components/LocationContext";

jest.mock("../Styles/Home.css", () => ({}));
jest.mock("../Styles/Hourly.css", () => ({}));

// Mock the fetch function to simulate API calls
global.fetch = jest.fn();

describe("HomeCurrentWeather component", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  test("renders with default values when no location data available", () => {
    const { getByText } = render(<LocationProvider><HomeCurrentWeather /></LocationProvider>);
    expect(getByText("Enter city")).toBeInTheDocument();
  });

  test("renders with weather data on successful API call", async () => {
    const mockWeatherData = {
      name: "Test City",
      sys: { country: "XX" },
      main: { temp: 20, feels_like: 15, temp_min: 15, temp_max: 25, humidity: 50 },
      weather: [{ description: "Test Weather" }],
      wind: { speed: 10, gust: 15 },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({ json: () => Promise.resolve(mockWeatherData) });

    const { getByText } = render(
      <LocationProvider>
        <HomeCurrentWeather />
      </LocationProvider>
    );

    // Wait for the component to update with the fetched data
    await waitFor(() => {
      expect(getByText("Test City")).toBeInTheDocument();
      expect(getByText("XX")).toBeInTheDocument();
      expect(getByText("20°F")).toBeInTheDocument();
      expect(getByText("Test Weather")).toBeInTheDocument();
      expect(getByText("15°F/25°F")).toBeInTheDocument();
      expect(getByText("50 %")).toBeInTheDocument();
      expect(getByText("15 mph")).toBeInTheDocument();
      expect(getByText("10 mph")).toBeInTheDocument();
    });
  });

  test("handles error gracefully on failed API call", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch weather data"));

    const { getByText } = render(
      <LocationProvider>
        <HomeCurrentWeather />
      </LocationProvider>
    );

    // Wait for the component to update with the error message
    await waitFor(() => {
      expect(getByText("Failed to fetch weather data")).toBeInTheDocument();
    });
  });

  // Add tests for geolocation scenarios here...
});
