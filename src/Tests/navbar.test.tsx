import { render } from "@testing-library/react";
import Navbar from "../Components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { LocationProvider } from "../Components/LocationContext";

jest.mock("../Styles/Navbar.css", () => ({}));

describe("Navbar load and interaction", ()=>{
    test('Navbar gets created', () => {
        const navbar = render(
            <Router>
                <LocationProvider>
                    <Navbar />
                </LocationProvider>
            </Router>
        );
        expect(navbar).toContainElement;
    });

    test('Navbar click')
})

