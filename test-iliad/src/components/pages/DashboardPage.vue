<template>
    <layout-div>
        <div class="row justify-content-md-center bg">
            <div class="col-12">
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
                <h5 class="text-end mt-5">Benvenuto, {{ user?.name }}!</h5>
                <div v-if="products.length > 0" class="mt-4">
                    <div class="d-flex justify-content-end m-5">
                        <router-link :to="{ name: 'CreateProduct', params: { products: products } }"
                            class="btn btn-danger btn-cust d-flex justify-content-center align-items-center"><i
                                class="bi bi-plus"></i></router-link>


                    </div>
                    <h3 class="text-center">Prodotti acquistabili sul nostro sito:</h3>

                    <!-- <CreateProduct :createProduct="createProduct" /> -->
                    <div class="row">
                        <div v-for="product in  products " :key="product.id" class="col-md-4 mb-4">
                            <div class="card min-height border-cust">
                                <div class="card-body py-4 text-start">
                                    <img class="prod-dim" :src="product.images[0]">
                                    <div class="px-4">
                                        <h5 class="card-title mt-4">{{ product.title }}</h5>
                                        <p class="card-text">{{ product.description }}</p>
                                        <p class="card-text">Price: ${{ product.price }}</p>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <router-link :to="{ name: 'EditProduct', params: { id: product.id } }"
                                            class="btn btn-light">
                                            <i class="bi bi-pencil"></i>
                                        </router-link>
                                        <button @click="deleteProduct(product.id)" class="btn btn-light"><i
                                                class="bi bi-trash3"></i></button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </layout-div>
</template>


<script >

import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import "bootstrap-icons/font/bootstrap-icons.css";


export default {
    name: 'DashboardPage',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            user: {},
            products: [],
            newProduct: {
                title: '',
                description: '',
                price: 0,
                images: [],
            },
            editedProduct: null,
        };
    },
    created() {
        this.getUser();
        if (this.$route.params.updatedProductId) {
            this.getProducts(); // Rifetch dei prodotti solo se è stato aggiornato un prodotto
        }
        if (this.$route.query.newProduct == 1) {
            alert('prodotto aggiunto')
        }
        if (this.$route.query.updateProduct == 1) {
            alert('prodotto aggiornato')
        }
    },

    mounted() {
        if (!localStorage.getItem('token')) {
            this.$router.push('/');
        } else {
            this.getProducts();
        }
    },

    beforeRouteUpdate(to, from, next) {
        // Controlla se il nome della route è DashboardPage e se è presente un updatedProductId nei parametri della route
        if (to.name === 'DashboardPage' && to.params.updatedProductId) {
            this.getProducts();
            // Aggiorna l'elenco dei prodotti
        }
        next(); // Chiamare next() per proseguire la navigazione
    },



    methods: {

        getUser() {
            axios.get('/api/user', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
                .then((r) => {
                    this.user = r.data;
                    return r
                })
                .catch((e) => {
                    return e
                });
        },

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

        getProducts() {
            axios.get('https://dummyjson.com/products')
                .then((response) => {
                    this.products = response.data.products;

                    return response;
                })
                .catch((error) => {
                    console.error(error);
                    return error;
                });
        },


        editProduct(product) {
            this.$router.push({ name: 'EditProduct', params: { id: product.id } });
        },




        deleteProduct(id) {
            axios.delete(`https://dummyjson.com/products/${id}`)
                .then(() => {
                    // Aggiorna l'elenco dei prodotti dopo l'eliminazione
                    this.products = this.products.filter(product => product.id !== id);
                    // console.log(this.products);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

    },
};
</script>

<style>
.logo {
    width: 50px;
}

.prod-dim {
    width: 100%;
    height: 200px;
    object-fit: contain;
}

.nav-cust {
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid red;
    border-radius: 30px;

}

.btn-cust {
    width: 30px;
    height: 30px;
    border-radius: 30px;
}

.bg {
    background-color: rgb(249, 247, 244);
}

.min-height {
    min-height: 480px;
}

.border-cust {
    border: none;

}
</style>