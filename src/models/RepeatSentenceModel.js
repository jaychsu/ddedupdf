import React from 'react'
import {
  View,
  Text,
} from '@react-pdf/renderer'
import LandscapeBase from './LandscapeBase'

import commonStyles from '../helpers/style'

const RepeatSentenceModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question
  const typeMeta = model.type

  const QuestionComponent = () => (
    <Text>{ `${typeMeta.abbr}${sequence}. ${question.analysis.originalText}` }</Text>
  )
  const AnalysisComponent = () => (
    <View style={commonStyles.sectionStringContent}>{question.analysis.translation_zh.split('').map((c, i) => <Text key={i}>{c}</Text>)}</View>
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

export default RepeatSentenceModel
