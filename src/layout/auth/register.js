import { useState } from "react";
import { Link } from "react-router-dom";
import { authenticate } from "../../actions/accountAction";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    const { token, expiration } = await authenticate({
      username: username,
      password: password,
    });

    //console.log("response:", token, expiration);
  };
  return (
    <>
      <div className="w-full flex justify-center md:px-10 py-20">
        <div className="w-[400px] sm:w-[300px] mx-auto my-auto flex flex-col gap-3 p-6 dark:bg-[#111a2e] bg-white rounded-[8px] shadow-md">
          <div className="text-center mb-5 flex flex-col gap-2">
            <span className="dark:text-white text-dark font-semibold">
              Sign Up
            </span>
            <span className="dark:text-[#93a3b8] text-[14px]">
              Already have an account?&nbsp;
              <Link
                to="/register"
                className="dark:text-darkIconColor text-[#0784c3] text-[14px]"
              >
                Sigin In here
              </Link>
            </span>
          </div>
          <form>
            <div className="w-full flex flex-col gap-2 text-left">
              <label className="dark:text-white text-black text-[13px]">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="dark:text-white text-black bg-transparent text-[14px] border px-3 py-2 rounded-md"
                placeholder="e.g.johndoe"
              />
            </div>
            <div className="w-full flex flex-col gap-2 text-left mt-6">
              <div className="w-full flex flex-row justify-between items-center">
                <label className="dark:text-white text-black text-[13px]">
                  Password
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark:text-white text-black bg-transparent text-[14px] border px-3 py-2 rounded-md flex justify-center items-center"
                placeholder="*******"
              />
            </div>
            <div className="w-full flex flex-col gap-2 text-left mt-6">
              <div className="w-full flex flex-row justify-between items-center">
                <label className="dark:text-white text-black text-[13px]">
                  Confirm Password
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark:text-white text-black bg-transparent text-[14px] border px-3 py-2 rounded-md flex justify-center items-center"
                placeholder="*******"
              />
            </div>
            <button
              onClick={registerHandler}
              className="w-full bg-[#0784c3] py-2 rounded-md text-white hover:bg-[#0670a6] text-[14px] font-medium tracking-tight mt-16"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;