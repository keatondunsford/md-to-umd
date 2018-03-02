// cheerio = require('cheerio')
fs = require('fs')
glob = require('glob')
marked = require('marked')
path = require('path')
yaml = require('js-yaml')

glob("**/*.md", function (err, mdFiles) {
  
  //  For all the .md files in the directory:
  mdFiles.forEach(function (mdFile) {

    mdFileString = String(fs.readFileSync(mdFile))
  
    //  Split the .md file into its YAML and Markdown parts
    a = mdFileString.split("---\n")
  
    yamlString = ["---\n",a[1],"---\n"].join('')
    mdString = a.slice(2).join("---\n")

    //  Parse the YAML using the js-yaml library

    yamlParsedResultArray = yaml.safeLoadAll(yamlString)
    yamlObject = yamlParsedResultArray[0]

    //  Convert the YAML to Hoon frontmatter
    if (yamlObject === null) {
      return null
    }

    else {
  
      yamlKeys = Object.keys(yamlObject)
//      if (yamlObject[yamlKeys[0]] === true) {
//        hoonFrontmatter = ":-  :~  " + yamlKeys[0] + "/&\n"
//        //  hoonFrontmatter = ":-  :~  [%" + yamlKeys[0] + " &]\n"  //  alternative style
//      } 
//      else if (yamlObject[yamlKeys[0]] === false) {
//        hoonFrontmatter = ":-  :~  " + yamlKeys[0] + "/|\n"
//        //  hoonFrontmatter = ":-  :~  [%" + yamlKeys[0] + " |]\n"  //  alternative style
//      } 
//      else if (yamlObject[yamlKeys[0]] === 'number') {
//        hoonFrontmatter = ":-  :~  " + yamlKeys[0] + "/" + yamlObject[yamlKeys[0]] + "\n"
//        //  hoonFrontmatter = ":-  :~  [%" + yamlKeys[0] + " " + yamlObject[yamlKeys[0]] + "]\n"  //  alternative style
//      }  
//      else {
        hoonFrontmatter = ":-  :~  " + yamlKeys[0] + "/'" + yamlObject[yamlKeys[0]] + "'\n"
        //  hoonFrontmatter = ":-  :~  [%" + yamlKeys[0] + " '" + yamlObject[yamlKeys[0]] + "']\n"  //  alternative style
//      }
      yamlKeys.shift()
      if (yamlKeys === null) {
        hoonFrontmatter = hoonFrontmatter + "    ==\n"
      }
      else {
        yamlKeys.forEach(function(key) {
//          if (yamlObject[key] === true) {
//            hoonFrontmatter = hoonFrontmatter + "        " + key + "/&\n"
//            //  hoonFrontmatter = hoonFrontmatter + "        [%" + key + " &]\n"         //  alternative style
//          } 
//          else if (yamlObject[key] === false) {
//            hoonFrontmatter = hoonFrontmatter + "        " + key + "/|\n"
//            //  hoonFrontmatter = hoonFrontmatter + "        [%" + key + " |]\n"         //  alternative style
//          } 
//          else if (typeof yamlObject[key] === 'number') {
//            hoonFrontmatter = hoonFrontmatter + "        " + key + "/" + yamlObject[key] + "\n"
//            //  hoonFrontmatter = hoonFrontmatter + "        [%" + key + " " + yamlObject[key] + "]\n"         //  alternative style
//          }  
//          else {
            hoonFrontmatter = hoonFrontmatter + "        " + key + "/'" + yamlObject[key] + "'\n"
            //  hoonFrontmatter = hoonFrontmatter + "        [%" + key + " '" + yamlObject[key] + "']\n"         //  alternative style
//          }
        })
      }
      hoonFrontmatter = hoonFrontmatter + "    ==\n"
    }

    //  Convert the CommonMark markdown to Urbit-flavored markdown
    renderer = new marked.Renderer()
    
    renderer.list = function (body, ordered) {
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
        r = "XXKEAT  THERE'S AN ORDERED LIST HERE\n\n"
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
    
    renderer.blockquote = function (quoteMd) {      //TODO loop the whole thing, add index to forEach
      quoteMd = quoteMd.split("\n")
      quoteMd.shift()
      let quoteUmd = "> " + quoteMd[0] + "\n"
      quoteMd.shift()
      if (quoteMd.length === 0) {
        return quoteUmd
      }
      else {
        quoteMd.forEach(function(line) {
          quoteUmd = quoteUmd + "  " + line + "\n"
        })
      }
      quoteUmd = quoteUmd + "\n\n"
      return quoteUmd
    }
    
    renderer.code = function(code, language) {
      return "\n```\n" + code + "\n```\n\n"
    }
    
    renderer.codespan = function(text) {
      return "`" + text + "`"
    }
    
    renderer.em = function(text) {
      return "_" + text + "_"
    }

    renderer.heading = function (text, level) {
      hax = ""
      for(i=0;i<level;i++) { hax += "#" }
      return "\n" + hax + " " + text + "\n\n"
    }
    
    renderer.hr = function() {
      return "\n---\n\n"
    }
   
//    renderer.html = function(html) {
//      foo = cheerio.load(html)
//      console.log(foo.parseHTML(foo))
//    }
    
    renderer.link = function(href, title, text) {
      return "[" + text + "](" + href + ")"
    }

    renderer.paragraph = function(text) {
      return "\n" + text + "\n\n"
    }
    
    renderer.strong = function(text) {
      return "*" + text + "*"
    }

    umdString = marked(mdString, {renderer:renderer})
    umdString = ";>\n\n" + umdString

    //  Concatenate the converted Hoon frontmatter and Urbit-flavored markdown
    finalUmd = [hoonFrontmatter, umdString].join('') 

    //  Replace consecutive blank lines in the .umd result
    finalUmd = finalUmd.replace(/[\r\n]+\s*[\r\n]+/gm, '\n\n')

    //  Write the final Umd file to disk
    basePath = path.dirname(mdFile) + '/' + path.basename(mdFile, '.md')
    umdPath = basePath + '.umd'

    fs.writeFileSync(umdPath, finalUmd)

    //  Delete the obsolete CommonMark markdown file
//    fs.unlink(mdFile, function (err) {
//      console.log(err)
//    })

    console.log('Converted file: ' + basePath)

  //  ^ Do all that for each .md file
  })

//  Loop through all the files in the directory
})
