import { IResponseLoginUser } from "../../application/interfaces/IReturnDatasLogin";

export function ok(datas: Omit<IResponseLoginUser, 'errors'>) {
  return {
    statusCode: 200,
    body: datas,
  };
};

export function unprocessable(datas: Omit<IResponseLoginUser, 'datas'>) {
  return {
    statusCode: 422,
    body: datas,
  };
};

export function internalServerError(datas: Omit<IResponseLoginUser, 'datas'>) {
  return {
    statusCode: 500,
    body: datas,
  };
};