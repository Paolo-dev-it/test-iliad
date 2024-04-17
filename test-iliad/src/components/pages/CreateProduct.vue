<template>
    <layout-div>
        <div class="container">
            <nav class="navbar navbar-expand-lg nav-cust">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img class="logo" src="https://www.iliad.it/assets/images/logo.png" alt="Logo Iliad">
                    </a>
                    <div class="d-flex">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a @click="logoutAction()" class="nav-link text-danger" aria-current="page"
                                    href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <router-link :to="{ name: 'DashboardPage' }"
                    class="btn btn-blue btn-cust d-flex justify-content-center align-items-center fs-4 font-weight-bold mt-5"><i
                        class="bi bi-arrow-left-short"></i>
                </router-link>
            </div>
            <h2 class="text-center mt-5"><span class="text-danger">Crea</span> un nuovo prodotto</h2>
            <form @submit.prevent="createProduct">
                <div class="mb-3">
                    <label for="title" class="form-label">Titolo</label>
                    <input type="text" class="form-control" id="title" v-model="newProduct.title">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Descrizione</label>
                    <textarea class="form-control" id="description" v-model="newProduct.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Prezzo</label>
                    <input type="number" class="form-control" id="price" v-model="newProduct.price">
                </div>
                <div class="mb-3">
                    <label for="images" class="form-label">Immagine</label>
                    <input type="file" class="form-control" id="images" ref="fileInput" multiple @change="handleFileChange">
                </div>
                <button @click="createProduct()" type="submit" class="btn btn-blue">Crea un nuovo prodotto</button>


            </form>
        </div>
    </layout-div>
</template>

<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';

export default {
    name: 'CreateProduct',
    components: {
        LayoutDiv,
    },

    data() {
        return {
            newProduct: {
                title: '',
                description: '',
                price: 0,
                images: []
            },
        };
    },
    methods: {
        logoutAction() {
            axios.post('/api/logout', {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
                .then((r) => {
                    localStorage.setItem('token', "")
                    this.$router.push('/')
                    return r
                })
                .catch((e) => {
                    return e
                });
        },
        createProduct() {

            axios.post('https://dummyjson.com/products/add', this.newProduct, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(() => {
                    this.$router.push({ name: 'DashboardPage', query: { newProduct: 1 } });
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                });
        },
    },
};
</script>


<style scoped>
/* Stili CSS */
</style>
