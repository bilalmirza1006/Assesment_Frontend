import { useState } from "react";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/slice/authSlice";
import toast from "react-hot-toast";
const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm();
    const [passwordVisibility, setPasswordVisibility] = useState({ password: false, confirmPassword: false });

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const onSubmit = async (data) => {
        console.log("data", data);
        try {
            const res = await dispatch(register(data)).unwrap();
            console.log("res", res);
            toast.success("user successfully registered")
            navigate('/dashboard')
        } catch (err) {
            toast.error(err);
            console.log("Registration error:", err);
        }
    };

    const signInHandle = () => {
        navigate("/");
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  px-6">
                <div className="flex flex-col justify-center bg-white rounded-tl-lg rounded-bl-lg shadow-lg p-8">
                    <h2 className="text-center text-3xl font-bold mb-8">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="relative">
                            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type</label>
                            <Controller
                                name="role"
                                control={control}
                                rules={{ required: "User type is required" }}
                                render={({ field }) => (
                                    <select {...field} className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="">Select User Type</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                )}
                            />
                            {errors.userType && (
                                <div className="absolute inset-x-0 bottom-[-18px]">
                                    <p className="text-xs text-red-500">{errors.userType.message}</p>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: "Username is required" }}
                                render={({ field }) => (
                                    <CustomInput placeholder="Enter username" {...field} />
                                )}
                            />
                            {errors.username && (
                                <div className="absolute inset-x-0 bottom-[-18px]">
                                    <p className="text-xs text-red-500">{errors.username.message}</p>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "Invalid email address",
                                    },
                                }}
                                render={({ field }) => (
                                    <CustomInput
                                        type="email"
                                        placeholder="Enter email"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && (
                                <div className="absolute inset-x-0 bottom-[-18px]">
                                    <p className="text-xs text-red-500">{errors.email.message}</p>
                                </div>
                            )}

                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Password is required",
                                }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <CustomInput
                                            type={passwordVisibility.password ? "text" : "password"}
                                            placeholder="Enter password"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                            onClick={() => togglePasswordVisibility('password')}
                                        >
                                            {passwordVisibility.password ? <FaEyeSlash /> : <FaEye />}
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
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                rules={{
                                    required: "Confirm password is required",
                                    validate: (value) => {
                                        return value === getValues("password") || "Passwords do not match"; 
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <CustomInput
                                            type={passwordVisibility.confirmPassword ? "text" : "password"}
                                            placeholder="Confirm password"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                            onClick={() => togglePasswordVisibility('confirmPassword')}
                                        >
                                            {passwordVisibility.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        {errors.confirmPassword && (
                                            <div className="absolute inset-x-0 bottom-[-18px]">
                                                <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
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
                                className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 hover:shadow-lg"}`}
                            >
                                {isSubmitting ? "Submitting..." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <button onClick={signInHandle} className="text-blue-500 hover:underline">
                            Already have an account? <span className="font-semibold">Sign In</span>
                        </button>
                    </div>
                </div>
                <div className="hidden md:block rounded-tr-lg rounded-br-lg">
                    <img
                        src="https://cdn.pixabay.com/photo/2020/07/14/13/39/cornflower-5404185_1280.jpg"
                        alt="Sign Up"
                        className="w-full h-full object-cover rounded-tr-lg rounded-br-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
