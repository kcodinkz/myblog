<template>
  <div class="posts-page">
    <div class="page-header">
      <div class="header-left">
        <h2>文章管理</h2>
        <div class="filter-group">
          <select v-model="filter.status" class="filter-select">
            <option value="">全部状态</option>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
          </select>
          <select v-model="filter.category" class="filter-select">
            <option value="">全部分类</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="header-right">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索文章..."
            @input="handleSearch"
          >
          <i class="fas fa-search"></i>
        </div>
        <router-link to="/admin/posts/new" class="new-post-btn">
          <i class="fas fa-plus"></i>
          写文章
        </router-link>
      </div>
    </div>

    <div class="posts-table">
      <table>
        <thead>
          <tr>
            <th class="checkbox-col">
              <input 
                type="checkbox" 
                :checked="isAllSelected"
                @change="toggleSelectAll"
              >
            </th>
            <th>标题</th>
            <th>分类</th>
            <th>作者</th>
            <th>状态</th>
            <th>发布时间</th>
            <th>阅读量</th>
            <th>评论数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in filteredPosts" :key="post.id">
            <td>
              <input 
                type="checkbox" 
                v-model="selectedPosts"
                :value="post.id"
              >
            </td>
            <td class="title-cell">
              <img :src="post.cover" :alt="post.title" class="post-cover">
              <div class="post-info">
                <router-link :to="`/post/${post.id}`" class="post-title">
                  {{ post.title }}
                </router-link>
                <div class="post-tags">
                  <span v-for="tag in post.tags" :key="tag" class="tag">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </td>
            <td>{{ post.category }}</td>
            <td>{{ post.author }}</td>
            <td>
              <span class="status-badge" :class="post.status">
                {{ post.status === 'published' ? '已发布' : '草稿' }}
              </span>
            </td>
            <td>{{ post.publishDate }}</td>
            <td>{{ post.views }}</td>
            <td>{{ post.comments }}</td>
            <td class="actions-cell">
              <button 
                class="action-btn edit"
                @click="editPost(post.id)"
                title="编辑"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button 
                v-if="post.status === 'draft'"
                class="action-btn publish"
                @click="publishPost(post.id)"
                title="发布"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
              <button 
                class="action-btn delete"
                @click="deletePost(post.id)"
                title="删除"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <div class="bulk-actions" v-if="selectedPosts.length">
        <select v-model="bulkAction" class="bulk-select">
          <option value="">批量操作</option>
          <option value="publish">发布</option>
          <option value="delete">删除</option>
        </select>
        <button 
          class="apply-btn"
          @click="applyBulkAction"
          :disabled="!bulkAction"
        >
          应用
        </button>
      </div>

      <div class="pagination">
        <button 
          class="page-btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="page-info">
          第 {{ currentPage }}/{{ totalPages }} 页
        </span>
        <button 
          class="page-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminPosts',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const currentPage = ref(1)
    const selectedPosts = ref([])
    const bulkAction = ref('')

    const filter = ref({
      status: '',
      category: ''
    })

    // 模拟数据
    const posts = [
      {
        id: 1,
        title: 'Vue3 组合式API完全指南',
        cover: 'https://picsum.photos/50/50?random=1',
        category: '技术',
        author: '管理员',
        status: 'published',
        publishDate: '2024-03-21',
        views: 1234,
        comments: 23,
        tags: ['Vue3', 'JavaScript']
      },
      // ... 更多文章数据
    ]

    const categories = [
      { id: 1, name: '技术' },
      { id: 2, name: '生活' },
      { id: 3, name: '读书' }
    ]

    // 计算属性和方法
    const filteredPosts = computed(() => {
      return posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesStatus = !filter.value.status || post.status === filter.value.status
        const matchesCategory = !filter.value.category || post.category === filter.value.category
        return matchesSearch && matchesStatus && matchesCategory
      })
    })

    const isAllSelected = computed(() => {
      return selectedPosts.value.length === posts.length
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredPosts.value.length / 10)
    })

    // 方法
    const toggleSelectAll = () => {
      if (isAllSelected.value) {
        selectedPosts.value = []
      } else {
        selectedPosts.value = posts.map(post => post.id)
      }
    }

    const handleSearch = () => {
      currentPage.value = 1
    }

    const editPost = (id) => {
      router.push(`/admin/posts/edit/${id}`)
    }

    const publishPost = (id) => {
      // 实现发布逻辑
    }

    const deletePost = (id) => {
      // 实现删除逻辑
    }

    const applyBulkAction = () => {
      // 实现批量操作逻辑
    }

    return {
      searchQuery,
      currentPage,
      selectedPosts,
      bulkAction,
      filter,
      categories,
      filteredPosts,
      isAllSelected,
      totalPages,
      toggleSelectAll,
      handleSearch,
      editPost,
      publishPost,
      deletePost,
      applyBulkAction
    }
  }
}
</script>

<style scoped>
.posts-page {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.page-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.filter-group {
  display: flex;
  gap: 10px;
}

.filter-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 120px;
}

.search-box {
  position: relative;
  margin-right: 20px;
}

.search-box input {
  padding: 8px 32px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.search-box i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.new-post-btn {
  padding: 8px 16px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.posts-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 500;
}

.checkbox-col {
  width: 40px;
}

.title-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.post-cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

.post-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.post-title {
  color: #1a73e8;
  text-decoration: none;
  font-weight: 500;
}

.post-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.status-badge.published {
  background: #e8f5e9;
  color: #28a745;
}

.status-badge.draft {
  background: #fff3e0;
  color: #ffa000;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
}

.action-btn.edit {
  background: #1a73e8;
}

.action-btn.publish {
  background: #28a745;
}

.action-btn.delete {
  background: #dc3545;
}

.table-footer {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
}

.bulk-actions {
  display: flex;
  gap: 10px;
}

.bulk-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 120px;
}

.apply-btn {
  padding: 8px 16px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.apply-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.page-btn:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 20px;
  }

  .header-left {
    flex-direction: column;
    align-items: stretch;
  }

  .header-right {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .search-box {
    margin-right: 0;
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }

  .new-post-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 