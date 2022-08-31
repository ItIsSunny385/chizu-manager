import { LatLng } from "leaflet";
import React, { useState } from "react";
import { CircleMarker, Polygon, Polyline, useMapEvents } from "react-leaflet";

interface Props {}

const CreateBounds = (props: Props) => {
  const [positions, setPositions] = useState<LatLng[]>([]);
  const [closed, setClosed] = useState(false);
  const [draggingI, setDraggingI] = useState<number>();
  const map = useMapEvents({
    click(e) {
      if (
        !closed &&
        (positions.length === 0 ||
          positions[0].lat !== e.latlng.lat ||
          positions[0].lng !== e.latlng.lng)
      ) {
        setPositions([...positions, e.latlng]);
      }
    },
    mousemove(e) {
      if (draggingI != null) {
        setPositions((prev) => {
          const next = [...prev];
          next[draggingI] = e.latlng;
          return next;
        });
      }
    },
    mouseup(e) {
      if (draggingI != null) {
        map.dragging.enable();
        setDraggingI(undefined);
      }
    },
  });

  return closed ? (
    <React.Fragment>
      <Polygon positions={positions} />
      {positions.map((x, i) => (
        <CircleMarker
          key={i}
          center={x}
          radius={5}
          eventHandlers={{
            click: i === 0 ? () => setClosed(true) : undefined,
            mousedown: () => {
              map.dragging.disable();
              map.boxZoom.disable();
              setDraggingI(i);
            },
          }}
          pathOptions={{ fill: true, fillOpacity: 1 }}
        />
      ))}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Polyline positions={positions} />
      {positions.map((x, i) => (
        <CircleMarker
          key={i}
          center={x}
          radius={5}
          eventHandlers={{
            click:
              i === 0
                ? (e) => {
                    setClosed(true);
                    e.originalEvent.preventDefault();
                  }
                : undefined,
            mousedown: () => {
              map.dragging.disable();
              map.boxZoom.disable();
              setDraggingI(i);
            },
          }}
          pathOptions={{ fill: true, fillOpacity: 1 }}
        />
      ))}
    </React.Fragment>
  );
};

export default CreateBounds;
