import React from 'react'
import ReactPDF, {
  Font,
} from '@react-pdf/renderer'

import DemoFile from './entries/DemoFile'

import ReadAloudModel from './models/ReadAloudModel'
import RetellLectureModel from './models/RetellLectureModel'
import DescribeImageModel from './models/DescribeImageModel'

import data from './data'

Font.register({
  family: 'MicrosoftYaHei',
  src: `${__dirname}/fonts/msyh.ttf`,
})

const modelMappings = {
  PTE_RA: ReadAloudModel,
  PTE_RL: RetellLectureModel,
  PTE_DI: DescribeImageModel,
}

ReactPDF.render(
  <DemoFile modelMappings={modelMappings} data={data} />,
  './pdf/demo.pdf'
)
