import React from 'react'
import ReactPDF, {
  Document,
  Font,
} from '@react-pdf/renderer'

import BasicLayout from './layouts/BasicLayout'
import ReadAloudModel from './models/ReadAloudModel'

import data from './data'


Font.register({
  family: 'MicrosoftYaHei',
  src: `${__dirname}/fonts/msyh.ttf`,
})

const $Container = (
  <Document>
    <BasicLayout>
      <ReadAloudModel
        sequence={1}
        model={data[0][0]}
      />
    </BasicLayout>
  </Document>
)


ReactPDF.render($Container, './pdf/example.pdf')
