const summaryApi = {
    register: {
        url: "/api/user/register",
        method: "post"
    },

    login: {
        url: "/api/user/login",
        method: "post"
    },

    logout: {
        url: "/api/user/logout",
        method: "post"
    },


    get_user: {
        url: "/api/user/get",
        method: "get"
    },

    upload_image: {
        url: "/api/image/upload",
        method: "post"
    },

    upload_avatar: {
        url: "/api/user/upload-avatar",
        method: "put"
    },

    set_last_lesson: {
        url: "/api/user/set-last-lesson-date",
        method: "post"
    },

    post_question: {
        url: '/api/question/post',
        method: 'post'
    },

    get_lin: {
        url: '/api/question/get-lin',
        method: 'get'
    },

    get_hum: {
        url: '/api/question/get-hum',
        method: 'get'
    },

    set_streak_after_lesson: {
        url: '/api/user/set-streak',
        method: 'put'
    },

    check_streak: {
        url: '/api/user/check-streak',
        method: 'put'
    }
}

export default summaryApi