import easyPdfMerge from 'easy-pdf-merge'

easyPdfMerge(new Array(88).fill().map((_, i) => `./pdf/demo-${i + 1}.pdf`), './pdf/demo.pdf', function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('Successfully merged!')
})
