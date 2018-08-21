const Metalsmith=require('metalsmith')
const chalk=require('chalk')
const path=require('path')
const rendertemplateFiles=require('../../lib/render-template-files')

const metalsmith=Metalsmith(path.join(__dirname,'./template'))
metalsmith.metadata({
  name:'test-render',
  version:'1.0.0',
  description:'for test-render'
})
metalsmith.use(rendertemplateFiles())
metalsmith
    .source('.')
    .destination(path.join(__dirname,'./dest'))
    .clean(false)
    .build(function(err) {      
      if (err) throw err
      console.log()
      console.log(chalk.green('Build Successfully'))
    })
