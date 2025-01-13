<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>关于本站</h3>
          <p>分享技术与生活，记录成长与感悟</p>
          <div class="social-links">
            <a href="#" title="GitHub"><i class="fab fa-github"></i></a>
            <a href="#" title="微博"><i class="fab fa-weibo"></i></a>
            <a href="#" title="知乎"><i class="fab fa-zhihu"></i></a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>快速链接</h3>
          <ul>
            <li><router-link to="/archive">文章归档</router-link></li>
            <li><router-link to="/categories">分类专栏</router-link></li>
            <li><router-link to="/about">关于我</router-link></li>
            <li><router-link to="/friends">友情链接</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>联系方式</h3>
          <ul>
            <li>Email: example@example.com</li>
            <li>微信: myblog-weixin</li>
            <li>QQ: 123456789</li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 我的博客. All rights reserved.</p>
        <p>
          <a href="/privacy">隐私政策</a> |
          <a href="/terms">使用条款</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 60px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  color: #fff;
  margin-bottom: 20px;
  font-size: 1.2em;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.footer-section a:hover {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.social-links a {
  color: #fff;
  font-size: 1.5em;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
  font-size: 0.9em;
  opacity: 0.8;
}

.footer-bottom a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-section {
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style> 