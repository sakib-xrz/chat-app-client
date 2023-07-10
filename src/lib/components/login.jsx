import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleSubmitLogIn = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        const userData = { email, password };

        try {
            setLoading(true);
            const { data } = await axios.post(
                `${BASE_URL}/auth/login`,
                userData
            );

            console.log(data);

            localStorage.setItem(
                "access_token",
                JSON.stringify(data?.accessToken)
            );

            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: `${data?.message}`,
                life: 3000,
            });
            setLoading(false);
            form.reset();
            navigate("/chats");
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: `${errorMessage}`,
                life: 3000,
            });
            setLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-4/12 mx-auto shadow-lg border rounded-sm p-10">
            <Toast ref={toast} />
            <form
                onSubmit={handleSubmitLogIn}
                className="p-fluid space-y-8"
                autoComplete="off"
            >
                <div className="field">
                    <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText required={true} id="email" name="email" />
                        <label htmlFor="email">Email*</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <Password
                            autoComplete="new-password"
                            feedback={false}
                            id="password"
                            name="password"
                            toggleMask
                        />
                        <label htmlFor="password">Password*</label>
                    </span>
                </div>

                <Button
                    loading={loading}
                    type="submit"
                    label="Log In"
                    className="mt-2"
                />
            </form>
        </div>
    );
};

export default Login;
