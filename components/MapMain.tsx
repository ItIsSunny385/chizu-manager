import { IDBPDatabase } from "idb";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { ChizuManagerDB } from "../utils/db";
import { useConfig } from "../utils/hook";
import "leaflet/dist/leaflet.css";

interface Props {
  db: IDBPDatabase<ChizuManagerDB>;
}

const MapMain = (props: Props) => {
  const config = useConfig(props.db);
  return config != null ? (
    <MapContainer
      center={[config.defaultLatitude, config.defaultLongitude]}
      zoom={config.defaultZ}
      style={{
        height: `calc(100vh - ${
          document.getElementsByTagName("header")[0].clientHeight
        }px`,
        width: "100%",
      }}
    >
      <TileLayer
        attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
    </MapContainer>
  ) : (
    <React.Fragment />
  );
};

export default MapMain;
