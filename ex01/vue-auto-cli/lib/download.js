const { promisify } = require('util')

module.exports.clone = async function (repo, desc) {
    const download = await promisify(require('download-git-repo')) //clone git
    const ora = require('ora') //进度条
    const process = ora(`下载...${repo}`)
    process.start() //进度条开始

    await download(repo, desc)

    process.succeed() //进度条完成
}