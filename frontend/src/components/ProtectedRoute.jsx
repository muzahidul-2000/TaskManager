import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      return;
    }

    fetch("http://localhost:5000/protected", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          setIsAuth(true);
        } else {
          localStorage.removeItem("token");
          setIsAuth(false);
        }
      })
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;