/* @types/leaflet と leaflet.offline をもとに実装 */

export interface GridLayerOptions {
  tileSize?: number | Point | undefined;
  opacity?: number | undefined;
  updateWhenIdle?: boolean | undefined;
  updateWhenZooming?: boolean | undefined;
  updateInterval?: number | undefined;
  attribution?: string | undefined;
  zIndex?: number | undefined;
  bounds?: LatLngBoundsExpression | undefined;
  minZoom?: number | undefined;
  maxZoom?: number | undefined;
  /**
   * Maximum zoom number the tile source has available. If it is specified, the tiles on all zoom levels higher than
   * `maxNativeZoom` will be loaded from `maxNativeZoom` level and auto-scaled.
   */
  maxNativeZoom?: number | undefined;
  /**
   * Minimum zoom number the tile source has available. If it is specified, the tiles on all zoom levels lower than
   * `minNativeZoom` will be loaded from `minNativeZoom` level and auto-scaled.
   */
  minNativeZoom?: number | undefined;
  noWrap?: boolean | undefined;
  pane?: string | undefined;
  className?: string | undefined;
  keepBuffer?: number | undefined;
}

export type DoneCallback = (error?: Error, tile?: HTMLElement) => void;

export interface InternalTiles {
  [key: string]: {
    active?: boolean | undefined;
    coords: Coords;
    current: boolean;
    el: HTMLElement;
    loaded?: Date | undefined;
    retain?: boolean | undefined;
  };
}

export class GridLayer extends Layer {
  constructor(options?: GridLayerOptions);
  bringToFront(): this;
  bringToBack(): this;
  getContainer(): HTMLElement | null;
  setOpacity(opacity: number): this;
  setZIndex(zIndex: number): this;
  isLoading(): boolean;
  redraw(): this;
  getTileSize(): Point;

  protected async createTile(coords: Coords, done: DoneCallback): HTMLElement;
  protected _tileCoordsToKey(coords: Coords): string;
  protected _wrapCoords(parameter: Coords): Coords;

  protected _tiles: InternalTiles;
  protected _tileZoom?: number | undefined;
}

export function gridLayer(options?: GridLayerOptions): GridLayer;
