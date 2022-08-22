import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useRef } from "react";
import { IDBPDatabase } from "idb";
import { ChizuManagerDB, putConfig } from "../utils/db";
import { useConfig } from "../utils/hook";

interface Props {
  db: IDBPDatabase<ChizuManagerDB>;
}

const MapSetting = (props: Props) => {
  const markerRef = useRef<any>(null);
  const config = useConfig(props.db);

  return config != null ? (
    <MapContainer
      center={[config.defaultLatitude, config.defaultLongitude]}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
      <Marker
        ref={markerRef}
        position={[config.defaultLatitude, config.defaultLongitude]}
        draggable
        icon={
          new Icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })
        }
        eventHandlers={{
          dragend: async () => {
            const latLng = markerRef.current.getLatLng();
            const newConfig = {
              ...config,
              defaultLatitude: latLng.lat,
              defaultLongitude: latLng.lng,
            };
            await putConfig(props.db, newConfig);
          },
        }}
      />
    </MapContainer>
  ) : (
    <div />
  );
};

export default MapSetting;
