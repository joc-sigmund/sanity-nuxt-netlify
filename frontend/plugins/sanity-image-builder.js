import imageUrlBuilder from '@sanity/image-url'

export default ({ $sanity }, inject) => {
  const builder = imageUrlBuilder($sanity.config)
  function urlFor (source, width, height) {
    return builder.image(source).width(width).height(height)
  }
  inject('urlFor', urlFor)
}
