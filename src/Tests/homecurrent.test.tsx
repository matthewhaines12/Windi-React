import { render, screen } from '@testing-library/react';
import HomeCurrentWeather from '../Components/HomeCurrent';
import { LocationProvider } from '../Components/LocationContext';

jest.mock('../Styles/Home.css', () => ({}));
jest.mock('../Styles/Hourly.css', () => ({}));

// Mock data
const mockData = {
  locations: [
    {
      lat: 45,
      lng: 45,
      name: "Test City",
      country: "Test Country"
    }
  ]
};

// Mock context
jest.mock('../Components/LocationContext', () => ({
  useLocation: () => mockData,
}));

describe("HomeCurrentWeather component", () => {
  test("renders location name", async () => {
    render(
      <LocationProvider>
        <HomeCurrentWeather />
      </LocationProvider>
    );

    const locationNameElement = await screen.findByText("Test City");
    expect(locationNameElement).toBeInTheDocument();
  });
});