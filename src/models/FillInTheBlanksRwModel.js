import React from 'react'
import {
  View,
  Text,
  Link,
} from '@react-pdf/renderer'
import PortraitBase from './PortraitBase'
import Image from '../components/Image'

import commonStyles from '../helpers/style'
import {
  isHTML,
  isString,
  supportedTags,
} from '../helpers'

const FillInTheBlanksRwModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question
  const typeMeta = model.type
  const id = question.num

  const QuestionComponent = () => (
    <Text style={commonStyles.question}>{ question.content.brokenText }</Text>
  )

  const AnalysisComponent = () => (
    typeMeta.analysisList.filter(meta => !!question.analysis[meta.key]).map(({
      key,
      title,
    }) => (
      <View key={key} style={[
        commonStyles.section,
        isString(question.analysis[key]) ? null : commonStyles.row,
      ]}>
        <Text wrap={false} style={commonStyles.sectionTitle}>{ `${title}：` }</Text>
        { isString(question.analysis[key])
          ? isHTML(question.analysis[key])
            ? <Image src={`file://images/model-${id}-${key}.png`} />
            : <View wrap={false}>{question.analysis[key].split('\n').map((s, i) => <View key={i} style={commonStyles.sectionStringContent}>{s.split('').map((c, j) => <Text key={j}>{c}</Text>)}</View>)}</View>
          : !!~key.indexOf('Audio')
            ? <Link href={`https://www.91ddedu.com/question/${id}`} style={commonStyles.link}>此题有音频示范，请见网站及 APP</Link>
            : !!~key.indexOf('Video')
              ? <Link href={`https://www.91ddedu.com/question/${id}`} style={commonStyles.link}>此题有视频讲解，请见网站及 APP</Link>
              : null
        }
      </View>
    ))
  )

  return (
    <PortraitBase
      sequence={sequence}
      model={model}
      QuestionComponent={QuestionComponent}
      AnalysisComponent={AnalysisComponent}
      { ...rest }
    />
  )
}

export default FillInTheBlanksRwModel
