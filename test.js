s = '<li>Item one</li>\n<li>Item two</li>\n<li>Item three</li>\n'
h = function (body, ordered) {
  a = body.split('\n')
  b = []
  r = ''
  a = a.filter(function(listitem) { return listitem != '' | undefined })
  a.forEach(function(listitem){
    liOpenIndex = 4
    liCloseIndex = listitem.indexOf('</li>')
    b.push(listitem.slice(liOpenIndex, liCloseIndex))
  })
  if (ordered === true) {
    r = "XX  THERE'S AN ORDERED LIST HERE\n\n"
    b.forEach(function(listitem) {
      r = r + '+ ' + listitem + '\n'
    })
  }
  else {
    r = "XX  THERE'S AN UNORDERED LIST HERE\n\n"
    b.forEach(function(listitem) {
      r = r + '- ' + listitem + '\n'
    })
  }
  return r
}
console.log(h(s, false))
