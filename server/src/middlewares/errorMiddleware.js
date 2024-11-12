const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode);

  res.json({
    message: message,
    stack: process.env.NODE_ENVIRONMENT == 'production' ? null : err.stack,
  });
};

export default errorHandler;
