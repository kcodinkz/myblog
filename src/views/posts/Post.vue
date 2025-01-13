<template>
  <div class="post-page">
    <article class="post-content" v-if="post">
      <header class="post-header">
        <div class="post-meta">
          <span class="post-category">{{ post.category }}</span>
          <span class="post-date">{{ formatDate(post.date) }}</span>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
      </header>

      <div class="post-cover">
        <img :src="post.cover" :alt="post.title">
      </div>

      <div class="post-body" v-html="post.content"></div>

      <footer class="post-footer">
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </footer>
    </article>
    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Post',
  setup() {
    const route = useRoute()
    const post = ref(null)

    onMounted(() => {
      // 模拟获取文章数据
      setTimeout(() => {
        post.value = {
          id: route.params.id,
          title: '春日午后，与咖啡的约会',
          category: '生活随笔',
          date: '2024-03-21',
          cover: 'https://picsum.photos/1200/600?random=1',
          content: `
            <p>推开咖啡馆的门，午后的阳光温柔地洒在木质桌面上。我选择了一个靠窗的位置，点了一杯手冲咖啡...</p>
            <p>咖啡的香气在空气中缓缓扩散，伴随着轻柔的爵士乐，整个下午都变得慵懒而美好。</p>
            <p>透过窗户，我看着街道上来来往往的人群，每个人都在演绎着自己的故事...</p>
          `,
          tags: ['咖啡', '生活感悟', '午后时光']
        }
      }, 500) // 模拟加载延迟
    })

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('zh-CN')
    }

    return {
      post,
      formatDate
    }
  }
}
</script>

<style scoped>
.post-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
}

.post-header {
  margin-bottom: 40px;
}

.post-meta {
  display: flex;
  gap: 20px;
  color: #888;
  font-size: 14px;
  margin-bottom: 20px;
}

.post-title {
  font-size: 36px;
  font-weight: normal;
  margin: 0;
}

.post-cover {
  margin-bottom: 40px;
  border: 1px solid #333;
}

.post-cover img {
  width: 100%;
  height: auto;
  display: block;
  filter: grayscale(100%);
}

.post-body {
  line-height: 1.8;
  color: #888;
  margin-bottom: 40px;
}

.post-body p {
  margin-bottom: 20px;
}

.post-footer {
  padding-top: 40px;
  border-top: 1px solid #333;
}

.post-tags {
  display: flex;
  gap: 12px;
}

.tag {
  padding: 4px 12px;
  border: 1px solid #333;
  font-size: 14px;
  color: #888;
}

@media (max-width: 768px) {
  .post-page {
    padding: 40px 20px;
  }

  .post-title {
    font-size: 28px;
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #888;
}
</style> 