<template>
	<div class="home">
		<button @click="destroy">删除HelloWorld组件</button>
		<!-- <Hello-world />
		<one />
		<two />
		<three />
		<four />
		<five />
		<six />
		<seven />
		<eight />
		<nine />
		<ten /> -->
	</div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
// import one from '@/components/01.vue'
// import two from '@/components/02.vue'
import three from '@/components/03.vue'
import four from '@/components/04.vue'
import five from '@/components/05.vue'
import six from '@/components/06.vue'
import seven from '@/components/07.vue'
import eight from '@/components/08.vue'
import nine from '@/components/09.vue'
import ten from '@/components/10.vue'
import { loadModules } from '../assets/index'
export default {
	name: 'home',
	data() {
		return {
			list: null
		}
	},
	components: {
		// HelloWorld,
		// one,
		// two,
		three,
		four,
		five,
		six,
		seven,
		eight,
		nine,
		ten
	},
	mounted() {
		// 组件列表
		let comps = [{
				comp: () => import('@/components/HelloWorld.vue'),
				props: {
					name: 1123
				}
			}, 
			() => import('@/components/01.vue'), 
			() => import('@/components/02.vue'), 
			three, 
			four, 
			five, 
			six, 
			seven, 
			eight, 
			nine, 
			ten
		]
		this.vms = new loadModules(comps, this, progress => {
			if (progress >= 100) {
				var comp = this.vms.getComp('HelloWorld')
				var oneComp = this.vms.getComp('one')
				comp.$on('click', name => {
					console.log('helloworld事件', name)
				})
				oneComp.$on('click', name => {
					console.log('01组件事件', name)
				})
			}
		})
		this.vms.init()
	},
	methods:{
		/**
		 * 删除某个组件
		 */
		destroy() {
			this.vms.destroy('HelloWorld')
		}
	}
}
</script>
