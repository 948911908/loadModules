import Vue from 'vue'
export class loadModules {
    constructor(templates, parent, cb = () => {}) {
        if (!templates || !templates.length) {
            console.error('请传递需要动态加载的模块')
            return
        }
        // 当前需要动态加载的模块
        this.templates = templates || []
        // 当前模块加载索引
        this.index = 0
        // 父级组件
        this.$parent = parent
        // 当前需要挂载到的节点
        this.parentEl = parent.$el
        // 当前挂载后的组件列表
        this.vms = []
        // 当前加载状态
        this.loading = true
        // 当前加载进度
        this.progress = 0
        // 加载回调
        this.cb = cb
        // 父级被销毁时，需要将子组件全部销毁，清除内存
        this.$parent.$options.beforeDestroy = this.$parent.$options.beforeDestroy || []
        this.$parent.$options.beforeDestroy.push(this.destroy.bind(this))
    }
    async init () {
        if (document.readyState === 'complete') {
            let compItem = this.templates[this.index]
            let propsData = {}
            // 如果当前不是单纯组件对象
            if (!compItem._compiled && (typeof compItem === 'object')) {
                propsData = compItem.props
                compItem = compItem.comp
            }
            // 如果当前组件传入的是一个方法
            if (typeof compItem === 'function') {
                var comp = await compItem()
                compItem = comp.default
            }
            // 实例化组件并挂载到父节点
            let Comp = Vue.extend(compItem)
            let vm = new Comp({
                propsData
            }).$mount()
            // 保存当前所有子组件实例对象
            this.vms.push(vm)
            this.parentEl.appendChild(vm.$el)
            this.index++
        }
        if (this.index < this.templates.length) {
            this.progress = parseInt(this.index / this.templates.length * 100)
            window.requestAnimationFrame(this.init.bind(this))
        } else {
            this.loading = false
            this.progress = 100
        }
        this.cb(this.progress)
    }
    /**
     * 获取某个组件实例
     * @param {String} compName 当前组件名字
     */
    getComp(compName) {
        if (!compName) {
            console.error('缺少组件名字')
            return
        }
        let vm = null
        for (let i = 0, len = this.vms.length; i < len; i++) {
            let { name } = this.vms[i].$options
            if (!name) {
                console.error('当前组件没有定义名字')
                break;
            }
            if (name === compName) {
                vm = this.vms[i]
                break;
            }
        }
        return vm
    }
    /**
     * 销毁某个组件实例
     * @param {String} compName 需要销毁的组件名字
     */
    destroy(compName) {
        if (compName) {
            let index = -1
            for (let i = 0, len = this.vms.length; i < len; i++) {
                let item = this.vms[i]
                if (item.$options.name === compName) {
                    index = i
                    break
                }
            }
            if (index >= 0) {
                this.vms[index].$destroy()
                this.parentEl.removeChild(this.vms[index].$el)
                this.vms.splice(index, 1)
            } else {
                console.error('当前组件不存在')
            }
        } else {
            this.vms.forEach(item => {
                item.$destroy()
            })
            this.vms = []
        }
    }
}
