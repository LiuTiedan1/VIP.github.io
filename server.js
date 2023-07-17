const http = require('http');  
const url = require('url');  
const fs = require('fs');  
  
const server = http.createServer((req, res) => {  
  if (req.url === '/info') {  
    const queryObject = url.parse(req.url, true).query;  
    const movieName = queryObject.movieName;  
  
    // 发送电影名给 PHP 脚本处理，并获取响应数据  
    const options = {  
      hostname: 'localhost',  
      port: 3000, // 假设 PHP 服务器运行在本地端口 3000 上  
      path: '/info?movieName=' + movieName,  
      method: 'GET'  
    };  
    const req2 = http.request(options, (res2) => {  
      let data = '';  
      res2.on('data', (chunk) => {  
        data += chunk;  
      });  
      res2.on('end', () => {  
        // 将 PHP 脚本返回的数据发送给客户端  
        res.writeHead(200, {'Content-Type': 'application/json'});  
        res.end(data);  
      });  
    });  
    req2.end();  
  } else {  
    // 返回客户端所需的文件（例如 HTML 文件）  
    fs.readFile('index.html', (err, data) => {  
      if (err) {  
        res.writeHead(404);  
        res.end('Not found');  
      } else {  
        res.writeHead(200, {'Content-Type': 'text/html'});  
        res.end(data);  
      }  
    });  
  }  
});  
  
server.listen(3000, () => {  
  console.log('Server is running on port 3000');  
});