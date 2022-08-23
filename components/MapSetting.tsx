import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useRef, useState } from "react";
import { IDBPDatabase } from "idb";
import { ChizuManagerDB, putConfig } from "../utils/db";
import { useConfig } from "../utils/hook";
import { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import { Config } from "../types/db";

interface Props {
  db: IDBPDatabase<ChizuManagerDB>;
}

const MapSetting = (props: Props) => {
  const [map, setMap] = useState<LeafletMap>();
  const markerRef = useRef<LeafletMarker>(null);
  const config = useConfig(props.db);

  return config != null ? (
    <MapContainer
      center={[config.defaultLatitude, config.defaultLongitude]}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
      whenCreated={(x) => setMap(x)}
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
            const latLng = markerRef.current!.getLatLng();
            map!.flyTo(latLng);
            const nextConfig: Config = {
              ...config,
              defaultLatitude: latLng.lat,
              defaultLongitude: latLng.lng,
            };
            await putConfig(props.db, nextConfig);
          },
          zoomend: async () => {
            const nextConfig: Config = {
              ...config,
              defaultZ: map!.getZoom(),
            };
            await putConfig(props.db, nextConfig);
          },
        }}
      />
    </MapContainer>
  ) : (
    <div />
  );
};

export default MapSetting;
