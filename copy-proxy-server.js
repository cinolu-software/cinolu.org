const fs = require('fs');
const path = require('path');

const sourcePath = 'src/proxy-server.mjs';
const destinationPath = 'dist/cinolu.org/proxy-server.mjs';

if (fs.existsSync(sourcePath)) {
  const sourceAbsolutePath = path.resolve(sourcePath);
  const destinationAbsolutePath = path.resolve(destinationPath);
  fs.copyFile(sourceAbsolutePath, destinationAbsolutePath, () => {});
}
