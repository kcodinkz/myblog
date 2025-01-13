<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-header">
        <i class="fas fa-blog"></i>
        <h1>博客管理系统</h1>
      </div>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <div class="input-wrapper">
            <i class="fas fa-user"></i>
            <input 
              type="text" 
              v-model="form.username"
              required
              placeholder="请输入用户名"
            >
          </div>
        </div>
        
        <div class="form-group">
          <label>密码</label>
          <div class="input-wrapper">
            <i class="fas fa-lock"></i>
            <input 
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              required
              placeholder="请输入密码"
            >
            <button 
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.remember">
            记住我
          </label>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          <span>{{ loading ? '登录中...' : '登录' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../store/user'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const showPassword = ref(false)
    const form = ref({
      username: '',
      password: '',
      remember: false
    })

    const handleLogin = async () => {
      try {
        loading.value = true
        // 这里调用登录接口
        await userStore.login(form.value)
        router.push('/admin/dashboard')
      } catch (error) {
        console.error('登录失败:', error)
        // 这里可以添加错误提示
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      showPassword,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header i {
  font-size: 48px;
  color: #1a73e8;
}

.login-header h1 {
  margin: 20px 0 0;
  font-size: 24px;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #666;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper i {
  position: absolute;
  left: 12px;
  color: #999;
}

.input-wrapper input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-wrapper input:focus {
  border-color: #1a73e8;
  outline: none;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  cursor: pointer;
}

.login-btn {
  padding: 12px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .login-box {
    padding: 20px;
  }
}
</style> 