import { MapContainer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useRef, useState } from "react";
import { IDBPDatabase } from "idb";
import { ChizuManagerDB, putConfig } from "../utils/db";
import { useConfig } from "../utils/hook";
import { Config } from "../types/db";
import { Icon } from "leaflet";
import { OfflineTileLayer } from "../lib/leaflet-offline-react/OfflineTIleLayer";

interface ChildProps {
  db: IDBPDatabase<ChizuManagerDB>;
  config: Config;
}

const MapSettingChild = (props: ChildProps) => {
  const [center, setCenter] = useState({
    lat: props.config.defaultLatitude,
    lng: props.config.defaultLongitude,
  });

  const map = useMapEvents({
    zoomend: async () => {
      const latLng = map.getCenter();
      const nextConfig: Config = {
        ...props.config,
        defaultLatitude: latLng.lat,
        defaultLongitude: latLng.lng,
        defaultZ: map.getZoom(),
      };
      setCenter(map.getCenter());
      await putConfig(props.db, nextConfig);
    },
    moveend: async () => {
      const latLng = map.getCenter();
      const nextConfig: Config = {
        ...props.config,
        defaultLatitude: latLng.lat,
        defaultLongitude: latLng.lng,
        defaultZ: map.getZoom(),
      };
      setCenter(map.getCenter());
      await putConfig(props.db, nextConfig);
    },
  });

  return (
    <Marker
      position={center}
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
      draggable
      eventHandlers={{
        dragend: async (evt) => {
          const latLng = evt.target.getLatLng();
          map.flyTo(latLng);
          // flyTo が完了すると Map の zoomend が発火する
        },
      }}
    />
  );
};

interface Props {
  db: IDBPDatabase<ChizuManagerDB>;
}

const MapSetting = (props: Props) => {
  const tileLayerOfflineRef = useRef<any>(null);
  const config = useConfig(props.db);

  return config != null ? (
    <MapContainer
      center={[config.defaultLatitude, config.defaultLongitude]}
      zoom={config.defaultZ}
      style={{ height: "80vh", width: "100%" }}
    >
      <OfflineTileLayer
        ref={tileLayerOfflineRef}
        attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
      <MapSettingChild db={props.db} config={config} />
    </MapContainer>
  ) : (
    <div />
  );
};

export default MapSetting;
