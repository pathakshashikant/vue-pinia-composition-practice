<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

import { useProductStore } from "./store/productStore";
import { useCartStore } from "./store/cartStore"

import { ref } from 'vue'
// import FormValidation from "./components/FormValidation.vue";


const productStore = useProductStore();
const cartStore = useCartStore();

const colors = ref(['blue', 'red', 'green'])
const show = ref(true)




//useful to catch error, log error, show notifications as sideeffect of any actions.
cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === "addItems") {
    after(() => {
      console.log(args[0])
    });
    onError((error) => {
      console.log(error)
    })
  }
})


// const addItemstoCart = (count,products) => {



//   // //patching multiple mutations together into a single patch.
//   // //This is direct mutation
//   // cartStore.$patch(state => {
//   //     for (let index = 0; index < itemCount; index++) {
//   //   state.items.push(products)
//   // }

//   // })
// }


///loads data asynchronously when component loaded
productStore.fill();



// const vColor = (el, binding) => {
//   const colors = binding.value
//   let i = 0;

//   const speedargs = {
//     normal: 100,
//     fast: 500,
//     crazy: 800
//   }

//   console.log(binding.arg)
//   console.log(binding.modifiers)

//   if (binding.modifiers.underline) {
//     el.style.textDecoration = 'underline'
//   }
//   if (binding.modifiers.italic) {
//     el.style.fontStyle = 'italic'
//   }


//   const speedName = binding.arg || 'normal'

//   const speed = speedargs[speedName]
//   setInterval(() => {
//     el.style.color = colors[i];
//     i++;
//     if (i === colors.length) {
//       i = 0
//     }
//   }, speed);

// }


//This make sure to run the directives only in specific directive life cycle hooks.
const vColor = {
  mounted(el, binding) {

    const colors = binding.value
    let i = 0;

    const speedargs = {
      normal: 100,
      fast: 500,
      crazy: 800
    }

    console.log(binding.arg)
    console.log(binding.modifiers)

    if (binding.modifiers.underline) {
      el.style.textDecoration = 'underline'
    }
    if (binding.modifiers.italic) {
      el.style.fontStyle = 'italic'
    }


    const speedName = binding.arg || 'normal'

    const speed = speedargs[speedName]
    el.__ColorInterval__ = setInterval(() => {
      console.log(binding.arg)
      el.style.color = colors[i];
      i++;
      if (i === colors.length) {
        i = 0
      }
    }, speed);

  },

  unmounted(el) {
    clearInterval(el.__ColorInterval__)
  }

}

setTimeout(() => {
  colors.value.push('yellow')
}, 500)


const handleClickOutside = () => {
  alert('you clicked outside')
}

// const vClickOutside = {
//   mounted(el, binding) {
//     el.__ClickOutSideHandler__ = (event) => {
//       if (!(el == event.target || el.contains(event.target))) {
//         binding.value(event)
//       }
//     }
//     document.body.addEventListener("click", el.__ClickOutSideHandler__)

//   },
//   unmounted(el) {
//     document.body.removeEventListener("click", el.__ClickOutSideHandler__)

//   }
// }

const toolTipText = ref("Hello World Sir")

</script>

<template>
  <div class="container">
    <!-- <FormValidation /> -->

    <h3>Custom Vuejs 3 Plugin</h3>
    <span>Hover Over Me
      <input v-model="toolTipText" />
      <ToolTip :text="toolTipText" :options="{ placement: 'right' }" />
    </span>

    <div>
      <h2>Click Outside</h2>
      <div v-click-outside="handleClickOutside" class="w-36 h-20 border border-black">The Content is written here</div>
    </div>

    <TheHeader />
    <div v-if="show" v-color:crazy.underline.italic="colors" @click="cartStore.undo">Undo</div>
    <div @click="cartStore.redo">Redo</div>

    <div @click="show = !show">Toggle</div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event, product)" />
    </ul>
  </div>
</template>
