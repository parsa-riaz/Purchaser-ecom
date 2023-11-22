import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/actions/authAction.js";
import Loading from "../../common/Loading.js";
import { Formik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { handleSuccess } from "../../../redux/reducers/authSlice.js";

export default function Login() {
  const [passwordEye, setPasswordEye] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, success } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (success === true) {
      if (token && user.role == "admin") {
        dispatch(handleSuccess());
        navigate("/adminDashboard");
      } else {
        dispatch(handleSuccess());
        navigate("/products");
      }
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="flex justify-center bg-zinc items-center  h-screen overflow-hidden">
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="bg-sky flex justify-center h-[70%]  items-center w-[90%] md:w-[40%] shadow-md">
            <div className=" w-[90%] lg:w-[60%] py-2">
              <p className="my-4 text-[1.5rem] lg:text-[2rem] 2xl:text-[4rem] font-neon text-center font-semibold text-navy">
                Login to your Account
              </p>
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Email required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.password) {
                    errors.password = "Password is required";
                  } else if (values.password.length < 8) {
                    errors.password =
                      "Password must be 8 or more then 8 characters";
                  } else if (
                    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                      values.password
                    )
                  ) {
                    errors.password =
                      "Password should be alphanumeric characters having at least 1 number and 1 character";
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(false);
                  dispatch(loginUser(values));

                  if (token && user.role == "USer") {
                    navigate("/products");
                  } else if (token && user.role == "admin") {
                    navigate("/adminDashboard");
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form
                    className="flex  flex-col gap-4 "
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="email"
                      className="m-2 border-b-2 focus:outline-none 2xl:py-4  border-cgreen bg-transparent placeholder:text-slate-500"
                    />
                    <div className="text-red-700 2xl:text-lg">
                      {errors.email && touched.email && errors.email}
                    </div>
                    <div className="relative ">
                      <input
                        type={passwordEye ? "text" : "password"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="password"
                        className="m-2 ml-0 w-full   bg-transparent  2xl:py-4 focus:outline-none border-b-2 border-cgreen placeholder:text-slate-500"
                      />
                      {!passwordEye ? (
                        <div
                          className="absolute text-navy cursor-pointer   right-0 top-2"
                          onClick={() => {
                            setPasswordEye(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faEyeSlash} />
                        </div>
                      ) : (
                        <div
                          className="absolute text-cgreen cursor-pointer  right-0 top-2"
                          onClick={() => {
                            setPasswordEye(false);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </div>
                      )}
                    </div>
                    <div className="text-red-700 2xl:text-lg">
                      {errors.password && touched.password && errors.password}
                    </div>
                    <p
                      htmlFor="terms"
                      className="m-2 underline underline-offset-4 hover:text-cgreen text-navy  font-semibold"
                    >
                      <Link to="/forgetPassword">Forget Password ?</Link>
                    </p>
                    <div className="grid text-white hover:font-semibold hover:text-navy">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-navy hover:bg-white self-center 2xl:text-xl w-[35%]
                        justify-self-center p-2 2xl:p-4"
                      >
                        {" "}
                        Login
                      </button>
                    </div>
                  </form>
                )}
              </Formik>

              <div className="flex justify-center items-center gap-2 my-4">
                <p>Don't have an account yet?</p>
                <Link to="/signup">
                  <button className="font-semibold underline underline-offset-4 text-navy hover:text-cgreen">
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
