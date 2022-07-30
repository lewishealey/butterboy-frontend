import { useState, useEffect } from "react";
import Head from "next/head";

function Protect({ children }) {
  return (
    <PasswordProtect password={process.env.DASHBOARD_PASSWORD}>
      {children}
    </PasswordProtect>
  );
}

export default Protect;

const PasswordProtect = ({ password, children }) => {
  const [isValid, setIsValid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pwString, setPwString] = useState("");

  function checkPassword() {
    if (pwString === password) {
      setIsValid(true);
      window.localStorage.setItem("logged-in", true);
    }
  }

  useEffect(function () {
    const loggedIn = window.localStorage.getItem("logged-in");
    if (loggedIn) {
      setIsLoaded(true);
      setIsValid(true);
    }
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {isValid ? (
        children
      ) : (
        <div className="relative bg-cream h-screen w-screen bg-cover p-8">
          <Head>
            <title>Please Login / Butterboy order dashboard</title>
          </Head>
          <div className="bg-white w-full h-full flex justify-center items-center">
            <div className="max-w-xl m-auto flex flex-col space-y-4">
              <img
                src="mark_red.svg"
                className="square m-auto my-2"
                style={{ width: "80%" }}
              />

              <input
                defaultValue={pwString}
                type="password"
                className="bg-white border h-11 rounded px-2"
                placeholder="Password"
                onChange={(e) => setPwString(e.target.value)}
                onKeyDown={(e) => setPwString(e.target.value)}
              />
              <button
                onClick={checkPassword}
                className="bg-vibrant text-white font-display border h-11 rounded w-full uppercase"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
