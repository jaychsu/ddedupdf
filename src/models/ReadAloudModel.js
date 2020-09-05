import React from 'react'
import {
  View,
  Text,
  Link,
  StyleSheet,
} from '@react-pdf/renderer'
import Label from '../components/Label'
import Image from '../components/Image'
import {
  isHTML,
} from '../helpers'

import settings from '../data/settings.json'


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  gap: {
    padding: 2,
    paddingLeft: 4,
    margin: 2,
  },
  rightGap: {
    padding: 2,
    paddingLeft: 0,
    margin: 2,
    marginLeft: 0,
  },

  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#9cc2e5',
  },
  header: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#9cc2e5',
    backgroundColor: '#deeaf6',
  },
  analysis: {
    padding: 8,
  },
  metabar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffb4b0',
    borderRadius: 2,
  },
  question: {
    paddingTop: 4,
    lineHeight: 2,
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: 300,
  },
  section: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  sectionTitle: {
    paddingBottom: 4,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontWeight: 300,
  },
})

const ReadAloudModel = ({
  sequence,
  model,
}) => {
  const question = model.question
  const id = question.num

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.metabar}>
          <View style={styles.row}>
            <Text style={styles.rightGap}>{ `${question.typeObj.abbr}${sequence}.` }</Text>
            <Text style={styles.gap}>{ question.title }</Text>
            <Label preset="qid">{ `#${id}` }</Label>
            { question.tags.map(key => <Label key={key} preset={key}>{ settings.QUESTION_TAG_MAP[key].label }</Label>) }
          </View>
          <View style={styles.row}>
            <Label preset="red">红色</Label>
            <Label preset="orange">黄色</Label>
            <Label preset="green">绿色</Label>
          </View>
        </View>
        <View>
          <Text style={styles.question}>{ question.content }</Text>
        </View>
      </View>
      <View style={styles.analysis}>
        {
          question.typeObj.analysisList.map(({
            key,
            title,
          }) => (
            <View key={key} style={[
              styles.section,
              typeof question.analysis[key] !== 'string' ? styles.row : null
            ]}>
              <Text style={styles.sectionTitle}>{ `${title}：` }</Text>
              { typeof question.analysis[key] === 'string'
                ? isHTML(question.analysis[key])
                  ? <Image src={`file://images/model-${id}-${key}.png`} />
                  : <View style={styles.sectionContent}>{question.analysis[key].split('').map((c, i) => <Text key={i}>{c}</Text>)}</View>
                : key.startsWith('explainVideo')
                  ? <Link href={`https://www.91ddedu.com/question/${id}`} style={styles.link}>此题有视频讲解，请见网站及 APP</Link>
                  : <Link href={`https://www.91ddedu.com/question/${id}`} style={styles.link}>此题有音频示范，请见网站及 APP</Link>
              }
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default ReadAloudModel
