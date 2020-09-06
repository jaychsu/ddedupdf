import React from 'react'
import {
  Document,
} from '@react-pdf/renderer'

import BasicLayout from '../layouts/BasicLayout'

const DemoFile = ({
  modelMappings,
  data,
}) => (
  <Document>
    <BasicLayout>
      {
        data.map(categories => categories.map((model, i) => {
          const Model = modelMappings[model.question.type]
          if (!Model) {
            console.error(`[Error] cannot find such model type: ${model.question.type}.`)
            return null
          }

          return <Model key={i} sequence={i + 1} model={model} />
        }))
      }
    </BasicLayout>
  </Document>
)

export default DemoFile
