export interface IUserLocation {
  username: string;
  position: IPosition;
  timeToLive?: number;
}

export interface IPosition {
  x: number;
  y: number;
}
