import React from 'react'
import {
  StyleSheet,
} from '@react-pdf/renderer'
import PortraitBase from './PortraitBase'
import Image from '../components/Image'

import {
  deepFetch,
} from '../helpers'

const styles = StyleSheet.create({
  questionImage: {
    height: 240,
    margin: 20,
    objectFit: 'contain',
  },
})

const RetellLectureModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question

  const QuestionComponent = () => (
    <Image src={deepFetch(question, ['content', 'image', 'url'])} style={styles.questionImage} />
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

export default RetellLectureModel
