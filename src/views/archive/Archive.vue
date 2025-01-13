<template>
  <div class="archive-page container">
    <header class="page-header">
      <h1>文章归档</h1>
      <div class="archive-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalPosts }}</span>
          <span class="stat-label">文章总数</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalCategories }}</span>
          <span class="stat-label">分类数量</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalTags }}</span>
          <span class="stat-label">标签数量</span>
        </div>
      </div>
    </header>

    <div class="archive-content">
      <div class="timeline">
        <div v-for="year in archiveData" :key="year.year" class="year-section">
          <div class="year-header">
            <h2>{{ year.year }}</h2>
            <span class="post-count">{{ year.posts.length }} 篇文章</span>
          </div>
          
          <div class="posts-timeline">
            <article v-for="post in year.posts" :key="post.id" class="timeline-item">
              <div class="post-date">
                <span class="month">{{ post.month }}</span>
                <span class="day">{{ post.day }}</span>
              </div>
              <div class="post-content">
                <router-link :to="`/post/${post.id}`" class="post-title">
                  {{ post.title }}
                </router-link>
                <div class="post-meta">
                  <span class="category">{{ post.category }}</span>
                  <span class="separator">•</span>
                  <span class="reading-time">{{ post.readingTime }}分钟阅读</span>
                </div>
                <p class="post-excerpt">{{ post.excerpt }}</p>
                <div class="post-tags">
                  <router-link 
                    v-for="tag in post.tags" 
                    :key="tag"
                    :to="`/tag/${tag}`"
                    class="tag"
                  >
                    #{{ tag }}
                  </router-link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <aside class="archive-sidebar">
        <div class="calendar-widget">
          <h3>文章日历</h3>
          <!-- 这里可以添加日历组件 -->
        </div>

        <div class="archive-filter">
          <h3>筛选</h3>
          <div class="filter-section">
            <h4>按年份</h4>
            <div class="filter-options">
              <button 
                v-for="year in years" 
                :key="year"
                :class="['filter-btn', { active: selectedYear === year }]"
                @click="selectedYear = year"
              >
                {{ year }}
              </button>
            </div>
          </div>

          <div class="filter-section">
            <h4>按分类</h4>
            <div class="filter-options">
              <button 
                v-for="cat in categories" 
                :key="cat.id"
                :class="['filter-btn', { active: selectedCategory === cat.id }]"
                @click="selectedCategory = cat.id"
              >
                {{ cat.name }}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArchivePage',
  data() {
    return {
      selectedYear: null,
      selectedCategory: null,
      totalPosts: 256,
      totalCategories: 8,
      totalTags: 64,
      years: [2024, 2023, 2022, 2021],
      categories: [
        { id: 'tech', name: '技术' },
        { id: 'life', name: '生活' },
        { id: 'reading', name: '读书' }
      ],
      archiveData: [
        {
          year: 2024,
          posts: [
            {
              id: 1,
              title: 'Vue3 和 TypeScript 实战指南',
              month: '03',
              day: '21',
              category: '技术',
              readingTime: 15,
              excerpt: '深入探讨 Vue3 的新特性和 TypeScript 的最佳实践...',
              tags: ['Vue', 'TypeScript', '前端']
            },
            // 更多文章...
          ]
        },
        // 更多年份...
      ]
    }
  }
}
</script>

<style scoped>
.archive-page {
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #333;
}

.archive-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2em;
  font-weight: bold;
  color: #1a73e8;
}

.stat-label {
  color: #666;
}

.archive-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
}

.timeline {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.year-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1a73e8;
}

.year-header h2 {
  color: #1a73e8;
  font-size: 1.8em;
}

.post-count {
  color: #666;
}

.timeline-item {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.post-date {
  text-align: center;
  min-width: 60px;
}

.month {
  display: block;
  font-size: 1.2em;
  color: #666;
}

.day {
  display: block;
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
}

.post-content {
  flex: 1;
}

.post-title {
  display: block;
  font-size: 1.2em;
  color: #333;
  text-decoration: none;
  margin-bottom: 10px;
}

.post-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.separator {
  margin: 0 8px;
}

.post-excerpt {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.post-tags {
  display: flex;
  gap: 10px;
}

.tag {
  color: #1a73e8;
  text-decoration: none;
  font-size: 0.9em;
}

.archive-sidebar {
  align-self: start;
}

.calendar-widget,
.archive-filter {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h4 {
  margin-bottom: 10px;
  color: #333;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: none;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn.active {
  background: #1a73e8;
  color: white;
  border-color: #1a73e8;
}

@media (max-width: 1024px) {
  .archive-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2em;
  }

  .archive-stats {
    gap: 30px;
  }

  .timeline {
    padding: 20px;
  }

  .timeline-item {
    flex-direction: column;
    gap: 10px;
  }

  .post-date {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .month,
  .day {
    font-size: 1em;
  }
}
</style> 