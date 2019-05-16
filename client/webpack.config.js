const environment = (process.env.NODE_ENV || 'development').trim();

if(environment === 'development'){
    console.log('development Mode');
    module.exports=require('./webpack/webpack.dev');
}else{
    console.log('Production Mode');
    module.exports = require('./webpack/webpack.prod');
}