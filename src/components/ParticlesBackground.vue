<template>
  <div id="tsparticles" class="particles-container"></div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { loadFull } from "tsparticles";
import { tsParticles } from "@tsparticles/engine";

export default {
  name: 'ParticlesBackground',
  setup() {
    let particlesInstance = null

    const initParticles = async () => {
      await loadFull(tsParticles);
      particlesInstance = await tsParticles.load('tsparticles', {
        background: {
          color: {
            value: 'transparent'
          }
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: '#1a73e8'
          },
          links: {
            color: '#1a73e8',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1
          },
          collisions: {
            enable: false
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            outModes: {
              default: 'out'
            }
          },
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800
            }
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            value: { min: 1, max: 3 }
          }
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab'
            },
            onClick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1
              }
            },
            push: {
              quantity: 4
            }
          }
        }
      })
    }

    onMounted(() => {
      initParticles()
    })

    onUnmounted(() => {
      if (particlesInstance) {
        particlesInstance.destroy()
      }
    })
  }
}
</script>

<style scoped>
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
}
</style> 