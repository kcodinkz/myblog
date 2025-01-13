<template>
  <div class="categories-page">
    <!-- 添加/编辑分类表单 -->
    <div class="category-form card">
      <h2>{{ isEdit ? '编辑分类' : '添加分类' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>分类名称</label>
          <input 
            type="text" 
            v-model="form.name" 
            required
            placeholder="输入分类名称"
          >
        </div>
        <div class="form-group">
          <label>分类描述</label>
          <textarea 
            v-model="form.description" 
            placeholder="输入分类描述"
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label>分类图标</label>
          <div class="icon-selector">
            <button 
              type="button"
              class="icon-btn"
              @click="showIconPicker = true"
            >
              <i v-if="form.icon" :class="['fas', form.icon]"></i>
              <span v-else>选择图标</span>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label>颜色标识</label>
          <input 
            type="color" 
            v-model="form.color"
            class="color-picker"
          >
        </div>
        <div class="form-actions">
          <button 
            type="button" 
            class="cancel-btn"
            @click="resetForm"
          >
            取消
          </button>
          <button type="submit" class="submit-btn">
            {{ isEdit ? '保存修改' : '添加分类' }}
          </button>
        </div>
      </form>
    </div>

    <!-- 分类列表 -->
    <div class="categories-list card">
      <div class="card-header">
        <h2>分类列表</h2>
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索分类..."
            >
            <i class="fas fa-search"></i>
          </div>
          <select v-model="sortBy" class="sort-select">
            <option value="name">按名称</option>
            <option value="posts">按文章数</option>
            <option value="date">按创建时间</option>
          </select>
        </div>
      </div>

      <div class="categories-table">
        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>描述</th>
              <th>文章数</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in filteredCategories" :key="category.id">
              <td class="category-name">
                <i :class="['fas', category.icon]" :style="{ color: category.color }"></i>
                <span>{{ category.name }}</span>
              </td>
              <td>{{ category.description }}</td>
              <td>{{ category.posts }}</td>
              <td>{{ category.createDate }}</td>
              <td class="actions">
                <button 
                  class="edit-btn"
                  @click="editCategory(category)"
                  title="编辑"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button 
                  class="delete-btn"
                  @click="deleteCategory(category.id)"
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

    <!-- 图标选择器弹窗 -->
    <div v-if="showIconPicker" class="icon-picker-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>选择图标</h3>
          <button class="close-btn" @click="showIconPicker = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="icons-grid">
          <button 
            v-for="icon in icons" 
            :key="icon"
            class="icon-option"
            @click="selectIcon(icon)"
          >
            <i :class="['fas', icon]"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'AdminCategories',
  setup() {
    const form = ref({
      name: '',
      description: '',
      icon: '',
      color: '#1a73e8'
    })

    const isEdit = ref(false)
    const editId = ref(null)
    const showIconPicker = ref(false)
    const searchQuery = ref('')
    const sortBy = ref('name')

    // 模拟数据
    const categories = ref([
      {
        id: 1,
        name: '技术',
        description: '技术相关文章',
        icon: 'fa-code',
        color: '#4CAF50',
        posts: 25,
        createDate: '2024-03-20'
      },
      // ... 其他分类数据
    ])

    const icons = [
      'fa-code',
      'fa-book',
      'fa-heart',
      'fa-camera',
      'fa-music',
      'fa-film',
      // ... 更多图标
    ]

    const filteredCategories = computed(() => {
      let result = [...categories.value]
      
      // 搜索过滤
      if (searchQuery.value) {
        result = result.filter(cat => 
          cat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }

      // 排序
      result.sort((a, b) => {
        switch (sortBy.value) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'posts':
            return b.posts - a.posts
          case 'date':
            return new Date(b.createDate) - new Date(a.createDate)
          default:
            return 0
        }
      })

      return result
    })

    const handleSubmit = () => {
      if (isEdit.value) {
        // 更新分类
        const index = categories.value.findIndex(c => c.id === editId.value)
        if (index !== -1) {
          categories.value[index] = { ...categories.value[index], ...form.value }
        }
      } else {
        // 添加新分类
        categories.value.push({
          id: Date.now(),
          ...form.value,
          posts: 0,
          createDate: new Date().toISOString().split('T')[0]
        })
      }
      resetForm()
    }

    const editCategory = (category) => {
      isEdit.value = true
      editId.value = category.id
      form.value = { ...category }
    }

    const deleteCategory = (id) => {
      if (confirm('确定要删除这个分类吗？')) {
        categories.value = categories.value.filter(c => c.id !== id)
      }
    }

    const resetForm = () => {
      form.value = {
        name: '',
        description: '',
        icon: '',
        color: '#1a73e8'
      }
      isEdit.value = false
      editId.value = null
    }

    const selectIcon = (icon) => {
      form.value.icon = icon
      showIconPicker.value = false
    }

    return {
      form,
      isEdit,
      showIconPicker,
      searchQuery,
      sortBy,
      categories,
      filteredCategories,
      icons,
      handleSubmit,
      editCategory,
      deleteCategory,
      resetForm,
      selectIcon
    }
  }
}
</script>

<style scoped>
.categories-page {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 20px;
}

.category-form h2,
.card-header h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.icon-selector {
  display: flex;
  gap: 10px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-picker {
  width: 100%;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.cancel-btn,
.submit-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  border: 1px solid #ddd;
  background: white;
  color: #666;
}

.submit-btn {
  background: #1a73e8;
  color: white;
  border: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.search-box {
  position: relative;
}

.search-box input {
  padding: 8px 32px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-box i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.sort-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.categories-table {
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

.category-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.actions {
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

.icon-picker-modal {
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
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 10px;
}

.icon-option {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-option:hover {
  background: #f5f5f5;
}

@media (max-width: 768px) {
  .categories-page {
    grid-template-columns: 1fr;
  }
}
</style> 