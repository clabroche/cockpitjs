<template>
  <div class="project-digest-root">
    <div v-if="project">
      <div class="name">{{project.name}}</div>
      <div class="path">{{project.path}}</div>
      <div class="digest-line">
        <div class="icon" title="Author"><i class="fas fa-user"></i>{{project.author || 'unknown'}}</div>
        <div class="icon" title="Version"><i class="fas fa-code-branch"></i>{{project.version || 'unknown'}}</div>
        <div class="icon" title="Scripts"><i class="fas fa-scroll"></i>{{nbScripts(project)}}</div>
        <div class="icon" title="Dependencies"><i class="fas fa-file-code"></i>{{nbDependencies(project)}}</div>
        <div class="icon" title="Dev-dependencies"><i class="far fa-file-code"></i>{{nbDevDependencies(project)}}</div>
      </div>
    </div>
    <div v-else>
      Project not loaded...
    </div>
  </div>
</template>

<script>
export default {
  name: 'projec-digestt',
  props: {
    project: null
  },
  methods: {
    nbDependencies(project) {
      if(project&& project.packageJSON && project.packageJSON.dependencies) {
        return Object.keys(project.packageJSON.dependencies).length
      } else {
        return 0
      }
    },
    nbDevDependencies(project) {
      if(project&& project.packageJSON && project.packageJSON.dependencies) {
        return Object.keys(project.packageJSON.dependencies).length
      } else {
        return 0
      }
    },
    nbScripts(project) {
      if(project&& project.packageJSON && project.packageJSON.scripts) {
        return Object.keys(project.packageJSON.scripts).length
      } else {
        return 0
      }
    }
  }
}
</script>

<style scoped lang="scss">
.digest-line {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.icon {
  display: flex;
  align-items: center;
  i {
    flex-shrink: 0;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    border: 1px solid white;
  }
}
.path {
  margin-bottom: 20px;
}
.name {
  font-size: 1.7em;
  display: flex;
}
.logo {
  padding: 10px;
  position: absolute;
}
</style>
