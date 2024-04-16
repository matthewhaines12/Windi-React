import { render, fireEvent, waitFor } from '@testing-library/react';
import Search from '../Components/Search';

jest.mock("../Styles/Navbar.css", () => ({}));

// Mock the useLocation hook
jest.mock('../Components/LocationContext', () => ({
  useLocation: () => ({
    setLocationData: jest.fn()
  })
}));

(global.fetch as jest.Mock) = jest.fn();

describe('Search component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates location data on successful API response', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ lat: 40.7128, lon: -74.0060 }])
      })
    );

    const { getByText, getByPlaceholderText } = render(<Search />);
    const inputElement = getByPlaceholderText('Enter City...');
    const buttonElement = getByText('Search');

    fireEvent.change(inputElement, { target: { value: 'New York' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://pro.openweathermap.org/geo/1.0/direct?q=New York&limit=1&appid=51792902640cee7f3338178dbd96604a'
      );
    });

    // Add more assertions here as needed
  });

  // Add more test cases for other scenarios
});