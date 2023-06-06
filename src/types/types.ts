export interface Operator {
  id: string;
  name: string;
}

export enum Statuses {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
}
