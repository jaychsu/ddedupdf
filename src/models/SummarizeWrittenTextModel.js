import React from 'react'
import PortraitBase from './PortraitBase'
import Image from '../components/Image'

import commonStyles from '../helpers/style'

const SummarizeWrittenTextModel = ({
  sequence,
  model,
  ...rest
}) => {
  const question = model.question
  const id = question.num

  const QuestionComponent = () => (
    <Image src={`file://images/model-${id}-topicSentences.png`} />
  )

  return (
    <PortraitBase
      sequence={sequence}
      model={model}
      QuestionComponent={QuestionComponent}
      analysisFilter={meta => !!~['translation_zh', 'modelEssay', 'modelEssayTranslation_zh'].indexOf(meta.key)}
      { ...rest }
    />
  )
}

export default SummarizeWrittenTextModel
