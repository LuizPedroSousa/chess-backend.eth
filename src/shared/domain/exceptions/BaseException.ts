export type StatusException = 'bad_request' | 'unauthorized' | 'not_found' | 'internal';

export class BaseException extends Error {
  constructor(public status: StatusException = 'internal', public message: string) {
    super(message);
  }
}
