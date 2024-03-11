import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../Helpers/Firebase";
//validations
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLogin } from "./Validations/Validations";
import { LoginDTO } from "./Dtos/login";
import Input from "../Global/components/Input";
import BtnRedirect from "../Global/components/BtnRedirect";
import BtnForm from "../Global/components/BtnForm";
import FormComponent from "../Global/components/Form";
import BtnLoader from "../Global/components/BtnLoader";
import { loginService } from "./Services/login";
import { UseRouter } from "../Global/hooks/useRouter";
import { Toaster, toast } from "react-hot-toast";
import Logo from "../Shared/Components/logo";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(schemaLogin),
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
      } else {
        setUserEmail("");
      }
    });
    return unsubscribe;
  }, []);

  let msgBtnForm = "Iniciar sesion";

  const { redirect } = UseRouter();

  const handleLogin = async (data: LoginDTO) => {
    setLoader(true);
    const res = await loginService(data);
    const thereIsToken = res.data.token;
    if (thereIsToken) {
      redirect("/dashboard");
    } else toast.error(res.message, { duration: 3000 });
    setLoader(false);

    /*    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/dashboard");
      setLoader(false);
    } catch (err: any) {
      console.log(error);
    } */
  };

  const handleGoogleLogin = async () => {
    setLoader(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/dashboard");
      setLoader(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Logo size="60px"/>
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            React Mania
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <FormComponent
              handleForm={handleLogin}
              handleSubmit={handleSubmit}
              title="Iniciar sesion"
            >
              <Input
                error={errors.gmail}
                placeholder="name@gmail.com"
                label="Tu email"
                register={register("gmail")}
                type="gmail"
              />
              <Input
                error={errors.password}
                placeholder="Password"
                label="Tu contraseña"
                register={register("password")}
                type="password"
              />
              <BtnRedirect
                onClick={() => navigate("/forgotpassword")}
                txt="Olvidaste tu contraseña?"
              />
              {!loader ? (
                <BtnForm msg={msgBtnForm} />
              ) : (
                <BtnLoader txt={msgBtnForm} />
              )}
              <p className="flex justify-start gap-2">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                </p>
                <BtnRedirect
                  onClick={() => navigate("/signup")}
                  txt="Sign up"
                />
              </p>

              <button
                aria-label="Continue with google"
                role="button"
                onClick={handleGoogleLogin}
                className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
              >
                <svg
                  width={19}
                  height={20}
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                    fill="#EB4335"
                  />
                </svg>
                {userEmail ? (
                  <p className="text-primary-500 ml-4">{userEmail}</p>
                ) : (
                  <p className="text-base font-medium ml-4 text-gray-700">
                    Continue with Google
                  </p>
                )}
              </button>
            </FormComponent>
          </div>
        </div>
      </section>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default Login;
