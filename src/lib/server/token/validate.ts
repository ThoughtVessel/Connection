import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'def';

interface TokenPayload {
  uid: string;
  iat?: number;
  exp?: number;
}

const isTokenPayload = (decoded: any): decoded is TokenPayload => {
  return decoded && typeof decoded.uid === 'string';
};

const validateToken = async (token: string): Promise<string | null> => {
  try {
    const decoded = jwt.verify(token, secret);

    if (isTokenPayload(decoded)) {
      return decoded.uid;
    }
  } catch (err) {}
  return null;
};

export default validateToken;
