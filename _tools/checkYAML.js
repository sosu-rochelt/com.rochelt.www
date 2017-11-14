const yaml = require('node-yaml');
fs = require('fs');
path = require('path');
// filePath = path.join(__dirname, 'start.html');

fs.readFile(__dirname + '/../src/pages/was/index.md', 'utf8', function(
  err,
  data
) {
  if (err) {
    return console.log(err);
  }
  console.log(data.replace('---', ''));
});

yaml.read();
