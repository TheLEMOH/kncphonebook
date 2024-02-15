export default [{
    path: "/division/create",
    name: "divisionCreate",
    component: () => import("../views/Division/Create.vue"),
    meta: {
        layout: "Standard",
        name: "Создать вышестоящее подразделение",
        typePage: "create",
    },
},

{
    path: "/division/:id",
    name: "divisionEdit",
    component: () => import("../views/Division/Create.vue"),
    meta: {
        layout: "Standard",
        name: "Редактировать вышестоящее подразделение",
        typePage: "edit",
    },
},

{
    path: "/division/all",
    name: "divisionAll",
    component: () => import("../views/Division/Table.vue"),
    meta: {
        layout: "Standard",
        name: "Все вышестоящее подразделение",
        typePage: "display",
    },
},
]