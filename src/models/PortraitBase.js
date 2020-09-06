import React from 'react'
import {
  View,
  Text,
  Link,
} from '@react-pdf/renderer'
import Label from '../components/Label'
import Image from '../components/Image'

import commonStyles from '../helpers/style'
import settings from '../data/settings.json'
import {
  isHTML,
  supportedTags,
} from '../helpers'

const PortraitBase = ({
  sequence,
  model,

  QuestionComponent,
  AnswerComponent,
  AnalysisComponent,
}) => {
  const question = model.question
  const typeMeta = model.type
  const id = question.num

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <View style={commonStyles.metabar}>
          <View style={commonStyles.row}>
            <Text style={commonStyles.rightGap}>{ `${typeMeta.abbr}${sequence}.` }</Text>
            <Text style={commonStyles.gap}>{ question.title }</Text>
            <Label preset="qid">{ `#${id}` }</Label>
            { question.tags.filter(tag => !!~supportedTags.indexOf(tag)).map(key => <Label key={key} preset={key}>{ settings.QUESTION_TAG_MAP[key].label }</Label>) }
          </View>
          <View style={commonStyles.row}>
            <Label preset="red">红色</Label>
            <Label preset="orange">黄色</Label>
            <Label preset="green">绿色</Label>
          </View>
        </View>
        <View>
          <QuestionComponent />
        </View>
      </View>
      <View style={commonStyles.analysis}>
        {
          AnalysisComponent
          ? <AnalysisComponent />
          : typeMeta.analysisList.filter(meta => !!question.analysis[meta.key]).map(({
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
                  : !!~key.indexOf('Audio')
                    ? <Link href={`https://www.91ddedu.com/question/${id}`} style={commonStyles.link}>此题有音频示范，请见网站及 APP</Link>
                    : !!~key.indexOf('Video')
                      ? <Link href={`https://www.91ddedu.com/question/${id}`} style={commonStyles.link}>此题有视频讲解，请见网站及 APP</Link>
                      : null
                }
              </View>
            ))
        }
      </View>
    </View>
  )
}

export default PortraitBase
