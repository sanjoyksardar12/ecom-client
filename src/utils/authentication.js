import { getCookie } from "."

export const isAuthenticated = ()=>{
    return  !!getCookie("token");
}