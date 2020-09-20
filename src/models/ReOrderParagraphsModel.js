import React from 'react'
import {
  View,
  Text,
} from '@react-pdf/renderer'
import PortraitBase from './PortraitBase'

import commonStyles from '../helpers/style'

const ReOrderParagraphsModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question

  const QuestionComponent = () => (
    <View>
      {question.content.map((s, i) => <Text key={i}>{`${i + 1}.  ${s}`}</Text>)}
    </View>
  )

  const BeforeAnalysisComponent = () => (
    <View>
      <Text>答案：</Text>
      {question.answer.map((s, i) => <Text key={i}>{`${i + 1}.  ${s}`}</Text>)}
    </View>
  )

  return (
    <PortraitBase
      sequence={sequence}
      model={model}
      QuestionComponent={QuestionComponent}
      BeforeAnalysisComponent={BeforeAnalysisComponent}
      evalLineBreak
      { ...rest }
    />
  )
}

export default ReOrderParagraphsModel
