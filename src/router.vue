<script>
  import Vue from 'vue'
  import Router from 'vue-router'
import ExplorerVue from './components/Explorer.vue';
import ProjectsVue from './components/Projects.vue';
import ProjectVue from './components/Project.vue';
  
  Vue.use(Router)
  
  export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        redirect: {name: 'projects'}
      },
      {
        path: '/projects',
        name: 'projects',
        component: ProjectsVue
      },
      {
        path: '/import',
        name: 'import',
        component: ExplorerVue
      },
      {
        path: '/project/:projectPath',
        name: 'project',
        component: ProjectVue
      }
    ]
  })

</script>
