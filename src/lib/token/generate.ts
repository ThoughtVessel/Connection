import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'def';

const generateToken = (user: any) => {
  const payload = { uid: user.uid };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export default generateToken;
