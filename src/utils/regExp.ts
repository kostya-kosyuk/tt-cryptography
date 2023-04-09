const messageRegExp = /^[a-zA-Z0-9.,:;?!@#$%^&*()\-_+=\[\]{}<>\s]+$/;

export const checkMessage = (message: string) => {
    if (!messageRegExp.test(message)) {
        throw new Error("Only Latin characters and symbols are accepted");
    }
};