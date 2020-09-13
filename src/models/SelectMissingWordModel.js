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
  deepFetch,
} from '../helpers'

const SelectMissingWordModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question
  const typeMeta = model.type
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
      <View>
        {
          deepFetch(question, ['content', 'mc', 'options'], []).map((option, i) => <Text key={i}>{`选项 ${i + 1}： "${option}"`}</Text>)
        }
      </View>
    </View>
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

export default SelectMissingWordModel
