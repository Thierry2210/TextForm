<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-soft">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <button class="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" @click="isOpen = !isOpen"
            aria-label="Abrir menu" :aria-expanded="isOpen">
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <router-link to="/" class="flex items-center gap-3 group">
            <div class="relative">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-medium group-hover:shadow-strong transition-all duration-200 group-hover:scale-105">
                T
              </div>
              <div
                class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse">
              </div>
            </div>
            <div class="hidden sm:block">
              <span
                class="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">TextFormers</span>
              <div class="text-xs text-gray-500 -mt-1">IA Writing Assistant</div>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden sm:flex items-center gap-1">
          <router-link :class="navClass('/dashboard')" to="/dashboard"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Dashboard
          </router-link>
          <router-link :class="navClass('/essay')" to="/essay"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Redação
          </router-link>
          <router-link :class="navClass('/plans')" to="/plans"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Planos
          </router-link>
          <router-link :class="navClass('/history')" to="/history"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Histórico
          </router-link>
          <router-link :class="navClass('/admin')" to="/admin"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Admin
          </router-link>
        </nav>

        <!-- User Menu -->
        <UserMenu />
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="isOpen" ref="menuRef" class="sm:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <nav class="flex flex-col gap-1">
          <router-link @click="isOpen = false" :class="mobileNavClass('/dashboard')" to="/dashboard"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Dashboard
          </router-link>
          <router-link @click="isOpen = false" :class="mobileNavClass('/essay')" to="/essay"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Redação
          </router-link>
          <router-link @click="isOpen = false" :class="mobileNavClass('/plans')" to="/plans"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Planos
          </router-link>
          <router-link @click="isOpen = false" :class="mobileNavClass('/history')" to="/history"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Histórico
          </router-link>
          <router-link @click="isOpen = false" :class="mobileNavClass('/admin')" to="/admin"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50">
            Admin
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import UserMenu from './UserMenu.vue'

const isOpen = ref(false)
const route = useRoute()
const menuRef = ref(null)

watch(() => route.fullPath, () => { isOpen.value = false })

function navClass(prefix) {
  const base = 'text-gray-700 hover:text-primary-600'
  return route.path.startsWith(prefix) ? base + ' text-primary-600 bg-primary-50' : base
}

function mobileNavClass(prefix) {
  const base = 'text-gray-700 hover:text-primary-600'
  return route.path.startsWith(prefix) ? base + ' text-primary-600 bg-primary-50' : base
}

function onKeydown(e) {
  if (e.key === 'Escape') isOpen.value = false
}

function onClickOutside(e) {
  if (!isOpen.value) return
  const el = menuRef.value
  if (el && !el.contains(e.target)) isOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('click', onClickOutside)
})
</script>
