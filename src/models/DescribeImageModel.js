import React from 'react'
import {
  StyleSheet,
} from '@react-pdf/renderer'
import PortraitBase from './PortraitBase'
import Image from '../components/Image'

const styles = StyleSheet.create({
  questionImage: {
    height: 240,
    margin: 20,
    objectFit: 'contain',
  },
})

const DescribeImageModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question

  const QuestionComponent = () => (
    question.content.images.map((imageMeta, i) => (
      <Image key={i} src={imageMeta.url} style={styles.questionImage} />
    ))
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

export default DescribeImageModel
