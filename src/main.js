import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.performance = true
Vue.config.productionTip = false
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

// export function createApp() {
// 	const router = createRouter();
// 	const app = new Vue({
// 		router,
// 		render: h => h(App)
// 	})
// 	return { app }
// }
