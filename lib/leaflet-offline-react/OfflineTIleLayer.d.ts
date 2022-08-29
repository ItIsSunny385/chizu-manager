/* @types/react-leaflet をもとに実装 */

/// <reference types="react" />
import { LayerProps } from "@react-leaflet/core";
import {
  OfflineTileLayer as LeafletOfflineTileLayer,
  OfflineTileLayerOptions,
} from "../leaflet-offline/OfflineTileLayer";
export interface OfflineTileLayerProps
  extends OfflineTileLayerOptions,
    LayerProps {
  url: string;
}
export declare const OfflineTileLayer: import("react").ForwardRefExoticComponent<
  TileLayerProps & import("react").RefAttributes<LeafletOfflineTileLayer>
>;
