import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routers } from "./_routes";
import { getLocalStorage } from "../../utils/localStorage";
import Loading from "../../components/Admin/Loading/Loading";
const AppContent = () => {
  // used leter
  // const { data } = useGetLoginUserQuery();
  let data;
  const navigate = useNavigate();
  const token = getLocalStorage("quickinvest_token");

  useEffect(() => {
    if (!token) {
      navigate("/adminlogin");
      console.log("not implemented yet");
    }
  }, [navigate, token]);

  const perRoute = routers?.filter((rt) =>
    rt?.permission?.includes(data?.data?.role || "admin")
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <>
            {perRoute?.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.component />}
                  />
                )
              );
            })}
          </>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppContent;
