<template>
  <div class="posts-page">
    <div class="page-header">
      <h1>BLOGS</h1>
      <div class="filters">
        <select v-model="selectedCategory" class="filter-select">
          <option value="">ALL CATEGORIES</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <select v-model="sortBy" class="filter-select">
          <option value="newest">LATEST</option>
          <option value="popular">POPULAR</option>
        </select>
      </div>
    </div>

    <div class="posts-grid">
      <article v-for="post in displayedPosts" :key="post.id" class="post-item">
        <div class="post-image">
          <img :src="post.cover" :alt="post.title">
        </div>
        <div class="post-info">
          <div class="post-meta">
            <span class="post-category">{{ post.category }}</span>
            <span class="post-date">{{ formatDate(post.date) }}</span>
          </div>
          <router-link :to="`/post/${post.id}`" class="post-title">
            {{ post.title }}
          </router-link>
        </div>
      </article>
    </div>

    <div class="load-more" v-if="hasMore">
      <button 
        class="load-more-btn" 
        :disabled="loading"
        @click="loadMore"
      >
        <span>{{ loading ? 'LOADING...' : 'LOAD MORE' }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Posts',
  setup() {
    const selectedCategory = ref('')
    const sortBy = ref('newest')
    const loading = ref(false)
    const displayLimit = ref(6)

    // 模拟数据
    const posts = ref([
      {
        id: 1,
        title: '春日午后，与咖啡的约会',
        excerpt: '推开咖啡馆的门，午后的阳光温柔地洒在木质桌面上。我选择了一个靠窗的位置，点了一杯手冲咖啡...',
        cover: 'https://picsum.photos/800/400?random=1',
        category: '生活随笔',
        tags: ['咖啡', '生活感悟', '午后时光'],
        date: '2024-03-21',
        views: 1234,
        comments: 23
      },
      {
        id: 2,
        title: '《百年孤独》：魔幻与现实的交织',
        excerpt: '加西亚·马尔克斯的《百年孤独》是一部震撼人心的杰作。这本书通过布恩迪亚家族的故事...',
        cover: 'https://picsum.photos/800/400?random=2',
        category: '读书分享',
        tags: ['文学经典', '读书笔记', '魔幻现实主义'],
        date: '2024-03-20',
        views: 986,
        comments: 15
      },
      {
        id: 3,
        title: '城市里的小确幸：街角的老面包店',
        excerpt: '每个周末清晨，我都会特意绕道去那家老面包店。推开门的一瞬间，扑面而来的是温暖的面包香...',
        cover: 'https://picsum.photos/800/400?random=3',
        category: '生活随笔',
        tags: ['美食', '城市生活', '怀旧'],
        date: '2024-03-19',
        views: 756,
        comments: 28
      },
      {
        id: 4,
        title: '从零开始的编程之旅：我的技术成长笔记',
        excerpt: '记录我从编程小白到独立开发的心路历程，分享学习过程中的经验和教训...',
        cover: 'https://picsum.photos/800/400?random=4',
        category: '技术笔记',
        tags: ['编程入门', '学习笔记', '个人成长'],
        date: '2024-03-18',
        views: 1567,
        comments: 45
      },
      {
        id: 5,
        title: '《星际穿越》：超越时空的父爱',
        excerpt: '诺兰的《星际穿越》不仅仅是一部科幻电影，更是一个关于亲情、信念与人性的故事...',
        cover: 'https://picsum.photos/800/400?random=5',
        category: '影视评论',
        tags: ['电影评论', '科幻', '父女情'],
        date: '2024-03-17',
        views: 2341,
        comments: 67
      },
      {
        id: 6,
        title: '《都市寻梦人》第一章：雨夜邂逅',
        excerpt: '雨，淅淅沥沥地下着。李明站在霓虹闪烁的街角，望着来来往往的人群...',
        cover: 'https://picsum.photos/800/400?random=6',
        category: '小说连载',
        tags: ['都市小说', '连载', '爱情'],
        date: '2024-03-16',
        views: 892,
        comments: 34
      }
    ])

    const categories = ref([
      { 
        id: 1, 
        name: '技术笔记',
        icon: 'fa-code'
      },
      { 
        id: 2, 
        name: '生活随笔',
        icon: 'fa-coffee'
      },
      { 
        id: 3, 
        name: '读书分享',
        icon: 'fa-book'
      },
      {
        id: 4,
        name: '影视评论',
        icon: 'fa-film'
      },
      {
        id: 5,
        name: '新闻资讯',
        icon: 'fa-newspaper'
      },
      {
        id: 6,
        name: '小说连载',
        icon: 'fa-feather-alt'
      }
    ])

    const tags = ref([
      { id: 1, name: '生活感悟' },
      { id: 2, name: '美食' },
      { id: 3, name: '读书笔记' },
      { id: 4, name: '电影评论' },
      { id: 5, name: '旅行' },
      { id: 6, name: '随笔' },
      { id: 7, name: '技术成长' },
      { id: 8, name: '小说' }
    ])

    const filteredPosts = computed(() => {
      let result = [...posts.value]

      if (selectedCategory.value) {
        result = result.filter(post => post.category === selectedCategory.value)
      }

      if (sortBy.value === 'newest') {
        result.sort((a, b) => new Date(b.date) - new Date(a.date))
      } else if (sortBy.value === 'popular') {
        result.sort((a, b) => b.views - a.views)
      }

      return result
    })

    const displayedPosts = computed(() => {
      return filteredPosts.value.slice(0, displayLimit.value)
    })

    const hasMore = computed(() => {
      return displayedPosts.value.length < filteredPosts.value.length
    })

    const loadMore = async () => {
      loading.value = true
      // 模拟异步加载
      await new Promise(resolve => setTimeout(resolve, 1000))
      displayLimit.value += 6
      loading.value = false
    }

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('zh-CN')
    }

    return {
      selectedCategory,
      sortBy,
      displayedPosts,
      hasMore,
      loading,
      loadMore,
      formatDate,
      categories,
      tags
    }
  }
}
</script>

<style scoped>
.posts-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.page-header {
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 30px;
}

.filters {
  display: flex;
  gap: 20px;
}

.filter-select {
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  padding: 8px 16px;
  font-size: 14px;
  min-width: 160px;
  cursor: pointer;
}

.filter-select option {
  background: #000;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.post-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-image {
  aspect-ratio: 4/3;
  overflow: hidden;
  border: 1px solid #333;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all 0.3s;
}

.post-item:hover .post-image img {
  filter: grayscale(0);
}

.post-info {
  padding: 0 10px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 14px;
  margin-bottom: 10px;
}

.post-title {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.post-title:hover {
  color: #888;
}

.load-more {
  text-align: center;
  margin-top: 60px;
}

.load-more-btn {
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  padding: 12px 32px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more-btn:hover:not(:disabled) {
  border-color: #fff;
}

.load-more-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .posts-page {
    padding: 40px 20px;
  }

  .filters {
    flex-direction: column;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style> 