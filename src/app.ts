import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  // skipErrorHandler: true,
  headers: {
    'Content-Type': 'application/json',
  },
  errorConfig: {
    adaptor: (resData: any) => {
      return {
        success: resData.success,
        // data: resData.data,
        errorCode: resData.code,
        errorMessage: resData.msg,
        showType: 1,
      };
    },
  },
};
