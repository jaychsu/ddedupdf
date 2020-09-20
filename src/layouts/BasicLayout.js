import React from 'react'
import {
  Page,
  StyleSheet,
} from '@react-pdf/renderer'

import Image from '../components/Image'

const styles = StyleSheet.create({
  doc: {
    fontSize: 10,
    fontFamily: 'MicrosoftYaHei',

    padding: 40,
    paddingTop: 120,
  },
  pageHeader: {
    marginTop: -90,
    marginBottom: 10,
  },
  watermark: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})

const BasicLayout = ({
  children,
}) => (
  <Page size="A4" style={styles.doc}>
    <Image fixed src="file://images/page-header.png" style={styles.pageHeader} />
    <Image fixed src="file://images/watermark.png" style={styles.watermark} />
    { children }
  </Page>
)

export default BasicLayout
