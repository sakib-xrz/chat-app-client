import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Login = () => {
    const handleSubmitLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });
    };

    return (
        <div className="w-full lg:w-4/12 mx-auto shadow-lg border rounded-sm p-10">
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
                    loading={false}
                    type="submit"
                    label="Log In"
                    className="mt-2"
                />
            </form>
        </div>
    );
};

export default Login;
