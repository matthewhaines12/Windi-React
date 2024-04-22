// Route for the home page

import HomeCurrentWeather from "../Components/HomeCurrent";
import HomeForecast from "../Components/HomeForecast";
import HomeHourly from "../Components/HomeHourly";

function Home() {
  return (
    <div className="HomeContainer">
      <HomeCurrentWeather />
      <HomeHourly />
      <HomeForecast />
    </div>
  );
}

export default Home;