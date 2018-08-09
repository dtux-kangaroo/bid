const Metalsmith=require('metalsmith')
const inquirer=require('inquirer')
const chalk=require('chalk')
const path=require('path')
const async=require('async')
const render = require('consolidate').handlebars.render
const ora=require('ora')


/**
 * 渲染模板文件
 */
function renderTemplateFiles(){
  return (files, metalsmith, done) => {
    const keys=Object.keys(files)
    const metalsmithMetadata=metalsmith.metadata()
    async.each(keys,(fileName,next)=>{
      const str=files[fileName].contents.toString()
      render(str, metalsmithMetadata,(err,res)=>{
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[fileName].contents = new Buffer(res)
        next()
      })
    },done)
  }
}

module.exports=(tmpPath)=>{
  const metalsmith=Metalsmith(tmpPath)
  inquirer.prompt([{
    type:'input',
    name:'name',
    message:'The name of project',
    default:'roo-bid-project'
  },{
    type:'input',
    message:'The version of project',
    name:'version',
    default:'1.0.0'
  },{
    type:'input',
    name:'description',
    message:'The description of project',
    default:'a project builded by roo-bid'
  },{
    type:'input',
    name:'destination',
    message:'The destination of project',
    default:process.cwd()
  }]).then(answer=>{
    //项目生成路径
    const destination=path.isAbsolute(answer.destination)?path.join(answer.destination,answer.name):path.join(process.cwd(),answer.destination,answer.name)
    const spinner = ora('Loading unicorns').start();
    //加入新的全局变量
    Object.assign(metalsmith.metadata(),answer)
    
    spinner.start()
    metalsmith.use(renderTemplateFiles())

    metalsmith
    .source('.')
    .destination(destination)
    .clean(false)
    .build(function(err) {      
      spinner.stop()
      if (err) throw err
      console.log()
      console.log(chalk.green('Build Successfully'))
      console.log()
      console.log((`${chalk.green('Please cd')} ${destination} ${chalk.green('to start your coding')}`))
      console.log()
    })
  })
}

