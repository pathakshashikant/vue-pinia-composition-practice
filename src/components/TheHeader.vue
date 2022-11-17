<script >
// imports
import CartWidget from './CartWidget.vue';
import { useAuthStore } from '../store/authStore';
import { mapState, mapWritableState, mapActions } from 'pinia';
export default {
  components: { CartWidget },
  computed: {
    // ...mapState(useAuthStore,["userName"])
    ...mapState(useAuthStore, {
      user: "userName"
    })

    //  ...mapState(useAuthStore, {
    //     user:store=>`hello ${store.userName}`
    //   })
    //  ...mapWritableState(useAuthStore, {
    //   user:"userName"
    // })
  },
  methods: {
    ...mapActions(useAuthStore, ["visitTwitterProfile"])
  }
}
</script>

<template>
  <header class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')">
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
      <!-- <input v-model="user" type="text" > -->
      <span class="mr-5 items-center" @click="visitTwitterProfile">{{ user }}</span>
      <CartWidget />

    </div>

  </header>
</template>