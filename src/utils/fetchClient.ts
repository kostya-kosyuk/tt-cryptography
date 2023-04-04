const BASE_URL = 'http://127.0.0.1:3001';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export function request(
    url: string,
    method: RequestMethod = 'GET',
    data: any = null,
) {
    const options: RequestInit = {
        method,
        credentials: 'include'
    };

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        };
    }

    return fetch(BASE_URL + url, options);
}

export const client = {
    get: (url: string) => request(url),
    post: (url: string, data: any) => request(url, 'POST', data),
    patch: (url: string, data: any) => request(url, 'PATCH', data),
    delete: (url: string) => request(url, 'DELETE'),
};
