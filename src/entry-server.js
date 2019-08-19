import { createApp } from './main';

export default context => {
    return new Promise((resolve, reject) => {
        const {
            app,
            router,
            store
        } = createApp();
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMachedComponents();
            if (!matchedComponents.length) {
                return reject({
                    code: 404
                })
            }
            resolve(app)
        }, reject)
    })
}