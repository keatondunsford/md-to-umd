yaml = require('js-yaml')
fs = require('fs')

var yaml = require('js-yaml');

const hoonFrontmatter = yaml.safeLoadAll(fs.readFileSync('./test-yaml.txt', 'utf8'), function (data) {
//  console.log(data);

  if (data === null) {
    return null;
  }

  else {
    let yamlKeys = Object.keys(data);
    console.log(yamlKeys);
    console.log(":-  :~  " + yamlKeys[0] + "/'" + data[yamlKeys[0]] + "'\n");
    yamlKeys.shift();
    console.log(yamlKeys);
    if (yamlKeys === null) {
      return null;
    }
    else {
      console.log(yamlKeys.forEach(function(key) {
                    console.log("        " + key + "/'" + data[key] + "'\n");
                  }));
    }
//      console.log(":-  :~  " + yamlKeys.forEach(function(key) {
//                                 return key + "/" + yamlKeys[key] + "\n        ";
//                               }));
    return null;
  }

});

return hoonFrontmatter;
