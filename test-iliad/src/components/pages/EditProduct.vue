<template>
    <layout-div>
        <div class="container">
            <h2 class="text-center mt-5">Edit Product</h2>
            <form @submit.prevent="updateProduct">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="editedProduct.title">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" v-model="editedProduct.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control" id="price" v-model="editedProduct.price">
                </div>
                <button type="submit" class="btn btn-primary">Update Product</button>
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


        fetchProduct(productId) {
            axios.get(`https://dummyjson.com/products/${productId}`)
                .then((response) => {
                    this.editedProduct = response.data;

                })
                .catch((error) => {
                    console.error(error);
                    // Gestisci l'errore mostrando un messaggio all'utente o reindirizzandolo alla DashboardPage
                    this.$router.push({ name: 'DashboardPage' });
                });
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
                        // Emetti un evento di routing personalizzato con l'ID del prodotto aggiornato
                        this.$router.push({ name: 'DashboardPage', params: { updatedProductId: id } });
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
                // Aggiungi altri controlli se necessario
            );
        },
    }
};
</script>
