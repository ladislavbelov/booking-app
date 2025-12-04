import './bootstrap';
import { createApp } from 'vue';
import App from './components/App.vue';
import router from '@/router';
import { configure } from 'vee-validate';
import { createPinia } from 'pinia';
// Конфигурация VeeValidate ДО создания приложения
configure({
	validateOnBlur: true,
	validateOnChange: true,
	validateOnInput: false,
	validateOnModelUpdate: true,
});
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
