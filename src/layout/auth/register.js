import { useState } from "react";
import { Link } from "react-router-dom";
import { registerAccount } from "../../actions/accountAction";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeCondition, setAgreeCondition] = useState(false);
  const [agreeNewsletter, setAgreeNewsletter] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== "" && confirmPassword === password && agreeCondition) {
      const data = await registerAccount({
        username: username,
        password: password,
      });
    } else {
      alert("Check Password again!");
    }
  };
  return (
    <>
      <div className="w-full flex justify-center md:px-10 py-20 h-full min-h-[calc(100vh-179px)]">
        <div className="w-[400px] sm:w-[300px] mx-auto my-auto flex flex-col gap-3 p-6 dark:bg-[#111a2e] bg-white rounded-[8px] shadow-md">
          <div className="text-center mb-5 flex flex-col gap-2">
            <span className="dark:text-white text-dark font-semibold">
              Sign Up
            </span>
            <span className="dark:text-[#93a3b8] text-[14px]">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="dark:text-darkIconColor text-[#0784c3] text-[14px]"
              >
                Sigin In here
              </Link>
            </span>
          </div>
          <form onSubmit={registerHandler}>
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="dark:text-white text-black bg-transparent text-[14px] border px-3 py-2 rounded-md flex justify-center items-center"
                placeholder="*******"
              />
            </div>
            <div className="flex flex-row items-center mt-3">
              <input
                id="default-checkbox"
                type="checkbox"
                value={agreeCondition}
                onChange={() => setAgreeCondition(!agreeCondition)}
                className="text-blue-400 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              ></input>
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-9000 dark:text-gray-300"
              >
                I agree to the Terms and Conditions.
              </label>
            </div>
            <div className="flex items-start mt-3">
              <input
                id="default-checkbox2"
                type="checkbox"
                value={agreeNewsletter}
                onChange={() => setAgreeNewsletter(!agreeNewsletter)}
                className="mt-[3px] text-blue-400 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              ></input>
              <label
                htmlFor="default-checkbox2"
                className="ms-2 text-sm font-medium text-gray-9000 dark:text-gray-300 text-left"
              >
                I would like to receive the Adrestus newsletter and understand
                that I can unsubscribe at anytime.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0784c3] py-2 rounded-md text-white hover:bg-[#0670a6] text-[14px] font-medium tracking-tight mt-16"
            >
              Create an Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
