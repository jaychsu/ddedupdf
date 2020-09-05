import React from 'react'
import ReactPDF, {
  Document,
  Page,
  Font,
  StyleSheet,
} from '@react-pdf/renderer'

import ReadAloudModel from './models/ReadAloudModel'

import data from './data'


Font.register({
  family: 'MicrosoftYaHei',
  src: `${__dirname}/fonts/msyh.ttf`,
})

const styles = StyleSheet.create({
  doc: {
    fontSize: 10,
    fontFamily: 'MicrosoftYaHei',
  },
})

const $Container = (
  <Document>
    <Page size="A4" style={styles.doc}>
      <ReadAloudModel
        sequence={1}
        model={data[0][0]}
      />
    </Page>
  </Document>
)


ReactPDF.render($Container, './pdf/example.pdf')
