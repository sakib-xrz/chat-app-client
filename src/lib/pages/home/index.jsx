import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
import { useState } from "react";
import { IMAGE_BB_URL } from "../../helpers/base_url";

const Home = () => {
    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];

    const [gender, setGender] = useState(null);
    const [photo, setPhoto] = useState(null);

    const [error, setError] = useState({
        error: "",
        genderError: "",
    });

    const handleSubmitSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        if (gender === null) {
            setError((prevState) => ({
                ...prevState,
                genderError: "Gender is required",
            }));
            return;
        }
        setError((prevState) => ({
            ...prevState,
            error: "",
            genderError: "",
        }));

        const formData = new FormData();
        formData.append("image", photo);
        

        /*
        test start here------------------------------
        */

        axios
            .post(IMAGE_BB_URL, formData)
            .then((response) => {
                const image = response?.data?.data?.display_url;
                const data = { name, email, password, gender, image };
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });

        /*
        test end here------------------------------
        */
    };

    const handleSubmitLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });
    };

    handleSubmitLogIn;

    return (
        <div className="card lg:p-10 mt-14 lg:mt-20">
            <TabView>
                <TabPanel header="Log In">
                    <div className="w-full lg:w-4/12 mx-auto shadow-lg border rounded-sm p-10">
                        <form
                            onSubmit={handleSubmitLogIn}
                            className="p-fluid space-y-8"
                            autoComplete="off"
                        >
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText
                                        required={true}
                                        id="email"
                                        name="email"
                                    />
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
                                type="submit"
                                label="Log In"
                                className="mt-2"
                            />
                        </form>
                    </div>
                </TabPanel>
                <TabPanel header="Sign Up">
                    <div className="w-full lg:w-4/12 mx-auto shadow-lg border rounded-sm p-10">
                        <form
                            onSubmit={handleSubmitSignUp}
                            className="p-fluid space-y-8"
                            autoComplete="off"
                        >
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText
                                        id="name"
                                        name="name"
                                        autoFocus
                                    />
                                    <label htmlFor="name">Name*</label>
                                </span>
                            </div>
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText
                                        required={true}
                                        id="email"
                                        name="email"
                                    />
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
                            <div className="field">
                                <span className="p-float-label">
                                    <Dropdown
                                        id="gender"
                                        name="gender"
                                        options={genderOptions}
                                        optionLabel="label"
                                        placeholder="Select Gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.value)}
                                    />
                                    <label htmlFor="gender">Gender</label>
                                </span>
                                <small className="text-red-500">
                                    {error.genderError}
                                </small>
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setPhoto(e.target.files[0])
                                        }
                                    />
                                </span>
                            </div>

                            <Button
                                type="submit"
                                label="Sign Up"
                                className="mt-2"
                            />
                        </form>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Home;
