export default
    [
        {
            path: "/pdf",
            name: "PDF",
            component: () => import("../views/Pdf.vue"),
            meta: {
                layout: "Standard",
                name: "PDF",
                typePage: "display",
            },
        },
        {
            path: "/csv",
            name: "CSV",
            component: () => import("../views/Csv.vue"),
            meta: {
                layout: "Standard",
                name: "Csv",
                typePage: "display",
            },
        },
    ]