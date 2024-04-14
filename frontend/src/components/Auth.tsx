import { SignUpInput } from "@somayush/medium-common-valid";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
        catch (e) {
            console.log(e);
            alert("Error while signing up")
        }
    }

    return (
        <>
            <div className="h-screen flex justify-center flex-col">
                <div className="flex justify-center">

                    <div className="my-3 w-80">
                        <div className="text-center my-8">
                            <div className="text-3xl font-extrabold">
                                Create an Account
                            </div>
                            <div className="text-slate-400">
                                {type === "signin" ? "Don't have an account" : "Already have an account?"}
                                <Link to={type === "signin" ? "/signup" : "/signin"} className="underline mx-2">{type === "signin" ? "Sign Up" : "Sign In"}</Link>
                            </div>
                        </div>

                        {type === "signup" ? <LabelledInput label="Name" placeholder="Ayush Som ...." onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        <LabelledInput label="Username" placeholder="som@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="123123" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                    </div>


                </div>
            </div>
        </>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <div className="my-5">
            <label className="block mb-2 text-sm font-bold text-black">{label}</label>
            <input onChange={onChange} type={type || "text"} className="border border-gray-600/[.55] text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400" placeholder={placeholder} required />
        </div>
    </div>
} 