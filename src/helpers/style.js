import {
  StyleSheet,
} from '@react-pdf/renderer'

const commonStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  gap: {
    padding: 2,
    paddingLeft: 4,
    margin: 2,
  },
  rightGap: {
    padding: 2,
    paddingLeft: 0,
    margin: 2,
    marginLeft: 0,
  },


  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#9cc2e5',
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#9cc2e5',
    backgroundColor: '#deeaf6',
  },
  analysis: {
    padding: 8,
  },
  metabar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  question: {
    paddingTop: 4,
    lineHeight: 2,
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: 300,
  },
  section: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  sectionTitle: {
    paddingBottom: 4,
  },
  sectionStringContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontWeight: 300,
  },
})

export default commonStyles
