const allowedCors = [
  'https://mesto.ghostwriter.nomoredomains.work',
  'http://mesto.ghostwriter.nomoredomains.work',
  'https://api.mesto.ghostwriter.nomoredomains.work',
  'http://api.mesto.ghostwriter.nomoredomains.work',
  'localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
  // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};
