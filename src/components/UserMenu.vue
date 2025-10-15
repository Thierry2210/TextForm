<template>
  <div class="flex items-center gap-3">
    <div v-if="auth.isAuthenticated" class="flex items-center gap-3">
      <div class="text-right text-sm leading-tight hidden sm:block">
        <div class="font-medium text-gray-900">{{ auth.currentUser?.name }}</div>
        <div class="text-gray-500 text-xs">{{ auth.currentUser?.plan }}</div>
      </div>
      <div class="relative">
        <button 
          @click="showDropdown = !showDropdown"
          class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center text-sm font-medium">
            {{ auth.currentUser?.name?.charAt(0) }}
          </div>
          <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        
        <!-- Dropdown Menu -->
        <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-strong border border-gray-200 py-1 z-50">
          <div class="px-4 py-2 border-b border-gray-100">
            <div class="text-sm font-medium text-gray-900">{{ auth.currentUser?.name }}</div>
            <div class="text-xs text-gray-500">{{ auth.currentUser?.email }}</div>
          </div>
          <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Dashboard
          </router-link>
          <router-link to="/plans" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            Planos
          </router-link>
          <div class="border-t border-gray-100 my-1"></div>
          <button @click="logout" class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center gap-3">
      <router-link to="/login" class="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
        Entrar
      </router-link>
      <router-link to="/register" class="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors shadow-medium">
        Começar
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()
const showDropdown = ref(false)

onMounted(() => {
  auth.loadFromStorage()
  // Close dropdown when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleClickOutside(event) {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    showDropdown.value = false
  }
}

async function logout() {
  await auth.logout()
  showDropdown.value = false
}
</script>


