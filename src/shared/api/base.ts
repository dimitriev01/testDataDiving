import axios from 'axios';
import { requestHandler, responseHandler } from './interceptors';

const apiInstance = axios.create({
  baseURL: `localhost:5000/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
apiInstance.interceptors.request.use(requestHandler);
apiInstance.interceptors.response.use(responseHandler);

export default apiInstance;
