<template>
  <div class="gallery-page">
    <!-- 分类筛选 -->
    <div class="gallery-filters">
      <button 
        v-for="category in categories" 
        :key="category.id"
        :class="['filter-btn', { active: currentCategory === category.id }]"
        @click="setCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- 图片网格 -->
    <div class="gallery-grid">
      <div 
        v-for="photo in filteredPhotos" 
        :key="photo.id" 
        class="gallery-item"
        @click="openPhoto(photo)"
      >
        <div class="photo-wrapper">
          <img 
            :src="photo.thumbnail" 
            :alt="photo.title"
            loading="lazy"
          >
          <div class="photo-info">
            <h3>{{ photo.title }}</h3>
            <p>{{ photo.description }}</p>
            <span class="photo-date">{{ formatDate(photo.date) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片查看器 -->
    <div 
      v-if="selectedPhoto" 
      class="photo-viewer"
      @click.self="closePhoto"
    >
      <button class="close-btn" @click="closePhoto">
        <i class="fas fa-times"></i>
      </button>
      <div class="viewer-content">
        <button 
          class="nav-btn prev" 
          @click="prevPhoto"
          v-show="hasPrevPhoto"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <img :src="selectedPhoto.fullsize" :alt="selectedPhoto.title">
        <button 
          class="nav-btn next" 
          @click="nextPhoto"
          v-show="hasNextPhoto"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="photo-details">
        <h2>{{ selectedPhoto.title }}</h2>
        <p>{{ selectedPhoto.description }}</p>
        <div class="photo-meta">
          <span>{{ formatDate(selectedPhoto.date) }}</span>
          <span>{{ selectedPhoto.category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Gallery',
  setup() {
    const { t } = useI18n()
    const currentCategory = ref('all')
    const selectedPhoto = ref(null)

    const categories = [
      { id: 'all', name: t('gallery.allPhotos') },
      { id: 'nature', name: t('gallery.nature') },
      { id: 'city', name: t('gallery.city') },
      { id: 'abstract', name: t('gallery.abstract') }
    ]

    const photos = [
      {
        id: 1,
        title: '城市夜景',
        description: '霓虹灯下的现代都市',
        thumbnail: 'https://source.unsplash.com/400x300/?city,night,1',
        fullsize: 'https://source.unsplash.com/1200x800/?city,night,1',
        category: 'city',
        date: '2024-03-21'
      },
      {
        id: 2,
        title: '山间晨雾',
        description: '晨光中的山峦轮廓',
        thumbnail: 'https://source.unsplash.com/400x300/?mountain,fog,2',
        fullsize: 'https://source.unsplash.com/1200x800/?mountain,fog,2',
        category: 'nature',
        date: '2024-03-20'
      },
      // 添加更多图片...
    ]

    const filteredPhotos = computed(() => {
      if (currentCategory.value === 'all') {
        return photos
      }
      return photos.filter(photo => photo.category === currentCategory.value)
    })

    const setCategory = (category) => {
      currentCategory.value = category
    }

    const openPhoto = (photo) => {
      selectedPhoto.value = photo
    }

    const closePhoto = () => {
      selectedPhoto.value = null
    }

    const currentPhotoIndex = computed(() => {
      if (!selectedPhoto.value) return -1
      return filteredPhotos.value.findIndex(p => p.id === selectedPhoto.value.id)
    })

    const hasPrevPhoto = computed(() => currentPhotoIndex.value > 0)
    const hasNextPhoto = computed(() => currentPhotoIndex.value < filteredPhotos.value.length - 1)

    const prevPhoto = () => {
      if (hasPrevPhoto.value) {
        selectedPhoto.value = filteredPhotos.value[currentPhotoIndex.value - 1]
      }
    }

    const nextPhoto = () => {
      if (hasNextPhoto.value) {
        selectedPhoto.value = filteredPhotos.value[currentPhotoIndex.value + 1]
      }
    }

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString()
    }

    return {
      categories,
      currentCategory,
      filteredPhotos,
      selectedPhoto,
      hasPrevPhoto,
      hasNextPhoto,
      setCategory,
      openPhoto,
      closePhoto,
      prevPhoto,
      nextPhoto,
      formatDate
    }
  }
}
</script>

<style scoped>
.gallery-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.gallery-filters {
  margin-bottom: 40px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-btn {
  background: transparent;
  border: 1px solid #333;
  color: #888;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover,
.filter-btn.active {
  border-color: #fff;
  color: #fff;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.gallery-item {
  cursor: pointer;
}

.photo-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  border: 1px solid #333;
}

.photo-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all 0.5s ease;
}

.photo-wrapper:hover img {
  filter: grayscale(0);
  transform: scale(1.05);
}

.photo-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.photo-wrapper:hover .photo-info {
  transform: translateY(0);
}

.photo-info h3 {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 8px;
}

.photo-info p {
  color: #888;
  font-size: 14px;
  margin-bottom: 8px;
}

.photo-date {
  font-size: 12px;
  color: #666;
}

.photo-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.viewer-content {
  position: relative;
  max-width: 90vw;
  max-height: 80vh;
}

.viewer-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 20px;
  transition: opacity 0.3s;
}

.nav-btn.prev {
  left: 20px;
}

.nav-btn.next {
  right: 20px;
}

.photo-details {
  margin-top: 20px;
  text-align: center;
  padding: 0 20px;
}

.photo-details h2 {
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 10px;
}

.photo-details p {
  color: #888;
  margin-bottom: 10px;
}

.photo-meta {
  font-size: 14px;
  color: #666;
}

.photo-meta span {
  margin: 0 10px;
}

@media (max-width: 768px) {
  .gallery-grid {
    gap: 20px;
  }

  .viewer-content {
    max-width: 95vw;
  }

  .nav-btn {
    padding: 10px;
  }
}
</style> 