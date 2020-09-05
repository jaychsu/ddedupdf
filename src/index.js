import React from 'react'
import ReactDOM from 'react-dom'
import { PDFViewer } from '@react-pdf/renderer'
import './fonts'

import DemoFile from './entries/DemoFile'

const App = () => (
  <PDFViewer>
    <DemoFile />
  </PDFViewer>
)

ReactDOM.render(<App />, document.getElementById('root'))
