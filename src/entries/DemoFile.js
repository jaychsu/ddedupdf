import React from 'react'
import {
  Document,
  Page,
  StyleSheet,
} from '@react-pdf/renderer'

import ReadAloudModel from '../models/ReadAloudModel'

import data from '../data'


const styles = StyleSheet.create({
  doc: {
    fontFamily: 'MicrosoftYaHei',
    fontSize: 12,
  },
})

const DemoFile = () => (
  <Document>
    <Page size="A4" style={styles.doc}>
      <ReadAloudModel
        sequence={1}
        model={data[0][0]}
      />
    </Page>
  </Document>
)

export default DemoFile
