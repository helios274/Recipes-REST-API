class ValidationError extends Error {
  constructor(errors) {
    const error = errors.array()[0];
    super();
    this.message = error.msg;
    this.location = error.location;
    this.statusCode = 400;
  }
}

export default ValidationError;
