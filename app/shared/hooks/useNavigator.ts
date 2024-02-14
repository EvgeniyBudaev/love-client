import { useGeolocated } from "react-geolocated";
import { useMemo } from "react";

export type TUseNavigatorResponse = {
  isCoords: boolean;
  latitude?: number;
  longitude?: number;
};

type TUseNavigator = () => TUseNavigatorResponse;

export const useNavigator: TUseNavigator = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      // userDecisionTimeout: 5000,
      watchPosition: true,
    });

  const isCoords = useMemo(() => {
    return !!coords?.longitude && !!coords.latitude;
  }, [coords]);

  return {
    isCoords,
    latitude: coords?.latitude,
    longitude: coords?.longitude,
  };
};
