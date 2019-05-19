<template>
  <div class="project-root">
    <div class="sidebar">
      <div class="item" @click="currentCategory = 'dashboard'" :class="{active: currentCategory === 'dashboard'}">
        <i class="fas fa-tachometer-alt"></i>Dashboard
      </div>
      <div class="item" @click="currentCategory = 'scripts'" :class="{active: currentCategory === 'scripts'}">
        <i class="fas fa-scroll"></i>Scripts

      </div>
      <div class="item" @click="currentCategory = 'dependencies'" :class="{active: currentCategory === 'dependencies'}">
        <i class="fas fa-project-diagram"></i>Dependencies
      </div>
      <div class="item" @click="currentCategory = 'devDependencies'" :class="{active: currentCategory === 'devDependencies'}">
        <i class="fas fa-project-diagram"></i>Devdependencies
      </div>
    </div>
    <div class="project-content">
      <div class="dashboard-content" v-if="currentCategory === 'dashboard'">
        <project-digest :project="project"></project-digest>
      </div>
      <div class="category-container" v-if="currentCategory === 'scripts'">
        <h1>Scripts</h1>
        <div class="scripts-container">
          <div v-for="script of filteredScripts" class="dependency-line" :key="script.name">
            <div class="svg-icon" v-html="createIdenticon(script.name)"></div>
            <div class="infos">
              <div class="name">{{script.name}}</div>
              <div class="description">
                <div class="version">{{script.cmd}}</div>
              </div>
            </div>
            <div class="actions">
            </div>
          </div>
        </div>
      </div>
      <div class="category-container" v-if="currentCategory === 'dependencies'">
        <div class="header">
          <h1>Dependencies</h1>
          <div class="digest" v-if="filteredDependencies.length">
            {{filteredDependencies.length}} dependencies / 
            <span v-if="!outdatedLoading">
              {{Object.keys(outdated).length}}  outdated
            </span>
            <span v-else>
              <i class="fas fa-spinner"></i> outdated
            </span>
          </div>
        </div>
        <div class="scripts-container">
          <div v-for="dependency of filteredDependencies" class="dependency-line" :class="{outdated: isOutdated(dependency)}" :key="dependency.name">
            <div class="svg-icon" v-html="createIdenticon(dependency.name)"></div>
            <div class="infos">
              <div class="name">{{dependency.name}}</div>
              <div class="description">
                <div class="version" v-if="outdated[dependency.name]">Current: {{outdated[dependency.name].current}}</div>
                <div class="version" v-else>Current: {{dependency.version}}</div>
                <div class="version" v-if="outdated[dependency.name]">Wanted: {{outdated[dependency.name].wanted}}</div>
                <div class="version" v-if="outdated[dependency.name]">Last:  {{outdated[dependency.name].latest}}</div>
              </div>
            </div>
            <div class="actions">
            </div>
          </div>
        </div>
      </div>
      <div class="category-container" v-if="currentCategory === 'devDependencies'">
        <h1>Devdependencies</h1>
        <div class="scripts-container">
          <div v-for="dependency of filteredDevDependencies" class="dependency-line" :class="{outdated: isOutdated(dependency)}" :key="dependency.name">
            <div class="svg-icon" v-html="createIdenticon(dependency.name)"></div>
            <div class="infos">
              <div class="name">{{dependency.name}}</div>
              <div class="description">
                <div class="version" v-if="outdated[dependency.name]">Current: {{outdated[dependency.name].current}}</div>
                <div class="version" v-else>Current: {{dependency.version}}</div>
                <div class="version" v-if="outdated[dependency.name]">Wanted: {{outdated[dependency.name].wanted}}</div>
                <div class="version" v-if="outdated[dependency.name]">Last:  {{outdated[dependency.name].latest}}</div>
              </div>
            </div>
            <div class="actions">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fs from '../models/fs';
import ProjectDigestVue from './ProjectDigest.vue';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-identicon-sprites';
export default {
  name: 'project',
  components: {
    'project-digest': ProjectDigestVue
  },
  props: {
  },
  data() {
    return {
      project: null,
      currentCategory: 'dashboard',
      outdated: {},
      outdatedLoading: false
    }
  },
  computed: {
    filteredDependencies() {
      if(!this.project.packageJSON.dependencies) return []
      return Object.keys(this.project.packageJSON.dependencies).map(key => {
        return {
          name: key,
          version: this.project.packageJSON.dependencies[key]
        }
      })
    },
    filteredScripts() {
      if(!this.project.packageJSON.scripts) return []
      return Object.keys(this.project.packageJSON.scripts).map(key => {
        return {
          name: key,
          cmd: this.project.packageJSON.scripts[key]
        }
      })
    },
    filteredDevDependencies() {
      if(!this.project.packageJSON.devDependencies) return []
      return Object.keys(this.project.packageJSON.devDependencies).map(key => {
        return {
          name: key,
          version: this.project.packageJSON.devDependencies[key]
        }
      })
    },
  },
  async mounted() {
    this.outdatedLoading = true
    await this.loadProject()
    this.outdated = await fs.outdated(this.project.path)
    this.outdatedLoading = false
  },
  methods: {
    createIdenticon(name) {
      let avatars = new Avatars(sprites({}))
      return avatars.create(name)
    },
    isOutdated(dependency) {
      if(dependency && this.outdated && this.outdated[dependency.name] && this.outdated[dependency.name].current) {
        return true
      } else {
        return false
      }
    },
    async loadProject() {
      if(this.$route.params.projectPath) {
        this.project = await fs.import(this.$route.params.projectPath)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.project-root {
  display: flex;
  height: 100%;
  .sidebar {
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.2);
    height: 100%;
    width: 200px;
    .item {
      padding: 20px;
      display: flex;
      transition: 300ms;
      cursor: pointer;
      &:hover {
        background-color: rgba(0,0,0,0.2);
      }
      &.active {
        background-color: #41a491;
        cursor: normal;
      }
      i {
        margin-right: 10px;
      }
    }
  }
  .project-content {
    width: 80%;
    margin: auto;
    background-color: #494e60;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
    .category-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between
      }
      .scripts-container {
        overflow: auto;
      }
    }
    .head {
      font-size: 1.3em
    }
    .dependency-line {
      display: flex;
      padding: 5px;
      align-items: center;
      justify-content: space-between;
      border-left: 5px solid transparent;
      &.outdated {
        border-left: 5px solid red
      }
      .infos {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .description {
          font-size: 0.9em;
          color: #8b9cd3;
          display: flex;
          align-items: center;
          .version {
            margin-right: 10px;
          }
        }
      }
      .svg-icon {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        overflow: hidden;
      }
    }
  }

  .fa-spinner {
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }

}
@keyframes spin {
  0% {
    transform: rotateZ(0)
  }
  100% {
    transform: rotateZ(360deg)
  }
}
</style>
