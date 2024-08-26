import bcrypt from 'bcryptjs';


const validatePassword = async (uncrypt: string, encrypt: string) => {
  return await bcrypt.compare(uncrypt, encrypt);
};

export default validatePassword;
