import React from 'react'
import ReactPDF, {
  Font,
} from '@react-pdf/renderer'

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

function runTaskByBatch(n, tasks, callback) {
  let hasStarted = false
  const originTasks = tasks.slice()

  function runTask() {
    if (tasks.length === 0) {
      if (!hasStarted) {
        hasStarted = true
        callback(n, originTasks)
      }
      return
    }

    tasks.shift()().then(runTask)
  }

  new Array(n).fill().forEach(runTask)
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

  return queries.map((query, i) => () => {
    console.log(`start to build pdf: ${i + 1}/${queries.length}.`)
    return ReactPDF.render(
      <DemoFile modelMappings={modelMappings} data={query} />,
      `./pdf/demo-${i + 1}.pdf`
    )
  })
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

runTaskByBatch(1, getTasks(), (n, tasks) => {
  const cntPdfs = tasks.length

  easyPdfMerge(new Array(cntPdfs).fill().map((_, i) => `./pdf/demo-${i + 1}.pdf`), './pdf/demo.pdf', err => {
    if (err) {
      return console.log(err)
    }

    console.log('Successfully merged!')
  })
})

// ReactPDF.render(
//   <DemoFile modelMappings={modelMappings} data={data} />,
//   './pdf/demo.pdf'
// )
