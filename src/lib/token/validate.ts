import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'def';

const validateToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.uid;
  } catch(err) {
    return null;
  }
};

export default validateToken;
