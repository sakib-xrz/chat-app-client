import { BASE_URL, IMAGE_BB_URL } from "../helpers/base_url";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import axios from "axios";

const Signup = () => {
    const toast = useRef(null);
    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];

    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState(null);
    const [photo, setPhoto] = useState("");

    const [error, setError] = useState({
        error: "",
        genderError: "",
    });

    const handleSubmitSignUp = async (event) => {
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

        try {
            setLoading(true);

            let userData;

            if (photo) {
                const uploadImage = await axios.post(IMAGE_BB_URL, formData);
                const image = uploadImage?.data?.data?.display_url;
                userData = { name, email, password, gender, image };
            } else {
                userData = { name, email, password, gender };
            }

            const { data } = await axios.post(
                `${BASE_URL}/users/register`,
                userData
            );
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: `${data?.message}`,
                life: 3000,
            });
            setLoading(false);
            setPhoto("");
            form.reset();
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

        // axios
        //     .post(IMAGE_BB_URL, formData)
        //     .then((response) => {
        //         const image = response?.data?.data?.display_url;
        //         const userData = { name, email, password, gender, image };
        //         axios
        //             .post(`${BASE_URL}/users/register`, userData)
        //             .then((response) => {
        //                 const { data } = response;
        //                 console.log(data);
        //             });
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        /*
        test end here------------------------------
        */
    };

    return (
        <div className="w-full lg:w-4/12 mx-auto shadow-lg border rounded-sm p-10">
            <Toast ref={toast} />
            <form
                onSubmit={handleSubmitSignUp}
                className="p-fluid space-y-8"
                autoComplete="off"
            >
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="name" name="name" autoFocus />
                        <label htmlFor="name">Name*</label>
                    </span>
                </div>
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
                    <small className="text-red-500">{error.genderError}</small>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </span>
                </div>

                <Button
                    loading={loading}
                    type="submit"
                    label="Sign Up"
                    className="mt-2"
                />
            </form>
        </div>
    );
};

export default Signup;
