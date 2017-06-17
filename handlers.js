/* alternative wrapper to using try/catch for async/await
  NOTE: only works for controllers invoked by express routing */
/* eslint-disable */
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next)
  }
}
/* eslint-enable */

/* full stacktrace sent upstream when error in dev */
exports.developmentErrors = (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack
      ? err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
      : ''
  }
  res.status(err.status || 500).send(res.json(errorDetails))
}

/* only the err message sent upstream in prod */
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message })
}
