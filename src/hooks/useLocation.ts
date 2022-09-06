import { Fetcher } from "openapi-typescript-fetch";
import { useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { LocationModel } from "../models";
import { paths } from "../models/MapKit";

export function useLocation(locationName: string, useMockData: boolean) {
  const [location, setLocation] = useState<LocationModel>();
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetcher = Fetcher.for<paths>();
    fetcher.configure(useMockData ? {
      baseUrl: "assets/mock-data/geocode.json?"
    } : {
      baseUrl: import.meta.env.VITE_APP_MAPKIT_BASEURL,
      init: {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_MAPKIT_TOKEN}`
        }
      }
    });

    const fetchGeocode = fetcher.path("/v1/geocode").method('get').create();
    const fetchReverseGeocode = fetcher.path("/v1/reverseGeocode").method('get').create();

    if (locationName === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            fetchReverseGeocode({
              loc: `${pos.coords.latitude},${pos.coords.longitude}`,
              lang: navigator.language,
            }).then((response) => response.data)
              .then((data) => {
                setLocation(data.results[0]);
              })
              .catch((error) => {
                handleError(error);
              });;
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
      fetchGeocode({
        q: locationName,
        lang: navigator.language,
      }).then((response) => response.data)
        .then((data) => {
          setLocation(data.results[0]);
        })
        .catch((error) => {
          handleError(error);
        });;
    }
  }, [locationName, useMockData, handleError]);

  return {
    location,
  };
}
