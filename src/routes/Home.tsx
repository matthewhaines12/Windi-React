import HomeCurrentWeather from "../Components/HomeCurrent";

interface LocationData {
  Array: {
    lon: number;
    lat: number;
  }[];
}

import { useLocation } from "../Components/LocationContext";

function Home() {
  const {} = useLocation();

  return (
    <div>
      <HomeCurrentWeather />
      {/* You can now remove the local state and useState import since it's managed globally */}
    </div>
  );
}

export default Home;
