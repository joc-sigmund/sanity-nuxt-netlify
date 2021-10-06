// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: "Blog post",
      name : "post",
      type: "document",
      fields: [
        {
          title: "Title",
          name: "title",
          type: "string",
          description: "Enter blog post name here"
        },
        {
          title: "Date",
          name: "date",
          type: "date",
          description: "Enter the publish date here"
        },
        {
          title: 'Author',
          name: 'author',
          type: 'reference',
          to: [{type: 'author'}]
        },
        {
          title: 'Blocks',
          name: 'blocks',
          type: 'array',
          of: [{
            type: 'blockRichTextEditor'
          },
          {
            type: 'blockImage'
          }]
        },
        {
          title: 'Slug',
          name: 'slug',
          type: 'slug',
          options: {
            source: "title",
            maxLength: 96,
          }
        }
      ]
    },
    {
      title: "Author",
      name: "author",
      type: "document",
      fields: [
        {
          title: "Firstname",
          name: "firstname",
          type: "string",
          description: "Enter the author firstname here"
        },
        {
          title: "Lastname",
          name: "lastname",
          type: "string",
          description: "Enter the author lastname here"
        },
        {
          title: "Picture",
          name: "picture",
          type: "image",
          description: "Select the author picture here"
        }
      ]
    },
    {
      title: "Block RichTextEditor",
      name: "blockRichTextEditor",
      type: 'object',
      fields: [
        {name: 'RTE', type: 'array', of: [{type: 'block'}]}
      ]
    },
    {
      title: "Block Image",
      name: "blockImage",
      type: 'image',
      description: "Select the image here"
    }
  ]),
})
