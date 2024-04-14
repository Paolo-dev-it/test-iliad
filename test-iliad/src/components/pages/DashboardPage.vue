<template>
    <layout-div>
        <div class="row justify-content-md-center">
            <div class="col-12">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Dashboard</a>
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
                    <div class="row">
                        <div v-for="product in products[0]" :key="product.id" class="col-md-4 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <img :src="product.images" class="card-img-top" alt="Product Thumbnail">
                                    <h5 class="card-title">{{ product.title }}</h5>
                                    <p class="card-text">{{ product.description }}</p>
                                    <p class="card-text">Price: ${{ product.price }}</p>
                                    <a href="#" class="btn btn-primary">View Details</a>
                                </div>
                            </div>

                        </div>
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
    name: 'DashboardPage',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            user: {},
            products: [],
        };
    },
    created() {
        this.getUser();
    },
    mounted() {
        if (!localStorage.getItem('token')) {
            this.$router.push('/');
        } else {
            this.getProducts();
        }
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
                    this.products = Object.values(response.data);
                    console.log(this.products);
                    return response;

                })
                .catch((error) => {
                    console.error(error);
                    return error;
                });
        },

    },
};
</script>