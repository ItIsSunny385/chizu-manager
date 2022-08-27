import { createTileLayerComponent, updateGridLayer, withPane } from '@react-leaflet/core';
import { OfflineTileLayer as LeafletOfflineTileLayer } from "../leaflet-offline/OfflineTileLayer";
export const OfflineTileLayer = createTileLayerComponent(function createTileLayer(_ref, context) {
  let {
    url,
    ...options
  } = _ref;
  return {
    instance: new LeafletOfflineTileLayer(url, withPane(options, context)),
    context
  };
}, updateGridLayer);