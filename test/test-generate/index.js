const path=require('path')
const userHome=require('user-home')
const generate=require('../../lib/generate-project')
const tmpPath=path.join(userHome,'.roo-templates','react-webpack-pc')
generate(tmpPath)