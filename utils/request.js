const axios = require('axios')

const request = axios.create()
request.interceptors.response.use(function (response) {
    // 直接把data处理掉
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  // 暴露
  module.exports = {
    request
  }