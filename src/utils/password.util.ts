import * as bcrypt from 'bcryptjs';

export const securePassword = async (rawPassword: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(rawPassword, salt);
  return hashedPassword;
};

export const comparePassword = async (
  rawPassword: string,
  hashPassword: string,
) => {
  const result = await bcrypt.compare(rawPassword, hashPassword);
  return result;
};
