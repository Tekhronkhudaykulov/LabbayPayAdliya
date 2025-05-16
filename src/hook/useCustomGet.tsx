import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface customGetType {
  key: string;
  endpoint: string;
  params?: any;
  headers?: any;
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  refetchInterval?: number;
  baseURL?: string;
}

export const useCustomGet = ({
  key,
  endpoint,
  params = {},
  headers = {},
  enabled = true,
  onSuccess,
  onError,
  refetchInterval,
  baseURL = "http://5.182.26.107:4000",
}: customGetType) => {
  const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  const fetchData = async () => {
    const response = await api.get(endpoint, { params });
    return response.data;
  };

  return useQuery({
    queryKey: [key, params],
    queryFn: fetchData,
    enabled,
    // @ts-ignore
    onSuccess,
    onError,
    refetchInterval,
  });
};
