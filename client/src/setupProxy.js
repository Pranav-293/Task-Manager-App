const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/auth-api",
    createProxyMiddleware({
      target: "http://localhost:8080/",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/auth-api": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
  app.use(
    "/task-api",
    createProxyMiddleware({
      target: "http://localhost:8000/",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/task-api": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
};
