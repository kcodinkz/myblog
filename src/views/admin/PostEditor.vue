<template>
  <div class="post-editor">
    <div class="editor-header">
      <h2>{{ isEdit ? '编辑文章' : '写文章' }}</h2>
      <div class="header-actions">
        <button class="save-draft" @click="saveDraft">
          <i class="far fa-save"></i>
          保存草稿
        </button>
        <button class="publish" @click="publish">
          <i class="fas fa-paper-plane"></i>
          发布
        </button>
      </div>
    </div>

    <div class="editor-content">
      <div class="main-editor">
        <input 
          type="text" 
          v-model="post.title" 
          class="title-input" 
          placeholder="输入文章标题..."
        >
        
        <div class="content-editor">
          <div class="toolbar">
            <button 
              v-for="tool in editorTools" 
              :key="tool.name"
              class="tool-btn"
              :title="tool.title"
              @click="tool.action"
            >
              <i :class="tool.icon"></i>
            </button>
          </div>
          <textarea 
            v-model="post.content" 
            class="content-area"
            placeholder="开始写作..."
          ></textarea>
        </div>
      </div>

      <div class="editor-sidebar">
        <!-- 发布设置 -->
        <div class="settings-card">
          <h3>发布设置</h3>
          <div class="setting-item">
            <label>状态</label>
            <select v-model="post.status">
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
            </select>
          </div>
          <div class="setting-item">
            <label>可见性</label>
            <select v-model="post.visibility">
              <option value="public">公开</option>
              <option value="private">私密</option>
              <option value="password">密码保护</option>
            </select>
          </div>
          <div class="setting-item" v-if="post.visibility === 'password'">
            <label>访问密码</label>
            <input type="password" v-model="post.password">
          </div>
          <div class="setting-item">
            <label>发布时间</label>
            <input type="datetime-local" v-model="post.publishDate">
          </div>
        </div>

        <!-- 分类 -->
        <div class="settings-card">
          <h3>分类</h3>
          <div class="category-list">
            <div 
              v-for="cat in categories" 
              :key="cat.id" 
              class="category-item"
            >
              <label>
                <input 
                  type="radio" 
                  :value="cat.id" 
                  v-model="post.category"
                >
                {{ cat.name }}
              </label>
            </div>
          </div>
        </div>

        <!-- 标签 -->
        <div class="settings-card">
          <h3>标签</h3>
          <div class="tags-input">
            <div class="tags-list">
              <span 
                v-for="tag in post.tags" 
                :key="tag" 
                class="tag"
              >
                {{ tag }}
                <i class="fas fa-times" @click="removeTag(tag)"></i>
              </span>
            </div>
            <input 
              type="text" 
              v-model="newTag"
              @keyup.enter="addTag"
              placeholder="输入标签按回车添加"
            >
          </div>
        </div>

        <!-- 特色图片 -->
        <div class="settings-card">
          <h3>特色图片</h3>
          <div class="featured-image">
            <div 
              class="image-preview"
              :class="{ empty: !post.cover }"
              :style="post.cover ? { backgroundImage: `url(${post.cover})` } : {}"
              @click="triggerImageUpload"
            >
              <template v-if="!post.cover">
                <i class="fas fa-image"></i>
                <span>设置特色图片</span>
              </template>
              <button 
                v-else 
                class="remove-image"
                @click.stop="removeCover"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <input 
              type="file" 
              ref="imageInput"
              style="display: none"
              accept="image/*"
              @change="handleImageUpload"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'PostEditor',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const imageInput = ref(null)
    const newTag = ref('')
    const isEdit = route.params.id

    // 编辑器工具栏
    const editorTools = [
      { name: 'bold', title: '粗体', icon: 'fas fa-bold', action: () => {} },
      { name: 'italic', title: '斜体', icon: 'fas fa-italic', action: () => {} },
      { name: 'link', title: '链接', icon: 'fas fa-link', action: () => {} },
      { name: 'quote', title: '引用', icon: 'fas fa-quote-right', action: () => {} },
      { name: 'code', title: '代码', icon: 'fas fa-code', action: () => {} },
      { name: 'image', title: '图片', icon: 'fas fa-image', action: () => {} }
    ]

    const post = ref({
      title: '',
      content: '',
      status: 'draft',
      visibility: 'public',
      password: '',
      publishDate: new Date().toISOString().slice(0, 16),
      category: '',
      tags: [],
      cover: ''
    })

    const categories = [
      { id: 1, name: '技术' },
      { id: 2, name: '生活' },
      { id: 3, name: '读书' }
    ]

    // 如果是编辑模式，加载文章数据
    onMounted(() => {
      if (isEdit) {
        // 加载文章数据
        loadPost(route.params.id)
      }
    })

    const loadPost = (id) => {
      // 实现加载文章数据的逻辑
    }

    const addTag = () => {
      if (newTag.value && !post.value.tags.includes(newTag.value)) {
        post.value.tags.push(newTag.value)
        newTag.value = ''
      }
    }

    const removeTag = (tag) => {
      post.value.tags = post.value.tags.filter(t => t !== tag)
    }

    const triggerImageUpload = () => {
      imageInput.value.click()
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        // 实现图片上传逻辑
        const reader = new FileReader()
        reader.onload = (e) => {
          post.value.cover = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const removeCover = () => {
      post.value.cover = ''
    }

    const saveDraft = () => {
      // 实现保存草稿逻辑
    }

    const publish = () => {
      // 实现发布逻辑
    }

    return {
      post,
      isEdit,
      categories,
      editorTools,
      newTag,
      imageInput,
      addTag,
      removeTag,
      triggerImageUpload,
      handleImageUpload,
      removeCover,
      saveDraft,
      publish
    }
  }
}
</script>

<style scoped>
.post-editor {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.editor-header {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.save-draft,
.publish {
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.save-draft {
  border: 1px solid #1a73e8;
  background: white;
  color: #1a73e8;
}

.publish {
  background: #1a73e8;
  color: white;
  border: none;
}

.editor-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
}

.main-editor {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
}

.title-input {
  width: 100%;
  padding: 20px;
  border: none;
  font-size: 24px;
  border-bottom: 1px solid #eee;
}

.content-editor {
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 8px;
}

.tool-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-btn:hover {
  background: #f5f5f5;
}

.content-area {
  flex: 1;
  min-height: 500px;
  padding: 20px;
  border: none;
  resize: none;
  line-height: 1.6;
}

.editor-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 20px;
}

.settings-card h3 {
  margin-bottom: 16px;
  font-size: 16px;
  color: #333;
}

.setting-item {
  margin-bottom: 16px;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-item label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

.setting-item select,
.setting-item input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tags-input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.tag {
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.tag i {
  cursor: pointer;
}

.featured-image {
  width: 100%;
}

.image-preview {
  width: 100%;
  height: 200px;
  border: 2px dashed #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  background-size: cover;
  background-position: center;
}

.image-preview.empty:hover {
  border-color: #1a73e8;
  color: #1a73e8;
}

.remove-image {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1024px) {
  .editor-content {
    grid-template-columns: 1fr;
  }
}
</style> 