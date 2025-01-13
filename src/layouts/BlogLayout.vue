<template>
  <div class="blog-layout">
    <div 
      :class="['mobile-overlay', { show: showMobileMenu }]"
      @click="closeMenu"
    ></div>
    <header class="blog-header">
      <div class="header-content">
        <router-link to="/" class="logo">
          HOXKAR
        </router-link>
        <div class="mobile-nav">
          <button 
            type="button"
            class="mobile-menu-btn" 
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
          >
            <div :class="['hamburger', { active: showMobileMenu }]">
              <div class="hamburger-line"></div>
              <div class="hamburger-line"></div>
              <div class="hamburger-line"></div>
            </div>
          </button>
        </div>
        <nav :class="['nav-menu', { 'mobile-open': showMobileMenu }]">
          <router-link 
            to="/" 
            style="--index: 0"
            @click="closeMenu"
          >
            {{ t('common.home') }}
          </router-link>
          <router-link to="/posts" style="--index: 1" @click="closeMenu">{{ t('common.blogs') }}</router-link>
          <router-link to="/gallery" style="--index: 2" @click="closeMenu">{{ t('common.gallery') }}</router-link>
          <router-link to="/about" style="--index: 3" @click="closeMenu">{{ t('common.about') }}</router-link>
          <template v-if="userStore.state.isLoggedIn">
            <router-link to="/admin" class="admin-link" style="--index: 4" @click="closeMenu">
              <span>{{ t('common.admin') }}</span>
              <i class="fas fa-chevron-right"></i>
            </router-link>
          </template>
          <template v-else>
            <button 
              class="login-btn"
              style="--index: 5"
              @click="handleLoginClick"
            >
              {{ t('common.login') }}
            </button>
          </template>
          <div class="lang-switch" style="--index: 6">
            <div class="lang-selector" @click="toggleLangMenu">
              <span class="current-lang">
                {{ getCurrentLang.flag }}
                <i class="fas fa-chevron-down"></i>
              </span>
              <div class="lang-menu" v-if="showLangMenu">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  :class="{ active: currentLocale === lang.code }"
                  @click="changeLocale(lang.code)"
                >
                  <span class="lang-flag">{{ lang.flag }}</span>
                  <span class="lang-name">{{ lang.name }}</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <button 
          class="close-menu-btn" 
          v-if="showMobileMenu"
          @click="closeMenu"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </header>

    <!-- 登录弹窗 -->
    <div class="modal" v-if="showLoginModal" @click.self="showLoginModal = false">
      <div class="modal-content">
        <h2>{{ t('common.login') }}</h2>
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
        <form @submit.prevent="handleLogin" class="login-form">
          <input 
            type="text" 
            v-model="loginForm.username" 
            :placeholder="t('auth.username')"
            required
          >
          <input 
            type="password" 
            v-model="loginForm.password" 
            :placeholder="t('auth.password')"
            required
          >
          <button type="submit" :disabled="loading">
            {{ loading ? t('auth.loggingIn') : t('common.login') }}
          </button>
        </form>
      </div>
    </div>

    <main class="blog-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="blog-footer">
      <div class="footer-content">
        <div class="footer-info">
          <p>© {{ currentYear }} Hoxkar. All Rights Reserved.</p>
        </div>
        <div class="social-links">
          <a href="https://github.com" target="_blank" rel="noopener">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { userStore } from '../store/user'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { languages } from '../config/languages'

export default {
  name: 'BlogLayout',
  setup() {
    const router = useRouter()
    const { t, locale } = useI18n({ useScope: 'global' })
    const currentYear = computed(() => new Date().getFullYear())
    const currentLocale = computed(() => locale.value)
    const showLoginModal = ref(false)
    const loading = ref(false)
    const loginForm = ref({
      username: '',
      password: ''
    })
    const loginError = ref('')
    const showLangMenu = ref(false)
    const showMobileMenu = ref(false)

    const getCurrentLang = computed(() => {
      return languages.find(lang => lang.code === locale.value) || languages[0]
    })

    const toggleLangMenu = () => {
      showLangMenu.value = !showLangMenu.value
    }

    // 点击外部关闭语言菜单
    onMounted(() => {
      document.addEventListener('click', (e) => {
        const langSelector = document.querySelector('.lang-selector')
        if (langSelector && !langSelector.contains(e.target)) {
          showLangMenu.value = false
        }
      })
    })

    const changeLocale = (lang) => {
      locale.value = lang
      localStorage.setItem('locale', lang)
    }

    const handleLogin = async () => {
      loading.value = true
      loginError.value = ''
      try {
        // 测试账号验证
        if (loginForm.value.username === 'admin' && loginForm.value.password === 'admin123') {
          await new Promise(resolve => setTimeout(resolve, 1000))
          userStore.login({
            username: loginForm.value.username,
            role: 'admin'
          })
          showLoginModal.value = false
          router.push('/admin')
          loginForm.value = {
            username: '',
            password: ''
          }
        } else {
          throw new Error('Invalid credentials')
        }
      } catch (error) {
        console.error('Login failed:', error)
        loginError.value = 'Invalid username or password (admin/admin123)'
      } finally {
        loading.value = false
      }
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    // 点击导航链接后关闭移动菜单
    const closeMenu = () => {
      showMobileMenu.value = false
    }

    const handleLoginClick = () => {
      showLoginModal.value = true;
      closeMenu();
    }

    return {
      userStore,
      currentYear,
      showLoginModal,
      loginForm,
      loading,
      handleLogin,
      loginError,
      t,
      currentLocale,
      changeLocale,
      languages,
      showLangMenu,
      getCurrentLang,
      toggleLangMenu,
      showMobileMenu,
      toggleMobileMenu,
      closeMenu,
      handleLoginClick
    }
  }
}
</script>

<style scoped>
.blog-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
  color: #fff;
  position: relative;
}

/* 哈萨克风格装饰 - 两侧花纹 */
.blog-layout::before,
.blog-layout::after {
  content: '';
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100px;
  background-color: #000;
  z-index: 1;
}

/* 基础装饰单元 */
.blog-layout::before::after,
.blog-layout::after::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 100px,
    rgba(255, 255, 255, 0.03) 100px,
    rgba(255, 255, 255, 0.03) 200px
  );
}

/* 装饰图案 - 左侧 */
.blog-layout::before {
  left: 0;
  background-image: radial-gradient(
    circle at 50% 50%,
    transparent 15px,
    rgba(255, 255, 255, 0.03) 16px,
    rgba(255, 255, 255, 0.03) 20px,
    transparent 21px
  ),
  radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.02) 25px,
    transparent 26px
  );
  background-size: 100px 100px;
  background-position: center;
  background-repeat: repeat-x;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

/* 装饰图案 - 右侧 */
.blog-layout::after {
  right: 0;
  background-image: radial-gradient(
    circle at 50% 50%,
    transparent 15px,
    rgba(255, 255, 255, 0.03) 16px,
    rgba(255, 255, 255, 0.03) 20px,
    transparent 21px
  ),
  radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.02) 25px,
    transparent 26px
  );
  background-size: 100px 100px;
  background-position: center;
  background-repeat: repeat-x;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #000;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 顶部装饰花纹 */
  background-image: 
    radial-gradient(
      circle at 50% 50%,
      transparent 15px,
      rgba(255, 255, 255, 0.03) 16px,
      rgba(255, 255, 255, 0.03) 20px,
      transparent 21px
    );
  background-size: 80px 80px;
  background-position: center;
  background-repeat: repeat-x;
}

@media (max-1440px) {
  .blog-layout::before,
  .blog-layout::after {
    width: 80px;
  }
}

@media (max-1200px) {
  .blog-layout::before,
  .blog-layout::after {
    width: 60px;
  }
}

@media (max-768px) {
  .blog-layout::before,
  .blog-layout::after {
    display: none;
  }
  
  .header-content {
    height: 60px;
    background-image: none;
  }
}

.logo {
  font-size: 24px;
  color: #fff;
  text-decoration: none;
  letter-spacing: 2px;
  line-height: 80px;
  height: 100%;
}

.mobile-nav {
  display: none;
}

.nav-menu {
  display: flex;
  gap: 40px;
  align-items: center;
  height: 100%;
  margin-left: auto;
}

.nav-menu a {
  color: #888;
  text-decoration: none;
  font-size: 15px;
  letter-spacing: 1px;
  transition: color 0.3s;
  line-height: 80px;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  color: #fff;
}

.nav-menu > * {
  display: flex;
  align-items: center;
  height: 100%;
}

.blog-main {
  flex: 1;
  width: 100%;
  margin-top: 80px;
  position: relative;
  z-index: 2;
}

.blog-footer {
  border-top: 1px solid #333;
  padding: 40px 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-info {
  color: #888;
  font-size: 14px;
}

.social-links {
  display: flex;
  gap: 20px;
}

.social-links a {
  color: #888;
  font-size: 20px;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #fff;
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
  .header-content {
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #000;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0 15px;
  }

  .blog-main {
    margin-top: 60px;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    flex-direction: column;
    padding: 90px 0 20px;
    gap: 30px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    height: auto;
    margin-left: 0;
  }

  .nav-menu.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    overflow-y: auto;
  }

  .nav-menu > * {
    width: 100%;
    justify-content: center;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
    transition-delay: calc(var(--index) * 0.1s);
  }

  .nav-menu.mobile-open > * {
    opacity: 1;
    transform: translateY(0);
  }

  .nav-menu > *:last-child {
    border-bottom: none;
    margin-bottom: 20px;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 8px;
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transition: background-color 0.3s;
  }

  .mobile-menu-btn:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .mobile-menu-btn:active {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .mobile-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  .mobile-overlay.show {
    display: block;
  }

  .lang-menu {
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: -8px;
    background: #000;
    border: 1px solid #333;
    border-radius: 4px;
    padding: 8px 0;
    min-width: 160px;
    z-index: 1000;
  }

  .logo {
    font-size: 20px;
    line-height: 60px;
  }

  .mobile-nav {
    display: block;
  }

  .close-menu-btn {
    position: fixed;
    top: 11px;
    right: 15px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }

  .close-menu-btn:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .nav-menu a {
    line-height: 1;
    height: auto;
    font-size: 16px;
  }

  .login-btn {
    height: auto;
    border: none;
    padding: 0;
  }
}

.login-btn {
  background: transparent;
  border: 1px solid #333;
  color: #888;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  height: 36px;
  line-height: 1;
}

.login-btn:hover {
  border-color: #fff;
  color: #fff;
}

.admin-link {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #000;
  border: 1px solid #333;
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.modal-content h2 {
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 30px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-form input {
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  width: 100%;
}

.login-form input:focus {
  border-color: #fff;
  outline: none;
}

.login-form button {
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.login-form button:hover:not(:disabled) {
  border-color: #fff;
}

.login-form button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
}

.lang-switch {
  position: relative;
  height: 100%;
}

.lang-selector {
  position: relative;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
}

.current-lang {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border: 1px solid #333;
  border-radius: 4px;
  transition: all 0.3s;
  height: 26px;
}

.current-lang:hover {
  border-color: #666;
}

.lang-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #000;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 8px 0;
  min-width: 160px;
  z-index: 1000;
}

.lang-menu button {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #888;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.lang-menu button:hover,
.lang-menu button.active {
  color: #fff;
  background: #111;
}

.lang-flag {
  font-size: 16px;
}

.lang-name {
  font-size: 14px;
}

/* 汉堡菜单按钮基础样式 */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 12px;
  cursor: pointer;
  width: 48px;
  height: 48px;
}

/* 汉堡菜单样式 */
.hamburger {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.hamburger.active .hamburger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
</style> 