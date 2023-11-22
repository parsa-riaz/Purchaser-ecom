import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../redux/actions/authAction";
import { handleSuccess } from "../../../redux/reducers/authSlice";
import Loading from "../../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [passwordEye, setPasswordEye] = useState(false);
  const [conPassEye, setConPassEye] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (success === true) {
      dispatch(handleSuccess());
      navigate("/login");
    }
  }, [success, navigate, dispatch]);
  return (
    <div className=" bg-zinc flex justify-center items-center overflow-hidden h-auto md:py-[10%]">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-sky flex justify-center  items-center w-[40%] h-full shadow-md">
          <div className="w-[90%] md:w-[70%] h-[80%] text-center my-8">
            <p className="my-2 md:my-4 text-[1rem] font-neon md:text-[2rem] font-semibold text-navy">
              Creat your Account
            </p>
            <Formik
              initialValues={{
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: null,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.userName) {
                  errors.userName = "*Name required";
                }
                if (!values.email) {
                  errors.email = "*Email required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "*Invalid email address";
                }
                if (!values.password) {
                  errors.password = "*Password is required";
                } else if (values.password.length < 8) {
                  errors.password =
                    "*Password must be 8 or more then 8 characters";
                } else if (
                  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                    values.password
                  )
                ) {
                  errors.password =
                    "*Password should be alphanumeric characters having at least 1 number and 1 character";
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = "*Confirm password is required";
                } else if (values.confirmPassword.length < 8) {
                  errors.confirmPassword =
                    "*Password must be 8 or more then 8 characters";
                } else if (
                  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                    values.confirmPassword
                  )
                ) {
                  errors.confirmPassword =
                    "*Password should be alphanumeric characters having at least 1 number and 1 character";
                }
                if (values.password != values.confirmPassword) {
                  errors.confirmPassword = "*Password does not matched";
                }
                if (!values.terms) {
                  errors.terms = "*Please agree with term and conditions";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                values.role = "User";
                console.log(values);
                dispatch(createUser(values));
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
                <form className="flex  flex-col gap-4 " onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="userName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                    placeholder="enter your full name"
                    className="mt-2 border-b-2 focus:outline-none 2xl:py-4  border-cgreen bg-transparent placeholder:text-slate-500"
                  />
                  <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                    {errors.userName && touched.userName && errors.userName}
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="email"
                    className="mt-2 border-b-2 focus:outline-none 2xl:py-4  border-cgreen bg-transparent placeholder:text-slate-500"
                  />
                  <div className="text-red-700 text-start font-semibold  2xl:text-lg">
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
                  <div className="text-red-700 text-start font-semibold  2xl:text-lg">
                    {errors.password && touched.password && errors.password}
                  </div>
                  <div className="relative ">
                    <input
                      type={conPassEye ? "text" : "password"}
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      placeholder="confirm password"
                      className="m-2 ml-0 w-full   bg-transparent  2xl:py-4 focus:outline-none border-b-2 border-cgreen placeholder:text-slate-500"
                    />
                    {!conPassEye ? (
                      <div
                        className="absolute text-navy cursor-pointer   right-0 top-2"
                        onClick={() => {
                          setConPassEye(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </div>
                    ) : (
                      <div
                        className="absolute text-cgreen cursor-pointer  right-0 top-2"
                        onClick={() => {
                          setConPassEye(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                    )}
                  </div>
                  <div className="text-red-700 text-start font-semibold  2xl:text-lg">
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      name="terms"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.terms}
                    />
                    <label htmlFor="terms">
                      I agree with Terms and Conditions
                    </label>
                  </div>
                  <div className="text-red-700 text-start font-semibold  2xl:text-lg">
                    {errors.terms && touched.terms && errors.terms}
                  </div>

                  <div className="grid text-white hover:font-semibold hover:text-navy">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-navy hover:bg-white self-center 2xl:text-xl w-[35%]
                        justify-self-center p-2 2xl:p-4"
                    >
                      {" "}
                      Sign Up
                    </button>
                  </div>
                </form>
              )}
            </Formik>
            <div className="flex justify-center items-center gap-2 my-4">
              <p>Already have an account ?</p>
              <Link to="/login">
                <button className="font-semibold underline underline-offset-4 text-navy hover:text-cgreen">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
