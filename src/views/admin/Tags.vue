<template>
  <div class="tags-page">
    <div class="page-header">
      <h2>标签管理</h2>
      <div class="header-actions">
        <button class="add-btn" @click="showAddModal = true">
          <i class="fas fa-plus"></i>
          添加标签
        </button>
      </div>
    </div>

    <div class="tags-grid card">
      <div class="tag-card" v-for="tag in tags" :key="tag.id">
        <div class="tag-header">
          <span class="tag-name">{{ tag.name }}</span>
          <div class="tag-actions">
            <button class="edit-btn" @click="editTag(tag)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" @click="deleteTag(tag.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div class="tag-info">
          <div class="info-item">
            <i class="fas fa-file-alt"></i>
            <span>{{ tag.postCount }} 篇文章</span>
          </div>
          <div class="info-item">
            <i class="fas fa-clock"></i>
            <span>{{ formatDate(tag.createTime) }}</span>
          </div>
        </div>
        <p class="tag-description">{{ tag.description || '暂无描述' }}</p>
      </div>
    </div>

    <!-- 添加/编辑标签弹窗 -->
    <div class="modal" v-if="showAddModal || editingTag">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingTag ? '编辑标签' : '添加标签' }}</h3>
          <button class="close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="tag-form">
          <div class="form-group">
            <label>标签名称</label>
            <input 
              type="text" 
              v-model="form.name"
              required
              placeholder="请输入标签名称"
            >
          </div>
          <div class="form-group">
            <label>标签描述</label>
            <textarea 
              v-model="form.description"
              rows="3"
              placeholder="请输入标签描述（选填）"
            ></textarea>
          </div>
          <div class="form-group">
            <label>标签颜色</label>
            <div class="color-picker">
              <input 
                type="color" 
                v-model="form.color"
                class="color-input"
              >
              <span class="color-preview" :style="{ background: form.color }"></span>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeModal">取消</button>
            <button type="submit" class="submit-btn" :disabled="submitting">
              <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
              <span>{{ submitting ? '保存中...' : '保存' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Tags',
  setup() {
    const showAddModal = ref(false)
    const editingTag = ref(null)
    const submitting = ref(false)

    // 模拟标签数据
    const tags = ref([
      {
        id: 1,
        name: 'Vue3',
        description: 'Vue.js 3.0 相关文章',
        color: '#42b883',
        postCount: 12,
        createTime: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'JavaScript',
        description: 'JavaScript 基础与进阶',
        color: '#f7df1e',
        postCount: 25,
        createTime: '2024-01-02T00:00:00Z'
      },
      // 添加更多标签...
    ])

    const form = ref({
      name: '',
      description: '',
      color: '#1a73e8'
    })

    const resetForm = () => {
      form.value = {
        name: '',
        description: '',
        color: '#1a73e8'
      }
    }

    const closeModal = () => {
      showAddModal.value = false
      editingTag.value = null
      resetForm()
    }

    const editTag = (tag) => {
      editingTag.value = tag
      form.value = {
        name: tag.name,
        description: tag.description,
        color: tag.color
      }
    }

    const handleSubmit = async () => {
      submitting.value = true
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 1000))
      submitting.value = false
      closeModal()
    }

    const deleteTag = async (id) => {
      if (confirm('确定要删除这个标签吗？')) {
        // 模拟删除操作
        console.log('删除标签:', id)
      }
    }

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('zh-CN')
    }

    return {
      tags,
      showAddModal,
      editingTag,
      submitting,
      form,
      closeModal,
      editTag,
      handleSubmit,
      deleteTag,
      formatDate
    }
  }
}
</script>

<style scoped>
.tags-page {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.add-btn {
  padding: 8px 16px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 24px;
}

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.tag-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s;
}

.tag-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.tag-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tag-name {
  font-size: 18px;
  font-weight: 500;
}

.tag-actions {
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn {
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

.edit-btn {
  background: #1a73e8;
}

.delete-btn {
  background: #dc3545;
}

.tag-info {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  color: #666;
  font-size: 14px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tag-description {
  color: #666;
  font-size: 14px;
  margin: 0;
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
  width: 100%;
  max-width: 500px;
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.tag-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #666;
}

input[type="text"],
textarea {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
textarea:focus {
  border-color: #1a73e8;
  outline: none;
}

.color-picker {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-input {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.color-preview {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn,
.submit-btn {
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: white;
  border: 1px solid #ddd;
}

.submit-btn {
  background: #1a73e8;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .tags-page {
    padding: 16px;
  }

  .tags-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: 16px;
  }
}
</style> 