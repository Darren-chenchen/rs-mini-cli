#!/usr/bin/env node

// 导入快速搭建命令号工具
const program = require('commander');

const path = require('path')

// 获取到 package.json 对象中的 version 属性 以下两种方式都可
// program.version(require('./package.json').version) 
program.version(require(path.resolve(__dirname, 'package.json')).version)

/**
 * 创建 create<my-project> 
 * 类式 vue create <my-project>
 */
 const createProjects = require('./lib/core/create')
 createProjects()

// 解析 此函数放在最下方解析
program.parse(process.argv)