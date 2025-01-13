<template>
  <div class="settings-page">
    <div class="page-header">
      <h2>系统设置</h2>
    </div>

    <div class="settings-form card">
      <form @submit.prevent="saveSettings">
        <div class="form-section">
          <h3>基本设置</h3>
          <div class="form-group">
            <label>网站名称</label>
            <input 
              type="text" 
              v-model="settings.siteName"
              placeholder="请输入网站名称"
            >
          </div>
          <div class="form-group">
            <label>网站描述</label>
            <textarea 
              v-model="settings.siteDescription"
              placeholder="请输入网站描述"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label>网站Logo</label>
            <div class="logo-upload">
              <img 
                :src="settings.logo || 'https://via.placeholder.com/200x60'" 
                alt="Logo"
              >
              <button type="button" class="upload-btn">
                <i class="fas fa-upload"></i>
                上传Logo
              </button>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>SEO设置</h3>
          <div class="form-group">
            <label>Meta Keywords</label>
            <input 
              type="text" 
              v-model="settings.metaKeywords"
              placeholder="请输入关键词，用英文逗号分隔"
            >
          </div>
          <div class="form-group">
            <label>Meta Description</label>
            <textarea 
              v-model="settings.metaDescription"
              placeholder="请输入Meta描述"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div class="form-section">
          <h3>其他设置</h3>
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="settings.enableComments"
              >
              启用评论功能
            </label>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="settings.requireModeration"
              >
              评论需要审核
            </label>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="save-btn" :disabled="saving">
            <i v-if="saving" class="fas fa-spinner fa-spin"></i>
            <span>{{ saving ? '保存中...' : '保存设置' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Settings',
  setup() {
    const saving = ref(false)
    const settings = ref({
      siteName: '我的博客',
      siteDescription: '一个基于Vue3的个人博客系统',
      logo: '',
      metaKeywords: 'Vue3,博客,个人网站',
      metaDescription: '一个使用Vue3开发的现代化个人博客系统',
      enableComments: true,
      requireModeration: true
    })

    const saveSettings = async () => {
      saving.value = true
      // 模拟保存设置
      await new Promise(resolve => setTimeout(resolve, 1000))
      saving.value = false
    }

    return {
      settings,
      saving,
      saveSettings
    }
  }
}
</script>

<style scoped>
.settings-page {
  padding: 24px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 24px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h3 {
  font-size: 18px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

input[type="text"],
textarea {
  width: 100%;
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

.logo-upload {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-upload img {
  height: 60px;
  object-fit: contain;
}

.upload-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.save-btn {
  padding: 12px 24px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.save-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .settings-page {
    padding: 16px;
  }

  .card {
    padding: 16px;
  }
}
</style> 