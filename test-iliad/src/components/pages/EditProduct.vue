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
            <h2 class="text-center mt-5"><span class="text-danger">Modifica</span> il prodotto</h2>
            <form @submit.prevent="updateProduct">
                <div class="mb-3">
                    <label for="title" class="form-label">Titolo</label>
                    <input type="text" class="form-control" id="title" v-model="editedProduct.title">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Descrizione</label>
                    <textarea class="form-control" id="description" v-model="editedProduct.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Prezzo</label>
                    <input type="number" class="form-control" id="price" v-model="editedProduct.price">
                </div>
                <div class="mb-3">
                    <label for="images" class="form-label">Immagine</label>
                    <input type="file" class="form-control" id="images" ref="fileInput" multiple @change="handleFileChange">
                </div>
                <button type="submit" class="btn btn-blue">Salva le modifiche</button>
            </form>
        </div>
    </layout-div>
</template>

<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';

export default {
    name: 'EditProduct',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            editedProduct: {
                title: '',
                description: '',
                price: 0
            }
        };
    },

    created() {
        const productId = this.$route.params.id;
        if (!productId || isNaN(productId)) {
            // Se l'ID del prodotto non è definito o non è un numero valido, reindirizza l'utente alla pagina DashboardPage
            this.$router.push({ name: 'DashboardPage' });
        } else {
            // Altrimenti, effettua la chiamata API per ottenere i dettagli del prodotto
            this.fetchProduct(productId);
        }
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


        async fetchProduct(productId) {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${productId}`);
                this.editedProduct = response.data; // Assegna i dati ricevuti alla proprietà editedProduct
            } catch (error) {
                console.error(error);
                this.$router.push({ name: 'DashboardPage' });
            }
        },

        updateProduct() {
            const productId = this.$route.params.id;
            if (!productId || isNaN(productId)) {
                this.$router.push({ name: 'DashboardPage' });
                return;
            }

            if (this.isProductChanged()) {
                let { id, ...product } = this.editedProduct;
                axios.put(`https://dummyjson.com/products/${id}`, product)
                    .then(() => {

                        this.$router.push({ name: 'DashboardPage', query: { updateProduct: 1 } });
                    })
                    .catch((error) => {
                        console.error('Error updating product:', error);
                    });
            } else {
                console.log('No changes detected in the product.');
            }
        },





        isProductChanged() {
            // Verifica se ci sono modifiche nei dettagli del prodotto rispetto alla versione originale
            // Restituisce true se ci sono modifiche, altrimenti false
            // Esempio di implementazione:
            return (
                this.editedProduct.title !== '' &&
                this.editedProduct.description !== '' &&
                this.editedProduct.price !== 0
            );
        },
    }
};
</script>
