import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import DashboardPage from "./components/pages/DashboardPage";
import CreateProduct from "./components/pages/CreateProduct.vue";
import EditProduct from "./components/pages/EditProduct.vue";

// Configurazione di axios
axios.defaults.baseURL = "https://mock-api.binaryboxtuts.com";
axios.interceptors.request.use(function (config) {
  config.headers["X-Binarybox-Api-Key"] =
    "binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt";
  return config;
});

// Esecuzione della richiesta dopo la configurazione di axios
axios
  .get("/api/test")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LoginPage },
    { path: "/register", component: RegisterPage },
    {
      path: "/dashboard",
      name: "DashboardPage",
      component: DashboardPage,
    },
    {
      path: "/create",
      name: "CreateProduct",
      component: CreateProduct,
      props: true,
    },
    { path: "/edit/:id", name: "EditProduct", component: EditProduct },
  ],
});

createApp(App).use(router).mount("#app");
