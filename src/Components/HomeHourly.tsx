// This file focuses on displaying the hourly forecast
// For help regarding how this code works, look at the comments within HomeCurrent.tsx
import "../Styles/Hourly.css";
import { useState, useEffect } from "react";
import { useLocation } from "../Components/LocationContext";

const api = {
  key: "51792902640cee7f3338178dbd96604a",
  base: "https://pro.openweathermap.org/data/2.5/",
};

interface City {
  name: string;
}

interface WeatherItem {
  icon: string;
}

interface ListItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: WeatherItem[];
}

interface HourlyData {
  city: City;
  list: ListItem[];
}

var firstRun = true;

function HomeHourly() {
  const { locationData } = useLocation();
  const { setLocationData } = useLocation();
  const [hours, setWeatherData] = useState<HourlyData | null>(null);

  const convertToEST = (utcTime: string): string => {
    const utcDate = new Date(utcTime.replace(/ /, "T") + "Z");
    const estHour = utcDate.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: "America/New_York",
    });
    return estHour;
  };

  function Success(position: { coords: any }) {
    setLocationData({
      locations: [
        { lat: position.coords.latitude, lng: position.coords.longitude },
      ],
    });
    if (locationData.locations[0] && locationData.locations[1]) {
      fetch(
        `${api.base}forecast/hourly?lat=${locationData.locations[0]}&lon=${locationData.locations[1]}&APPID=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    }
  }

  function Errors(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (locationData.locations.length > 0) {
      const { lat, lng } = locationData.locations[0];
      fetch(
        `${api.base}forecast/hourly?lat=${lat}&lon=${lng}&APPID=${api.key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        })
        .catch((error) => console.error("Failed to fetch weather data", error));
    } else if (firstRun) {
      var options = {
        highAccuracyEnabled: true,
        timeout: 10000,
        maxAge: 0,
      };

      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          console.log(result);
          if (result.state === "granted") {
            console.log(`LOCATION REQUEST 1`);
            navigator.geolocation.getCurrentPosition(Success, Errors, options);
          } else if (result.state === "prompt") {
            console.log(`LOCATION REQUEST 2`);
            navigator.geolocation.getCurrentPosition(Success, Errors, options);
          }
        });
      } else {
        console.log("Geolocation not supported");
        setLocationData({ locations: [{ lat: 45, lng: 45 }] });
      }

      firstRun = false;
    }
  }, [locationData]);

  return (
    <div className="hourly">
      <div className="container">
        <div className="middle">
          <table className="hourly-outline">
            <thead className="hourly-times">
              <tr>
                <th>
                  {hours?.list?.[0]?.dt_txt &&
                    convertToEST(hours.list[0].dt_txt)}
                </th>
                <th>
                  {hours?.list?.[1]?.dt_txt &&
                    convertToEST(hours.list[1].dt_txt)}
                </th>
                <th>
                  {hours?.list?.[2]?.dt_txt &&
                    convertToEST(hours.list[2].dt_txt)}
                </th>
                <th>
                  {hours?.list?.[3]?.dt_txt &&
                    convertToEST(hours.list[3].dt_txt)}
                </th>
                <th>
                  {hours?.list?.[4]?.dt_txt &&
                    convertToEST(hours.list[4].dt_txt)}
                </th>
                <th>
                  {hours?.list?.[5]?.dt_txt &&
                    convertToEST(hours.list[5].dt_txt)}
                </th>
                <th>
                  {hours?.list?.[6]?.dt_txt &&
                    convertToEST(hours.list[6].dt_txt)}
                </th>
                <th>
                  {hours?.list?.[7]?.dt_txt &&
                    convertToEST(hours.list[7].dt_txt)}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hourly-items">
                <td>
                  <h3>{Math.round(hours?.list?.[0]?.main?.temp ?? 0)} °F</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      hours?.list?.[0]?.weather?.[0]?.icon ?? "02d"
                    }.png`}
                  />
                </td>
                <td>
                  <h3>{Math.round(hours?.list?.[1]?.main?.temp ?? 0)} °F</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      hours?.list?.[1]?.weather?.[0]?.icon ?? "02d"
                    }.png`}
                  />
                </td>
                <td>
                  <h3>{Math.round(hours?.list?.[2]?.main?.temp ?? 0)} °F</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      hours?.list?.[2]?.weather?.[0]?.icon ?? "02d"
                    }.png`}
                  />
                </td>
                <td>
                  <h3>{Math.round(hours?.list?.[3]?.main?.temp ?? 0)} °F</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      hours?.list?.[3]?.weather?.[0]?.icon ?? "02d"
                    }.png`}
                  />
                </td>
                <td>
                  <h3>{Math.round(hours?.list?.[4]?.main?.temp ?? 0)} °F</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      hours?.list?.[4]?.weather?.[0]?.icon ?? "02d"
                    }.png`}
                  />
                </td>
                <td>
                  <h3>{Math.round(hours?.list?.[5]?.main?.temp ?? 0)} °F</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      hours?.list?.[5]?.weather?.[0]?.icon ?? "02d"
                    }.png`}
                  />
                </td>
                <td>
                  <h3>{Math.round(hours?.list?.[6]?.main?.temp ?? 0)} °F</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      hours?.list?.[6]?.weather?.[0]?.icon ?? "02d"
                    }.png`}
                  />
                </td>
                <td>
                  <h3>{Math.round(hours?.list?.[7]?.main?.temp ?? 0)} °F</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      hours?.list?.[7]?.weather?.[0]?.icon ?? "02d"
                    }.png`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeHourly;

//   return (
// <>
//   <div className="hourly">
//     <div className="container">
//       <div className="top">
//         <h3 className="hourly-title">Hourly Forecast</h3>
//       </div>
//       <div className="middle">
//         <table className="hourly-outline">
//           <thead className="hourly-times">
//             <tr>
//               <th>
//                 {hours?.list?.[0]?.dt_txt &&
//                   convertToEST(hours.list[0].dt_txt)}
//               </th>
//               <th>
//                 {hours?.list?.[1]?.dt_txt &&
//                   convertToEST(hours.list[1].dt_txt)}
//               </th>
//               <th>
//                 {hours?.list?.[2]?.dt_txt &&
//                   convertToEST(hours.list[2].dt_txt)}
//               </th>
//               <th>
//                 {hours?.list?.[3]?.dt_txt &&
//                   convertToEST(hours.list[3].dt_txt)}
//               </th>
//               <th>
//                 {hours?.list?.[4]?.dt_txt &&
//                   convertToEST(hours.list[4].dt_txt)}
//               </th>
//               <th>
//                 {hours?.list?.[5]?.dt_txt &&
//                   convertToEST(hours.list[5].dt_txt)}
//               </th>
//               <th>
//                 {hours?.list?.[6]?.dt_txt &&
//                   convertToEST(hours.list[6].dt_txt)}
//               </th>
//               <th>
//                 {hours?.list?.[7]?.dt_txt &&
//                   convertToEST(hours.list[7].dt_txt)}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="hourly-images">
//               <td>
//                 <img
//                   src={`http://openweathermap.org/img/w/${(hours?.list?.[0]?.weather?.[0]?.icon ?? "02d")}.png`}
//                 />
//               </td>
//               <td>
//                 <img
//                   src={`http://openweathermap.org/img/w/${(hours?.list?.[1]?.weather?.[0]?.icon?? "02d")}.png`}
//                 />
//               </td>
//               <td>
//                 <img
//                   src={`http://openweathermap.org/img/w/${(hours?.list?.[2]?.weather?.[0]?.icon?? "02d")}.png`}
//                 />
//               </td>
//               <td>
//                 <img
//                   src={`http://openweathermap.org/img/w/${(hours?.list?.[3]?.weather?.[0]?.icon?? "02d")}.png`}
//                 />
//               </td>
//               <td>
//                 <img
//                   src={`http://openweathermap.org/img/w/${(hours?.list?.[4]?.weather?.[0]?.icon?? "02d")}.png`}
//                 />
//               </td>
//               <td>
//                 <img
//                   src={`http://openweathermap.org/img/w/${(hours?.list?.[5]?.weather?.[0]?.icon?? "02d")}.png`}
//                 />
//               </td>
//               <td>
//                 <img
//                   src={`http://openweathermap.org/img/w/${(hours?.list?.[6]?.weather?.[0]?.icon?? "02d")}.png`}
//                 />
//               </td>
//               <td>
//                 <img
//                   src={`http://openweathermap.org/img/w/${(hours?.list?.[7]?.weather?.[0]?.icon?? "02d")}.png`}
//                 />
//               </td>
//             </tr>
//             <tr className="hourly-temp">
//               <td>{Math.round(hours?.list?.[0]?.main?.temp ?? 0)} °F</td>
//               <td>{Math.round(hours?.list?.[1]?.main?.temp ?? 0)} °F</td>
//               <td>{Math.round(hours?.list?.[2]?.main?.temp ?? 0)} °F</td>
//               <td>{Math.round(hours?.list?.[3]?.main?.temp ?? 0)} °F</td>
//               <td>{Math.round(hours?.list?.[4]?.main?.temp ?? 0)} °F</td>
//               <td>{Math.round(hours?.list?.[5]?.main?.temp ?? 0)} °F</td>
//               <td>{Math.round(hours?.list?.[6]?.main?.temp ?? 0)} °F</td>
//               <td>{Math.round(hours?.list?.[7]?.main?.temp ?? 0)} °F</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// </>
//   );
// }

// export default HomeHourly;
