<template>
  <aside class="sidebar">
    <div class="about-me">
      <h3>关于我</h3>
      <p>{{ aboutMe }}</p>
    </div>
    <div class="categories">
      <h3>文章分类</h3>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <router-link :to="'/category/' + category.id">
            {{ category.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'BlogSidebar',
  data() {
    return {
      aboutMe: '你好！我是一名热爱写作和分享的博主。欢迎来到我的个人博客！',
      categories: [
        { id: 'tech', name: '技术' },
        { id: 'life', name: '生活' },
        { id: 'reading', name: '读书笔记' },
        { id: 'travel', name: '旅行' }
      ]
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.about-me {
  margin-bottom: 2rem;
}

.categories ul {
  list-style: none;
  margin-left: 1rem;
}

.categories a {
  text-decoration: none;
  color: #333;
}

.categories a:hover {
  color: #42b983;
}
</style> 