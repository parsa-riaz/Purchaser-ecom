import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../common/Loading";
import { deleteUser, getAllUsers } from "../../../redux/actions/authAction";

export default function Users() {
  const dispatch = useDispatch();
  const { user, token, users, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers({ token, user }));
  }, [dispatch, user, token]);
  return (
    <div className="flex justify-end w-full min-h-screen h-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-red-800 w-[80%] h-100 ">
          <div class="text-gray-900">
            <div class="p-4 flex">
              <h1 class="text-3xl">Users</h1>
            </div>
            <div class="px-3 py-4 flex justify-center">
              <table class="w-full text-md bg-white shadow-md rounded mb-4">
                <thead>
                  <tr className="text-lg h-[4rem]">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="px-4">
                  {!users ? (
                    <tr className="text-center text-xl w-full">
                      <div>User not found</div>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border text-lg gray-500 p-4 h-[4rem] text-center"
                      >
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => {
                              dispatch(deleteUser({ id: user._id, token }));
                            }}
                            className="bg-navy text-white py-1 px-2 hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
