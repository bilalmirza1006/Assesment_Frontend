import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/slice/authSlice";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { connectSocket } from "../socket/socket";
import { useLoginMutation } from "../reduxQuery/slice/authApi";
// import queryStore from "../reduxQuery/queryStore";
import { loggedIn } from "../reduxQuery/reducer/mainSlice";
const SignIn = () => {
    const dispatch = useDispatch();
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    // const { token } = useSelector((state) => state.auth);
    /// redux tooklit 
    // const onSubmit = async (data) => {
    //     try {
    //         const result = await dispatch(login(data)).unwrap();
    //         toast.success("Login successful!");
    //         // log
    //         connectSocket(token);

    //         navigate('/dashboard');
    //         console.log("Token received:", result);
    //     } catch (err) {
    //         toast.error(err || "Login failed!");
    //         console.error("Error:", err);
    //         console.error("Error during login:", err);
    //     }
    // }

    /// redux toolkit query
    const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
    const token  = useSelector((state) => state.user?.isLoggedIn);
    // console.log("token sigin prouyewgj", token);
    const onSubmit = async (loginCredentials) => {
        try {
            const result = await login(loginCredentials).unwrap();
            dispatch(loggedIn(result));
            connectSocket(token);
            // localStorage.setItem("token", result.token);
            // localStorage.setItem("role", result.role);
            // console.log("Login Successful", result);
            navigate('/dashboard');

        } catch (error) {
            console.error("Login Failed", error);
        }
    }

    const signUpHandle = () => {
        navigate("/signup");
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 ">
                <div className="flex flex-col justify-center bg-white rounded-tl-lg rounded-bl-lg shadow-lg p-8">
                    <h2 className="text-center text-3xl font-bold mb-8">Sign In</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">username</label>
                            <Controller
                                name="username"
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                }}
                                render={({ field }) => (
                                    <>
                                        <CustomInput
                                            type="text"
                                            placeholder="Enter name"
                                            className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            {...field}
                                        />
                                        {errors.username && (
                                            <div className="absolute inset-x-0 bottom-[-18px]">
                                                <p className="text-xs text-red-500">{errors.username.message}</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: 'Password is required',
                                }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <CustomInput
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        {errors.password && (
                                            <div className="absolute inset-x-0 bottom-[-18px]">
                                                <p className="text-xs text-red-500">{errors.password.message}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 hover:shadow-lg'
                                    }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <button onClick={signUpHandle} className="text-blue-500 hover:underline">
                            If you don’t have an account: <span className="font-semibold">Sign Up</span>
                        </button>
                    </div>
                </div>
                <div className="hidden md:block  rounded-tr-lg rounded-br-lg">
                    <img
                        src="https://cdn.pixabay.com/photo/2020/07/14/13/39/cornflower-5404185_1280.jpg"
                        alt="Sign In"
                        className="w-full h-full object-cover   rounded-tr-lg rounded-br-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
