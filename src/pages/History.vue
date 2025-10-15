<template>
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-white/20 rounded-xl">
                <i class="fas fa-history text-2xl text-white"></i>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-white">Histórico de Correções</h1>
                <p class="text-indigo-200">Acompanhe sua evolução na escrita</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold text-white">{{ items.length }}</div>
              <div class="text-indigo-200 text-sm">redações corrigidas</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="items.length === 0" class="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
        <div class="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 grid place-items-center">
          <i class="fas fa-file-alt text-4xl text-blue-500"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Nenhuma redação corrigida ainda</h3>
        <p class="text-gray-600 mb-6 max-w-md mx-auto">Envie sua primeira redação para ver o histórico de correções e acompanhar sua evolução.</p>
        <router-link 
          to="/essay" 
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
        >
          <i class="fas fa-plus"></i>
          Enviar Primeira Redação
        </router-link>
      </div>

      <!-- History List -->
      <div v-else class="space-y-4">
        <div v-for="it in items" :key="it.id" class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200">
          <div class="p-6">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <i class="fas fa-file-alt text-blue-500"></i>
                  <h3 class="text-lg font-semibold text-gray-800">{{ it.title }}</h3>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <i class="fas fa-calendar-alt"></i>
                  <span>{{ new Date(it.createdAt).toLocaleString('pt-BR') }}</span>
                </div>
              </div>
              
              <div v-if="it.feedback" class="text-right">
                <div class="flex items-center gap-2 mb-1">
                  <i class="fas fa-star text-yellow-500"></i>
                  <span class="text-lg font-bold text-gray-800">{{ it.feedback.score }}</span>
                </div>
                <div class="text-xs text-gray-500 max-w-xs">{{ it.feedback.summary }}</div>
              </div>
            </div>

            <!-- Feedback Details -->
            <div v-if="it.feedback" class="border-t border-gray-100 pt-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-medium text-gray-700 flex items-center gap-2">
                  <i class="fas fa-chart-line text-green-500"></i>
                  Detalhes da Correção
                </h4>
                <button 
                  @click="toggleDetails(it.id)"
                  class="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>{{ expandedItems.includes(it.id) ? 'Ocultar' : 'Ver' }} detalhes</span>
                  <i :class="expandedItems.includes(it.id) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-xs"></i>
                </button>
              </div>

              <div v-if="expandedItems.includes(it.id)" class="space-y-4">
                <!-- Errors -->
                <div v-if="it.feedback.errors && it.feedback.errors.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 class="font-medium text-red-800 mb-2 flex items-center gap-2">
                    <i class="fas fa-exclamation-triangle"></i>
                    Erros Encontrados ({{ it.feedback.errors.length }})
                  </h5>
                  <div class="space-y-2">
                    <div v-for="(err, idx) in it.feedback.errors" :key="idx" class="flex items-start gap-2">
                      <i class="fas fa-times-circle text-red-500 mt-1 text-sm"></i>
                      <div>
                        <span class="inline-block px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium mr-2">{{ err.type }}</span>
                        <span class="text-sm text-red-700">{{ err.message }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Suggestions -->
                <div v-if="it.feedback.suggestions && it.feedback.suggestions.length > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h5 class="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                    <i class="fas fa-lightbulb"></i>
                    Sugestões ({{ it.feedback.suggestions.length }})
                  </h5>
                  <div class="space-y-2">
                    <div v-for="(suggestion, idx) in it.feedback.suggestions" :key="idx" class="flex items-start gap-2">
                      <i class="fas fa-arrow-right text-yellow-500 mt-1 text-sm"></i>
                      <span class="text-sm text-yellow-700">{{ suggestion }}</span>
                    </div>
                  </div>
                </div>

                <!-- Content Preview -->
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 class="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <i class="fas fa-eye"></i>
                    Conteúdo da Redação
                  </h5>
                  <div class="text-sm text-gray-600 max-h-32 overflow-y-auto">
                    {{ it.content.substring(0, 300) }}{{ it.content.length > 300 ? '...' : '' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useEssaysStore } from '../stores/essays.js'

const auth = useAuthStore()
auth.loadFromStorage()
const essays = useEssaysStore()
essays.load()

const items = computed(() => essays.listByUser(auth.currentUser?.id || ''))
const expandedItems = ref([])

function toggleDetails(itemId) {
  const index = expandedItems.value.indexOf(itemId)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(itemId)
  }
}

function renderAnnotated(it) {
  if (!it.feedback) return it.content
  // simple annotation marker output for demo
  let out = it.content
  it.feedback.errors.forEach((e, idx) => {
    out += `\n[${idx + 1}] ${e.type}: ${e.message}`
  })
  return out
}
</script>


