/* react-leaflet をもとに実装 */

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
