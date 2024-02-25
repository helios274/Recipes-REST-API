export function formatString(str) {
  str = str.trim();
  str = str.replace(/\s{2,}/g, " ");
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
}

export function sendValidationErrorResponse(response, errors) {
  const error = errors.array()[0];
  return response.status(400).send({
    success: false,
    error: {
      field: error.path,
      value: error.value ? error.value : null,
      message: error.msg,
    },
  });
}
