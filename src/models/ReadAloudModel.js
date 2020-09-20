import React from 'react'
import {
  Text,
} from '@react-pdf/renderer'
import PortraitBase from './PortraitBase'

import commonStyles from '../helpers/style'

const ReadAloudModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question

  const QuestionComponent = () => (
    <Text style={commonStyles.question}>{ question.content }</Text>
  )

  return (
    <PortraitBase
      sequence={sequence}
      model={model}
      QuestionComponent={QuestionComponent}
      { ...rest }
    />
  )
}

export default ReadAloudModel
