<template>
  <section>
    <h1>map</h1>
    <GoogleMap
      api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="10"
    >
      <Marker
        v-for="(m, idx) in markers"
        :options="m"
        @click="center = m.position"
        :key="idx"
      />
    </GoogleMap>
  </section>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'

export default {
  name: 'app-map',
  props: {},
  components: { GoogleMap, Marker },
  data() {
    return {
      center: { lat: 31.7683, lng: 35.2137 },
      markers: [
        {
          title: 'Tel-Aviv',
          label: 'TLV',
          position: { lat: 32.0853, lng: 34.7818 },
        },
        {
          title: 'Jerusalem',
          position: { lat: 31.7683, lng: 35.2137 },
        },
        {
          title: 'Rehovot',
          position: { lat: 31.8928, lng: 34.8113 },
        },
      ],
    }
  },
}
</script>
