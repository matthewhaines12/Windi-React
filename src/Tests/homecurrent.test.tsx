import { render, screen } from '@testing-library/react';
import Success from '../Components/HomeCurrent';
import HomeCurrentWeather from '../Components/HomeCurrent';

describe('Success function', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        name: 'Test City',
        sys: { country: 'Test Country' },
        main: { temp: 75, humidity: 50, feels_like: 70, temp_min: 70, temp_max: 80 },
        wind: { speed: 10, gust: 15 },
        weather: [{ description: 'Test Weather' }],
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set location data and fetch weather data', async () => {
    const setLocationData = jest.fn();
    const setWeatherData = jest.fn();

    const position = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    };

    await Success(position);

    expect(setLocationData).toHaveBeenCalledWith({ locations: [{ lat: 40.7128, lng: -74.0060 }] });
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&appid=YOUR_API_KEY&units=imperial'
    );
    expect(setWeatherData).toHaveBeenCalledWith({
      name: 'Test City',
      sys: { country: 'Test Country' },
      main: { temp: 75, humidity: 50, feels_like: 70, temp_min: 70, temp_max: 80 },
      wind: { speed: 10, gust: 15 },
      weather: [{ description: 'Test Weather' }],
    });
  });

  it('should handle error when fetching weather data', async () => {
    const setLocationData = jest.fn();
    const setWeatherData = jest.fn();

    const position = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    };

    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch weather data'));

    await Success(position, setLocationData, setWeatherData);

    expect(setLocationData).toHaveBeenCalledWith({ locations: [{ lat: 40.7128, lng: -74.0060 }] });
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&appid=YOUR_API_KEY&units=imperial'
    );
    expect(setWeatherData).toHaveBeenCalledWith({
      name: 'Error',
      sys: { country: 'Error' },
      main: { temp: 0, humidity: 0, feels_like: 0, temp_min: 0, temp_max: 0 },
      wind: { speed: 0, gust: 0 },
      weather: [{ description: 'Error' }],
    });
    expect(console.error).toHaveBeenCalledWith('Failed to fetch weather data', expect.any(Error));
  });
});

describe('HomeCurrentWeather component', () => {
  it('should render the component', () => {
    render(<HomeCurrentWeather />);
    const component = screen.getByTestId('home-current-weather');
    expect(component).toBeInTheDocument();
  });

  it('should display the location', () => {
    render(<HomeCurrentWeather />);
    const location = screen.getByTestId('location');
    expect(location).toBeInTheDocument();
  });

  it('should display the temperature', () => {
    render(<HomeCurrentWeather />);
    const temperature = screen.getByTestId('temperature');
    expect(temperature).toBeInTheDocument();
  });

  it('should display the weather description', () => {
    render(<HomeCurrentWeather />);
    const description = screen.getByTestId('weather-description');
    expect(description).toBeInTheDocument();
  });

  it('should display the min/max temperature', () => {
    render(<HomeCurrentWeather />);
    const minMaxTemperature = screen.getByTestId('min-max-temperature');
    expect(minMaxTemperature).toBeInTheDocument();
  });

  it('should display the humidity', () => {
    render(<HomeCurrentWeather />);
    const humidity = screen.getByTestId('humidity');
    expect(humidity).toBeInTheDocument();
  });

  it('should display the wind gusts', () => {
    render(<HomeCurrentWeather />);
    const windGusts = screen.getByTestId('wind-gusts');
    expect(windGusts).toBeInTheDocument();
  });

  it('should display the feels like temperature', () => {
    render(<HomeCurrentWeather />);
    const feelsLikeTemperature = screen.getByTestId('feels-like-temperature');
    expect(feelsLikeTemperature).toBeInTheDocument();
  });

  it('should display the wind speed', () => {
    render(<HomeCurrentWeather />);
    const windSpeed = screen.getByTestId('wind-speed');
    expect(windSpeed).toBeInTheDocument();
  });
});