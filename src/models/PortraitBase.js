import React from 'react'
import {
  View,
  Text,
} from '@react-pdf/renderer'
import Label from '../components/Label'

import commonStyles from '../helpers/style'
import settings from '../data/settings.json'

const PortraitBase = ({
  sequence,
  model,

  questionComponent,
  analysisComponent,
}) => {
  const question = model.question
  const id = question.num

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <View style={commonStyles.metabar}>
          <View style={commonStyles.row}>
            <Text style={commonStyles.rightGap}>{ `${question.typeObj.abbr}${sequence}.` }</Text>
            <Text style={commonStyles.gap}>{ question.title }</Text>
            <Label preset="qid">{ `#${id}` }</Label>
            { question.tags.map(key => <Label key={key} preset={key}>{ settings.QUESTION_TAG_MAP[key].label }</Label>) }
          </View>
          <View style={commonStyles.row}>
            <Label preset="red">红色</Label>
            <Label preset="orange">黄色</Label>
            <Label preset="green">绿色</Label>
          </View>
        </View>
        <View>
          { questionComponent }
        </View>
      </View>
      <View style={commonStyles.analysis}>
        { analysisComponent }
      </View>
    </View>
  )
}

export default PortraitBase
