import { createSlice } from '@reduxjs/toolkit'

const getUser = ()=>{
    return localStorage.getItem('user') && Object.keys(JSON.parse(localStorage.getItem('user'))).length > 0?JSON.parse(localStorage.getItem('user')):{}
}
export const userSlice = createSlice(
    {
        name:'sesion',
        initialState:{
            user:getUser()
        },
        reducers:{
            storeUser:(state, action)=>{
                state.user = action.payload;
                localStorage.setItem('user',JSON.stringify(state.user))
            }
        }
    }
)

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;