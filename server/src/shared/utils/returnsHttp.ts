import { IResponseLoginUser } from "../../application/interfaces/IReturnDatasLogin";

export function ok(datas: IResponseLoginUser) {
  return {
    statusCode: 200,
    body: datas,
  };
};

export function unprocessable(datas: IResponseLoginUser) {
  return {
    statusCode: 422,
    body: datas,
  };
};