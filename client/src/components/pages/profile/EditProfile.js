import {
  faAddressBook,
  faAt,
  faCity,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="relative top-0 z-10 flex justify-center items-center h-auto py-[4rem] bg-slate-600/30">
      <div className=" w-[95%] lg:w-[80%] h-auto bg-sky rounded-lg">
        <div className="p-4 text-center text-2xl md:text-3xl text-navy font-semibold">
          <p>Edit your profile</p>
        </div>
        <div>
          <Formik
            initialValues={{
              userName: user.userName,
              email: user.email,
              address: user.address,
              phone: user.phone,
              city: user.city,
              province: user.province,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.userName) {
                errors.userName = "Please enter your full name";
              }
              if (!values.email) {
                errors.email = "Email required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (values.phone == "") {
                errors.phone = "Enter your  phone number";
              } else if (values.phone.length != 11) {
                errors.phone = "Invalid phone number";
              }
              if (!values.address) {
                errors.address = "Please enter your address";
              }
              if (!values.city) {
                errors.city = "Please enter your city";
              }

              if (!values.province) {
                errors.address = "Please enter your province";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              dispatch(
                updateUser({ id: user._id, formData: values, token: token })
              );
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
              <form
                className="flex  w-full justify-center items-center flex-col gap-4 "
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col lg:flex-row justify-center gap-x-8 w-[80%]  items-center">
                  <div className="lg:w-1/2  ">
                    <label
                      for="userName"
                      class="mt-4 mb-2 block text-sm font-medium"
                    >
                      User Name
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        name="userName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userName}
                        placeholder="enter your full name"
                        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div class="pointer-events-none text-gray-400 absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                        {errors.userName && touched.userName && errors.userName}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2  ">
                    <label
                      for="email"
                      class="mt-4 mb-2 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="enter your full name"
                        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div class="pointer-events-none text-gray-400 absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <FontAwesomeIcon icon={faAt} />
                      </div>
                      <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                        {errors.email && touched.email && errors.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-center gap-x-8 w-[80%]  items-center">
                  <div className="lg:w-1/2">
                    <label
                      for="phone"
                      class="mt-4 mb-2 block text-sm font-medium"
                    >
                      Phone no
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="03xx-xxxxxxxx"
                      />
                      <div class="pointer-events-none  text-gray-400 absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <FontAwesomeIcon icon={faPhone} />
                      </div>
                      <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                        {errors.phone && touched.phone && errors.phone}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <label
                      for="address"
                      class="mt-4 mb-2 block text-sm font-medium"
                    >
                      Address
                    </label>
                    <div class="flex">
                      <div class="relative w-full flex-shrink-0">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="full address "
                        />
                        <div class="pointer-events-none text-gray-400 absolute inset-y-0 left-0 inline-flex items-center px-3">
                          <FontAwesomeIcon icon={faAddressBook} />
                        </div>
                        <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                          {errors.address && touched.address && errors.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-center gap-x-8 w-[80%]  items-center">
                  <div className="lg:w-1/2  ">
                    <label
                      for="city"
                      class="mt-4 mb-2 block text-sm font-medium"
                    >
                      City
                    </label>
                    <div class="flex flex-col sm:flex-row">
                      <div class="relative flex-shrink-0 w-full">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          class="w-full rounded-md border lowercase border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="city name"
                        />
                        <div class="pointer-events-none absolute text-gray-400 inset-y-0 left-0 inline-flex items-center px-3">
                          <FontAwesomeIcon icon={faCity} />
                        </div>
                        <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                          {errors.city && touched.city && errors.city}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2  ">
                    <label
                      for="province"
                      class="mt-4 mb-2 block text-sm font-medium"
                    >
                      Province
                    </label>
                    <div class="flex flex-col sm:flex-row">
                      <div class="relative flex-shrink-0 w-full">
                        <input
                          type="text"
                          id="province"
                          name="province"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.province}
                          class="w-full rounded-md border lowercase border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Provice name"
                        />
                        <div class="pointer-events-none absolute text-gray-400 inset-y-0 left-0 inline-flex items-center px-3">
                          <FontAwesomeIcon icon={faCity} />
                        </div>
                      </div>
                      <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                        {errors.province && touched.province && errors.province}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  class="mt-4 mb-8 my-4  rounded-md bg-navy hover:bg-zinc py-3 px-6 font-medium text-white"
                >
                  Edit Profile
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
