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
  isString,
  supportedTags,
} from '../helpers'

const PortraitBase = ({
  sequence,
  model,

  QuestionComponent,
  BeforeAnalysisComponent,
  AnalysisComponent,
  analysisFilter,

  evalLineBreak,
}) => {
  const question = model.question
  const typeMeta = model.type
  const id = question.num

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <View wrap={false} style={commonStyles.metabar}>
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
          BeforeAnalysisComponent && <BeforeAnalysisComponent />
        }
        {
          AnalysisComponent
          ? <AnalysisComponent />
          : typeMeta.analysisList.filter(meta => !!question.analysis[meta.key] && (analysisFilter ? !!analysisFilter(meta) : true)).map(({
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
                    : evalLineBreak
                      ? <View wrap={false}>{question.analysis[key].split('\n').map((s, i) => <View key={i} style={commonStyles.sectionStringContent}>{s.split('').map((c, j) => <Text key={j}>{c}</Text>)}</View>)}</View>
                      : <View wrap={false} style={commonStyles.sectionStringContent}>{question.analysis[key].split('').map((c, i) => <Text key={i}>{c}</Text>)}</View>
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
