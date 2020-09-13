import React from 'react'
import {
  View,
  Text,
} from '@react-pdf/renderer'
import LandscapeBase from './LandscapeBase'
import Image from '../components/Image'

import commonStyles from '../helpers/style'

const WriteFromDictationModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question
  const typeMeta = model.type

  const QuestionComponent = () => (
    <Text>{ `${typeMeta.abbr}${sequence}. ${question.answer}` }</Text>
  )
  const AnalysisComponent = () => (
    <View style={commonStyles.sectionStringContent}>{question.analysis.audioTrans_zh.split('').map((c, i) => <Text key={i}>{c}</Text>)}</View>
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

export default WriteFromDictationModel
