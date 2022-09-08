import { Fetcher } from 'openapi-typescript-fetch';
import { suspend } from 'suspend-react';
import { paths } from '../models/MapKit';

const baseUrl = import.meta.env.VITE_APP_MAPKIT_BASEURL;
const authKey = import.meta.env.VITE_APP_MAPKIT_TOKEN;

const fetcher = Fetcher.for<paths>();
fetcher.configure({
  baseUrl: baseUrl ?? 'assets/mock-data/geocode.json?',
  init: {
    headers: {
      Authorization: `Bearer ${authKey}`,
    },
  },
});

const fetchGeocode = fetcher.path('/v1/geocode').method('get').create();
const fetchReverse = fetcher.path('/v1/reverseGeocode').method('get').create();

export function useLocation(locationName: string) {
  const response = suspend(async () => {
    if (locationName === '' && baseUrl) {
      const pos: GeolocationPosition = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      return fetchReverse({
        loc: `${pos.coords.latitude},${pos.coords.longitude}`,
        lang: 'en-US',
      });
    }

    return fetchGeocode({
      q: locationName,
      lang: 'en-US',
    });
  }, [locationName]);

  return {
    location: response.data.results[0],
    isMockData: !baseUrl,
  };
}
