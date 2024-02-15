export default
    [
        {
            path: "/login",
            name: "login",
            component: () => import("../views/User/Login.vue"),
            meta: {
                layout: "Center",
                name: "Регистрация",
                typePage: "create",
            },
        },
    ]