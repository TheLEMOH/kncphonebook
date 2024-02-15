import { createRouter, createWebHistory } from "vue-router";

/*  */

import organization from "./organization"
import division from "./division"
import subdivision from "./subdivision"
import individual from "./individual"
import employee from "./employee"
import position from "./position"
import user from "./user"
import login from "./login"
import other from "./other"
import home from "./home"

/*  */

const routes = [
  ...organization,
  ...division,
  ...subdivision,
  ...individual,
  ...employee,
  ...position,
  ...user,
  ...login,
  ...other,
  ...home
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
