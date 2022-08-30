import { IDBPDatabase } from "idb";
import React from "react";
import { MapContainer } from "react-leaflet";
import { ChizuManagerDB } from "../utils/db";
import { useConfig } from "../utils/hook";
import "leaflet/dist/leaflet.css";
import { TileLayerOffline } from "../lib/leaflet-offline-react/TileLayerOffline";

interface Props {
  db: IDBPDatabase<ChizuManagerDB>;
  id: string;
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
      maxZoom={20}
    >
      <TileLayerOffline
        attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
        maxNativeZoom={18}
        maxZoom={20}
      />
    </MapContainer>
  ) : (
    <React.Fragment />
  );
};

export default MapMain;
