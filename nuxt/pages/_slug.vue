<template>
  <div v-if="blog">
    <header>
      <div @click="$router.back()">
        Retour vers l'accueil
      </div>
    </header>
    <section id="body">
      <div class="info">
        <template v-for="block in blog.blocks">
          <SanityContent :key="block._key" :blocks="block.RTE" />
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
    const query = groq`*[_type == "post" && slug.current == "${params.slug}"][0]`
    const blog = await $sanity.fetch(query)
    return { blog }
  }
}
</script>
