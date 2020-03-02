export default {
    state: {
        menuTree: [], // 导航菜单树
        flag: false //控制展开
    },
    getters: {

    },
    mutations: {
        SETMENUTREE(state, menuTree) { // 设置导航菜单树
            state.menuTree = menuTree;
            localStorage.menu = JSON.stringify(menuTree);
        }
    },
    actions: {

    }
}