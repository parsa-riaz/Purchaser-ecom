import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { Formik } from "formik";
import { verifyOtp } from "../../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../../redux/reducers/authSlice";

export default function Otp() {
  const { loading, email, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success === true) {
      dispatch(handleSuccess());
      navigate("/changePassword");
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="bg-sky relative top-0 z-10  flex justify-center items-center h-screen overflow-hidden">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-cgreen h-[60%] rounded-md text-center shadow-md flex items-center justify-center flex-col w-[40%]">
          <div className={"w-[80%] grid   gap-4"}>
            <p className="my-2 text-lg text-gray-100 font-lora">
              <span className=" text-[2rem] px-2 font-semibold font-merri">
                Hurrah!
              </span>{" "}
              You are one step ahead to get your password back
            </p>
            <p className="my-2 text-lg text-white">
              Verify yourself by enter otp
            </p>
            <div className="col">
              <Formik
                initialValues={{ otp: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.otp) {
                    errors.otp = "* OTP required";
                  } else if (values.otp.length < 6 || values.otp.length > 6) {
                    errors.otp = "* Otp must be 6 digit number";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  dispatch(verifyOtp({ otp: values.otp, email }));
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
                  <form
                    className="flex  flex-col gap-4 "
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      name="otp"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.otp}
                      placeholder="Enter otp...."
                      className="p-2 rounded-md  self-center focus:ring-2 w-[60%] "
                    />
                    <div className="text-red-6 bg-sky  text-red-800 font-semibold 2xl:text-lg">
                      {errors.otp && touched.otp && errors.otp}
                    </div>

                    <div className="grid text-white hover:font-semibold hover:text-navy">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-navy py-2  hover:text-cgreen hover:bg-white text-white px-10 my-4"
                      >
                        {" "}
                        Verify
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
