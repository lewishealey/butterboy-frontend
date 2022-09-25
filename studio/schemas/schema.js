// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import blockContent from './blockContent'
import product from './product'
import discount from './discount'
import cookie from './cookie'
import job from './job'
import review from './review'
import logo from './logo'
import settings from './settings'
import location from './location'
import homepage from './homepage'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    product,
    cookie,
    discount,
    review,
    logo,
    job,
    location,
    settings,
    homepage,
    blockContent
  ]),
})
