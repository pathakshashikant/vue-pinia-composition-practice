import { defineStore, acceptHMRUpdate } from 'pinia'
import { groupBy } from 'lodash'
import { useLocalStorage } from '@vueuse/core';
import { useAuthStore } from './authStore';

export const useCartStore = defineStore('cartStore', {
    historyEnabled: true,
    state: () => {
        return {
            items: useLocalStorage("CartStore:items", []),
        };
    },

    getters: {
        count() {
            return this.items.length;
        },
        // isEmpty() {
        //     return !this.items.length
        // }

        //using arrow function
        isEmpty: (state) => !state.items.length,

        grouped: (state) => {
            const grouped = groupBy(state.items, item => item.name)
            const sorted = Object.keys(grouped).sort()
            let inOrder = {}
            sorted.forEach(key => inOrder[key] = grouped[key])
            return inOrder
        },

        //dynamic getters which rather returning a value, a function returns the value.
        groupCount: (state) => (name) => state.grouped[name].length,

        totalPrice: (state) => state.items.reduce((initial, val) => initial + val.price, 0)
    },

    actions: {
        addItems(count, item) {
            console.log(item)
            count = parseInt(count)

            for (let index = 0; index < count; index++) {
                this.items.push({ ...item })
            }
        },
        clearCartItem(name) {
            this.items = this.items.filter((val) => val.name !== name)
        },
        setItemCount(item, count) {
            this.clearCartItem(item.name)
            this.addItems(count, item)
        },
        checkout() {
            const authStore = useAuthStore()
            alert(`${authStore.userName} just bought ${this.count} items at total of ${this.totalPrice}`)
        }
    }
})


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}