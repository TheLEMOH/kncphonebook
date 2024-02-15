export default
    [
        {
            path: "/",
            name: "home",
            component: () => import("../views/Home.vue"),
            meta: {
                layout: "Standard",
                name: "Домашняя страница",
                typePage: "display",
            },
        },
    ]