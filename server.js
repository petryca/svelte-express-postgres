const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = require('./api/routes.js');

app.use(express.static('public'));
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
   console.log(`http://localhost:${port}`);
});
