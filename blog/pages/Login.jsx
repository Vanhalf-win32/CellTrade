import React from "react";
import MyInput from "../components/UI/input/MyInput";


export default function Login() {
    return (
        <div>
            <h1>
                Sign In
                <form>
                    <MyInput type="text" placeholder="Insert login"/>
                    <MyInput type="password" placeholder="Insert password"/>
                    <MyInput>Enter</MyInput>

                </form>
            </h1>
        </div>
    )
}