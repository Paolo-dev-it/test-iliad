<template>
    <layout-div>
        <div class="row justify-content-md-center pt-5 pb-5">
            <div class="col-md-4">
                <div class="card no-border">
                    <div class="card-body">
                        <h2 class="card-title mb-4 reg">Registrati</h2>
                        <form @submit.prevent="registerAction">
                            <div class="mb-3">
                                <label htmlFor="name" class="form-label">Nome
                                </label>
                                <input type="text" class="form-control" id="name" name="name" v-model="name" />
                                <div v-if="validationErrors.name" class="flex flex-col">
                                    <small class="text-danger">
                                        {{ validationErrors?.name[0] }}
                                    </small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="surname" class="form-label">Cognome
                                </label>
                                <input type="text" class="form-control" id="surname" name="surname" v-model="surname" />
                                <div v-if="validationErrors.surname" class="flex flex-col">
                                    <small class="text-danger">
                                        {{ validationErrors?.surname[0] }}
                                    </small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="birthdate" class="form-label">Data di nascita
                                </label>
                                <input type="date" class="form-control" id="birthdate" name="birthdate"
                                    v-model="birthdate" />
                                <div v-if="validationErrors.birthdate" class="flex flex-col">
                                    <small class="text-danger">
                                        {{ validationErrors?.birthdate[0] }}
                                    </small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="city_of_birth" class="form-label">Città di nascita
                                </label>
                                <input type="text" class="form-control" id="city_of_birth" name="city_of_birth"
                                    v-model="city_of_birth" />
                                <div v-if="validationErrors.city_of_birth" class="flex flex-col">
                                    <small class="text-danger">
                                        {{ validationErrors?.city_of_birth[0] }}
                                    </small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="tax_code" class="form-label">Codice fiscale
                                </label>
                                <input type="text" class="form-control" id="tax_code" name="tax_code" v-model="tax_code" />
                                <div v-if="validationErrors.tax_code" class="flex flex-col">
                                    <small class="text-danger">
                                        {{ validationErrors?.tax_code[0] }}
                                    </small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="gender" class="form-label">Genere
                                </label>
                                <select class="form-select" id="gender" name="gender" v-model="gender">
                                    <option value="male">Uomo</option>
                                    <option value="female">Donna</option>
                                    <option value="female">Preferisco non dirlo</option>
                                </select>
                                <div v-if="validationErrors.gender" class="flex flex-col">
                                    <small class="text-danger">
                                        {{ validationErrors?.gender[0] }}
                                    </small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="email" class="form-label">Indirizzo email
                                </label>
                                <input type="email" class="form-control" id="email" name="email" v-model="email" />
                                <div v-if="validationErrors.email" class="flex flex-col">
                                    <small class="text-danger">
                                        {{ validationErrors?.email[0] }}
                                    </small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="password" class="form-label">Password
                                </label>
                                <input type="password" class="form-control" id="password" name="password"
                                    v-model="password" />
                                <div v-if="validationErrors.password" class="flex flex-col">
                                    <small class="text-danger">
                                        {{ validationErrors?.password[0] }}
                                    </small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="confirm_password" class="form-label">Conferma Password
                                </label>
                                <input type="password" class="form-control" id="confirm_password" name="confirm_password"
                                    v-model="confirmPassword" />
                            </div>
                            <div class="d-grid gap-2">
                                <button :disabled="isSubmitting" type="submit" class="btn btn-danger btn-block">Registrati
                                    ora</button>
                                <p class="text-center">Hai già un account? <router-link to="/">Login</router-link>
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
    name: 'RegisterPage',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            name: '',
            surname: '',
            birthdate: '',
            city_of_birth: '',
            tax_code: '',
            gender: 'male',
            email: '',
            password: '',
            confirmPassword: '',
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
        registerAction() {
            this.isSubmitting = true
            let payload = {
                name: this.name,
                surname: this.surname,
                birthdate: this.birthdate,
                city_of_birth: this.city_of_birth,
                tax_code: this.tax_code,
                gender: this.gender,
                email: this.email,
                password: this.password,
                password_confirmation: this.confirmPassword
            }
            axios.post('/api/register', payload)
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
                    return error
                });
        }
    },
};
</script>

<style scoped>
.no-border {
    border: none;
    background-color: #F5F5F5;
}

.reg {
    color: red;
}
</style>