export interface IRoute {
  name: string;
  points: IPoint[];
  img?: string;
  street?: {start:number;}
  avgtime?:number;
  distance?: number;
}

export interface IPoint {
  x: number;
  y: number;
}
