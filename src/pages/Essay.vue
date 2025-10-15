<template>
  <div class="min-h-screen z">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Seção de Nova Redação -->
        <section class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h1 class="text-2xl font-bold text-white flex items-center gap-3">
              <i class="fas fa-edit text-2xl"></i>
              Nova Redação
            </h1>
          </div>

          <div class="p-6 space-y-6">
            <!-- Campo Título -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <i class="fas fa-heading text-blue-500"></i>
                Título da Redação
              </label>
              <input v-model="title" placeholder="Digite o título da sua redação..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white" />
            </div>

            <!-- Campo Conteúdo -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <i class="fas fa-file-alt text-blue-500"></i>
                Conteúdo
              </label>
              <textarea v-model="content" rows="14" placeholder="Escreva sua redação aqui..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"></textarea>
            </div>

            <!-- Controles de Arquivo -->
            <div class="space-y-4">
              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-upload text-green-500 mr-2"></i>
                    Carregar Arquivo
                  </label>
                  <input ref="fileInputRef" type="file" accept=".txt,.doc,.docx" @change="handleFile"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
                <button type="button" @click="clearFile"
                  class="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-2 font-medium">
                  <i class="fas fa-sync-alt animate-spin" v-if="clearing"></i>
                  <i class="fas fa-trash-alt" v-else></i>
                  Limpar Redação
                </button>
              </div>
            </div>

            <!-- Botão de Envio -->
            <div class="space-y-3">
              <button :disabled="!canSubmit" @click="submitEssay"
                class="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none"
                :class="canSubmit ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'bg-gray-400'">
                <i v-if="submitting" class="fas fa-spinner animate-spin text-xl"></i>
                <i v-else class="fas fa-paper-plane text-xl"></i>
                <span>{{ submitting ? 'Enviando...' : 'Enviar para Correção' }}</span>
              </button>

              <!-- Informações -->
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2 text-gray-600">
                  <i class="fas fa-chart-line text-green-500"></i>
                  <span>Correções restantes: <span class="font-semibold text-blue-600">{{ remaining }}</span></span>
                </div>
                <div v-if="!content.trim() || !title.trim()" class="flex items-center gap-2 text-red-600">
                  <i class="fas fa-exclamation-triangle"></i>
                  <span>Preencha título e conteúdo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Seção de Feedback -->
        <section v-if="feedback" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
              <i class="fas fa-check-circle text-2xl"></i>
              Feedback da Correção
            </h2>
          </div>

          <div class="p-6 space-y-6">
            <!-- Nota -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <i class="fas fa-star text-yellow-500 text-2xl"></i>
                  <span class="text-lg font-medium text-gray-700">Nota Final</span>
                </div>
                <div class="text-3xl font-bold text-blue-600">{{ feedback.score }}</div>
              </div>
            </div>

            <!-- Resumo -->
            <div class="space-y-2">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <i class="fas fa-comment-alt text-blue-500"></i>
                Resumo Geral
              </h3>
              <p class="text-gray-700 bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">{{ feedback.summary }}</p>
            </div>

            <!-- Erros -->
            <div v-if="feedback.errors && feedback.errors.length > 0" class="space-y-3">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <i class="fas fa-exclamation-triangle text-red-500"></i>
                Erros Encontrados
              </h3>
              <div class="space-y-2">
                <div v-for="(err, idx) in feedback.errors" :key="idx"
                  class="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div class="flex items-start gap-3">
                    <i class="fas fa-times-circle text-red-500 mt-1"></i>
                    <div>
                      <span
                        class="inline-block px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium mb-1">{{
                        err.type }}</span>
                      <p class="text-gray-700 text-sm">{{ err.message }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sugestões -->
            <div v-if="feedback.suggestions && feedback.suggestions.length > 0" class="space-y-3">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <i class="fas fa-lightbulb text-yellow-500"></i>
                Sugestões de Melhoria
              </h3>
              <div class="space-y-2">
                <div v-for="(s, i) in feedback.suggestions" :key="i"
                  class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div class="flex items-start gap-3">
                    <i class="fas fa-arrow-right text-yellow-500 mt-1"></i>
                    <p class="text-gray-700 text-sm">{{ s }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useEssaysStore } from '../stores/essays.js'

const auth = useAuthStore()
auth.loadFromStorage()

const essays = useEssaysStore()
essays.load()

const DRAFT_KEY = 'tf_draft_v1'
const title = ref('Minha Redação')
const content = ref('')
const fileInputRef = ref(null)
const canSubmit = computed(() => {
  if (submitting.value) return false
  if ((remaining.value || 0) <= 0) return false
  return title.value.trim().length > 0 && content.value.trim().length > 0
})
const submitting = ref(false)
const clearing = ref(false)
const feedback = ref(null)
const remaining = computed(() => auth.currentUser?.remainingCorrections ?? 0)

function handleFile(ev) {
  const input = ev.target
  const file = input && input.files ? input.files[0] : null
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    content.value = String(reader.result || '')
  }
  reader.readAsText(file)
}

function clearFile() {
  clearing.value = true
  setTimeout(() => {
    if (fileInputRef.value) fileInputRef.value.value = ''
    content.value = ''
    title.value = 'Minha Redação'
    clearing.value = false
  }, 500)
}

async function submitEssay() {
  if (!auth.currentUser) return
  if (!canSubmit.value) return
  submitting.value = true
  const e = essays.add({ userId: auth.currentUser.id, title: title.value, content: content.value })
  // Simula correção por IA
  setTimeout(() => {
    const fb = {
      summary: 'Texto com boa argumentação, mas precisa revisar pontuação e coesão.',
      errors: [
        { start: 10, end: 15, message: 'Vírgula fora de lugar', type: 'Pontuação' },
        { start: 30, end: 35, message: 'Concordância verbal inadequada', type: 'Gramática' },
      ],
      suggestions: [
        'Revisar o uso de vírgulas em orações subordinadas.',
        'Utilizar conectivos para melhorar a coesão.',
      ],
      score: Math.round(600 + Math.random() * 400) / 100,
    }
    essays.updateFeedback(e.id, fb)
    feedback.value = fb
    auth.decrementCorrection()
    submitting.value = false
  }, 800)
}

// Autosave draft (debounced)
let timer
watch([title, content], () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    const draft = { title: title.value, content: content.value }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, 400)
})

onMounted(() => {
  const raw = localStorage.getItem(DRAFT_KEY)
  if (!raw) return
  try {
    const draft = JSON.parse(raw)
    if (draft.title) title.value = draft.title
    if (draft.content) content.value = draft.content
  } catch { }
})
</script>