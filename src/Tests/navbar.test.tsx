import { render, screen } from "@testing-library/react";
import Navbar from "../Components/Navbar";
import { MemoryRouter } from "react-router-dom";
import { LocationProvider } from "../Components/LocationContext";
import "@testing-library/jest-dom";

jest.mock("../Styles/Navbar.css", () => ({}));

describe("Navbar component", () => {
  test("renders navbar with logo", () => {
    render(<LocationProvider><MemoryRouter><Navbar /></MemoryRouter></LocationProvider>);
    const logoElement = screen.getByText("Windi");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders search component", () => {
    render(
      <LocationProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </LocationProvider>
    );
    const searchElement = screen.getByPlaceholderText("Enter City...");
    expect(searchElement).toBeInTheDocument();
  });

  test("renders Home and Radar links", () => {
    render(<LocationProvider><MemoryRouter><Navbar /></MemoryRouter></LocationProvider>);
    const homeLink = screen.getByRole("link", { name: /home/i });
    const radarLink = screen.getByRole("link", { name: /radar/i });

    expect(homeLink).toBeInTheDocument();
    expect(radarLink).toBeInTheDocument();
  });

  test("Home link points to '/'", () => {
    render(<LocationProvider><MemoryRouter><Navbar /></MemoryRouter></LocationProvider>);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("Radar link points to '/radar'", () => {
    render(<LocationProvider><MemoryRouter><Navbar /></MemoryRouter></LocationProvider>);
    const radarLink = screen.getByRole("link", { name: /radar/i });
    expect(radarLink).toHaveAttribute("href", "/radar");
  });
});
