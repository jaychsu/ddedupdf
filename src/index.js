import React from 'react'
import ReactDOM from 'react-dom'
import { PDFViewer } from '@react-pdf/renderer'
import './fonts'

import DemoFile from './entries/DemoFile'
import modelMappings from './models'
import data from './data'

const App = () => (
  <PDFViewer>
    <DemoFile modelMappings={modelMappings} data={data} />
  </PDFViewer>
)

ReactDOM.render(<App />, document.getElementById('root'))
