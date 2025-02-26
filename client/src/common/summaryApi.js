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

    get_nat: {
        url: '/api/question/get-nat',
        method: 'get'
    },

    set_streak_after_lesson: {
        url: '/api/user/set-streak',
        method: 'put'
    },

    check_streak: {
        url: '/api/user/check-streak',
        method: 'put'
    },

    in_lesson_update_create: {
        url: '/api/inlesson/update-create',
        method: 'post'
    },

    in_lesson_delete: {
        url: '/api/inlesson/delete',
        method: 'delete'
    },

    after_calcs: {
        url: '/api/inlesson/after-calcs',
        method: "post"
    },

    users_rank: {
        url: '/api/user/users-rank',
        method: "get"
    },

    admin_check: {
        url: '/api/question/admin-check',
        method: "get"
    }
}

export default summaryApi