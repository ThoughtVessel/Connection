import { NextRequest } from 'next/server';

const hasBody = async (req: NextRequest) => {
  let body;
   try {
     body = await req.json();
   } catch (err) {
     return false;
   }
   return body;
};

export default hasBody;
