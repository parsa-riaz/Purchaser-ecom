import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

export default function CartHome() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    !user ? navigate("/login") : navigate(`/cart/${user._id}`);
  }, []);
  return <section className="mt-[4%]"></section>;
}
