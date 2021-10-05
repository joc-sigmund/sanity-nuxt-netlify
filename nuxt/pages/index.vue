<template>
  <div>
    <header>
      <div class="head">
        <b>Sigmund Blogs - Nuxt + Sanity + Netlify = ❤️</b>
      </div>
    </header>
    <section id="body">
      <p class="top-label">
        You currently have <strong>{{ blogs.length }}</strong> Blogs!
      </p>
      <div class="blogs">
        <div v-for="blog in blogs" :key="blog.id">
          <div class="blog">
            <div class="blog-info">
              <NuxtLink class="link" :to="blog.slug.current"><b class="title">{{ blog.title }}</b></NuxtLink>
              <p class="author">{{ blog.author.firstname }} {{ blog.author.lastname }} - {{ blog.date }}</p>
              <img
                :src="$urlFor(blog.author.picture, 90, 90)"
                :alt="blog.author.firstname + ' ' + blog.author.lastname"
                loading="lazy"
                class="blog-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
export default {
  async asyncData ({ $sanity }) {
    const query = groq`*[_type == "post"]{id, title, slug, date, author->} | order(date desc)`
    const blogs = await $sanity.fetch(query)
    console.log(blogs)
    return { blogs }
  }
}
</script>
