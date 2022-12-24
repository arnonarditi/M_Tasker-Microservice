<template>
  <section class="social-media flex align-center justify-center">
    <button
      v-for="(social, idx) in socials"
      :key="idx"
      :class="social.icon"
      @click="navigateTo(social.link)"
    ></button>
  </section>
</template>

<script>
export default {
  name: 'social-media',
  data() {
    return {
      socials: [
        {
          link: 'facebook',
          icon: 'fa-brands fa-square-facebook',
        },
        {
          link: 'linkedIn',
          icon: 'fa-brands fa-linkedin',
        },
        {
          link: 'twitter',
          icon: 'fa-brands fa-square-twitter',
        },
        {
          link: 'github',
          icon: 'fa-brands fa-square-github',
        },
      ],
    }
  },
  methods: {
    navigateTo(link) {
      console.log('link:', link)
    },
  },
}
</script>

<style></style>
