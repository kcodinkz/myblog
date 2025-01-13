<template>
  <section class="blog-posts">
    <article v-for="post in posts" :key="post.id" class="post">
      <h2>{{ post.title }}</h2>
      <p class="post-meta">发布于 {{ post.date }}</p>
      <p>{{ post.summary }}</p>
      <router-link :to="'/post/' + post.id" class="read-more">
        阅读更多
      </router-link>
    </article>
  </section>
</template>

<script>
export default {
  name: 'BlogPosts',
  data() {
    return {
      posts: [
        {
          id: 1,
          title: '博客文章标题',
          date: '2024年3月21日',
          summary: '这是博客文章的摘要内容。在这里你可以展示文章的前几行内容，吸引读者点击阅读更多...'
        },
        {
          id: 2,
          title: '另一篇博客文章',
          date: '2024年3月20日',
          summary: '这是另一篇博客文章的摘要内容。你可以在这里放置文章的简短描述...'
        }
      ]
    }
  }
}
</script>

<style scoped>
.blog-posts {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.post {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.post:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.post h2 {
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #42b983;
  text-decoration: none;
}
</style> 