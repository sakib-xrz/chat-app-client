"use client";

import APIKit from "@/common/APIkit";
import { setJWTokenAndRedirect } from "@/common/UtilKit";
import FormikErrorBox from "@/components/shared/FormikErrorBox";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  username: "sakib_xrz",
  password: "Sakib@123",
};

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const payload = {
        username: values.username,
        password: values.password,
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
        .login(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setLoading(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Login successful",
        error: (error) => error.message,
      });
    },
  });
  return (
    <div className="flex flex-col items-center justify-center sm:min-w-96 mx-auto">
      <div className="w-full px-6 py-10 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="font-semibold label-text text-white">
                Username
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
                Password
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-transparent border-white focus:border-white focus:outline-white/50 text-white"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormikErrorBox field={"password"} formik={formik} />
            {showPassword ? (
              <AiOutlineEye
                onClick={() => setShowPassword(false)}
                className="absolute right-3 bottom-3 text-white w-4 h-4 cursor-pointer"
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setShowPassword(true)}
                className="absolute right-3 bottom-3 text-white w-4 h-4 cursor-pointer"
              />
            )}
          </div>

          <div>
            <button type="submit" className="btn btn-block mt-4 min-h-2 h-10">
              Login
            </button>
          </div>
        </form>

        <Link
          href="/register"
          className="font-semibold label-text text-center text-white hover:underline hover:text-blue-400 mt-2 block w-fit mx-auto"
        >
          {"Don't"} have an account?
        </Link>
      </div>
    </div>
  );
}
