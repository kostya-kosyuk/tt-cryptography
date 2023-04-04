import { Message, newMessage } from "../types/Message";
import { client } from "../utils/fetchClient";

export const getMessages = () => {
    const url = '/message/get';

    return client.get(url);
};

export const createMessage = (message: newMessage) => {
    const url = '/message/create';

    return client.post(url, message);
};

export const updateMessage = (id: number, message: newMessage) => {
    const url = `/message/update/${id}`;

    return client.patch(url, message);
};

export const deleteMessage = (id: number) => {
    const url = `/message/delete/${id}`;

    return client.delete(url);
};