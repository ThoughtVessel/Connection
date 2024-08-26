import { NextResponse } from 'next/server';

export const OK_ =  (body: Record<string, any>) => {
  return NextResponse.json(body, { status: 200 });
};

export const OK =  () => {
  return NextResponse.json(null,{ status: 200 });
}

export const CREATED =  () => {
  return NextResponse.json(null,{ status: 201 });
}

export const DELETED_NO_CONTENT =  () => {
  return new NextResponse(null, { status: 204 });
};

export const MISSING_BODY =  () => {
  return NextResponse.json({
  error: 'Request must contain a body'
}, { status: 400 });
}

export const MISSING_ATTRIBUTE =  () => {
  return NextResponse.json({
  error: 'Request missing required attributes'
}, { status: 400 });
}

export const INVALID_ =  (item: string) => {
  return NextResponse.json({
    error: 'Invalid ' + item
  }, { status: 400 });
};

export const UNAUTHORIZED =  () => {
  return NextResponse.json({
  error: 'Unauthorized'
}, { status: 401 });}

export const BAD_TOKEN =  () => {
  return NextResponse.json({
  error: 'Invalid token'
}, { status: 401 });}

export const FORBIDDEN =  () => {
  return NextResponse.json({
  error: 'Unauthorized'
}, { status: 403 });}

export const NOT_FOUND_ =  (item: string) => {
  return NextResponse.json({
    error: item + ' not found'
  }, { status: 404 });
};

export const INVALID_PASSWORD =  () => {
  return NextResponse.json({
  error: 'Invalid password'
}, { status: 409 });}

export const EXISTS_ =  (item: string) => {
  return NextResponse.json({
    error: item + ' already exists'
  }, { status: 409 });
};

export const INTERNAL_ERROR =  () => {
  return NextResponse.json({
  error: 'Internal Service Error'
}, { status: 500 });}
