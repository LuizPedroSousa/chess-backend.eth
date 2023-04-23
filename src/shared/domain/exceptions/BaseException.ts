export type StatusException = 'bad_request' | 'unauthorized' | 'not_found' | 'internal' | 'forbidden';

export class BaseException extends Error {
  constructor(public status: StatusException = 'internal', public message: string) {
    super(message);
  }
}
