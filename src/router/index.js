import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '../store/user'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    // 前台路由
    {
      path: '/',
      component: () => import('../layouts/BlogLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/home/Home.vue')
        },
        {
          path: 'posts',
          name: 'Posts',
          component: () => import('../views/posts/Posts.vue')
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('../views/about/About.vue')
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views//login/Login.vue')
        },
        {
          path: 'post/:id',
          name: 'Post',
          component: () => import('../views/posts/Post.vue')
        },
        {
          path: '/gallery',
          name: 'Gallery',
          component: () => import('../views/gallery/Gallery.vue')
        }
      ]
    },

    // 后台路由
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'posts',
          name: 'AdminPosts',
          component: () => import('../views/admin/Posts.vue')
        },
        {
          path: 'posts/new',
          name: 'NewPost',
          component: () => import('../views/admin/PostEditor.vue')
        },
        {
          path: 'posts/edit/:id',
          name: 'EditPost',
          component: () => import('../views/admin/PostEditor.vue')
        },
        {
          path: 'categories',
          name: 'AdminCategories',
          component: () => import('../views/admin/Categories.vue')
        },
        {
          path: 'tags',
          name: 'AdminTags',
          component: () => import('../views/admin/Tags.vue')
        },
        {
          path: 'comments',
          name: 'AdminComments',
          component: () => import('../views/admin/Comments.vue')
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('../views/admin/Users.vue')
        },
        {
          path: 'settings',
          name: 'AdminSettings',
          component: () => import('../views/admin/Settings.vue')
        }
      ]
    },

    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    // 如果未登录，重定向到登录页
    if (!userStore.state.isLoggedIn || !userStore.state.userInfo) {
      // 显示登录弹窗而不是跳转到登录页
      const blogLayout = document.querySelector('.blog-layout').__vueParentComponent.ctx
      if (blogLayout) {
        blogLayout.showLoginModal = true
      }
      next(false)
      return
    }
    // 如果需要管理员权限但用户不是管理员
    if (to.meta.requiresAdmin && userStore.state.userInfo.role !== 'admin') {
      next('/')
      return
    }
  }
  // 其他情况正常通过
  next()
})

export default router 