<template>
  <header class="header">
    <nav class="container">
      <div class="logo">我的博客</div>
      <ul class="nav-links">
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" class="nav-link">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="nav-right">
        <template v-if="userStore.isLoggedIn">
          <div class="user-info">
            <img :src="userStore.userInfo.avatar" alt="头像" class="user-avatar">
            <span class="username">{{ userStore.userInfo.nickname }}</span>
            <button class="logout-btn" @click="handleLogout">退出</button>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="login-btn">登录</router-link>
          <router-link to="/register" class="signup-btn">注册</router-link>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import { userStore } from '../store/user'
import { useRouter } from 'vue-router'

export default {
  name: 'BlogHeader',
  setup() {
    const router = useRouter()

    const handleLogout = () => {
      userStore.logout()
      router.push('/login')
    }

    return {
      userStore,
      handleLogout
    }
  },
  data() {
    return {
      menuItems: [
        { name: '首页', path: '/' },
        { name: '归档', path: '/archive' },
        { name: '分类', path: '/categories' },
        { name: '关于', path: '/about' }
      ]
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
}

.nav-right {
  display: flex;
  gap: 1rem;
}

.login-btn,
.signup-btn {
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.signup-btn {
  background-color: #007bff;
  color: white;
}

.login-btn:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.signup-btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .nav-right {
    gap: 0.5rem;
  }
  
  .login-btn,
  .signup-btn {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  color: #333;
  font-weight: 500;
}

.logout-btn {
  padding: 6px 12px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background: transparent;
  color: #dc3545;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #dc3545;
  color: white;
}
</style> 