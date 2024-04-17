<template>
    <layout-div>

        <div class="row justify-content-md-center pt-5 bg">
            <div class="col-md-4">
                <div class="card no-border bg">
                    <div class="card-body">
                        <h2 class="card-title mb-4">Accedi alla tua <br><span class="area-personale">area personale</span>
                        </h2>
                        <form>
                            <p v-if="Object.keys(validationErrors).length != 0" class='text-center '><small
                                    class='text-danger'>Incorrect Email or Password</small></p>
                            <div class="mb-3">
                                <label htmlFor="email" class="form-label">
                                    Email
                                </label>
                                <input v-model="email" type="email" class="form-control" id="email" name="email" />
                            </div>
                            <div class="mb-4">
                                <label htmlFor="password" class="form-label">Password
                                </label>
                                <input v-model="password" type="password" class="form-control" id="password"
                                    name="password" />
                            </div>
                            <div class="d-grid gap-2">
                                <button :disabled="isSubmitting" @click="loginAction()" type="button"
                                    class="btn btn-danger btn-block">Login</button>
                                <p class="text-center">Non hai un account?
                                    <router-link to="/register">Registrati! </router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>



    </layout-div>
</template>
  
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';

export default {
    name: 'LoginPage',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            email: '',
            password: '',
            validationErrors: {},
            isSubmitting: false,
        };
    },
    created() {
        if (localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
            this.$router.push('/dashboard')
        }
    },
    methods: {
        loginAction() {
            this.isSubmitting = true
            let payload = {
                email: this.email,
                password: this.password,
            }
            axios.post('/api/login', payload)
                .then(response => {
                    localStorage.setItem('token', response.data.token)
                    this.$router.push('/dashboard')
                    return response
                })
                .catch(error => {
                    this.isSubmitting = false
                    if (error.response.data.errors != undefined) {
                        this.validationErrors = error.response.data.errors
                    }
                    if (error.response.data.error != undefined) {
                        this.validationErrors = error.response.data.error
                    }
                    return error
                });
        }
    },
};
</script>

<style scoped>
.no-border {
    border: none;
}

.area-personale {
    color: red;
}
</style>