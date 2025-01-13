<template>
  <div class="about-page">
    <!-- 个人介绍部分 -->
    <section class="intro-section">
      <h1>{{ t('about.title') }}</h1>
      <div class="profile">
        <div class="profile-image">
          <img src="https://api.dicebear.com/7.x/lorelei/svg?seed=Hoxkar&backgroundColor=b6e3f4&hair=variant07&accessories=variant03&face=variant12" alt="Profile">
        </div>
        <div class="profile-content">
          <h2>{{ t('about.name') }}</h2>
          <p class="bio">{{ t('about.bio') }}</p>
        </div>
      </div>
    </section>

    <!-- 服务内容部分 -->
    <section class="services-section">
      <h2>{{ t('about.services.title') }}</h2>
      <div class="services-grid">
        <div v-for="(service, index) in services" :key="index" class="service-card">
          <i :class="service.icon"></i>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </section>

    <!-- 项目案例部分 -->
    <section class="projects-section">
      <h2>{{ t('about.projects.title') }}</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-image">
            <img :src="project.image" :alt="project.title">
          </div>
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.link" target="_blank" class="project-link">
              {{ t('about.viewProject') }}
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式部分 -->
    <section class="contact-section">
      <h2>{{ t('about.contact.title') }}</h2>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <a href="mailto:contact@example.com">contact@example.com</a>
          </div>
          <div class="contact-item">
            <i class="fab fa-github"></i>
            <a href="https://github.com/yourusername" target="_blank">GitHub</a>
          </div>
          <div class="contact-item">
            <i class="fab fa-twitter"></i>
            <a href="https://twitter.com/yourusername" target="_blank">Twitter</a>
          </div>
        </div>
        <form class="contact-form" @submit.prevent="handleSubmit">
          <input 
            type="text" 
            v-model="form.name" 
            :placeholder="t('about.contact.name')"
            required
          >
          <input 
            type="email" 
            v-model="form.email" 
            :placeholder="t('about.contact.email')"
            required
          >
          <textarea 
            v-model="form.message" 
            :placeholder="t('about.contact.message')"
            required
          ></textarea>
          <button type="submit">{{ t('about.contact.send') }}</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'About',
  setup() {
    const { t } = useI18n()
    
    const services = [
      {
        icon: 'fas fa-code',
        title: t('about.services.webDev'),
        description: t('about.services.webDevDesc')
      },
      {
        icon: 'fas fa-mobile-alt',
        title: t('about.services.mobileDev'),
        description: t('about.services.mobileDevDesc')
      },
      {
        icon: 'fas fa-server',
        title: t('about.services.backend'),
        description: t('about.services.backendDesc')
      }
    ]

    const projects = [
      {
        id: 1,
        title: 'Project One',
        description: 'Description of project one...',
        image: 'https://source.unsplash.com/400x300/?technology,1',
        link: '#'
      },
      {
        id: 2,
        title: 'Project Two',
        description: 'Description of project two...',
        image: 'https://source.unsplash.com/400x300/?coding,2',
        link: '#'
      },
      {
        id: 3,
        title: 'Project Three',
        description: 'Description of project three...',
        image: 'https://source.unsplash.com/400x300/?web,3',
        link: '#'
      },
      {
        id: 4,
        title: 'Project Four',
        description: 'Description of project four...',
        image: 'https://source.unsplash.com/400x300/?design,4',
        link: '#'
      }
    ]

    const form = ref({
      name: '',
      email: '',
      message: ''
    })

    const handleSubmit = () => {
      // 处理表单提交
      console.log('Form submitted:', form.value)
    }

    return {
      services,
      projects,
      form,
      handleSubmit,
      t
    }
  }
}
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

section {
  margin-bottom: 80px;
}

h1 {
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 40px;
}

h2 {
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 30px;
}

.profile {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  align-items: start;
}

.profile-image {
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid #333;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-content h2 {
  margin-bottom: 20px;
}

.bio {
  color: #888;
  line-height: 1.6;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  padding: 30px;
  border: 1px solid #333;
  text-align: center;
  transition: all 0.3s;
}

.service-card:hover {
  border-color: #666;
}

.service-card i {
  font-size: 32px;
  margin-bottom: 20px;
  color: #666;
}

.service-card h3 {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 15px;
}

.service-card p {
  color: #888;
  font-size: 14px;
  line-height: 1.6;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.project-card {
  border: 1px solid #333;
  overflow: hidden;
}

.project-image {
  aspect-ratio: 16/9;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all 0.3s;
}

.project-card:hover .project-image img {
  filter: grayscale(0);
}

.project-info {
  padding: 20px;
}

.project-info h3 {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 10px;
}

.project-info p {
  color: #888;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s;
}

.project-link:hover {
  opacity: 0.7;
}

.contact-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-item i {
  width: 20px;
  color: #666;
}

.contact-item a {
  color: #888;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-item a:hover {
  color: #fff;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-form input,
.contact-form textarea {
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  width: 100%;
}

.contact-form textarea {
  height: 150px;
  resize: vertical;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #fff;
  outline: none;
}

.contact-form button {
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.contact-form button:hover {
  border-color: #fff;
}

@media (max-width: 768px) {
  .profile,
  .services-grid,
  .projects-grid,
  .contact-content {
    grid-template-columns: 1fr;
  }

  .profile-image {
    max-width: 200px;
    margin: 0 auto;
  }

  section {
    margin-bottom: 60px;
  }
}
</style> 