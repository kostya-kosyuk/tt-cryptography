const getErrors = (error: any) => {
    const errorMsg = [];

    if (error['errors']) {
        const messages = error.errors.errors.map((err: { msg: string; }) => {
            return err.msg;
        });

        errorMsg.push(...messages);
    } else {
        if (error['message']) {
            errorMsg.push(error['message']);
        }
    }

    return errorMsg;
};

export default getErrors;