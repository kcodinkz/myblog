<template>
  <div class="categories-page container">
    <header class="page-header">
      <h1>文章分类</h1>
      <p>探索不同主题的精彩内容</p>
    </header>

    <div class="categories-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="category-icon" :style="{ backgroundColor: category.color }">
          <i :class="category.icon"></i>
        </div>
        <div class="category-info">
          <h2>{{ category.name }}</h2>
          <p>{{ category.description }}</p>
          <div class="category-stats">
            <span>{{ category.posts }} 篇文章</span>
            <span>{{ category.views }} 次浏览</span>
          </div>
          <router-link :to="`/category/${category.id}`" class="view-more">
            浏览文章 <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 热门文章侧边栏 -->
    <aside class="trending-sidebar">
      <h3>热门文章</h3>
      <div class="trending-posts">
        <article v-for="post in trendingPosts" :key="post.id" class="trending-post">
          <div class="post-rank">{{ post.rank }}</div>
          <div class="post-info">
            <h4>{{ post.title }}</h4>
            <div class="post-meta">
              <span>{{ post.views }} 阅读</span>
              <span>{{ post.category }}</span>
            </div>
          </div>
        </article>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'CategoriesPage',
  data() {
    return {
      categories: [
        {
          id: 'tech',
          name: '技术',
          description: '最新技术趋势、教程和最佳实践',
          icon: 'fas fa-code',
          color: '#4CAF50',
          posts: 128,
          views: 25600
        },
        {
          id: 'life',
          name: '生活',
          description: '生活感悟、经验分享和日常记录',
          icon: 'fas fa-heart',
          color: '#E91E63',
          posts: 85,
          views: 15800
        },
        {
          id: 'reading',
          name: '读书',
          description: '书籍推荐、读书笔记和心得体会',
          icon: 'fas fa-book',
          color: '#FF9800',
          posts: 64,
          views: 12400
        },
        {
          id: 'design',
          name: '设计',
          description: 'UI/UX设计、创意灵感和设计资源',
          icon: 'fas fa-palette',
          color: '#2196F3',
          posts: 42,
          views: 8900
        }
      ],
      trendingPosts: [
        {
          id: 1,
          rank: '01',
          title: 'Vue3 组合式API完全指南',
          views: 3500,
          category: '技术'
        },
        {
          id: 2,
          rank: '02',
          title: '2024年值得关注的设计趋势',
          views: 2800,
          category: '设计'
        },
        {
          id: 3,
          rank: '03',
          title: '如何培养持续学习的习惯',
          views: 2300,
          category: '生活'
        }
      ]
    }
  }
}
</script>

<style scoped>
.categories-page {
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
}

.page-header {
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #333;
}

.page-header p {
  color: #666;
  font-size: 1.2em;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.category-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-icon {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon i {
  font-size: 3em;
  color: white;
}

.category-info {
  padding: 20px;
}

.category-info h2 {
  margin-bottom: 10px;
  color: #333;
}

.category-info p {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.category-stats {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 0.9em;
  margin-bottom: 15px;
}

.view-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1a73e8;
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.3s;
}

.view-more:hover {
  gap: 12px;
}

.trending-sidebar {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  align-self: start;
}

.trending-sidebar h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.2em;
}

.trending-post {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.trending-post:last-child {
  border-bottom: none;
}

.post-rank {
  font-size: 1.5em;
  font-weight: bold;
  color: #1a73e8;
  opacity: 0.5;
}

.post-info h4 {
  margin-bottom: 5px;
  color: #333;
  font-size: 1em;
}

.post-meta {
  display: flex;
  gap: 10px;
  color: #666;
  font-size: 0.9em;
}

@media (max-width: 1024px) {
  .categories-page {
    grid-template-columns: 1fr;
  }

  .trending-sidebar {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2em;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style> 