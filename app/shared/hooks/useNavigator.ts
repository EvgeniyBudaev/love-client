import { useGeolocated } from "react-geolocated";

type TUseNavigatorResponse = {
  latitude?: number;
  longitude?: number;
};

type TUseNavigator = () => TUseNavigatorResponse;

export const useNavigator: TUseNavigator = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // userDecisionTimeout: 5000,
      watchPosition: true,
    });
  console.log("coords: ", coords);

  return {
    latitude: coords?.latitude,
    longitude: coords?.longitude,
  };
};
