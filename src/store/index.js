import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import menu from './modules/menu'
import login from './modules/login'
export default new Vuex.Store({
    modules: {
        menu: menu,
        login: login,
    }
});