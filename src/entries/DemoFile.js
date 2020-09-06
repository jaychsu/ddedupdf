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
        data.categories.map(category => category.types.map(type => {
          const Model = modelMappings[type.key]
          if (!Model) {
            console.error(`[Error] cannot find such model type: ${type.key}.`)
            return null
          }

          const model = {
            question: null,
            type,
          }

          return type.questions.map((question, i) => {
            model.question = question
            return <Model key={i} sequence={i + 1} model={model} />
          })
        }))
      }
    </BasicLayout>
  </Document>
)

export default DemoFile
