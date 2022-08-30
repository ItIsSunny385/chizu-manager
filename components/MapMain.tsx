import { IDBPDatabase } from "idb";
import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import { ChizuManagerDB, putChizu } from "../utils/db";
import { useChizu, useConfig } from "../utils/hook";
import "leaflet/dist/leaflet.css";
import { TileLayerOffline } from "../lib/leaflet-offline-react/TileLayerOffline";
import BasicInfoModal from "./BasicInfoModal";

interface Props {
  db: IDBPDatabase<ChizuManagerDB>;
  id: string;
}

const MapMain = (props: Props) => {
  const config = useConfig(props.db);
  const chizu = useChizu(props.db, props.id);
  const [displayBasicInfoModal, setDisplayBasicInfoModal] = useState(false);

  useEffect(() => {
    if (chizu === null) {
      setDisplayBasicInfoModal(true);
    }
  }, [chizu]);

  return config != null && typeof chizu !== "undefined" ? (
    <React.Fragment>
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
      {displayBasicInfoModal && (
        <BasicInfoModal
          target={
            chizu != null ? chizu : { id: props.id, name: "", description: "" }
          }
          onSave={async (chizu) => {
            await putChizu(props.db, chizu);
            setDisplayBasicInfoModal(false);
          }}
          onCancel={
            chizu != null ? () => setDisplayBasicInfoModal(false) : undefined
          }
        />
      )}
    </React.Fragment>
  ) : (
    <React.Fragment />
  );
};

export default MapMain;
