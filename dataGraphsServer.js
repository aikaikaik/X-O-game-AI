var http = require('http');
var rls = require('readline-sync');
var fs = require('fs');
var dataFile = process.argv[2] || rls.question('data file: ');
var finData = fs.readFileSync(dataFile);
var html1 = "<html><head><script type='text/javascript' src='https://www.google.com/jsapi'></script><script type='text/javascript'>google.load('visualization', '1', {packages: ['corechart', 'line']});google.setOnLoadCallback(drawTrendlines);function drawTrendlines() {var data = new google.visualization.DataTable();data.addColumn('number', 'gen');data.addColumn('number', 'score against first net');data.addColumn('number', 'score against last net');data.addRows("+finData+");var options = {hAxis: {title: 'gen'},vAxis: {title: 'Score'},colors: ['#AB0D06', '#007329'],trendlines: {0: {type: 'linear', color: '#111', opacity: 1, visibleInLegend: true}}};var chart = new google.visualization.LineChart(document.getElementById('chart_div'));chart.draw(data, options);};</script></head><body><div id='chart_div'></div></body></html>";
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html1);
}).listen(1337, '127.0.0.1');
