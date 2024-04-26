// Route for the home page

import HomeCurrentWeather from "../Components/HomeCurrent";
import HomeForecast from "../Components/HomeForecast";
import HomeHourly from "../Components/HomeHourly";

function Home() {
  return (
    <div className="HomeContainer">
      <HomeCurrentWeather />
      <br></br>
      <div className="HomeDivider">
        <HomeHourly />
        <HomeForecast />
      </div>
    </div>
  );
}

export default Home;