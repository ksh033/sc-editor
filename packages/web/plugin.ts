import type { IApi } from 'umi';

export default (api: IApi) => {

  console.log("sdfsdfsdf")
  // 中间件支持 cors
  api.addMiddlewares(()=>{
    return function cors(
      req,
      res,
      next,
    ) {
      res.setHeader("Origin-Agent-Cluster","?0");
    
      next();
    }
  });
};