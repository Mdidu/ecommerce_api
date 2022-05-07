import Status from "./status";

export type ResponseService = {
  status: Status;
  data: unknown | undefined;
  token: string | undefined;
}