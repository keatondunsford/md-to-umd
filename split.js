fs = require('fs')
f = String(fs.readFileSync('./test.md'))

a = f.split("---\n")

yaml = ["---\n",a[1],"---\n"].join('')
md = a.slice(2).join("---\n")

fs.writeFileSync('test-yaml.txt', yaml)
fs.writeFileSync('test-md.txt', md)
