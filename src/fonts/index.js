import {
  Font,
} from '@react-pdf/renderer'

// explicitly import here, to trigger file-loader@webpack
import _ from '../fonts/msyh.ttf'

Font.register({
  family: 'MicrosoftYaHei',
  src: '/fonts/msyh.ttf',
})
