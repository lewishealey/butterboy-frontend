import React from 'react'

type Props = {
  content: object
}

const PrintObject = ({ content }: Props) => {
  const formattedContent: string = JSON.stringify(content, null, 2)
  return <pre className="font-mono text-xs">{formattedContent}</pre>
}

export default PrintObject