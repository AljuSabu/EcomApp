import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
      <div className="size-10 border-4 border-dashed border-slate-500 rounded-full animate-[spin_3s_linear_infinite]" />
      <div>Loading...</div>
    </div>
  );
};

export default Loader;


// const Loader = () => {
//   const [count, setCount] = useState(3);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((prev) => --prev);
//     }, 1000);
//     count === 0 && navigate("/login", { state: location.pathname });

//     return () => clearInterval(interval);
//   }, [count, navigate, location]);

//   return (
//     <>
//       <div className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
//         <div className="size-10 border-4 border-dashed border-slate-500 rounded-full animate-[spin_3s_linear_infinite]" />
//         <div>{`Redirecting in ${count}`}</div>
//       </div>
//     </>
//   );
// };