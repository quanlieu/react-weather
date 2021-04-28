// MetaWeather does not attach Access-Control-Allow-Origin: *.
// This Proxy prevents CORS issues when trying to access the API from a client.
const http = require('http');
const https = require('https');

const hostname = '127.0.0.1';
const port = 4000;
let metaweather = {};

const server = http.createServer((request, response) => {
  https.get(`https://www.metaweather.com/api${request.url}`, responseFromMetaweather => {
    let data = [];
    responseFromMetaweather.on('data', chunk => {
      data.push(chunk);
    });
  
    responseFromMetaweather.on('end', () => {
      console.log(`https://www.metaweather.com/api${request.url} success`);
      response.statusCode = responseFromMetaweather.statusCode;
      response.setHeader('Content-Type', 'application/json');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Request-Method', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Allow-Headers', '*');
      try {
        metaweather = JSON.parse(Buffer.concat(data));
        response.end(JSON.stringify(metaweather));
      } catch (error) {
        response.end(JSON.stringify({ error: 'Nothing' }));
      }
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
    response.end('Nothing');
  });
});

server.listen(port, hostname, () => {
  console.log(`Proxy running at http://${hostname}:${port}/`);
});