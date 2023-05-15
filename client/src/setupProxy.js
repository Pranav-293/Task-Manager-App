// Middle for setting the proxies
const { createProxyMiddleware } = require("http-proxy-middleware");

// Setting proxy for authentication microservice
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

  // Setting proxy for task management microservice
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
