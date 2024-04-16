<template>
    <layout-div>
        <div class="container">
            <h2 class="text-center mt-5">Create New Product</h2>
            <form @submit.prevent="createProduct">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="newProduct.title">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" v-model="newProduct.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control" id="price" v-model="newProduct.price">
                </div>
                <div class="mb-3">
                    <label for="images" class="form-label">Images</label>
                    <input type="file" class="form-control" id="images" ref="fileInput" multiple @change="handleFileChange">
                </div>
                <button @click="createProduct()" type="submit" class="btn btn-primary">Create Product</button>


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
