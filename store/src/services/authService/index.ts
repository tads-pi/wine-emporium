import { signup } from "./signup"
import { signin } from "./signin"
import { getuserdata } from "./getuserid"
import { updateuserdata } from "./updateuserdata"
import { updateaddress } from "./updateaddress"

export const authService = {
    signup,
    signin,
    getuserdata,
    updateuserdata,
    updateaddress,
}