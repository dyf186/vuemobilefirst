import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        component: () =>
            import ("@/views/layout/index.vue"),
        redirect: "/home",
        children: [{
                path: "/home",
                component: () =>
                    import ("@/views/home/index.vue")
            },
            {
                path: "/question",
                component: () =>
                    import ("@/views/question/index.vue")
            },
            {
                path: "/video",
                component: () =>
                    import ("@/views/video/index.vue")
            },
            {
                path: "/user",
                component: () =>
                    import ("@/views/user/index.vue")
            }
        ]
    },
    {
        path: "/user/profile",
        component: () =>
            import ("@/views/user/profile.vue")
    },
    {
        path: "/user/chat",
        component: () =>
            import ("@/views/user/chat.vue")
    },
    {
        path: "/login",
        component: () =>
            import ("@/views/user/login.vue")
    },
    {
        path: "/article/:aid",
        name: "article",
        component: () =>
            import ("@/views/article/index.vue")
    },
    {
        path: "/search",
        component: () =>
            import ("@/views/search/index.vue")
    },
    {
        path: "/search/result/:q",
        name: 'result',
        component: () =>
            import ("@/views/search/result.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;