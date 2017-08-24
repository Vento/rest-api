import {IRoute} from "../pages/routes/RouteModel";
import {IRecord} from "../pages/statistics/RecordModel";

export interface IProfile {
  name: string;
  lastSeen: number;
  records: IRecord[];
  routes: IRoute[];
  gender: string;
}
