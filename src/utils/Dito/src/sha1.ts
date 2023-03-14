import sha1 from 'sha1';

const convertSha1 = (message: string) => sha1(message);

export default convertSha1;
