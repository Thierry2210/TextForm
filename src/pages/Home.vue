<template>
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-white to-blue-50"></div>
      <div class="absolute inset-0 -z-10">
        <svg class="h-full w-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Transforme suas ideias em
            <span class="text-primary-600">textos incríveis</span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            A plataforma inteligente que ajuda você a criar, editar e aprimorar seus textos com o poder da IA. 
            Escreva melhor, mais rápido e com mais confiança.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link
              to="/dashboard"
              class="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200"
            >
              Começar agora
            </router-link>
            <router-link
              to="/plans"
              class="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
            >
              Ver planos <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Por que escolher o TextFormers?
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Ferramentas poderosas para escritores, estudantes e profissionais
          </p>
        </div>
        
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Feature 1 -->
            <div class="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-x-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">IA Inteligente</h3>
              </div>
              <p class="mt-4 text-gray-600">
                Nossa IA avançada entende contexto e sugere melhorias precisas para seus textos.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-x-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Rápido e Eficiente</h3>
              </div>
              <p class="mt-4 text-gray-600">
                Edite e aprimore seus textos em segundos, não horas. Foque no que importa.
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-x-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.194.908 4.181 2.35 5.591.508.508.508 1.33 0 1.838l-2.35 2.35a1.5 1.5 0 01-1.838 0c-.508-.508-.508-1.33 0-1.838l2.35-2.35A6.003 6.003 0 015.25 4.236z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Múltiplos Formatos</h3>
              </div>
              <p class="mt-4 text-gray-600">
                Redações, artigos, emails, relatórios. Suporte para todos os tipos de texto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-primary-600">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Confiado por milhares de usuários
          </h2>
          <p class="mt-6 text-lg leading-8 text-primary-100">
            Junte-se à comunidade que já transformou sua escrita
          </p>
        </div>
        
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div class="text-center">
              <div class="text-4xl font-bold text-white">10K+</div>
              <div class="mt-2 text-primary-100">Usuários ativos</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-white">50K+</div>
              <div class="mt-2 text-primary-100">Textos melhorados</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-white">95%</div>
              <div class="mt-2 text-primary-100">Satisfação</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-white">24/7</div>
              <div class="mt-2 text-primary-100">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pronto para transformar sua escrita?
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Comece hoje mesmo e descubra como é fácil escrever textos incríveis com a ajuda da IA.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link
              to="/register"
              class="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200"
            >
              Criar conta gratuita
            </router-link>
            <router-link
              to="/login"
              class="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
            >
              Já tem conta? Entrar <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
// Component logic can be added here if needed
</script>