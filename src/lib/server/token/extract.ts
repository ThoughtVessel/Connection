/*
Extract token from request

@req: entire request

returns token or null
*/

import { NextRequest } from 'next/server';

const extractToken =  async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];

    return token;
  } catch(err) {
    return null;
  }
}

export default extractToken;
