import {
  faAddressBook,
  faAt,
  faCity,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../../redux/reducers/cartSlice";
import { getUser } from "../../../redux/actions/authAction";

export default function Checkout() {
  const { cart, success } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      getUser({ id: user._id, token });
    }
  }, []);
  useEffect(() => {
    if (success === true) {
      dispatch(handleSuccess());
      navigate("/ordersuccess");
    }
  }, [success, navigate, dispatch]);
  let subtotal = 0;
  return (
    <>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-[4rem]">
        {cart.items.length == 0 ? (
          <div className="mt-[4rem] w-full text-gray-500 text-lg text-center">
            Please add some products in cart to checkout
          </div>
        ) : (
          <>
            <div class="px-4 pt-10">
              <p class="text-xl text-center font-medium">Order Summary</p>
              <p class="text-gray-400 text-center">
                Check your items. And select a suitable shipping method.
              </p>
              <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                {cart.items.map((item) => {
                  subtotal += item.productId.price * item.quantity;
                  return (
                    <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                      <img
                        class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                        src={item.productId.image.url}
                        alt=""
                      />
                      <div class="flex w-full flex-col px-4 py-4">
                        <span class="font-semibold">
                          {item.productId.title}
                        </span>
                        <span class="float-right text-gray-400">
                          Qty: {item.quantity}
                        </span>
                        <p class="text-lg font-bold">
                          Rs. {item.quantity * item.productId.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p class="mt-8 text-lg font-medium">Payment Methods</p>

              <form class="mt-5 grid gap-6">
                <div class="relative">
                  <input
                    class="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    checked
                  />
                  <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    for="radio_1"
                  >
                    <img
                      class="w-14 object-contain"
                      src="/images/naorrAeygcJzX0SyNI4Y0.png"
                      alt=""
                    />
                    <div class="ml-5">
                      <span class="mt-2 font-semibold">Cash On Delivery</span>
                      <p class="text-slate-500 text-sm leading-6">
                        Delivery: 2-4 Days
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            </div>

            <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <p class="text-xl font-medium">Payment Details</p>
              <p class="text-gray-400">
                Complete your order by providing your payment details.
              </p>
              <Formik
                initialValues={{
                  email: user.email,
                  address: user.address,
                  phone: user.phone,
                  city: user.city,
                  province: user.province,
                  userId: user._id,
                  subtotal: 0,
                  shipping: 150,
                  total: 0,
                }}
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
                  if (values.phone == "") {
                    errors.phone = "Enter your  phone number";
                  } else if (
                    values.phone.length < 11 ||
                    values.phone.length > 11
                  ) {
                    errors.phone = "Invalid phone number";
                  }
                  if (!values.address) {
                    errors.address = "Please enter your address";
                  }
                  if (!values.city) {
                    errors.city = "Please enter your city";
                  }

                  if (!values.province) {
                    errors.province = "Please enter your province";
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(false);
                  let items = cart.items.map((item) => {
                    return {
                      productId: item.productId._id,
                      quantity: item.quantity,
                    };
                  });
                  values.userId = user._id;
                  values.subtotal = subtotal;
                  values.shipping = 150;
                  values.total = subtotal + 150;
                  values.items = items;
                  console.log(values);
                  dispatch(checkout({ data: values }));
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
                      </div>
                    </div>
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
                        <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                          {errors.province &&
                            touched.province &&
                            errors.province}
                        </div>
                      </div>
                    </div>
                    <div class="mt-6 border-t border-b py-2">
                      <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">
                          Subtotal
                        </p>
                        <p class="font-semibold text-gray-900">
                          Rs. {subtotal}
                        </p>
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">
                          Shipping
                        </p>
                        <p class="font-semibold text-gray-900">Rs. 150</p>
                      </div>
                    </div>
                    <div class="mt-6 flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-900">Total</p>
                      <p class="text-2xl font-semibold text-gray-900">
                        Rs {subtotal + 150}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                    >
                      Place Order
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </>
        )}
      </div>
    </>
  );
}
