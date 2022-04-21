import { RequestConfig, history } from 'umi';

export const request: RequestConfig = {
  // skipErrorHandler: true,
  headers: {
    'Content-Type': 'application/json',
  },
  errorConfig: {
    adaptor: (resData: any) => {
      if (resData.detail) {
        switch (resData.detail.code) {
          case 401:
            setTimeout(() => {
              history.push('/login');
            }, 1500);
            return {
              success: resData.detail.success,
              data: resData.detail.data,
              errorCode: resData.detail.code,
              errorMessage: resData.detail.msg,
              showType: 2,
            };
          default:
            return {
              success: resData.detail.success,
              data: resData.detail.data,
              errorCode: resData.detail.code,
              errorMessage: resData.detail.msg,
              showType: 2,
            };
        }
      }
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
