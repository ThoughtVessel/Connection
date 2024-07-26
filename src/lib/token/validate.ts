import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'def';

const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch(err) {
    return null;
  }
};

export default validateToken;
