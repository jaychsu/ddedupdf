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
})

const BasicLayout = ({
  children,
}) => (
  <Page size="A4" style={styles.doc}>
    <Image fixed src="file://images/page-header.png" style={styles.pageHeader} />
    { children }
  </Page>
)

export default BasicLayout
