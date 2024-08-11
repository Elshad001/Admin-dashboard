import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';



const baseURL = `${import.meta.env.VITE_BASE_URL}/`;



export const axiosBaseQuery = ({
    baseUrl = "",
    headers,
}) => {
    return async (
        { url, params, method, data, responseType },
        { signal, getState }
    ) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method: method ? method : "GET",
                ...(params && { params: params }),
                ...(headers && { headers: headers({}, { getState, signal }) }),
                ...(data && { data: data }),
                responseType: responseType ? responseType : "json",
            });
            return {
                data: result.data,
            };
        } catch (axiosError) {
            const err = axiosError;
            return {
                error: { status: err.response?.status, data: err.response?.data },
            };
        }
    };
};

export const APIBaseQueryInterceptor = axiosBaseQuery({
    baseUrl: baseURL,
    headers: (headers, { getState }) => {
        const {
            auth: { token },
        } = getState();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        headers["x-requestid"] = uuidv4();
        return headers;
    },
});

export const APIBaseQuery = async (
    args,
    api,
    extraOptions
) => {
    let result = await APIBaseQueryInterceptor(args, api, extraOptions);

    return result;
};
