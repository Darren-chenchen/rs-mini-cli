const program = require('commander')

// 导入
const { createProjectAction, createVueComponentTemplateAction, createVueTSComponentTemplateAction } = require('./action')
const createProjects = () => {
  program
    /**
     * 自定义的命令 create
     * 项目名称 <project>
     * 紧跟项目名称后面的值 [others...]
     * cumin create my-cuminProject abc cba
     */
    .command('init <project> [others...]')
    // 描述
    .description('clone a respsitory into a folder') // 译：将存储库克隆到文件夹中
    /**
     * project: 项目名称
     * outher: 返回一个数组 紧跟项目名称后面所有的内容都会被拼进这个数据中并返回 (这个参数不常用)
     */
    .action(createProjectAction)

  // 1. 创建vue组件模板
  program
    .command('js <project> [others...]')
    .description('create a VUE JS component template')
    .action((filename, path) => {
      createVueComponentTemplateAction(filename, path[0] || '')
    })
  // 创建ts组件模板
  program
    .command('ts <project> [others...]')
    .description('create a VUE TS component templat')
    .action((filename, path) => {
      createVueTSComponentTemplateAction(filename, path[0] || '')
    })
}

module.exports = createProjects
