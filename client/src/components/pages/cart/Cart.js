import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../redux/actions/cartAction";
import { Link, useParams } from "react-router-dom";

import CartItem from "./CartItem";
import Loading from "../../common/Loading";

export default function Cart() {
  const { cart, loading } = useSelector((state) => state.cart);
  let subtotal = 0;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(id));
  }, [dispatch, id]);

  return (
    <section className="mt-[4%]">
      {loading ? (
        <Loading />
      ) : (
        <div class="mx-auto  mt-[4rem] max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div class="mx-auto max-w-3xl bg-white p-4 rounded-lg shadow-md ">
            <header class="text-center">
              <h1 class="text-4xl font-bold text-navy font-neon lg:text-6xl">
                My cart
              </h1>
            </header>
            {!cart || cart.length == 0 ? (
              <div className="text-center my-2 text-gray-400  text-lg ">
                Please add some products
              </div>
            ) : (
              <>
                <div class="mt-8 font-lora  ">
                  <div class="space-y-4 ">
                    {cart.items.length == 0 ? (
                      <div className="text-gray-500 text-lg text-center">
                        No products found yet
                      </div>
                    ) : (
                      cart.items.map((item) => {
                        subtotal += item.productId.price * item.quantity;

                        return (
                          <div>
                            <CartItem key={item.productId._id} item={item} />
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div class="w-screen max-w-lg space-y-4">
                      <dl class="space-y-0.5 text-sm text-gray-700">
                        <div class="flex justify-between">
                          <dt>Discount</dt>
                          <dd>0</dd>
                        </div>

                        <div class="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>{subtotal}</dd>
                        </div>
                      </dl>

                      <div class="flex justify-end">
                        <Link to="/checkout">
                          {" "}
                          <button class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
                            Checkout
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
