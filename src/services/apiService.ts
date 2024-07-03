import axios, {
	AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";
import { WEATHER_API_LINK } from "../config";

const apiClient: AxiosInstance = axios.create({
	baseURL: WEATHER_API_LINK,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

apiClient.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		if (error.response) {
			console.warn("API error: ", error.response.data);
		} else {
			console.warn("Network error: ", error.message);
		}
		return Promise.reject(error);
	}
);

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export const makeRequest = async <T = any>(
	method: HttpMethod,
	url: string,
	params: Record<string, any> = {},
	headers: Record<string, string> = {},
	responseType?: AxiosRequestConfig["responseType"]
): Promise<T> => {
	try {
		const config: AxiosRequestConfig<any> = {
			method,
			url,
			params,
			headers,
		};

		if (responseType !== undefined) config.responseType = responseType;

		const response: AxiosResponse<T> = await apiClient(config);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.warn(error);
			throw new Error(
				error.response ? error.response.data.message : error.message
			);
		}
		throw error;
	}
};
