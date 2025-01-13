<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在</p>
      <div class="actions">
        <router-link to="/" class="back-home">
          <i class="fas fa-home"></i>
          返回首页
        </router-link>
        <button class="go-back" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
          返回上一页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  padding: 20px;
}

.content {
  text-align: center;
}

h1 {
  font-size: 120px;
  color: #1a73e8;
  margin: 0;
  line-height: 1;
}

p {
  font-size: 24px;
  color: #666;
  margin: 20px 0 40px;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.back-home,
.go-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.back-home {
  background: #1a73e8;
  color: white;
  text-decoration: none;
}

.back-home:hover {
  background: #1557b0;
}

.go-back {
  background: white;
  border: 1px solid #ddd;
  color: #666;
}

.go-back:hover {
  background: #f5f5f5;
}

@media (max-width: 480px) {
  h1 {
    font-size: 80px;
  }

  p {
    font-size: 18px;
  }

  .actions {
    flex-direction: column;
  }
}
</style> 