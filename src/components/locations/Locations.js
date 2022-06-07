import { useEffect, useState } from "react";

export const Locations = () => {
  const [locations, setLocations] = useState([])

  useEffect(
      () => {
       fetch(`http://localhost:8088/locations`)
       .then((response) => response.json())   
       .then((locationsArray) => {
           setLocations(locationsArray)
       })
      },
      []
  )
  return <>
  <h2>Locations</h2>
  <ul>
      {locations.map(location => {
          return <li key={`location--${location.id}`}>{location.address} - Size: {location.sizeInSquareFeet}</li>
      })}
  </ul>
  </>;
};

