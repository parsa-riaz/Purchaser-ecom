import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../../redux/actions/productsAction";

export default function AddProduct() {
  const categories = [
    "perfumes",
    "men",
    "women",
    "shoes",
    "jwellery",
    "furniture",
    "electronics",
    "mobiles",
  ];
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  return (
    <div className="bg-red-700 w-full flex justify-end  lg:h-full h-auto">
      <div className=" mr-[8%]  my-[4%] w-[60%]  h-auto ">
        <div className=" w-full h-auto bg-sky rounded-lg">
          <div className="p-4 text-center text-2xl md:text-3xl text-navy font-semibold">
            <p>Add Prooduct</p>
          </div>
          <div className="">
            <Formik
              initialValues={{
                title: "",
                price: 0,
                discription: "",
                category: "",
                image: null,
              }}
              validate={(values) => {
                const errors = {};
                if (values.title == "") {
                  errors.title = "Please enter the title";
                }
                if (values.price == "") {
                  errors.price = "Please enter the price";
                }
                if (!values.discription) {
                  errors.discription = "Enter discription";
                }
                if (!values.category) {
                  errors.category = "Please choose a catgeory";
                }
                if (!values.image) {
                  errors.image = "Please enter 1 image";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);

                dispatch(addNewProduct({ data: values, token, user }));
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
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
                        Title
                      </label>
                      <div class="relative">
                        <input
                          type="text"
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                          placeholder="enter product title"
                          class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        />

                        <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                          {errors.title && touched.title && errors.title}
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2  ">
                      <label
                        for="price"
                        class="mt-4 mb-2 block text-sm font-medium"
                      >
                        Price
                      </label>
                      <div class="relative">
                        <input
                          type="number"
                          name="price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                          placeholder="enter price"
                          class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        />

                        <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                          {errors.price && touched.price && errors.price}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-center gap-x-8 w-[80%]  items-center">
                    <div className="w-full">
                      <label
                        for="discription"
                        class="mt-4 mb-2 block text-sm font-medium"
                      >
                        Discription
                      </label>
                      <div class="relative">
                        <textarea
                          type="text"
                          name="discription"
                          id="discription"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.discription}
                          class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="enter color name qualities etc"
                        />

                        <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                          {errors.discription &&
                            touched.discription &&
                            errors.discription}
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
                        Category
                      </label>
                      <div class="flex flex-col sm:flex-row">
                        <div class="relative flex-shrink-0 w-full">
                          <select
                            className="mt-2 p-2 w-full rounded-lg shadow-md hover:border-orange"
                            onChange={(e) => {
                              setFieldValue("category", e.target.value);
                            }}
                            value={values.category} // For making it a controlled component
                          >
                            <option value="">Select</option>

                            {categories.map((option, index) => (
                              <option
                                className="box f_flex"
                                key={index}
                                value={option}
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                          <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                            {errors.category &&
                              touched.category &&
                              errors.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2  ">
                      <label
                        for="userName"
                        class="mt-4 mb-2 block text-sm font-medium"
                      >
                        Product Image
                      </label>
                      <div class="relative">
                        <input
                          type="file"
                          onChange={(e) => {
                            console.log(e.target.files[0]);
                            let reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setFieldValue("image", reader.result);
                                setPreview(reader.result);
                              }
                            };
                          }}
                          class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        />

                        <div className="text-red-700 text-start font-semibold 2xl:text-lg">
                          {errors.image && touched.image && errors.image}
                        </div>
                      </div>
                    </div>
                  </div>

                  {preview ? (
                    <div className="my-4 h-[6rem] w-[6rem]">
                      <img src={preview} alt="preview" />{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    class="mt-4 mb-8 my-4  rounded-md bg-navy hover:bg-zinc py-3 px-6 font-medium text-white"
                  >
                    Add Product
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
