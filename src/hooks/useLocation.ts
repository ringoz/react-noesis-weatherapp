import { Fetcher } from "openapi-typescript-fetch";
import { useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { LocationModel } from "../models";
import { paths } from "../models/MapKit";

const baseUrl = import.meta.env.VITE_APP_MAPKIT_BASEURL;
const authKey = import.meta.env.VITE_APP_MAPKIT_TOKEN;

const fetcher = Fetcher.for<paths>();
fetcher.configure(!baseUrl ? {
  baseUrl: "assets/mock-data/geocode.json?"
} : {
  baseUrl,
  init: {
    headers: {
      Authorization: `Bearer ${authKey}`
    }
  }
});

const fetchGeocode = fetcher.path("/v1/geocode").method('get').create();
const fetchReverseGeocode = fetcher.path("/v1/reverseGeocode").method('get').create();

export function useLocation(locationName: string) {
  const [location, setLocation] = useState<LocationModel>();
  const handleError = useErrorHandler();

  useEffect(() => {
    if (locationName === "" && baseUrl) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          fetchReverseGeocode({
            loc: `${pos.coords.latitude},${pos.coords.longitude}`,
            lang: navigator.language,
          }).then((response) => response.data)
            .then((data) => setLocation(data.results[0]))
            .catch(handleError);
        }, handleError);
      }
    } else {
      fetchGeocode({
        q: locationName,
        lang: navigator.language,
      }).then((response) => response.data)
        .then((data) => setLocation(data.results[0]))
        .catch(handleError);
    }
  }, [locationName, handleError]);

  return {
    location,
    isMockData: !baseUrl
  };
}
