export type CipherMethod = 'xor' | 'caesar';

export interface Message {
    id: number;
    message: string;
    cipherMethod: CipherMethod;
    cipherKey: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface NewMessage {
    message: string;
    cipherMethod: CipherMethod;
    cipherKey: string;
}