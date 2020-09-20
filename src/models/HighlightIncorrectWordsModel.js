import React from 'react'
import {
  View,
  Text,
  Link,
} from '@react-pdf/renderer'
import PortraitBase from './PortraitBase'

import {
  deepFetch,
} from '../helpers'

import commonStyles from '../helpers/style'

const HighlightIncorrectWordsModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question
  const id = question.num

  const QuestionComponent = () => (
    <View>
      <View style={commonStyles.row}>
        <Text wrap={false} style={commonStyles.sectionTitle}>题目音频：</Text>
        <Link href={`https://www.91ddedu.com/question/${id}`} style={commonStyles.link}>
          {
            deepFetch(question, ['content', 'audios', 'length'])
            ? '此题有音频，请见网站及 APP'
            : deepFetch(question, ['analysis', 'audioText'])
              ? '此题只有原文无音频，请直接看原文文本及参考答案'
              : '此题无原文音频及文本，请直接看参考答案'
          }
        </Link>
      </View>
      <Text>{ deepFetch(question, ['content', 'text'], '') }</Text>
    </View>
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

export default HighlightIncorrectWordsModel
