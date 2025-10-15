<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-4 mb-2">
        <div class="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
          <i class="fas fa-tachometer-alt text-2xl text-white"></i>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-200">Dashboard</h1>
          <p class="text-gray-100">Visão geral do seu progresso</p>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Textos Corrigidos -->
      <div
        class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-200">
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Textos Corrigidos</p>
              <p v-if="!loading" class="text-3xl font-bold text-white">{{ totalCorrigidos }}</p>
              <div v-else class="h-8 w-16 bg-green-400/30 rounded animate-pulse"></div>
            </div>
            <div class="p-3 bg-white/20 rounded-xl">
              <i class="fas fa-file-check text-2xl text-white"></i>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center text-sm text-gray-600">
            <i class="fas fa-arrow-up text-green-500 mr-2"></i>
            <span>+{{ totalCorrigidos }} este mês</span>
          </div>
        </div>
      </div>

      <!-- Erros Frequentes -->
      <div
        class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-200">
        <div class="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm font-medium">Erros Frequentes</p>
              <p v-if="!loading" class="text-3xl font-bold text-white">{{ principaisErros.length }}</p>
              <div v-else class="h-8 w-16 bg-orange-400/30 rounded animate-pulse"></div>
            </div>
            <div class="p-3 bg-white/20 rounded-xl">
              <i class="fas fa-exclamation-triangle text-2xl text-white"></i>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div v-if="!loading" class="space-y-1">
            <div v-for="e in principaisErros.slice(0, 2)" :key="e" class="text-sm text-gray-600 flex items-center">
              <i class="fas fa-circle text-orange-500 text-xs mr-2"></i>
              <span>{{ e }}</span>
            </div>
          </div>
          <div v-else class="space-y-2">
            <div class="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Limite do Plano -->
      <div
        class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-200">
        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Correções Restantes</p>
              <p v-if="!loading" class="text-3xl font-bold text-white">{{ auth.currentUser?.remainingCorrections ?? 0 }}
              </p>
              <div v-else class="h-8 w-16 bg-purple-400/30 rounded animate-pulse"></div>
            </div>
            <div class="p-3 bg-white/20 rounded-xl">
              <i class="fas fa-gem text-2xl text-white"></i>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center text-sm text-gray-600">
            <i class="fas fa-infinity text-purple-500 mr-2"></i>
            <span>Plano atual</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráfico de Evolução -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-3">
          <i class="fas fa-chart-line text-2xl"></i>
          Evolução das Correções
        </h2>
      </div>
      <div class="p-6">
        <canvas v-if="!loading" ref="chartRef" height="120" aria-label="Gráfico de evolução" class="w-full"></canvas>
        <div v-else
          class="h-32 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse flex items-center justify-center">
          <i class="fas fa-chart-line text-4xl text-gray-400"></i>
        </div>
      </div>
    </div>

    <!-- Histórico Recente -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-3">
          <i class="fas fa-clock text-2xl"></i>
          Histórico Recente
        </h2>
      </div>
      <div class="p-6">
        <div v-if="!loading && recent.length > 0" class="space-y-4">
          <div v-for="it in recent" :key="it.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div class="flex items-center gap-4">
              <div class="p-2 bg-blue-100 rounded-lg">
                <i class="fas fa-file-alt text-blue-600"></i>
              </div>
              <div>
                <div class="font-medium text-gray-800">{{ it.title }}</div>
                <div class="text-sm text-gray-500 flex items-center gap-2">
                  <i class="fas fa-calendar-alt"></i>
                  <span>{{ new Date(it.createdAt).toLocaleString('pt-BR') }}</span>
                </div>
              </div>
            </div>
            <div v-if="it.feedback" class="flex items-center gap-2">
              <i class="fas fa-star text-yellow-500"></i>
              <span class="font-semibold text-gray-700">{{ it.feedback.score }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="!loading && recent.length === 0" class="text-center py-8">
          <div class="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-100 grid place-items-center">
            <i class="fas fa-file-alt text-2xl text-gray-400"></i>
          </div>
          <p class="text-gray-500">Nenhuma redação encontrada</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center gap-4 p-4">
            <div class="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'
import { useAuthStore } from '../stores/auth.js'
import { useEssaysStore } from '../stores/essays.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale)

const auth = useAuthStore()
const essays = useEssaysStore()
const chartRef = ref(null)
const loading = ref(true)

onMounted(() => {
  auth.loadFromStorage()
  essays.load()
  // Simula carregamento
  setTimeout(() => { loading.value = false }, 400)
  if (chartRef.value) {
    const byDay = {}
    essays.listByUser(auth.currentUser?.id || '').forEach((e) => {
      const d = new Date(e.createdAt).toLocaleDateString()
      byDay[d] = (byDay[d] || 0) + 1
    })
    const labels = Object.keys(byDay)
    const values = Object.values(byDay)
    new Chart(chartRef.value, {
      type: 'line',
      data: { labels, datasets: [{ label: 'Correções', data: values, borderColor: '#6366f1' }] },
      options: { responsive: true, plugins: { legend: { display: false } } }
    })
  }
})

const totalCorrigidos = computed(() => essays.listByUser(auth.currentUser?.id || '').length)
const recentes = computed(() => essays.listByUser(auth.currentUser?.id || '').slice(0, 5))
const recent = recentes
const principaisErros = computed(() => ['Pontuação', 'Concordância', 'Coesão'])
</script>
