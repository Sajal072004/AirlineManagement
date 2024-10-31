const express = require('express');

const app = express();

const PORT = 3005;

app.get('/home' , (req,res) => {
  return res.json({message: 'Ok'});
})

app.listen( PORT, () => {
  console.log(`server started at port ${PORT}`);
})

