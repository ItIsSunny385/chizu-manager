import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import React, { useRef } from "react";
import { IDBPDatabase } from "idb";
import { ChizuManagerDB, putConfig } from "../utils/db";
import { useConfig } from "../utils/hook";
import { Config } from "../types/db";
import { Marker as LeafletMarker } from "leaflet";

interface ChildProps {
  db: IDBPDatabase<ChizuManagerDB>;
  config: Config;
}

const MapSettingChild = (props: ChildProps) => {
  const map = useMapEvent("zoomend", async () => {
    const latLng = markerRef.current!.getLatLng();
    const nextConfig: Config = {
      ...props.config,
      defaultLatitude: latLng.lat,
      defaultLongitude: latLng.lng,
      defaultZ: map.getZoom(),
    };
    await putConfig(props.db, nextConfig);
  });
  const markerRef = useRef<LeafletMarker>(null);

  return (
    <Marker
      ref={markerRef}
      position={[props.config.defaultLatitude, props.config.defaultLongitude]}
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
  const config = useConfig(props.db);

  return config != null ? (
    <MapContainer
      center={[config.defaultLatitude, config.defaultLongitude]}
      zoom={config.defaultZ}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
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
