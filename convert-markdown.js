fs = require('fs')
marked = require('marked')

f = String(fs.readFileSync('test-md.txt'))

renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  hax = ""
  for(i=0;i<level;i++) { hax += "#" }
  return "\n"+hax+" "+text+"\n"
}

renderer.blockquote = function (quote) {
  return " > "+quote.split("\n").join("   ")
}

renderer.paragraph = function(text) {
  return "\n"+text+"\n"
}

renderer.code = function(code, language) {
  return "```\n"+code+"\n```\n\n"
}

renderer.codespan = function(text) {
  return "`"+text+"`"
}

renderer.em = function(text) {
  return "_"+text+"_"
}

console.log(marked(f, {renderer:renderer}))
