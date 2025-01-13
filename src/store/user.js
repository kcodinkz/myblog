import { reactive } from 'vue'

export const userStore = {
  state: reactive({
    isLoggedIn: false,
    userInfo: null
  }),

  login(userInfo) {
    // 登录成功，更新状态
    this.state.isLoggedIn = true
    this.state.userInfo = {
      username: userInfo.username,
      role: userInfo.role
    }
  },

  logout() {
    this.state.isLoggedIn = false
    this.state.userInfo = null
  }
} 