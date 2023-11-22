import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../../redux/actions/orderActions";
export default function SingleOrderAdmin() {
  const { id } = useParams();
  const { order, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getSingleOrder({ id: id, token, user }));
    console.log(id);
  }, [dispatch, id]);

  return (
    <div className="flex text-center text-lg w-full min-h-screen h-full">
      <div className="bg-red-800 flex justify-center items-center w-full h-100 ">
        {loading ? (
          <Loading />
        ) : !order || order.length == 0 ? (
          <div>Order not found</div>
        ) : (
          <div className="bg-white   p-4 rounded-lg shadow-sm flex flex-col border-green-800 m-4 w-[90%] lg:w-[60%]">
            <div className="flex gap-2 ">
              <p>Tracking ID:</p>
              <p className="text-red-700">#{order._id}</p>
            </div>
            <div className="flex gap-2">
              <p>email:</p>
              <p className="font-semibold">{order.userId.email}</p>
            </div>
            <div className="flex gap-2">
              <p>user name:</p>
              <p className="font-semibold">{order.userId.userName}</p>
            </div>
            <div className="flex gap-2">
              <p>address:</p>
              <p className="font-semibold">{order.userId.address}</p>
            </div>
            <div className="flex gap-2">
              <p>city:</p>
              <p className="font-semibold">{order.userId.city}</p>
            </div>
            <div className="flex gap-2">
              <p>province:</p>
              <p className="font-semibold">{order.userId.province}</p>
            </div>
            <div className="flex gap-2 ">
              <p>Payment method:</p>
              <p className="text-red-700">{order.paymentMethod}</p>
            </div>
            <div className="flex gap-2 ">
              <p>Order status:</p>
              <p className="text-red-700">{order.status}</p>
            </div>
            <div className="flex gap-2 ">
              <p>Creation Date:</p>
              <p className="text-red-700">{order.createdAt}</p>
            </div>
            <div className="border-t py-2 my-2">
              {order.items.map((item) => {
                return (
                  <div className="flex font-merri items-center text-sm gap-x-8  border-b">
                    <div className="px-4 h-[3rem]">
                      <img
                        src={item.productId.image.url}
                        className="h-full "
                        alt="product"
                      />
                    </div>
                    <div className="flex text-start flex-col justify-evenly">
                      <p className="text-navy text-lg">title</p>
                      <p> Rs. {item.productId.price}</p>
                      <p className="text-gray-500">Qty : {item.quantity}</p>
                    </div>
                  </div>
                );
              }, [])}
            </div>
            <div className=" flex justify-center items-center">
              <div className=" w-[90%] ">
                <div class="mt-6 border-t border-b py-2">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Subtotal</p>
                    <p class="font-semibold text-gray-900">
                      Rs. {order.subtotal}
                    </p>
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Shipping</p>
                    <p class="font-semibold text-gray-900">
                      Rs. {order.shpping}
                    </p>
                  </div>
                </div>
                <div class="mt-6 flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Total</p>
                  <p class="text-xl font-semibold text-gray-900">
                    Rs {order.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
