import { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { EmptyLocationModel, LocationModel } from "../models";

export function useLocation(locationName: string, useMockData: boolean) {
  const apiKey = import.meta.env.VITE_APP_GEOLOCATION_API_KEY;
  const geocodeBaseUrl = import.meta.env.VITE_APP_GEOLOCATION_GEOCODE_BASEURL;

  const [location, setLocation] = useState<LocationModel>(EmptyLocationModel);
  const handleError = useErrorHandler();

  const getLocationDetails = useCallback(
    (position: GeolocationPosition) => {
      fetch(useMockData
        ? "assets/mock-data/locality.json"
        : `${geocodeBaseUrl}?latlng=${position.coords.latitude},${position.coords.longitude}&result_type=locality&key=${apiKey}`
      ).then((response) => response.json())
        .then((data) => {
          const result = data.results[0];
          if (result) {
            const formattedAddress = result.formatted_address.split(",");
            setLocation({
              position: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              locality: formattedAddress[0].replace(/\s/g, ""),
              country: formattedAddress[1].replace(/\s/g, ""),
            });
          }
        })
        .catch((error) => {
          handleError(error);
        });
    },
    [apiKey, geocodeBaseUrl, handleError, useMockData]
  );

  const getCoordsByLocationName = useCallback(
    (locationName: string) => {
      fetch(useMockData
        ? "assets/mock-data/latlong.json"
        : `${geocodeBaseUrl}?address=${locationName}&key=${apiKey}`
      ).then((response) => response.json())
        .then((data) => {
          const result = data.results[0];
          if (result) {
            const location = result.geometry.location;
            const formattedAddress = result.formatted_address.split(",");
            setLocation({
              position: {
                latitude: location.lat,
                longitude: location.lng,
              },
              locality: formattedAddress[0].replace(/\s/g, ""),
              country: formattedAddress[1].replace(/\s/g, ""),
            });
          }
        })
        .catch((error) => {
          handleError(error);
        });
    },
    [apiKey, geocodeBaseUrl, handleError, useMockData]
  );

  useEffect(() => {
    if (locationName === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            getLocationDetails(pos);
          },
          () => {
            handleError({
              message:
                "Location - Please enable access location in the browser",
            });
          }
        );
      }
    } else {
      getCoordsByLocationName(locationName);
    }
  }, [getCoordsByLocationName, getLocationDetails, handleError, locationName]);

  return {
    location,
  };
}
