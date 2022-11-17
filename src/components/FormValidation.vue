
<template>
    <div :class="{ error: v$.firstName.$errors.length }">
        <input v-model="state.firstName">
        <div v-for="error of v$.firstName.$errors" :key="error.$uid" class="input-errors">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            contact: {
                email: ''
            }
        }
    },
    validations() {
        return {
            firstName: { required }, // Matches this.firstName
            lastName: { required }, // Matches this.lastName
            contact: {
                email: { required, email } // Matches this.contact.email
            }
        }
    }
}

</script>

