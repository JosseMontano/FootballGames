import bcrypt from 'bcryptjs';

export const hashedString = (str: string) => {
    return bcrypt.hashSync(str, 10);
}

export const compareHashedString = (str: string, hashedStr: string) => {
    return bcrypt.compareSync(str, hashedStr)
}