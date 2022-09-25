import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Location')
        .child(
          S.document()
            .schemaType('location')
            .documentId('location')
        ),
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      ...S.documentTypeListItems().filter(listItem => !['settings','location', 'homepage'].includes(listItem.getId())),
    ])