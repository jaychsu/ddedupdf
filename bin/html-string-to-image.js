import htmlToImage from 'node-html-to-image'
import trimImage from 'trim-image'
import data from '../src/data'

const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i)

data.forEach(categories => categories.forEach(model => {
  const question = model.question
  const id = question.num

  // question.analysis[key]
  question.typeObj.analysisList.map(({
    key,
    title,
  }) => {
    if (!isHTML(question.analysis[key])) { return }

    const filePath = `./src/images/model-${id}-${key}.png`

    htmlToImage({
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
  })
}))
