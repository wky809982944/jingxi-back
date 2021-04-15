import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '京西后台管理系统', icon: 'dashboard' }
    }]
  },
  {
    path: '/business/register',
    component: () => import('@/views/shop/register/index'),
    name: '商家注册',
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/manager',
    name: 'shop',
    meta: {
      roles:['merchants'],
      title: '商家模块',
      icon: 'el-icon-s-help' },
    children: [
      {
        path: 'manager',
        name: 'Manager',
        component: () => import('@/views/shop/manager'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'addNew',
        name: 'addNew',
        component: () => import('@/views/shop/addNew/index'),
        meta: { title: '新增商品', icon: 'tree' }
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('@/views/shop/form/index'),
        meta: { title: '报表模块', icon: 'tree' }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    meta:{
      roles:['admin'],
      title: '管理员模块'
    },
    children: [
      {
        path: 'index',
        name: 'shopsManager',
        component: () => import('@/views/admin/shopsManager/index'),
        meta: { title: '商家管理', icon: 'form' }
      },
      {
        path: 'exportForm',
        name: 'exportForm',
        component: () => import('@/views/admin/reportForm/index'),
        meta: { title: '报表模块', icon: 'form' }
      },
      {
        path: 'chart',
        name: 'chart',
        component: () => import('@/views/admin/chart/index'),
        meta: { title: '折线图模块', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
