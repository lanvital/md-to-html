const path = require('path');
const fs = require('fs');
const md = require('markdown-it')();
var markdownItAttrs = require('markdown-it-attrs');
md.use(markdownItAttrs);
var markdownItDiv = require('markdown-it-div');
md.use(markdownItDiv);

var tplPath = path.join(__dirname, 'index.tpl.html');
var mdPath = path.join(__dirname, 'index.md');
var targetPath = path.join(__dirname, 'demo.html');

fs.readFile(mdPath,'utf8',function(errMd,mdData){
    if(errMd){
        console.log('errMd',JSON.stringify(errMd));
    }else{
        mdData = mdData.replace(/<!--(.+?)-->/g,''); //去除所有注释
        var result = md.render(mdData);
        fs.readFile(tplPath,'utf8',function(errTpl,tplData){
            if(errTpl){
                console.log('errTpl',JSON.stringify(errTpl));
            }else{
                tplData=tplData.replace('<%content%>',result);
                fs.writeFile(targetPath,tplData,function(){
                    console.log('转换成功')
                })
            };
        });
    };
})