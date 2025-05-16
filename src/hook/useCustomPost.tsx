import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


export const useCustomPost = ({
  onSuccess,
  onError,
  baseURL = 'http://5.182.26.107:4000', 
}) => {
  const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const postData = async ({ endpoint, body, headers = {} }) => {
    const response = await api.post(endpoint, body, { headers });
    return response.data;
  };

  return useMutation({
    mutationFn: postData,
    onSuccess,
    onError,
  });
};
