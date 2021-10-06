<template>
  <div v-if="blog">
    <header>
      <button @click="$router.back()">
        Retour vers l'accueil
      </button>
      <h1>{{ blog.title }}</h1>
      <p>Par {{ blog.author.firstname }} {{ blog.author.lastname }} en date du {{ blog.date }}</p>
    </header>
    <section id="body">
      <div class="info">
        <template v-for="block in blog.blocks">
          <template v-if="block._type === 'blockRichTextEditor'">
            <SanityContent :key="block._key" :blocks="block.RTE" />
          </template>
          <template v-if="block._type === 'blockImage'">
            <img
              :key="block._key"
              :src="$urlFor(block, 90, 90)"
              loading="lazy"
              class="blog-img"
            />
          </template>
        </template>
      </div>
    </section>
  </div>
</template>
<script>
import { groq } from '@nuxtjs/sanity'
import { SanityContent } from '@nuxtjs/sanity/dist/components/sanity-content'
export default {
  components: { SanityContent },
  async asyncData ({ params, $sanity }) {
    const query = groq`*[_type == "post" && slug.current == "${params.slug}"][0]{title, blocks, date, author->} `
    const blog = await $sanity.fetch(query)
    return { blog }
  }
}
</script>
