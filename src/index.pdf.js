import React from 'react'
import ReactPDF, {
  Font,
} from '@react-pdf/renderer'

import fs from 'fs'
import cluster from 'cluster'
import easyPdfMerge from 'easy-pdf-merge'

import DemoFile from './entries/DemoFile'

import ReadAloudModel from './models/ReadAloudModel'
import RetellLectureModel from './models/RetellLectureModel'
import DescribeImageModel from './models/DescribeImageModel'
import RepeatSentenceModel from './models/RepeatSentenceModel'
import AnswerShortQuestionModel from './models/AnswerShortQuestionModel'
import SummarizeWrittenTextModel from './models/SummarizeWrittenTextModel'
import WriteEssayModel from './models/WriteEssayModel'
import SummarizeSpokenTextModel from './models/SummarizeSpokenTextModel'
import WriteFromDictationModel from './models/WriteFromDictationModel'
import MultipleChoiceSingleLModel from './models/MultipleChoiceSingleLModel'
import MultipleChoiceMultipleLModel from './models/MultipleChoiceMultipleLModel'
import SelectMissingWordModel from './models/SelectMissingWordModel'
import HighlightCorrectSummaryModel from './models/HighlightCorrectSummaryModel'
import HighlightIncorrectWordsModel from './models/HighlightIncorrectWordsModel'
import ReOrderParagraphsModel from './models/ReOrderParagraphsModel'
import FillInTheBlanksRwModel from './models/FillInTheBlanksRwModel'
import FillInTheBlanksRModel from './models/FillInTheBlanksRModel'
import MultipleChoiceSingleRModel from './models/MultipleChoiceSingleRModel'
import MultipleChoiceMultipleRModel from './models/MultipleChoiceMultipleRModel'

import data from './data'

Font.register({
  family: 'MicrosoftYaHei',
  src: `${__dirname}/fonts/msyh.ttf`,
})

const modelMappings = {
  PTE_RA: ReadAloudModel,
  PTE_RL: RetellLectureModel,
  PTE_DI: DescribeImageModel,
  PTE_RS: RepeatSentenceModel,
  PTE_ASQ: AnswerShortQuestionModel,
  PTE_SWT: SummarizeWrittenTextModel,
  PTE_WE: WriteEssayModel,
  PTE_SST: SummarizeSpokenTextModel,
  PTE_WFD: WriteFromDictationModel,
  // // PTE_L_MCS: MultipleChoiceSingleLModel,
  // // PTE_L_MCM: MultipleChoiceMultipleLModel,
  PTE_SMW: SelectMissingWordModel,
  PTE_HCS: HighlightCorrectSummaryModel,
  PTE_HIW: HighlightIncorrectWordsModel,
  PTE_RO: ReOrderParagraphsModel,
  PTE_FIB_RW: FillInTheBlanksRwModel,
  PTE_FIB_R: FillInTheBlanksRwModel,  // FillInTheBlanksRModel
  // // PTE_R_MCS: MultipleChoiceSingleRModel,
  // // PTE_R_MCM: MultipleChoiceMultipleRModel,
}


if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length
  const envVars = {
    tasks: getTasks(),
  }

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
    })
  })

  // process.exit()
}

function registerWorkerEvent(worker, envVars) {
  const tasks = envVars.tasks
  const numTasks = tasks.length

  if (!numTasks) { return }

  worker.on('message', ({ isFinished = false }) => {
    if (!isFinished) { return }

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
