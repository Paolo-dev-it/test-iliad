<template>
    <layout-div>
        <div class="row justify-content-md-center">
            <div class="col-12">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img class="logo" src="https://www.iliad.it/assets/images/logo.png" alt="Logo Iliad">
                        </a>
                        <div class="d-flex">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a @click="logoutAction()" class="nav-link " aria-current="page" href="#">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <h2 class="text-center mt-5">Welcome, {{ user?.name }}!</h2>
                <div v-if="products.length > 0" class="mt-4">
                    <h3 class="text-center">Products</h3>
                    <router-link :to="{ name: 'CreateProduct', params: { products: products } }" class="btn btn-success">Add
                        Product</router-link>
                    <CreateProduct :addProduct="addProduct" />
                    <div class="row">
                        <div v-for="product in  products " :key="product.id" class="col-md-4 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <img class="prod-dim" :src="product.images[0]">
                                    <h5 class="card-title">{{ product.title }}</h5>
                                    <p class="card-text">{{ product.description }}</p>
                                    <p class="card-text">Price: ${{ product.price }}</p>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <router-link :to="{ name: 'EditProduct', params: { id: product.id } }"
                                        class="btn btn-success">Edit Product</router-link>
                                    <button @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </layout-div>
</template>

<style scoped>
.logo {
    width: 50px;
}

.prod-dim {
    width: 200px;
    height: 200px;
    object-fit: contain;
}
</style>
  
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';

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
            this.getProducts(); // Aggiorna l'elenco dei prodotti
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

        addProduct() {
            console.log("ciaooo")
            axios.post('https://dummyjson.com/products', this.newProduct)
                .then((response) => {
                    this.products.push(response.data);
                    this.newProduct = {
                        title: '',
                        description: '',
                        price: 0,
                        images: [],
                    };
                })
                .catch((error) => {
                    console.error(error);
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