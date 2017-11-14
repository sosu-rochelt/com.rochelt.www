const csvFilePath='/Users/kevin/Desktop/products/data-products.csv'
const csv=require('csvtojson')
const {dump} = require("node-yaml")

const fs = require('fs');

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const productsPath = "src/pages/products/"
csv({
	delimiter: ";"
})
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
	if (jsonObj.ready === 'TRUE') {
	    jsonObj.facts = jsonObj.facts.split('\n')
	    jsonObj.order = parseInt(jsonObj.order, 10)

	    jsonObj.facts = jsonObj.facts[0] === '' ? [] : jsonObj.facts;
	    var content = jsonObj.content.replace(/(?:\r\n\r\n|\r\r|\n\n)/g, '\r\n\r\n\r\n').trim();

	    jsonObj.productShot = "http://rochelt.kevinfoerster.com/images/bottle/" + jsonObj.productShot
	    jsonObj.image = "http://rochelt.kevinfoerster.com/images/products/" + jsonObj.image
	    delete jsonObj.content
	    delete jsonObj.ready

	    if (jsonObj.id) {
		    const stream = fs.createWriteStream(`${productsPath}${pad(jsonObj.order, 2)}_${jsonObj.id}.md`);
			stream.once('open', function(fd) {
			  stream.write("---\n");
			  stream.write(dump(jsonObj));
			  stream.write("\n");
			  stream.write("---\n");
			  stream.write(`${content ? content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga quisquam doloribus ipsa. Expedita debitis vel in excepturi ipsa, facere quos labore, cupiditate deleniti vitae accusantium animi laboriosam dolorem esse."}\n`)
			  stream.end();
			});
	    }
	}
})
.on('done',(error)=>{
    console.log('end')
})
