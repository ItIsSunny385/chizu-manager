export interface OfflineTileLayerOptions extends GridLayerOptions {
  id?: string | undefined;
  accessToken?: string | undefined;
  minZoom?: number | undefined;
  maxZoom?: number | undefined;
  maxNativeZoom?: number | undefined;
  minNativeZoom?: number | undefined;
  subdomains?: string | string[] | undefined;
  errorTileUrl?: string | undefined;
  zoomOffset?: number | undefined;
  tms?: boolean | undefined;
  zoomReverse?: boolean | undefined;
  detectRetina?: boolean | undefined;
  crossOrigin?: CrossOrigin | undefined;
  // [name: string]: any;
  // You are able add additional properties, but it makes this interface uncheckable.
  // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/15313
  // Example:
  // OfflineTileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}&{bar}&{abc}', {foo: 'bar', bar: (data: any) => 'foo', abc: () => ''});
}

export class OfflineTileLayer extends GridLayer {
  constructor(urlTemplate: string, options?: OfflineTileLayerOptions);
  setUrl(url: string, noRedraw?: boolean): this;
  getTileUrl(coords: L.Coords): string;

  protected _tileOnLoad(done: L.DoneCallback, tile: HTMLElement): void;
  protected _tileOnError(
    done: L.DoneCallback,
    tile: HTMLElement,
    e: Error
  ): void;
  protected _abortLoading(): void;
  protected _getZoomForUrl(): number;

  options: OfflineTileLayerOptions;
}

export function offlineTileLayer(
  urlTemplate: string,
  options?: OfflineTileLayerOptions
): OfflineTileLayer;
