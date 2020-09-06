import htmlToImage from 'node-html-to-image'
import trimImage from 'trim-image'
import data from '../src/data'

const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i)

function runTaskByBatch(n, tasks) {
  function runTask() {
    if (tasks.length === 0) { return }

    tasks.pop()().then(runTask)
  }

  new Array(n).fill().forEach(runTask)
}

function getTasks() {
  const results = []

  data.categories.forEach(category => category.types.forEach(type => type.questions.forEach(question => {
    const id = question.num

    type.analysisList.forEach(({
      key,
      title,
    }) => {
      if (!isHTML(question.analysis[key])) { return }

      const filePath = `./src/images/model-${id}-${key}.png`

      const lazyPromise = () => htmlToImage({
        output: filePath,
        quality: 100,
        transparent: true,
        html: `
          <html>
            <body>
              <style>document,html,body { line-height: 1.5 }</style>
              ${question.analysis[key]}
            </body>
          </html>
        `
      }).then(() => {
        trimImage(filePath, filePath)
        console.log(`The image (${filePath}) was created successfully!`)
      })

      results.push(lazyPromise)
    })
  })))

  return results
}

runTaskByBatch(5, getTasks())
