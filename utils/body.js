import BlockContent from '@sanity/block-content-to-react';

const serializers = {
    types: {
      code: (props) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
    },
}

export default function RenderBody({ body, className}) {
  return (
      <div className={`prose-p:pb-3 prose-headings:pb-3 ${className} font-sephora`}>
        <BlockContent blocks={body} serializers={serializers} />
    </div>
  )
}