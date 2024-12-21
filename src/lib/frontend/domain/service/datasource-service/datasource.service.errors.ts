export class UnSupportedMimeType extends Error {
  constructor(type: string) {
    super(`${type} is not supported`);
    this.name = "UnSupportedMimeType";
    Error.captureStackTrace(this, this.constructor);
  }
}
