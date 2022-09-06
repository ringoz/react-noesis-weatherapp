import { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { EmptyLocationModel, LocationModel } from "../models";

export function useLocation(locationName: string, useMockData: boolean) {
  const apiKey = import.meta.env.VITE_APP_MAPKIT_TOKEN;
  const baseUrl = import.meta.env.VITE_APP_MAPKIT_BASEURL;

  const [location, setLocation] = useState<LocationModel>(EmptyLocationModel);
  const handleError = useErrorHandler();

  const getLocationDetails = useCallback(
    (position: GeolocationPosition) => {
      fetch(useMockData
        ? "assets/mock-data/locality.json"
        : `${baseUrl}/v1/reverseGeocode?loc=${position.coords.latitude},${position.coords.longitude}&lang=${navigator.language}`, {
        headers: { Authorization: `Bearer ${apiKey}` }
      }
      ).then((response) => response.json())
        .then((data) => {
          const result = data.results[0];
          if (result) {
            setLocation({
              position: result.coordinate,
              locality: result.structuredAddress.locality,
              country: result.country,
            });
          }
        })
        .catch((error) => {
          handleError(error);
        });
    },
    [apiKey, baseUrl, handleError, useMockData]
  );

  const getCoordsByLocationName = useCallback(
    (locationName: string) => {
      fetch(useMockData
        ? "assets/mock-data/latlong.json"
        : `${baseUrl}/v1/geocode?q=${locationName}&lang=${navigator.language}`, {
        headers: { Authorization: `Bearer ${apiKey}` }
      }
      ).then((response) => response.json())
        .then((data) => {
          const result = data.results[0];
          if (result) {
            setLocation({
              position: result.coordinate,
              locality: result.structuredAddress.locality,
              country: result.country,
            });
          }
        })
        .catch((error) => {
          handleError(error);
        });
    },
    [apiKey, baseUrl, handleError, useMockData]
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
