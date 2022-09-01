import React, { useEffect, useState } from "react";
import { CircleMarker, Polygon, Polyline, useMapEvents } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import { Bound } from "../types/db";

interface Props {
  id: string;
  defaultBounds: Bound[];
  saveBounds: (data: Bound[]) => Promise<void>;
}

const CreateBounds = (props: Props) => {
  const [bounds, setBounds] = useState(props.defaultBounds);
  const [closed, setClosed] = useState(props.defaultBounds.length > 2);
  const [draggingI, setDraggingI] = useState<number>();
  const map = useMapEvents({
    click(e) {
      if (
        !closed &&
        (bounds.length === 0 ||
          bounds[0].lat !== e.latlng.lat ||
          bounds[0].lng !== e.latlng.lng)
      ) {
        setBounds([
          ...bounds,
          {
            id: uuidv4(),
            chizuId: props.id,
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            order: bounds.length + 1,
          },
        ]);
      }
    },
    mousemove(e) {
      if (draggingI != null) {
        setBounds((prev) => {
          const next = [...prev];
          next[draggingI] = { ...next[draggingI], ...e.latlng };
          props.saveBounds(next);
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
      <Polygon positions={bounds} />
      {bounds.map((x, i) => (
        <CircleMarker
          key={i}
          center={x}
          radius={5}
          eventHandlers={{
            click:
              i === 0
                ? () => {
                    setClosed(true);
                    props.saveBounds(bounds);
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
  ) : (
    <React.Fragment>
      <Polyline positions={bounds} />
      {bounds.map((x, i) => (
        <CircleMarker
          key={i}
          center={x}
          radius={5}
          eventHandlers={{
            click:
              i === 0
                ? (e) => {
                    setClosed(true);
                    props.saveBounds(bounds);
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
