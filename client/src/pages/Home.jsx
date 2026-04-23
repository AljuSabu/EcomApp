import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../context/AuthContext";
import Carousel from "../components/card/Carousel";

const Home = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="min-h-screen mt-1">
        <div className="w-full">
          <Carousel />
        </div>
        
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </>
  );
};

export default Home;
