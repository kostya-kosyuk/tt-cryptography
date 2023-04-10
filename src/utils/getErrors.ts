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

    const result = errorMsg.map(msg => {
        switch (msg) {
            case 'Failed to fetch':
                return 'Server is unavailable'
            default:
                return msg;
        }
    })

    return result;
};

export default getErrors;