import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'def';

const generateToken = async (uid: string) => {
  const payload = { uid: uid };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export default generateToken;
