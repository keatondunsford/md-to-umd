var concat = require('concat-files');

concat([
  './test-yaml.txt',
  './test-md.txt',
], './test.umd', function(err) {
  if (err) throw err
  console.log('done');
});
