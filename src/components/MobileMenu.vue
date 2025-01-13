<template>
  <div class="mobile-menu">
    <button class="menu-toggle" @click="isOpen = !isOpen">
      <i :class="['fas', isOpen ? 'fa-times' : 'fa-bars']"></i>
    </button>

    <transition name="slide">
      <div v-if="isOpen" class="menu-overlay" @click="isOpen = false">
        <div class="menu-content" @click.stop>
          <div class="menu-header">
            <template v-if="userStore.isLoggedIn">
              <div class="user-info">
                <img :src="userStore.userInfo.avatar" alt="头像" class="user-avatar">
                <div class="user-details">
                  <h3>{{ userStore.userInfo.nickname }}</h3>
                  <p>{{ userStore.userInfo.role === 'admin' ? '管理员' : '普通用户' }}</p>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="login-buttons">
                <router-link to="/login" class="login-btn">登录</router-link>
                <router-link to="/register" class="signup-btn">注册</router-link>
              </div>
            </template>
          </div>

          <nav class="menu-nav">
            <router-link 
              v-for="item in menuItems" 
              :key="item.path"
              :to="item.path"
              class="menu-item"
              @click="isOpen = false"
            >
              <i :class="['fas', item.icon]"></i>
              {{ item.name }}
            </router-link>
          </nav>

          <div v-if="userStore.isLoggedIn" class="menu-footer">
            <button class="logout-btn" @click="handleLogout">
              <i class="fas fa-sign-out-alt"></i>
              退出登录
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../store/user'

export default {
  name: 'MobileMenu',
  setup() {
    const router = useRouter()
    const isOpen = ref(false)

    const menuItems = [
      { name: '首页', path: '/', icon: 'fa-home' },
      { name: '归档', path: '/archive', icon: 'fa-archive' },
      { name: '分类', path: '/categories', icon: 'fa-th-large' },
      { name: '关于', path: '/about', icon: 'fa-user' }
    ]

    const handleLogout = () => {
      userStore.logout()
      router.push('/login')
      isOpen.value = false
    }

    return {
      isOpen,
      menuItems,
      userStore,
      handleLogout
    }
  }
}
</script>

<style scoped>
.mobile-menu {
  display: none;
}

.menu-toggle {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #333;
  font-size: 1.5em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}

.menu-content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background: white;
  display: flex;
  flex-direction: column;
}

.menu-header {
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-details h3 {
  margin: 0;
  color: #333;
}

.user-details p {
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9em;
}

.login-buttons {
  display: flex;
  gap: 10px;
}

.login-btn,
.signup-btn {
  padding: 8px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
}

.login-btn {
  color: #1a73e8;
  border: 1px solid #1a73e8;
}

.signup-btn {
  background: #1a73e8;
  color: white;
}

.menu-nav {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
}

.menu-item:hover,
.menu-item.router-link-active {
  background: rgba(26,115,232,0.1);
  color: #1a73e8;
}

.menu-footer {
  padding: 20px;
  border-top: 1px solid #eee;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  border: none;
  background: #dc3545;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .mobile-menu {
    display: block;
  }
}
</style> 