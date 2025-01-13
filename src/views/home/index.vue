<template>
  <div class="home">
    <div class="carousel">
      <div 
        class="carousel-inner" 
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="carousel-slide"
        >
          <img :src="slide.image" :alt="slide.title">
          <div class="slide-content">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
      <div class="carousel-indicators">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          :class="{ active: currentSlide === index }"
          @click="setSlide(index)"
        ></button>
      </div>
      <button class="carousel-prev" @click="prevSlide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel-next" @click="nextSlide">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="welcome-section">
      <h1>{{ t('common.welcome') }}</h1>
      <h2>{{ t('home.subtitle') }}</h2>
      <p class="intro">{{ t('home.intro') }}</p>
    </div>
    <div class="featured-section">
      <h3 class="section-title">{{ t('common.featured') }}</h3>
      <div class="featured-post" v-if="featuredPost">
        <div class="featured-image">
          <img :src="featuredPost.cover" :alt="featuredPost.title">
        </div>
        <div class="featured-content">
          <div class="post-meta">
            <span class="post-category">{{ featuredPost.category }}</span>
            <span class="post-date">{{ formatDate(featuredPost.date) }}</span>
          </div>
          <h2 class="featured-title">{{ featuredPost.title }}</h2>
          <p class="featured-excerpt">{{ featuredPost.excerpt }}</p>
          <router-link :to="`/post/${featuredPost.id}`" class="read-more">
            {{ t('common.readMore') }}
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="latest-section">
      <h3 class="section-title">{{ t('common.latestPosts') }}</h3>
      <div class="posts-grid">
        <router-link 
          v-for="post in posts" 
          :key="post.id" 
          :to="`/post/${post.id}`" 
          class="post-item"
        >
          <div class="post-image">
            <img :src="post.cover" :alt="post.title">
          </div>
          <div class="post-info">
            <div class="post-meta">
              <span class="post-category">{{ post.category }}</span>
              <span class="post-date">{{ formatDate(post.date) }}</span>
            </div>
            <h3 class="post-title">{{ post.title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Home',
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const posts = ref([
      {
        id: 1,
        title: '春日午后，与咖啡的约会',
        cover: 'https://picsum.photos/400/300?random=1',
        category: '生活随笔',
        date: '2024-03-21'
      },
      {
        id: 2,
        title: '《百年孤独》：魔幻与现实的交织',
        cover: 'https://picsum.photos/400/300?random=2',
        category: '读书分享',
        date: '2024-03-20'
      }
      // 更多文章...
    ])
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('zh-CN')
    }
    const featuredPost = ref({
      id: 1,
      title: '春日午后，与咖啡的约会',
      excerpt: '推开咖啡馆的门，午后的阳光温柔地洒在木质桌面上。我选择了一个靠窗的位置，点了一杯手冲咖啡...',
      cover: 'https://picsum.photos/800/400?random=1',
      category: '生活随笔',
      date: '2024-03-21'
    })
    const slides = ref([
      {
        image: 'https://picsum.photos/1200/400?random=1',
        title: t('home.carousel.welcome.title'),
        description: t('home.carousel.welcome.description')
      },
      {
        image: 'https://picsum.photos/1200/400?random=2',
        title: t('home.carousel.latest.title'),
        description: t('home.carousel.latest.description')
      },
      {
        image: 'https://picsum.photos/1200/400?random=3',
        title: t('home.carousel.journey.title'),
        description: t('home.carousel.journey.description')
      }
    ])
    const currentSlide = ref(0)
    let autoplayInterval
    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length
    }
    const prevSlide = () => {
      currentSlide.value = currentSlide.value === 0 
        ? slides.value.length - 1 
        : currentSlide.value - 1
    }
    const setSlide = (index) => {
      currentSlide.value = index
    }
    onMounted(() => {
      // 自动播放
      autoplayInterval = setInterval(nextSlide, 5000)
    })
    onUnmounted(() => {
      clearInterval(autoplayInterval)
    })
    return {
      posts,
      formatDate,
      featuredPost,
      slides,
      currentSlide,
      nextSlide,
      prevSlide,
      setSlide,
      t
    }
  }
}
</script>

<style scoped>
.home {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}
/* 哈萨克风格装饰条纹 */
.home::before,
.home::after {
  content: '';
  position: fixed;
  top: 0;
  bottom: 0;
  width: 80px;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(255, 255, 255, 0.03) 2px,
    transparent 2px,
    transparent 8px
  );
  pointer-events: none;
  z-index: -1;
}
.home::before {
  left: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}
.home::after {
  right: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
}
@media (max-width: 1440px) {
  .home::before,
  .home::after {
    width: 60px;
  }
}
@media (max-width: 1200px) {
  .home::before,
  .home::after {
    width: 40px;
  }
}
@media (max-width: 768px) {
  .home::before,
  .home::after {
    display: none;
  }
}
.welcome-section {
  text-align: left;
  margin-bottom: 60px;
}
.welcome-section h1 {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: normal;
}
.welcome-section h2 {
  font-size: 24px;
  color: #888;
  font-weight: normal;
}
.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  border-top: 1px solid #333;
  padding-top: 40px;
}
.post-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
  transition: opacity 0.3s;
}
.post-item:hover {
  opacity: 0.7;
}
.post-image {
  aspect-ratio: 4/3;
  overflow: hidden;
  border: 1px solid #333;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all 0.3s;
}

.post-item:hover .post-image img {
  filter: grayscale(0);
}

.post-info {
  padding: 0 10px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 14px;
  margin-bottom: 10px;
}

.post-title {
  font-size: 18px;
  font-weight: normal;
  color: #fff;
  margin: 0;
}

.intro {
  color: #888;
  font-size: 16px;
  margin-top: 20px;
  max-width: 600px;
}

.section-title {
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 2px;
  margin-bottom: 30px;
  color: #888;
}

.featured-section {
  margin-bottom: 80px;
  border-top: 1px solid #333;
  padding-top: 40px;
}

.featured-post {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: center;
}

.featured-image {
  border: 1px solid #333;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all 0.3s;
}

.featured-post:hover .featured-image img {
  filter: grayscale(0);
}

.featured-content {
  padding: 20px 0;
}

.featured-title {
  font-size: 32px;
  font-weight: normal;
  margin: 16px 0;
}

.featured-excerpt {
  color: #888;
  line-height: 1.6;
  margin-bottom: 24px;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s;
}

.read-more:hover {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }

  .welcome-section {
    margin-bottom: 40px;
    text-align: center;
  }

  .welcome-section h1 {
    font-size: 24px;
  }

  .welcome-section h2 {
    font-size: 20px;
  }

  .featured-post {
    grid-template-columns: 1fr;
  }

  .featured-title {
    font-size: 24px;
  }

  .carousel {
    height: 300px;
    margin-bottom: 40px;
  }

  .slide-content h2 {
    font-size: 24px;
  }

  .slide-content p {
    font-size: 14px;
  }
}

.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 60px;
  border: 1px solid #333;
}

.carousel-inner {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.carousel-slide:hover img {
  filter: grayscale(0);
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  transition: opacity 0.3s ease;
}

.carousel-slide:hover .slide-content {
  opacity: 0.9;
}

.slide-content h2 {
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 16px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.slide-content p {
  color: #888;
  font-size: 16px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.carousel-slide:hover .slide-content h2 {
  transform: translateY(-5px);
}

.carousel-slide:hover .slide-content p {
  transform: translateY(-5px);
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.carousel-indicators button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #333;
  border: none;
  cursor: pointer;
  padding: 0;
}

.carousel-indicators button.active {
  background: #fff;
}

.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.carousel:hover .carousel-prev,
.carousel:hover .carousel-next {
  opacity: 1;
}

.carousel-prev {
  left: 0;
}

.carousel-next {
  right: 0;
}
</style> 