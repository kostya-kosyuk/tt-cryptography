import { client } from "../utils/fetchClient";

export const registration = (login: string, password: string) => {
    const url = '/auth/registration';

    return client.post(url, { login, password});
};

export const login = (login: string, password: string) => {
    const url = '/auth/login';

    return client.post(url, { login, password });
};

export const logout = () => {
    const url = '/auth/logout';

    return client.post(url, null);
};