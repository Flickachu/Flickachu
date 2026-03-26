import { type SchemaTypeDefinition } from 'sanity'

import { author } from './author'
import { post } from './post'
import { blockContent } from './blockContent'
import { project } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, post, blockContent, project],
}
