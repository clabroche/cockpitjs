<template>
  <div class="projects-root">
    <div class="header">
      <input type="text" v-model="filter" placeholder="Filter...">
      {{projects.length}} projects
    </div>
    <div class="projects">
      <div class="project plus">
        <i class="fas fa-plus" title="Import" @click="$router.push({name: 'import'})"></i>
      </div>
      <div class="project" v-for="project of filteredProjects" :key="project.path" @click="$router.push({name: 'project', params: {projectPath: project.path}})">
        <div class="head" v-if="project.packageJSON">
          <project-digest :project="project"></project-digest>
        </div>
        <div class="content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PromiseB from 'bluebird'
import sort from 'fast-sort'
import fs from '../models/fs'
import ProjectDigestVue from './ProjectDigest.vue';
export default {
  name: 'projects',
  components: {
    'project-digest': ProjectDigestVue
  },
  props: {
  },
  data() {
    return {
      projects: [],
      filter: ''
    }
  },
  computed: {
    filteredProjects() {
      let projects = []
      if(this.filter) {
        projects = this.projects.filter(project =>  project.name ? project.name.toUpperCase().includes(this.filter.toUpperCase()) : false)
      } else {
        projects = this.projects
      }
      return sort(projects).asc('name')
    }
  },
  async mounted() {
    this.projects = []
    const local = localStorage.getItem('projectsPath')
    const existingPath = local ? JSON.parse(local) : []
    await PromiseB.map(existingPath, async path => {
      const npmInfos = await fs.import(path).catch(err => {console.error(err)})
      if(npmInfos) {
        this.projects.push(npmInfos)
      }
    }, {concurrency: 5})
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.projects-root {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.header {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    margin-right: 10px;
    padding: 5px;
  }
}
.projects {
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .project {
    overflow: hidden;
    width: 400px;
    background-color: #494e60;
    margin: 10px;
    padding: 20px;
    border-radius: 5px;
    color: #FFFFFF;
    transition: 300ms;
    &:hover {
      transform: scale(1.03);
      cursor: pointer;
    }
    .path {
      color: #959595;
      margin-bottom: 10px;
    }
    &.plus {
      background-color: transparent;
      i {
        width: 100px;
        height: 100px;
        border: 2px dashed white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        transition: 300ms;
        cursor: pointer;
        &:hover {
          transform: scale(1.1)
        }
      }
    }
    .head {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
