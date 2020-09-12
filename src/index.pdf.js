import React from 'react'
import ReactPDF, {
  Font,
} from '@react-pdf/renderer'

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
import FillInTheBlanksLModel from './models/FillInTheBlanksLModel'
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
  PTE_MCS: MultipleChoiceSingleLModel,
  PTE_MCM: MultipleChoiceMultipleLModel,
  PTE_FIB: FillInTheBlanksLModel,
  PTE_SMW: SelectMissingWordModel,
  PTE_HCS: HighlightCorrectSummaryModel,
  PTE_HIW: HighlightIncorrectWordsModel,
  PTE_RO: ReOrderParagraphsModel,
  PTE_FIB_RW: FillInTheBlanksRwModel,
  PTE_FIB_R: FillInTheBlanksRModel,
  PTE_MCS: MultipleChoiceSingleRModel,
  PTE_MCM: MultipleChoiceMultipleRModel,
}

function runTaskByBatch(n, tasks) {
  function runTask() {
    if (tasks.length === 0) { return }

    tasks.pop()().then(runTask)
  }

  new Array(n).fill().forEach(runTask)
}

function getTasks() {
  return Object.keys(modelMappings).map(key => () => (
    ReactPDF.render(
      <DemoFile modelMappings={{ [key]: modelMappings[key] }} data={data} />,
      `./pdf/${key}.pdf`
    )
  ))
}

// runTaskByBatch(1, getTasks())

ReactPDF.render(
  <DemoFile modelMappings={modelMappings} data={data} />,
  './pdf/demo.pdf'
)
