<template>
  <div class="editor-page container">
    <div class="editor-header">
      <h1>{{ isEdit ? '编辑文章' : '写文章' }}</h1>
      <div class="actions">
        <button class="save-draft">保存草稿</button>
        <button class="publish" @click="publishPost">发布</button>
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
          <textarea 
            v-model="post.content" 
            placeholder="开始写作..."
          ></textarea>
        </div>
      </div>

      <div class="editor-sidebar">
        <div class="settings-card">
          <h3>发布设置</h3>
          <div class="setting-item">
            <label>分类</label>
            <select v-model="post.category">
              <option value="">选择分类</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="setting-item">
            <label>标签</label>
            <div class="tags-input">
              <div v-for="tag in post.tags" :key="tag" class="tag">
                {{ tag }}
                <span @click="removeTag(tag)" class="remove-tag">&times;</span>
              </div>
              <input 
                type="text" 
                v-model="newTag"
                @keyup.enter="addTag"
                placeholder="输入标签..."
              >
            </div>
          </div>

          <div class="setting-item">
            <label>封面图</label>
            <div class="cover-upload">
              <img v-if="post.cover" :src="post.cover" alt="封面">
              <button v-else class="upload-btn">上传封面</button>
            </div>
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
  name: 'EditorPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isEdit = !!route.params.id

    const post = ref({
      title: '',
      content: '',
      category: '',
      tags: [],
      cover: ''
    })

    const categories = ref([
      { id: 'tech', name: '技术' },
      { id: 'life', name: '生活' },
      { id: 'reading', name: '读书笔记' }
    ])

    const newTag = ref('')

    onMounted(() => {
      if (isEdit) {
        // 获取文章数据
        // post.value = await fetchPost(route.params.id)
      }
    })

    const addTag = () => {
      if (newTag.value && !post.value.tags.includes(newTag.value)) {
        post.value.tags.push(newTag.value)
        newTag.value = ''
      }
    }

    const removeTag = (tag) => {
      post.value.tags = post.value.tags.filter(t => t !== tag)
    }

    const publishPost = async () => {
      // 发布文章的逻辑
      try {
        // await savePost(post.value)
        router.push('/profile')
      } catch (error) {
        console.error('发布失败:', error)
      }
    }

    return {
      isEdit,
      post,
      categories,
      newTag,
      addTag,
      removeTag,
      publishPost
    }
  }
}
</script>

<style scoped>
.editor-page {
  padding: 40px 20px;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  gap: 15px;
}

.actions button {
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.save-draft {
  background: transparent;
  border: 1px solid #666;
  color: #666;
}

.publish {
  background: #007bff;
  border: none;
  color: white;
}

.editor-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.main-editor {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

.title-input {
  width: 100%;
  border: none;
  font-size: 2em;
  margin-bottom: 20px;
  padding: 10px 0;
}

.title-input:focus {
  outline: none;
}

.content-editor textarea {
  width: 100%;
  min-height: 500px;
  border: none;
  resize: vertical;
  font-size: 1.1em;
  line-height: 1.6;
}

.content-editor textarea:focus {
  outline: none;
}

.editor-sidebar {
  align-self: start;
}

.settings-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

.setting-item {
  margin-bottom: 20px;
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
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tag {
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.remove-tag {
  cursor: pointer;
  color: #666;
}

.cover-upload {
  border: 2px dashed #ddd;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
}

.upload-btn {
  padding: 8px 20px;
  background: transparent;
  border: 1px solid #007bff;
  color: #007bff;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .editor-content {
    grid-template-columns: 1fr;
  }
}
</style> 