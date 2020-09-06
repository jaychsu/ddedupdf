import React from 'react'
import {
  View,
  Text,
  Link,
} from '@react-pdf/renderer'
import PortraitBase from './PortraitBase'
import Image from '../components/Image'

import {
  isHTML,
} from '../helpers'
import commonStyles from '../helpers/style'

const ReadAloudModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question
  const id = question.num

  const questionComponent = (
    <Text style={commonStyles.question}>{ question.content }</Text>
  )

  const analysisComponent = (
    question.typeObj.analysisList.map(({
      key,
      title,
    }) => (
      <View key={key} style={[
        commonStyles.section,
        typeof question.analysis[key] !== 'string' ? commonStyles.row : null
      ]}>
        <Text style={commonStyles.sectionTitle}>{ `${title}：` }</Text>
        { typeof question.analysis[key] === 'string'
          ? isHTML(question.analysis[key])
            ? <Image src={`file://images/model-${id}-${key}.png`} />
            : <View style={commonStyles.sectionStringContent}>{question.analysis[key].split('').map((c, i) => <Text key={i}>{c}</Text>)}</View>
          : key.startsWith('explainVideo')
            ? <Link href={`https://www.91ddedu.com/question/${id}`} style={commonStyles.link}>此题有视频讲解，请见网站及 APP</Link>
            : <Link href={`https://www.91ddedu.com/question/${id}`} style={commonStyles.link}>此题有音频示范，请见网站及 APP</Link>
        }
      </View>
    ))
  )

  return (
    <PortraitBase
      sequence={sequence}
      model={model}
      questionComponent={questionComponent}
      analysisComponent={analysisComponent}
      { ...rest }
    />
  )
}

export default ReadAloudModel
