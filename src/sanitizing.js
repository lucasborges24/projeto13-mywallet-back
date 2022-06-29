import { stripHtml } from 'string-strip-html';

function sanit(string) {
    const sanitize = stripHtml(string).result;
    return sanitize
}

export {
    sanit
}