import { unknown } from "zod";

export function ok<T>(datas: T) {
  return {
    statusCode: 200,
    body: datas,
  };
};