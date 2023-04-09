import { XCaesar } from 'xcaesar';
import { CryptoXor } from 'crypto-xor';
import { CipherMethod } from '../types/Message';

const xorEncrypt = (str: string, key: string) => {
    return CryptoXor.encrypt(str, key);
};

const xorDecrypt = (str: string, key: string) => {
    return CryptoXor.decrypt(str, key);
};

const caesarEncrypt = (str: string, key: number) => {
    return XCaesar({shift: key}).encrypt(str);
};

const caesarDecrypt = (str: string, key: number) => {
    return XCaesar({ shift: key }).decrypt(str);
};

export const encrypt = (method: CipherMethod, str: string, key: string) => {
    if (method === 'caesar') {
        return caesarEncrypt(str, +key);
    } else {
        return xorEncrypt(str, key);
    }
};

export const decrypt = (method: CipherMethod, str: string, key: string) => {
    if (method === 'caesar') {
        return caesarDecrypt(str, +key);
    } else {
        return xorDecrypt(str, key);
    }
};