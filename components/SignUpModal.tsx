"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
//import { signIn } from "next-auth/react";
//import axios from "axios";
import { useRouter } from "next/navigation";

// import Spinner from "@/components/decoration/Spinner";
import close from "@/public/icons/close.png";
import eye from "@/public/icons/eye.png";

import "./SignUpModal.scss";

type SignUpType = {
  toggleSignModal: Function;
  isSignModalOpen: boolean;
  signType: "signIn" | "signUp";
};
type PasswordType = { vpassword: boolean; vcpassword: boolean };

const SignUpModal = ({
  toggleSignModal,
  isSignModalOpen,
  signType,
}: SignUpType) => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isSignInUp, setIsSignInUp] = useState(true);
  const [activeLabel, setActiveLabel] = useState({
    username: false,
    email: false,
    password: false,
    cpassword: false,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<PasswordType>({
    vpassword: false,
    vcpassword: false,
  });
  const [feedBack, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleSignIn = () => {
    setIsSignInUp((prev) => !prev);
  };

  const toggleVisiblePassword = (labelName: string) => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [labelName]: !prev[labelName as keyof PasswordType],
    }));
  };

  const handleActiveLabel = (labelName: string) => {
    setActiveLabel({
      username: false,
      email: false,
      password: false,
      cpassword: false,
      [labelName]: true,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // if (isSignInUp) {
    //   // User want to sign in
    //   try {
    //     const res = await signIn("credentials", {
    //       email,
    //       password,
    //       redirect: false,
    //       callbackUrl: "/serverpage",
    //     });

    //     if (res.error) {
    //       setFeedback(res.error);
    //     } else {
    //       router.refresh();
    //       setTimeout(() => {
    //         toggleSignModal();
    //       }, 1000);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     setFeedback("Could not sign you in!");
    //   }
    // } else if (!isSignInUp) {
    //   // User want to sign up
    //   if (password === cpassword) {
    //     try {
    //       const res = await axios.post(`/api/register`, {
    //         email,
    //         name: username,
    //         password,
    //       });
    //       if (res.data.message === "Success") {
    //         setFeedback("User created with success, you can Sign in!");
    //         setIsSignInUp((prev) => !prev);
    //       } else {
    //         setFeedback(res.error);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       setFeedback(err.response.data.error);
    //     }
    //   } else {
    //     setFeedback("Passwords don't match!");
    //   }
    // }
    setTimeout(() => {
      if (feedBack) {
        setFeedback("");
      }
    }, 2500);
    setIsLoading(false);
  };

  useEffect(() => {
    signType === "signIn" ? setIsSignInUp(true) : setIsSignInUp(false);
  }, [signType]);

  return (
    <div className={`signup-modal ${isSignModalOpen ? "open" : "close"}`}>
      <div className="modal">
        <Image
          src={close}
          alt="close"
          width={25}
          className="close-btn"
          onClick={() => toggleSignModal()}
        />

        <h3>{isSignInUp ? "Login" : "Create account"}</h3>
        <p>
          {isSignInUp ? "Don't have an account?" : "Already have an account?"}
          <span onClick={toggleSignIn}>
            {isSignInUp ? "Login here" : "Create an account here"}
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          {isSignInUp ? (
            ""
          ) : (
            <div>
              <label
                htmlFor="username"
                className={
                  activeLabel.username || username ? "active-label" : ""
                }
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => handleActiveLabel("username")}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className={activeLabel.email || email ? "active-label" : ""}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleActiveLabel("email")}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className={activeLabel.password || password ? "active-label" : ""}
            >
              Password
            </label>
            <input
              type={isPasswordVisible.vpassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleActiveLabel("password")}
            />
            <Image
              src={eye}
              alt="eye"
              width={25}
              className="eye"
              onClick={() => toggleVisiblePassword("vpassword")}
            />
          </div>
          {isSignInUp ? (
            ""
          ) : (
            <div>
              <label
                htmlFor="cpassword"
                className={
                  activeLabel.cpassword || cpassword ? "active-label" : ""
                }
              >
                Confirm password
              </label>
              <input
                type={isPasswordVisible.vcpassword ? "text" : "password"}
                id="cpassword"
                name="cpassword"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                onFocus={() => handleActiveLabel("cpassword")}
              />
              <Image
                src={eye}
                alt="eye"
                width={25}
                className="eye"
                onClick={() => toggleVisiblePassword("vcpassword")}
              />
            </div>
          )}

          {feedBack && <span>{feedBack}</span>}
          {/* {isLoading && <Spinner />} */}
          <button className="btn-violet">
            {isSignInUp ? "Login" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
