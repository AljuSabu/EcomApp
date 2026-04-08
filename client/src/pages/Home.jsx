import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="min-h-screen">
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </>
  );
};

export default Home;
