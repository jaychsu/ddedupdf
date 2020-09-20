import ReadAloudModel from './ReadAloudModel'
import RetellLectureModel from './RetellLectureModel'
import DescribeImageModel from './DescribeImageModel'
import RepeatSentenceModel from './RepeatSentenceModel'
import AnswerShortQuestionModel from './AnswerShortQuestionModel'
import SummarizeWrittenTextModel from './SummarizeWrittenTextModel'
import WriteEssayModel from './WriteEssayModel'
import SummarizeSpokenTextModel from './SummarizeSpokenTextModel'
import WriteFromDictationModel from './WriteFromDictationModel'
import MultipleChoiceSingleLModel from './MultipleChoiceSingleLModel'
import MultipleChoiceMultipleLModel from './MultipleChoiceMultipleLModel'
import SelectMissingWordModel from './SelectMissingWordModel'
import HighlightCorrectSummaryModel from './HighlightCorrectSummaryModel'
import HighlightIncorrectWordsModel from './HighlightIncorrectWordsModel'
import ReOrderParagraphsModel from './ReOrderParagraphsModel'
import FillInTheBlanksRwModel from './FillInTheBlanksRwModel'
import FillInTheBlanksRModel from './FillInTheBlanksRModel'
import MultipleChoiceSingleRModel from './MultipleChoiceSingleRModel'
import MultipleChoiceMultipleRModel from './MultipleChoiceMultipleRModel'


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

export default modelMappings
