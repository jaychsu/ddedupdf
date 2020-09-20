import React from 'react'
import {
  Document,
} from '@react-pdf/renderer'

import BasicLayout from '../layouts/BasicLayout'

const DemoFile = ({
  modelMappings,
  data,
}) => {
  let isStartIdxUsed = false
  let i
  return (
    <Document>
      <BasicLayout>
        {
          data.categories.map(category => category.types.map(type => {
            const Model = modelMappings[type.key]
            if (!Model) {
              console.error(`[Warning] cannot find such model type: ${type.key}.`)
              return null
            }

            if (!type.questions.length) {
              return null
            }

            if (isStartIdxUsed) {
              i = 0
            } else {
              isStartIdxUsed = true
              i = data.startIdx
            }

            return type.questions.map((question, j) => {
              return <Model key={j} sequence={i + j + 1} model={{
                question,
                type,
              }} />
            })
          }))
        }
      </BasicLayout>
    </Document>
  )
}

export default DemoFile
