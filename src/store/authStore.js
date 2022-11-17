import { defineStore } from 'pinia'


export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            // userName: "shashikantpathakk"
        }
    },
    getters: {
        userName: () => "shashikantpathakk"
    },
    actions: {
        visitTwitterProfile() {
            window.open('https://twitter.com')
        }
    }
})