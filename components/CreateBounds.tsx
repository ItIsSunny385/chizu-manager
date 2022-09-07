import React, { useState } from "react";
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
  const [dragging, setDragging] = useState<
    | number
    | {
        index: number;
        position: { lat: number; lng: number };
      }
  >();
  const [afterDragging, setAfterDragging] = useState(false);

  const map = useMapEvents({
    click(e) {
      if (
        !afterDragging &&
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
      if (typeof dragging === "number") {
        setBounds((prev) => {
          const next = [...prev];
          next[dragging] = { ...next[dragging], ...e.latlng };
          return next;
        });
      } else if (typeof dragging !== "undefined") {
        setDragging({ ...dragging, position: e.latlng });
      }
    },
    mouseup(e) {
      if (typeof dragging === "number") {
        map.dragging.enable();
        props.saveBounds(bounds);
        setDragging(undefined);
        setAfterDragging(true);
        setTimeout(() => setAfterDragging(false), 100);
      } else if (typeof dragging !== "undefined") {
        map.dragging.enable();
        setBounds((prev) => {
          const next = [...prev];
          next.splice(dragging.index + 1, 0, {
            id: uuidv4(),
            chizuId: props.id,
            order: bounds.length + 1,
            ...dragging.position,
          });
          next.forEach((x, i) => {
            x.order = i + 1;
          });
          return next;
        });
        setDragging(undefined);
        setAfterDragging(true);
        setTimeout(() => setAfterDragging(false), 100);
      }
    },
  });

  const getTempBounds = (
    bounds: Bound[],
    draggingJ: { index: number; position: { lat: number; lng: number } }
  ) => {
    const tempBounds: [number, number][] = bounds.map((x) => [x.lat, x.lng]);
    tempBounds.splice(draggingJ.index + 1, 0, [
      draggingJ.position.lat,
      draggingJ.position.lng,
    ]);
    return tempBounds;
  };

  return closed ? (
    <React.Fragment>
      <Polygon
        positions={
          typeof dragging === "number" || typeof dragging === "undefined"
            ? bounds.map((x) => [x.lat, x.lng])
            : getTempBounds(bounds, dragging)
        }
      />
      {bounds.map((x, i) => (
        <CircleMarker
          key={x.id}
          center={x}
          radius={5}
          eventHandlers={{
            click:
              i === 0
                ? () => {
                    setClosed(true);
                    props.saveBounds(bounds);
                    setDragging(undefined);
                  }
                : undefined,
            mousedown: () => {
              map.dragging.disable();
              map.boxZoom.disable();
              setDragging(i);
            },
          }}
          pathOptions={{ fill: true, fillOpacity: 1 }}
        />
      ))}
      {bounds.map((x, j) => {
        const y = bounds[(j + 1) % bounds.length];
        const center = { lat: (x.lat + y.lat) / 2, lng: (x.lng + y.lng) / 2 };
        return (
          <CircleMarker
            key={x.id}
            center={
              typeof dragging !== "undefined" &&
              typeof dragging !== "number" &&
              j === dragging.index
                ? dragging.position
                : center
            }
            radius={5}
            eventHandlers={{
              mousedown: () => {
                map.dragging.disable();
                map.boxZoom.disable();
                setDragging({ index: j, position: center });
              },
            }}
            pathOptions={{ fill: true, fillOpacity: 1 }}
          />
        );
      })}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Polyline
        positions={
          typeof dragging === "number" || typeof dragging === "undefined"
            ? bounds.map((x) => [x.lat, x.lng])
            : getTempBounds(bounds, dragging)
        }
      />
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
                    setDragging(undefined);
                  }
                : undefined,
            mousedown: () => {
              map.dragging.disable();
              map.boxZoom.disable();
              setDragging(i);
            },
          }}
          pathOptions={{ fill: true, fillOpacity: 1 }}
        />
      ))}
      {bounds
        .filter((_, i) => i !== bounds.length - 1)
        .map((x, j) => {
          const y = bounds[(j + 1) % bounds.length];
          const center = { lat: (x.lat + y.lat) / 2, lng: (x.lng + y.lng) / 2 };
          return (
            <CircleMarker
              key={x.id}
              center={
                typeof dragging !== "undefined" &&
                typeof dragging !== "number" &&
                j === dragging.index
                  ? dragging.position
                  : center
              }
              radius={5}
              eventHandlers={{
                mousedown: () => {
                  map.dragging.disable();
                  map.boxZoom.disable();
                  setDragging({ index: j, position: center });
                },
              }}
              pathOptions={{ fill: true, fillOpacity: 1 }}
            />
          );
        })}
    </React.Fragment>
  );
};

export default CreateBounds;
