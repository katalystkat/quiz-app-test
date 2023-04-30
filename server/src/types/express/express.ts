import { Request } from 'express';

// Setting properties optional
export interface TypedRequestBody<T> extends Request{
    body: Partial<T>;
}