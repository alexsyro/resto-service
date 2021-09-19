const fs = require('fs');
const path = require('path');

const imageDir = path.resolve(__dirname, './images');
const files = [];
const images = fs.readdirSync(imageDir, 'utf8');

images.forEach((image) => {
  const filePath = `${imageDir}/${image}`;
  const [name, type] = image.split('.');
  const stats = fs.statSync(filePath);
  const data = Buffer.from(fs.readFileSync(filePath));
  const file = { name, type, size: stats.size, data };
  files.push(file);
});

module.exports = files;
