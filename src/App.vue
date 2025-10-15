<template>
  <div class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <footer class="border-t bg-white/80 backdrop-blur-sm text-sm text-gray-600 p-6 text-center">
      <div class="max-w-7xl mx-auto">
        <p>© {{ new Date().getFullYear() }} TextFormers — Transformando ideias em textos incríveis</p>
        <div class="mt-2 flex justify-center gap-6 text-xs">
          <a href="#" class="hover:text-primary-600 transition-colors">Privacidade</a>
          <a href="#" class="hover:text-primary-600 transition-colors">Termos</a>
          <a href="#" class="hover:text-primary-600 transition-colors">Suporte</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style>
/* Global styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
