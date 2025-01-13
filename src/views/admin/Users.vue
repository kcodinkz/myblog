<template>
  <div class="users-page">
    <div class="page-header">
      <h2>用户管理</h2>
      <div class="header-actions">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索用户..."
          >
          <i class="fas fa-search"></i>
        </div>
        <button class="add-user-btn" @click="showAddUserModal = true">
          <i class="fas fa-user-plus"></i>
          添加用户
        </button>
      </div>
    </div>

    <div class="users-list card">
      <div class="filter-bar">
        <div class="filter-group">
          <select v-model="filter.role" class="filter-select">
            <option value="">全部角色</option>
            <option value="admin">管理员</option>
            <option value="editor">编辑</option>
            <option value="user">普通用户</option>
          </select>
          <select v-model="filter.status" class="filter-select">
            <option value="">全部状态</option>
            <option value="active">正常</option>
            <option value="blocked">已封禁</option>
          </select>
        </div>
      </div>

      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>用户信息</th>
              <th>角色</th>
              <th>状态</th>
              <th>注册时间</th>
              <th>最后登录</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td class="user-info-cell">
                <img :src="user.avatar" :alt="user.nickname" class="user-avatar">
                <div class="user-details">
                  <div class="user-name">{{ user.nickname }}</div>
                  <div class="user-email">{{ user.email }}</div>
                </div>
              </td>
              <td>
                <span class="role-badge" :class="user.role">
                  {{ getRoleText(user.role) }}
                </span>
              </td>
              <td>
                <span class="status-badge" :class="user.status">
                  {{ getStatusText(user.status) }}
                </span>
              </td>
              <td>{{ formatDate(user.registerTime) }}</td>
              <td>{{ formatDate(user.lastLoginTime) }}</td>
              <td class="actions-cell">
                <button 
                  class="action-btn edit"
                  @click="editUser(user)"
                  title="编辑"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button 
                  class="action-btn"
                  :class="user.status === 'active' ? 'block' : 'unblock'"
                  @click="toggleUserStatus(user)"
                  :title="user.status === 'active' ? '封禁' : '解封'"
                >
                  <i :class="['fas', user.status === 'active' ? 'fa-ban' : 'fa-unlock']"></i>
                </button>
                <button 
                  class="action-btn delete"
                  @click="deleteUser(user.id)"
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
  name: 'Users',
  setup() {
    const searchQuery = ref('')
    const filter = ref({
      role: '',
      status: ''
    })
    const showAddUserModal = ref(false)

    // 模拟用户数据
    const users = ref([
      {
        id: 1,
        username: 'admin',
        nickname: '管理员',
        email: 'admin@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        role: 'admin',
        status: 'active',
        registerTime: '2024-01-01T00:00:00Z',
        lastLoginTime: '2024-03-19T10:00:00Z'
      },
      // 添加更多模拟数据...
    ])

    const filteredUsers = computed(() => {
      return users.value.filter(user => {
        const matchQuery = searchQuery.value === '' ||
          user.nickname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        const matchRole = filter.value.role === '' || user.role === filter.value.role
        const matchStatus = filter.value.status === '' || user.status === filter.value.status

        return matchQuery && matchRole && matchStatus
      })
    })

    const getRoleText = (role) => {
      const roleMap = {
        admin: '管理员',
        editor: '编辑',
        user: '用户'
      }
      return roleMap[role] || role
    }

    const getStatusText = (status) => {
      const statusMap = {
        active: '正常',
        blocked: '已封禁'
      }
      return statusMap[status] || status
    }

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleString('zh-CN')
    }

    // 用户操作方法
    const editUser = (user) => {
      console.log('编辑用户:', user)
    }

    const toggleUserStatus = (user) => {
      console.log('切换用户状态:', user)
    }

    const deleteUser = (userId) => {
      console.log('删除用户:', userId)
    }

    return {
      searchQuery,
      filter,
      showAddUserModal,
      filteredUsers,
      getRoleText,
      getStatusText,
      formatDate,
      editUser,
      toggleUserStatus,
      deleteUser
    }
  }
}
</script>

<style scoped>
.users-page {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 16px;
}

.search-box {
  position: relative;
}

.search-box input {
  padding: 8px 12px 8px 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 240px;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.add-user-btn {
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
}

.filter-bar {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.filter-group {
  display: flex;
  gap: 16px;
}

.filter-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 120px;
}

.users-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.user-info-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-name {
  font-weight: 500;
}

.user-email {
  color: #666;
  font-size: 14px;
}

.role-badge,
.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.role-badge.admin {
  background: #e8f5e9;
  color: #2e7d32;
}

.role-badge.editor {
  background: #e3f2fd;
  color: #1565c0;
}

.role-badge.user {
  background: #f5f5f5;
  color: #616161;
}

.status-badge.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.blocked {
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

.action-btn.edit {
  background: #1a73e8;
}

.action-btn.block {
  background: #dc3545;
}

.action-btn.unblock {
  background: #28a745;
}

.action-btn.delete {
  background: #dc3545;
}

@media (max-width: 768px) {
  .users-page {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }

  .add-user-btn {
    width: 100%;
    justify-content: center;
  }

  .filter-group {
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }
}
</style> 