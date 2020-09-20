import React from 'react'
import ReactPDF, {
  Font,
} from '@react-pdf/renderer'

import fs from 'fs'
import cluster from 'cluster'
import easyPdfMerge from 'easy-pdf-merge'

import DemoFile from './entries/DemoFile'
import modelMappings from './models'
import data from './data'

Font.register({
  family: 'MicrosoftYaHei',
  src: `${__dirname}/fonts/msyh.ttf`,
})


if (cluster.isMaster) {
  const envVars = {
    tasks: getTasks(),
  }

  if (!envVars.tasks.length) {
    process.exit()
  }

  const numCPUs = Math.min(require('os').cpus().length, envVars.tasks.length)

  for (let i = 0; i < numCPUs; i++) {
    setTimeout(() => registerWorkerEvent(cluster.fork(), envVars), i * 100)
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`[Info] worker ${worker.process.pid} died.`)
  })
} else {
  console.log(`[Info] worker ${process.pid} started.`)
  process.send({ isFinished: true })

  process.on('message', ({ data }) => {
    const { query, fileName, numTasks } = data

    ReactPDF.render(
      <DemoFile modelMappings={modelMappings} data={JSON.parse(query)} />,
      fileName
    ).then(() => {
      console.log(`[Info] finished to build pdf: ${fileName}.`)
      process.send({ isFinished: true })
    }).catch(error => {
      process.send({ isFinished: false, error })
    })
  })

  // process.exit()
}

function registerWorkerEvent(worker, envVars) {
  const tasks = envVars.tasks
  const numTasks = tasks.length

  if (!numTasks) { return }

  worker.on('message', ({ isFinished = false, error }) => {
    if (!isFinished) {
      console.error('[Error] ', error)
      process.exit()
      return
    }

    if (!tasks.length) {
      worker.kill()

      if (!Object.keys(cluster.workers).length) {
        if (numTasks > 1) {
          easyPdfMerge(new Array(numTasks).fill().map((_, i) => `./pdf/demo-${i + 1}.pdf`), './pdf/demo.pdf', err => {
            if (err) {
              return console.log(err)
            }

            console.log('Successfully merged!')
          })
        } else {
          fs.rename('./pdf/demo-1.pdf', './pdf/demo.pdf', err => {
            if (err) {
              return console.log(err)
            }

            console.log('Successfully finished!')
          })
        }
      }
      return
    }

    const query = tasks.shift()
    const seq = numTasks - tasks.length
    const fileName = `./pdf/demo-${seq}.pdf`
    console.log(`[Info] starting to build pdf: ${seq}/${numTasks}.`)

    worker.send({
      data: {
        query,
        fileName,
        numTasks,
      },
    })
  })
}

function getTasks() {
  const queries = []
  const qLimit = 40
  let cnt = 0
  let query

  data.categories.forEach((category, i) => {
    category.types.forEach((type, j) => {
      type.questions.forEach((question, k) => {
        if (!queries.length || cnt >= qLimit) {
          query = pruneJson(data)
          query.startIdx = k
          queries.push(query)
          cnt = 0
        }

        queries.slice(-1)[0].categories[i].types[j].questions.push(question)
        cnt += 1
      })
    })
  })

  return queries.map(query => JSON.stringify(query))
}

function pruneJson(data) {
  const newData = JSON.parse(JSON.stringify(data))
  newData.categories.forEach(category => {
    category.types.forEach(type => {
      type.questions = []
    })
  })
  return newData
}
