const path=require('path')
module.exports={
  bid:{
    pageDest:path.join(__dirname,'pages'),
    pages:[
      {
        name:'Love',
        path:path.join(__dirname,'templates/pages/Love'),
        prompts:[
          {
            type:'input',
            name:'love',
            message:'your love girl'
          }
        ]
      }
    ],
    componentDest:path.join(__dirname,'components'),
    components:[
      {
        name:'Girl',
        path:path.join(__dirname,'templates/components/Girl'),
        prompts:[
          {
            type:'input',
            name:'girl',
            message:'your love girl'
          }
        ]
      }
    ]
  }
}