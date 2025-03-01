import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    status: "",
    role : ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.avatar = action.payload?.avatar
            state.xp = action.payload?.xp
            state.streakNo = action.payload?.streakNo
            state.totalQuestions = action.payload?.totalQuestions
            state.role = action.payload?.role
        }, 

        updateAvatar : (state,action) =>{
            state.avatar = action.payload
        },

        endStreak : (state,action) =>{
            state.streakNo = action.payload
        },

        logout : (state,action) => {

            state._id = ""
            state.name = ""
            state.email = ""
            state.avatar = ""
            state.status = ""
            state.role = ""
            state.streakNo = ""
        }
    }
})

export const { setUserDetails, logout, updateAvatar, endStreak} = userSlice.actions

export default userSlice.reducer