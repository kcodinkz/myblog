<template>
  <div class="profile-page container">
    <div class="profile-header">
      <div class="user-info">
        <img :src="userStore.userInfo.avatar" alt="头像" class="profile-avatar">
        <div class="user-details">
          <h1>{{ userStore.userInfo.nickname }}</h1>
          <p class="username">@{{ userStore.userInfo.username }}</p>
          <p class="role">{{ userStore.userInfo.role === 'admin' ? '管理员' : '普通用户' }}</p>
        </div>
      </div>
      <button class="edit-profile-btn">编辑资料</button>
    </div>

    <div class="profile-content">
      <div class="profile-nav">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-btn', { active: currentTab === tab.id }]"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- 我的文章 -->
      <div v-if="currentTab === 'posts'" class="tab-content">
        <div class="action-bar">
          <button class="new-post-btn" @click="$router.push('/editor')">写新文章</button>
        </div>
        <div class="posts-list">
          <div v-for="post in userPosts" :key="post.id" class="post-item">
            <div class="post-info">
              <h3>{{ post.title }}</h3>
              <p class="post-meta">
                <span>{{ post.date }}</span>
                <span>{{ post.category }}</span>
                <span>阅读 {{ post.views }}</span>
              </p>
            </div>
            <div class="post-actions">
              <button @click="editPost(post.id)" class="action-btn edit">编辑</button>
              <button @click="deletePost(post.id)" class="action-btn delete">删除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 我的评论 -->
      <div v-if="currentTab === 'comments'" class="tab-content">
        <div class="comments-list">
          <div v-for="comment in userComments" :key="comment.id" class="comment-item">
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-meta">
              <span>发表于 {{ comment.date }}</span>
              <router-link :to="`/post/${comment.postId}`">查看文章</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 收藏文章 -->
      <div v-if="currentTab === 'favorites'" class="tab-content">
        <div class="favorites-list">
          <div v-for="post in favoritePosts" :key="post.id" class="favorite-item">
            <router-link :to="`/post/${post.id}`" class="post-title">
              {{ post.title }}
            </router-link>
            <div class="post-meta">
              <span>收藏于 {{ post.favoriteDate }}</span>
              <button @click="removeFavorite(post.id)" class="remove-btn">
                取消收藏
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { userStore } from '../store/user'

export default {
  name: 'ProfilePage',
  setup() {
    const currentTab = ref('posts')
    const tabs = [
      { id: 'posts', name: '我的文章' },
      { id: 'comments', name: '我的评论' },
      { id: 'favorites', name: '收藏文章' }
    ]

    // 模拟数据
    const userPosts = ref([
      {
        id: 1,
        title: '示例文章标题',
        date: '2024-03-21',
        category: '技术',
        views: 100
      }
    ])

    const userComments = ref([
      {
        id: 1,
        content: '这是一条评论内容...',
        date: '2024-03-21',
        postId: 1
      }
    ])

    const favoritePosts = ref([
      {
        id: 1,
        title: '收藏的文章标题',
        favoriteDate: '2024-03-21'
      }
    ])

    const editPost = (id) => {
      // 跳转到编辑页面
      router.push(`/editor/${id}`)
    }

    const deletePost = async (id) => {
      if (confirm('确定要删除这篇文章吗？')) {
        // 删除文章的逻辑
      }
    }

    const removeFavorite = (id) => {
      // 取消收藏的逻辑
    }

    return {
      userStore,
      currentTab,
      tabs,
      userPosts,
      userComments,
      favoritePosts,
      editPost,
      deletePost,
      removeFavorite
    }
  }
}
</script>

<style scoped>
.profile-page {
  padding: 40px 20px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

.user-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details h1 {
  margin: 0;
  font-size: 1.8em;
}

.username {
  color: #666;
  margin: 5px 0;
}

.role {
  color: #007bff;
  font-weight: 500;
}

.edit-profile-btn {
  padding: 8px 20px;
  border: 1px solid #007bff;
  border-radius: 20px;
  background: transparent;
  color: #007bff;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-profile-btn:hover {
  background: #007bff;
  color: white;
}

.profile-nav {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  background: none;
  color: #666;
  cursor: pointer;
  font-size: 1.1em;
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.tab-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

.action-bar {
  margin-bottom: 20px;
}

.new-post-btn {
  padding: 8px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.post-item,
.comment-item,
.favorite-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-meta,
.comment-meta {
  color: #666;
  font-size: 0.9em;
}

.post-meta span {
  margin-right: 15px;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.action-btn.edit {
  background: #28a745;
  color: white;
}

.action-btn.delete {
  background: #dc3545;
  color: white;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .user-info {
    flex-direction: column;
  }

  .edit-profile-btn {
    margin-top: 20px;
  }

  .profile-nav {
    overflow-x: auto;
    padding-bottom: 10px;
  }
}
</style> 