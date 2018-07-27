const meta = require('../router/meta.json')
const defaultMeta = {
  title: 'Default title',
  description: 'Default description',
  keywords: 'Default keywords'
}
export default {
  watch: {
    '$route' () {
      this.setMeta()
    }
  },

  created () {
    if (process.env.VUE_ENV === 'client') return

    const routeMeta = meta[this.$route.path] || {}
    const metaData = Object.assign({}, defaultMeta, routeMeta)

    this.$ssrContext.title = metaData.title
    this.$ssrContext.description = metaData.description
    this.$ssrContext.keywords = metaData.keywords
  },

  mounted () {
    this.setMeta()
  },

  methods: {
    setMeta () {
      if (typeof document === 'undefined') return

      const routeMeta = meta[this.$route.path] || {}
      const metaData = Object.assign({}, defaultMeta, routeMeta)

      document.title = metaData.title
      document.querySelector('meta[name="description"]').setAttribute('content', metaData.description)
      document.querySelector('meta[name="keywords"]').setAttribute('content', metaData.keywords)
    }
  }
}
