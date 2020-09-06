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

const LandscapeBase = ({
  sequence,
  model,

  QuestionComponent,
  AnswerComponent,
  AnalysisComponent,
}) => {
  const question = model.question
  const id = question.num

  return (
    <View style={[commonStyles.container, commonStyles.row]}>
      <View style={[commonStyles.sidebar, commonStyles.equalItem]}>
        <View>
          <QuestionComponent />
        </View>
        <View style={[commonStyles.metabar, commonStyles.topGap]}>
          <View style={commonStyles.row}>
            <Label preset="qid">{ `#${id}` }</Label>
            { question.tags.filter(tag => !!~supportedTags.indexOf(tag)).map(key => <Label key={key} preset={key}>{ settings.QUESTION_TAG_MAP[key].label }</Label>) }
          </View>
          <View style={commonStyles.row}>
            <Label preset="red">红色</Label>
            <Label preset="orange">黄色</Label>
            <Label preset="green">绿色</Label>
          </View>
        </View>
      </View>
      <View style={[commonStyles.analysis, commonStyles.equalItem]}>
        <AnalysisComponent />
      </View>
    </View>
  )
}

export default LandscapeBase
