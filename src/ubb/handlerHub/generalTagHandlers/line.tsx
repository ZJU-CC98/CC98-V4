import { IGeneralTagHandler } from '@cc98/ubb-core'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /line/,

  render() {
    return <hr />
  },
}

export default handler
