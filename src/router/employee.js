export default
    [
        {
            path: "/employee/create",
            name: "employeeCreate",
            component: () => import("../views/Employee/Create.vue"),
            meta: {
                layout: "Standard",
                name: "Создать сотрудника",
                typePage: "create",
            },
        },

        {
            path: "/employee/:id",
            name: "employeeEdit",
            component: () => import("../views/Employee/Edit.vue"),
            meta: {
                layout: "Standard",
                name: "Редактировать сотрудника",
                typePage: "edit",
            },
        },

        {
            path: "/employee/all",
            name: "employeeAll",
            component: () => import("../views/Employee/Table.vue"),
            meta: {
                layout: "Standard",
                name: "Все сотрудники",
                typePage: "display",
            },
        },

        {
            path: "/employee/group",
            name: "employeeGroup",
            component: () => import("../views/Employee/Test.vue"),
            meta: {
                layout: "Standard",
                name: "Все сотрудники",
                typePage: "display",
            },
        },

    ]