import React from 'react'
import {
  View,
  Text,
} from '@react-pdf/renderer'
import LandscapeBase from './LandscapeBase'

import commonStyles from '../helpers/style'

const AnswerShortQuestionModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question
  const typeMeta = model.type

  const QuestionComponent = () => (
    <View>
      <Text>{ `${typeMeta.abbr}${sequence}. ${question.analysis.original}` }</Text>
      <Text style={commonStyles.topGap}>{ `Answer: ${question.analysis.answer}` }</Text>
    </View>
  )
  const AnalysisComponent = () => (
    <View>
      <View style={commonStyles.sectionStringContent}>{question.analysis.translation_zh.split('').map((c, i) => <Text key={i}>{c}</Text>)}</View>
      <View style={[commonStyles.sectionStringContent, commonStyles.topGap]}>{`答: ${question.analysis.answer_translation_zh}`.split('').map((c, i) => <Text key={i}>{c}</Text>)}</View>
    </View>
  )

  return (
    <LandscapeBase
      sequence={sequence}
      model={model}
      QuestionComponent={QuestionComponent}
      AnalysisComponent={AnalysisComponent}
      { ...rest }
    />
  )
}

export default AnswerShortQuestionModel
