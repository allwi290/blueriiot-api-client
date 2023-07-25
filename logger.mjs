export const logger = {
    log: (message) => {
        console.log(JSON.stringify(message, null, 1));
    },
    debug: (message) => {
        console.debug(message);
    },
    info: (message) => {
        console.info(message);
    },
    error: (message) => {
        console.error(message);
    }
};
