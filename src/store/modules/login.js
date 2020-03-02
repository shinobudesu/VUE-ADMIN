export default {
    state: {
        username: "",
        nickname: "",
        token: 'demo',
    },
    getters: {

    },
    mutations: {
        LOGIN: (state, data) => {
            localStorage.token = data.token || '';
            state.token = data.token || '';
            localStorage.username = data.username || '';
            state.username = data.username || '';
            localStorage.nickname = data.nickName || '';
            state.nickname = data.nickName || '';
        },
        SETUSERINFO: (state, data) => {
            state.nickname = data.nickname || '';
            state.username = data.username || '';
        },
        SETTOKEN: (state, data) => {
            state.token = data || '';
        },
        LOGOUT: state => {
            let username = localStorage.username;
            localStorage.clear();
            localStorage.username = username;
            state.token = null;
        }
    },
    actions: {

    }
}