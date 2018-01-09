yaml = require('js-yaml')
fs = require('fs')

var yaml = require('js-yaml');

let hoonFrontmatter = yaml.safeLoadAll(fs.readFileSync('./test-yaml.txt', 'utf8'), function (data) {
//  console.log(data);

  if (data === null) {
    return null;
  }

  else {
    let yamlKeys = Object.keys(data);
    let result = ":-  :~  " + yamlKeys[0] + "/'" + data[yamlKeys[0]] + "'\n";
//    let result = ":-  :~  [%" + yamlKeys[0] + " '" + data[yamlKeys[0]] + "']\n";
    yamlKeys.shift();
    if (yamlKeys === null) {
      result = result + "    ==\n";
      return result;
    }
    else {
      yamlKeys.forEach(function(key) {
        result = result + "        " + key + "/'" + data[key] + "'\n";
//        result = result + "        [%" + key + " '" + data[key] + "']\n";
      });
    }
    result = result + "    ==\n";
    console.log(result);
    return result;
  }
});

return hoonFrontmatter;
