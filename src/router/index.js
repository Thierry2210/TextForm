import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

// Lazy loading dos componentes
const Home = () =>
    import('../pages/Home.vue')
const Login = () =>
    import('../pages/auth/Login.vue')
const Register = () =>
    import('../pages/auth/Register.vue')
const ForgotPassword = () =>
    import('../pages/auth/ForgotPassword.vue')
const Dashboard = () =>
    import('../pages/Dashboard.vue')
const Essay = () =>
    import('../pages/Essay.vue')
const Plans = () =>
    import('../pages/Plans.vue')
const History = () =>
    import('../pages/History.vue')
const Admin = () =>
    import('../pages/admin/Admin.vue')

const routes = [
    { path: '/', name: 'home', component: Home, meta: { public: true } },
    { path: '/login', name: 'login', component: Login, meta: { public: true } },
    { path: '/register', name: 'register', component: Register, meta: { public: true } },
    { path: '/forgot', name: 'forgot', component: ForgotPassword, meta: { public: true } },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/essay', name: 'essay', component: Essay },
    { path: '/plans', name: 'plans', component: Plans },
    { path: '/history', name: 'history', component: History },
    { path: '/admin', name: 'admin', component: Admin, meta: { requiresAdmin: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Configurações adicionais para melhor UX
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Guard de navegação global
router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    // Rotas públicas não precisam de autenticação
    if (to.meta.public) {
        return next()
    }

    // Verificar se o usuário está autenticado
    if (!auth.isAuthenticated) {
        return next({
            name: 'login',
            query: { redirect: to.fullPath }
        })
    }

    // Verificar se a rota requer privilégios de admin
    if (to.meta.requiresAdmin) {
        if (!auth.currentUser || !auth.currentUser.isAdmin) {
            // Redirecionar para dashboard se não for admin
            return next({ name: 'dashboard' })
        }
    }

    next()
})

export default router