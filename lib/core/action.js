const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-config')
const path = require('path')

// 自动执行 npm install
const { execCommand } = require('../util/terminal')

const { compiler, writeToFile, createNotFileName } = require('../util/utils')

// callback -> promisify(callback) -> promise -> async await
const createProjectAction = async (project) => {
  console.log('In the process of cloning...')
  // download用法：download("克隆的地址ClonePath", "克隆后存放的地址", callback(回调函数))
  await download(vueRepo, project, { clone: true })

  // 2. 执行 npm install
  // let exec = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  // const execution = await execCommand(exec, ['install'], { cwd: `./${project}` })
  // console.log(execution)

  // 3. 执行 npm run serve
  // execCommand(exec, ['run', 'example'], { cwd: `./${project}` })
}

// create VUE component template
const createVueComponentTemplateAction = async (project, filepath) => {
  // 编译 ejs 模板
  const result = await compiler('vue-template.vue.ejs', { name: project, lowerName: project.toLowerCase() })
  // 将 result 写入 .vue 文件中
  const targetPath = path.resolve(filepath, `${project}.vue`)
  // write in file
  await writeToFile(targetPath, result)
}
// 创建ts组件模板
const createVueTSComponentTemplateAction = async (project, filepath) => {
  // 编译 ejs 模板
  const result = await compiler('vue-ts-template.vue.ejs', { name: project, lowerName: project.toLowerCase() })
  const result2 = await compiler('vue-ts-template.ts.ejs', { name: project, lowerName: project.toLowerCase() })

  // 将 result 写入 .vue 文件中
  const targetPath = path.resolve(filepath, `${project}.vue`)
  const targetPath2 = path.resolve(filepath, `${project}.ts`)

  // write in file
  await writeToFile(targetPath, result)
  await writeToFile(targetPath2, result2)
}

const createVueTSDirTemplateAction = async (dirName, dirPath) => {
  // test src/pages
  // 先创建一个文件夹
  createNotFileName(dirPath + `/${dirName}`)
  // 文件夹下建一个cmp
  createNotFileName(dirPath + `/${dirName}` + '/cmp')
  // 创建ts
  createVueTSComponentTemplateAction(dirName, dirPath + `/${dirName}`)
}

module.exports = {
  createProjectAction,
  createVueComponentTemplateAction,
  createVueTSComponentTemplateAction,
  createVueTSDirTemplateAction
}
