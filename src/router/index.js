import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import BrowseCategory from "@/views/BrowseCategory.vue";
import About from "@/views/About.vue";
import UserProfile from "@/views/UserProfile.vue";
import CreateUserProfile from "@/views/CreateUserProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/browse",
    name: "Browse",
    component: Browse
  },
  {
    path: "/browse/category/:category",
    name: "BrowseCategory",
    component: BrowseCategory,
    props: true
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/userProfile",
    name: "userProfile",
    component: UserProfile
  },
  {
    path: "/createUserProfile",
    name: "createUserProfile",
    component: CreateUserProfile
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
