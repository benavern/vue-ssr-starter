<template>
  <div id="app">
    <nav>
      <ul>
        <li v-for="menuItem in menu" :key="menuItem.path">
          <router-link :to="menuItem.path">{{ menuItem.name }}</router-link>
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<script>
  import Meta from 'mixins/meta'

  export default {
    mixins: [Meta],
    data () {
      return {
        menu: [
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]
      }
    }
  }
</script>

<style lang="scss">
html {
  font-size: 100%;
  font-family: sans-serif;
}
</style>

<style lang="scss" scoped>
#app {
  max-width: 640px;
  margin: 2rem auto 0;

  ul {
    list-style: none;
  }
}
</style>
