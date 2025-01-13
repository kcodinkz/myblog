<template>
  <div class="comments-page">
    <div class="page-header">
      <h2>评论管理</h2>
      <div class="header-actions">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索评论..."
          >
          <i class="fas fa-search"></i>
        </div>
      </div>
    </div>

    <div class="comments-list card">
      <div class="filter-bar">
        <div class="filter-group">
          <select v-model="filters.status" class="filter-select">
            <option value="">全部状态</option>
            <option value="pending">待审核</option>
            <option value="approved">已通过</option>
            <option value="rejected">已拒绝</option>
          </select>
        </div>
      </div>

      <div class="comments-table">
        <table>
          <thead>
            <tr>
              <th>评论内容</th>
              <th>评论者</th>
              <th>文章</th>
              <th>状态</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comment in filteredComments" :key="comment.id">
              <td class="comment-content">{{ comment.content }}</td>
              <td class="commenter-info">
                <img :src="comment.avatar" :alt="comment.nickname" class="commenter-avatar">
                <div>
                  <div class="commenter-name">{{ comment.nickname }}</div>
                  <div class="commenter-email">{{ comment.email }}</div>
                </div>
              </td>
              <td>
                <router-link :to="`/post/${comment.postId}`" class="post-link">
                  {{ comment.postTitle }}
                </router-link>
              </td>
              <td>
                <span class="status-badge" :class="comment.status">
                  {{ getStatusText(comment.status) }}
                </span>
              </td>
              <td>{{ formatDate(comment.createTime) }}</td>
              <td class="actions-cell">
                <button 
                  v-if="comment.status === 'pending'"
                  class="action-btn approve"
                  @click="approveComment(comment.id)"
                  title="通过"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button 
                  v-if="comment.status === 'pending'"
                  class="action-btn reject"
                  @click="rejectComment(comment.id)"
                  title="拒绝"
                >
                  <i class="fas fa-times"></i>
                </button>
                <button 
                  class="action-btn delete"
                  @click="deleteComment(comment.id)"
                  title="删除"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Comments',
  setup() {
    const searchQuery = ref('')
    const filters = ref({
      status: ''
    })

    // 模拟评论数据
    const comments = ref([
      {
        id: 1,
        content: '这篇文章写得很好，对我帮助很大！',
        nickname: '张三',
        email: 'zhangsan@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
        postId: 1,
        postTitle: 'Vue3 组合式API完全指南',
        status: 'pending',
        createTime: '2024-03-21T10:00:00Z'
      },
      // 添加更多评论数据...
    ])

    const filteredComments = computed(() => {
      return comments.value.filter(comment => {
        const matchQuery = searchQuery.value === '' ||
          comment.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          comment.nickname.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        const matchStatus = filters.value.status === '' || comment.status === filters.value.status

        return matchQuery && matchStatus
      })
    })

    const getStatusText = (status) => {
      const statusMap = {
        pending: '待审核',
        approved: '已通过',
        rejected: '已拒绝'
      }
      return statusMap[status] || status
    }

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleString('zh-CN')
    }

    // 评论操作方法
    const approveComment = (id) => {
      console.log('通过评论:', id)
    }

    const rejectComment = (id) => {
      console.log('拒绝评论:', id)
    }

    const deleteComment = (id) => {
      console.log('删除评论:', id)
    }

    return {
      searchQuery,
      filters,
      filteredComments,
      getStatusText,
      formatDate,
      approveComment,
      rejectComment,
      deleteComment
    }
  }
}
</script>

<style scoped>
.comments-page {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.header-actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.filter-group {
  display: flex;
  gap: 8px;
}

.filter-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 120px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.comments-table {
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

.author-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.author-email {
  color: #666;
  font-size: 12px;
}

.content-cell {
  max-width: 300px;
}

.comment-content {
  margin-bottom: 4px;
}

.reply-info {
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.status-badge.pending {
  background: #fff3e0;
  color: #f57c00;
}

.status-badge.approved {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.spam {
  background: #ffebee;
  color: #c62828;
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.action-btn.approve {
  background: #4caf50;
}

.action-btn.reply {
  background: #1a73e8;
}

.action-btn.spam {
  background: #ff9800;
}

.action-btn.delete {
  background: #dc3545;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.original-comment {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.reply-form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
  }

  .filter-group {
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }

  .content-cell {
    max-width: none;
  }
}
</style> 