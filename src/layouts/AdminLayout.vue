<template>
  <div class="admin-layout">
    <aside class="admin-sidebar" :class="{ collapsed: isCollapsed }">
      <div class="sidebar-header">
        <div class="logo-wrapper">
          <i class="fas fa-blog"></i>
        </div>
        <h1 v-show="!isCollapsed">博客管理</h1>
        <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
          <i :class="['fas', isCollapsed ? 'fa-angle-right' : 'fa-angle-left']"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :title="isCollapsed ? item.name : ''"
        >
          <i :class="['fas', item.icon]"></i>
          <span v-show="!isCollapsed">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="back-to-site" @click="backToSite">
          <i class="fas fa-external-link-alt"></i>
          <span v-show="!isCollapsed">返回站点</span>
        </button>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-header">
        <div class="header-left">
          <h2>{{ currentPageTitle }}</h2>
        </div>
        <div class="header-right">
          <div class="user-dropdown">
            <img 
              :src="userStore.state.userInfo?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'" 
              alt="头像" 
              class="user-avatar"
            >
            <span class="username">{{ userStore.state.userInfo?.nickname || '用户' }}</span>
            <div class="dropdown-menu">
              <button @click="logout">
                <i class="fas fa-sign-out-alt"></i>
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="admin-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '../store/user'

export default {
  name: 'AdminLayout',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isCollapsed = ref(false)

    const menuItems = [
      {
        path: '/admin/dashboard',
        name: '仪表盘',
        icon: 'fa-tachometer-alt'
      },
      {
        path: '/admin/posts',
        name: '文章管理',
        icon: 'fa-file-alt'
      },
      {
        path: '/admin/categories',
        name: '分类管理',
        icon: 'fa-folder'
      },
      {
        path: '/admin/tags',
        name: '标签管理',
        icon: 'fa-tags'
      },
      {
        path: '/admin/comments',
        name: '评论管理',
        icon: 'fa-comments'
      },
      {
        path: '/admin/users',
        name: '用户管理',
        icon: 'fa-users'
      },
      {
        path: '/admin/settings',
        name: '系统设置',
        icon: 'fa-cog'
      }
    ]

    const currentPageTitle = computed(() => {
      const currentItem = menuItems.find(item => item.path === route.path)
      return currentItem ? currentItem.name : ''
    })

    const backToSite = () => {
      router.push('/')
    }

    const logout = () => {
      userStore.logout()
      router.push('/login')
    }

    return {
      isCollapsed,
      menuItems,
      currentPageTitle,
      userStore,
      backToSite,
      logout
    }
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 240px;
  background: #001529;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.admin-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.logo-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.sidebar-header h1 {
  font-size: 18px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
}

.collapse-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  transition: all 0.3s;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: white;
  background: rgba(255,255,255,0.1);
}

.nav-item i {
  width: 20px;
  text-align: center;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.back-to-site {
  width: 100%;
  padding: 8px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  background: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.admin-header {
  height: 64px;
  background: white;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.username {
  color: #333;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  display: none;
}

.user-dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background: #f5f5f5;
}

.admin-content {
  flex: 1;
  padding: 24px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    z-index: 1000;
    height: 100vh;
    transform: translateX(-100%);
  }

  .admin-sidebar.show {
    transform: translateX(0);
  }

  .admin-main {
    margin-left: 0;
  }
}
</style> 