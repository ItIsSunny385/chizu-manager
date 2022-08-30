/**
 * Copyright 2020 Paul Le Cam and contributors (“Licensor”)
 * https://github.com/PaulLeCam/react-leaflet/blob/v3.2.5/packages/react-leaflet/src/TileLayer.tsx をもとに実装しました
 */

import {
  createTileLayerComponent,
  updateGridLayer,
  withPane,
  type LayerProps,
} from "@react-leaflet/core";
import { type TileLayerOptions } from "leaflet";
import { TileLayerOffline as LeafletTileLayerOffline } from "../leaflet-offline/TileLayerOffline";

export interface TileLayerProps extends TileLayerOptions, LayerProps {
  url: string;
}

export const TileLayerOffline = createTileLayerComponent<
  LeafletTileLayerOffline,
  TileLayerProps
>(function createTileLayer(_ref, context) {
  let { url, ...options } = _ref;
  return {
    instance: new LeafletTileLayerOffline(url, withPane(options, context)),
    context,
  };
}, updateGridLayer);
