type cipherMethod = 'xor' | 'caesar';

export interface Message {
    id: number;
    message: string;
    cipherMethod: cipherMethod;
    cipherKey: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface NewMessage {
    message: string;
    cipherMethod: cipherMethod;
    cipherKey: string;
}