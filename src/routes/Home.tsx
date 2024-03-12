import HomeCurrentWeather from "../Components/HomeCurrent";
import HomeForecast from "../Components/HomeForecast";

function Home(){
  const locationData = {
    Array: [
      {
        lon: 0,
        lat: 0,
      },
    ],
  };
  return(
    <div>
      <HomeCurrentWeather locationData={locationData}/>
    </div>
  )
};
export default Home;
