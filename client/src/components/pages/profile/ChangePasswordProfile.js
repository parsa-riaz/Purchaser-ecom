import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { changePassword } from "../../../redux/actions/authAction";

export default function ChangePasswordProfile() {
  const { loading, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordEye, setPasswordEye] = useState(false);
  const [conPassEye, setConPassEye] = useState(false);
  return (
    <div className="bg-sky relative top-0 z-10 flex justify-center items-center h-screen overflow-hidden">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-cgreen h-auto md:h-[70%] rounded-md shadow-md flex items-center justify-center flex-col w-[30rem]">
          <div className="w-[80%] grid gap-4">
            <p className="my-2 text-2xl text-center text-white">
              Yes! Now freely create your new password
            </p>
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.password) {
                  errors.password = "* Password is required";
                } else if (values.password.length < 8) {
                  errors.password =
                    "* Password must be 8 or more then 8 characters";
                } else if (
                  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                    values.password
                  )
                ) {
                  errors.password =
                    "* Password should be alphanumeric characters having at least 1 number and 1 character";
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = "* Password is required";
                } else if (values.confirmPassword.length < 8) {
                  errors.confirmPassword =
                    "* Password must be 8 or more then 8 characters";
                } else if (
                  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
                    values.confirmPassword
                  )
                ) {
                  errors.confirmPassword =
                    "* Password should be alphanumeric characters having at least 1 number and 1 character";
                }
                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "* Password does not matched";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                dispatch(changePassword({ email, password: values.password }));
                navigate("/profile");
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
                  <div className="relative ">
                    <input
                      type={passwordEye ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="password"
                      className="p-2 rounded-md focus:ring-2 w-full"
                    />
                    {!passwordEye ? (
                      <div
                        className="absolute text-navy cursor-pointer   right-2 top-2"
                        onClick={() => {
                          setPasswordEye(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </div>
                    ) : (
                      <div
                        className="absolute text-cgreen cursor-pointer  right-2 top-2"
                        onClick={() => {
                          setPasswordEye(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                    )}
                  </div>
                  <div className="text-red-700 bg-sky px-2 text-start font-semibold  2xl:text-lg">
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
                      className="p-2 rounded-md focus:ring-2 w-full"
                    />
                    {!conPassEye ? (
                      <div
                        className="absolute text-navy cursor-pointer   right-2 top-2"
                        onClick={() => {
                          setConPassEye(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </div>
                    ) : (
                      <div
                        className="absolute text-cgreen cursor-pointer  right-2 top-2"
                        onClick={() => {
                          setConPassEye(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                    )}
                  </div>
                  <div className="text-red-700 text-start font-semibold bg-sky px-2  2xl:text-lg">
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </div>

                  <div className="grid text-white hover:font-semibold hover:text-navy">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-navy hover:bg-white self-center 2xl:text-xl w-[50%]
                          justify-self-center p-2 2xl:p-4"
                    >
                      {" "}
                      Change password
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
