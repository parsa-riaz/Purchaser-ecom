import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../../redux/actions/authAction";
import Loading from "../../common/Loading";
import { handleSuccess } from "../../../redux/reducers/authSlice";

export default function ForgetPass() {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (success === true) {
      dispatch(handleSuccess());
      navigate("/otp");
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="bg-sky z-10 relative  flex justify-center items-center h-screen overflow-hidden">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-cgreen h-[60%] rounded-md text-center shadow-md flex items-center justify-center flex-col w-[40%]">
          <div className={" w-[80%] grid gap-4 "}>
            <p className="my-2 text-lg md:text-[1.5rem] lg:text-[2rem] 2xl:text-[3rem]  text-gray-200 font-semibold font-neon ">
              Enter you registered email
            </p>
            <p className="my-2 text-lg text-white font-lora">
              We are going to send an otp to your account please verify that otp
            </p>
            <Formik
              initialValues={{ email: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "* Email required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "* Invalid email address";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                dispatch(forgetPassword(values));
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
                /* and other goodies */
              }) => (
                <form className="flex  flex-col gap-4 " onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="email"
                    className="p-2 rounded-md focus:ring-2 "
                  />
                  <div className="text-red-6 text-start bg-sky  text-red-800 font-semibold 2xl:text-lg">
                    {errors.email && touched.email && errors.email}
                  </div>

                  <div className="grid text-white hover:font-semibold hover:text-navy">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-navy hover:bg-white self-center 2xl:text-xl w-[35%]
                        justify-self-center p-2 2xl:p-4"
                    >
                      {" "}
                      Send OTP
                    </button>
                  </div>
                </form>
              )}
            </Formik>
            <Link
              to="/login"
              className="text-md text-white hover:text-navy cursor-pointer underline underline-offset-4 font-semibold"
            >
              <p>Back to login?</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
