import { Response } from './types';

function fail(message: string, status?: number): Response<never> {
  return {
    isOK: false,
    message: message ?? 'Unknown server error.',
    status: status ?? 500,
  };
}

function success<T>(payload?: T): Response<T> {
  return { isOK: true, payload };
}

export { fail, success };
