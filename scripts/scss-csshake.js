var path = require('path')
var ackSass = require('ack-sass')

var filePath = path.join(__dirname,'scss','csshake','csshake.scss')
var outFilePath = path.join(__dirname,'../','scss','csshake.scss')

console.log('compiling csshake sass')

module.exports = ackSass.compileFile(filePath, outFilePath, {sourceMap:false})
.then(()=>console.log('compiling csshake completed'))
.catch(err=>console.log(err))