<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="stat-info">
          <h3>文章数量</h3>
          <div class="stat-value">{{ stats.posts }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-comments"></i>
        </div>
        <div class="stat-info">
          <h3>评论数量</h3>
          <div class="stat-value">{{ stats.comments }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-info">
          <h3>用户数量</h3>
          <div class="stat-value">{{ stats.users }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-eye"></i>
        </div>
        <div class="stat-info">
          <h3>总访问量</h3>
          <div class="stat-value">{{ stats.views }}</div>
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <!-- 这里可以添加图表组件 -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Dashboard',
  setup() {
    // 模拟数据
    const stats = ref({
      posts: 25,
      comments: 168,
      users: 42,
      views: 12580
    })

    return {
      stats
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #e3f2fd;
  color: #1a73e8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-info h3 {
  color: #666;
  font-size: 14px;
  margin: 0 0 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style> 