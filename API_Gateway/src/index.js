const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PORT = 3005;

app.use(morgan("combined"));

app.use(
  '/bookingservice',
  createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,   
  })
);


app.get("/home", (req, res) => {
  return res.json({ message: "Ok" });
});

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
