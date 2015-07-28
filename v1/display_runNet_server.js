var http = require('http');
var fs = require('fs');
var tableBody = '';
var getData = function(){
  var netDataStr = fs.readFileSync('./netData.json');
  console.log(netDataStr);
  var data = JSON.parse(netDataStr);
  var _tableBody = '';
  for(var a in data){
    _tableBody+='<tr><th>'+a+'</th>';
    var sum = 0;
    var n = 0;
    for(var b in data[a]){
      _tableBody+='<td'+((a===b)?' class="b"':'')+'>'+Math.round(data[a][b].me/data[a][b].gameNumber*100)+'%</td>';
      sum += data[a][b].me/data[a][b].gameNumber*100;
      n++;
    }
    _tableBody += '<td class="b">'+Math.round(sum/n*10)/10+'%</td>'
    _tableBody+='</tr>';
  }
  _tableBody+='</table>';
  tableBody = _tableBody;
};
getData();
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<!doctype html><html><head><title>net data</title><style>.b{background-color:#333;color:#eee;}</style></head><body><h1>net data</h1><table>'+tableBody+'</table></body></html>');
}).listen(1337, '127.0.0.1');
var a = setInterval(getData, 30000);
