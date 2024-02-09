"use client";

import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import FormikErrorBox from "@/components/shared/FormikErrorBox";
import { useRouter } from "next/navigation";
import { setJWTokenAndRedirect } from "@/common/UtilKit";
import APIKit from "@/common/APIkit";
import { toast } from "sonner";

const initialValues = {
  name: "Sakib XRz",
  username: "sakib_xrz",
  password: "Sakib@123",
  confirm_password: "Sakib@123",
  gender: "male",
};

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords doesn't match")
    .required("Confirm password is required"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    password: false,
    confirm_password: false,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        username: values.username,
        password: values.password,
        gender: values.gender,
      };

      const handleSuccess = ({ data }) => {
        formik.resetForm();
        setJWTokenAndRedirect(data.access, () => {
          router.push("/");
        });
      };

      const handleFailure = (error) => {
        throw error;
      };

      const promise = APIKit.auth
        .register(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setLoading(false));

      return toast.promise(promise, {
        loading: "Creating your account...",
        success: "Account created successfully",
        error: (error) => error.message,
      });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center sm:min-w-96 mx-auto">
      <div className="w-full px-6 py-10 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Register
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="font-semibold label-text text-white">Name*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full input input-bordered h-10 bg-transparent border-white focus:border-white focus:outline-white/50 text-white"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <FormikErrorBox field={"name"} formik={formik} />
          </div>

          <div>
            <label className="label p-2">
              <span className="font-semibold label-text text-white">
                Username*
              </span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="w-full input input-bordered h-10 bg-transparent border-white focus:border-white focus:outline-white/50 text-white"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <FormikErrorBox field={"username"} formik={formik} />
          </div>

          <div className="relative">
            <label className="label">
              <span className="font-semibold label-text text-white">
                Password*
              </span>
            </label>
            <input
              type={show.password ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-transparent border-white focus:border-white focus:outline-white/50 text-white"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormikErrorBox field={"password"} formik={formik} />
            {show.password ? (
              <AiOutlineEye
                onClick={() =>
                  setShow((prevParams) => ({
                    ...prevParams,
                    password: false,
                  }))
                }
                className="absolute right-3 bottom-3 text-white w-4 h-4 cursor-pointer"
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() =>
                  setShow((prevParams) => ({
                    ...prevParams,
                    password: true,
                  }))
                }
                className="absolute right-3 bottom-3 text-white w-4 h-4 cursor-pointer"
              />
            )}
          </div>

          <div className="relative">
            <label className="label">
              <span className="font-semibold label-text text-white">
                Confirm Password*
              </span>
            </label>
            <input
              type={show.confirm_password ? "text" : "password"}
              name="confirm_password"
              placeholder="Re-enter Password"
              className="w-full input input-bordered h-10 bg-transparent border-white focus:border-white focus:outline-white/50 text-white"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
            <FormikErrorBox field={"confirm_password"} formik={formik} />
            {show.confirm_password ? (
              <AiOutlineEye
                onClick={() =>
                  setShow((prevParams) => ({
                    ...prevParams,
                    confirm_password: false,
                  }))
                }
                className="absolute right-3 bottom-3 text-white w-4 h-4 cursor-pointer"
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() =>
                  setShow((prevParams) => ({
                    ...prevParams,
                    confirm_password: true,
                  }))
                }
                className="absolute right-3 bottom-3 text-white w-4 h-4 cursor-pointer"
              />
            )}
          </div>

          <div className="flex gap-2 mt-2">
            <div>
              <label className="label cursor-pointer flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="radio checked:bg-blue-500 border-white radio-xs"
                  checked={formik.values.gender === "male"}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  value="male"
                />
                <span className="label-text text-white">Male</span>
              </label>
            </div>
            <div>
              <label className="label cursor-pointer flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="radio checked:bg-pink-500 border-white radio-xs"
                  checked={formik.values.gender === "female"}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  value="female"
                />
                <span className="label-text text-white">Female</span>
              </label>
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-block mt-4 min-h-2 h-10">
              Register
            </button>
          </div>
        </form>

        <Link
          href="/login"
          className="font-semibold label-text text-center text-white hover:underline hover:text-blue-400 mt-2 block w-fit mx-auto"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
