export function errorHandler (err, res) {
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: err
  });
}
