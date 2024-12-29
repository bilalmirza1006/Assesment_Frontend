import { useForm } from "react-hook-form";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logout from "../components/Logout";
import { useAddBlogMutation, useGetUsersQuery } from "../reduxQuery/slice/authApi";

const AddBlog = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const navigate = useNavigate();
    const [addBlog, { isLoading: isLoginLoading, error: loginError }] = useAddBlogMutation();
    const { data: users } = useGetUsersQuery()
    const getAllUser = users ?? []
    console.log("users", getAllUser);

    const onSubmit = async (data) => {
        console.log("data", data);
        
        try {
            console.log("Form data:", data);
            const result = await addBlog(data).unwrap();
            console.log("result:", result);

            // const response = await apiClient.post(`/posts`, {
            //     title: data.title,
            //     content: data.content,
            //     author: data.author,
            // });
            // toast.success(response.data.message);
            navigate('/dashboard');
            // reset();
        } catch (error) {
            console.error('Error adding blog:', error);
            toast.error('Failed to add blog.');
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-100">
            <div className="w-full flex justify-end p-4">
                <Logout />
            </div>
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="xs:w-full md:w-2/3 bg-slate-300-600 bg-white mx-auto shadow-lg p-4 rounded-lg">
                    <div className="p-6">
                        <div className="w-full flex justify-center">
                            <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative mb-5">

                                <label className="block text-xl font-bold pb-2 text-gray-700">Author</label>
                                <select
                                    {...register("author", { required: "Author is required" })} // Bind to react-hook-form
                                    className="block w-full border p-2 rounded mb-2"
                                >
                                    <option value="">Select an author</option> {/* Default option */}
                                    {getAllUser.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.username} {/* Display user name */}
                                        </option>
                                    ))}
                                </select>

                                {errors.author && (
                                    <div className="absolute inset-x-0 bottom-[-25px] text-xs text-red-500 mb-2">{errors.author.message}</div>
                                )}
                            </div>
                            <div className="relative mb-5">

                                <label className="block text-xl font-bold pb-2 text-gray-700">Title</label>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    {...register("title", { required: "Title is required" })}
                                    className="block w-full border p-2 rounded mb-2"
                                />
                                {errors.title && (
                                    <div className="absolute inset-x-0 bottom-[-25px] text-xs text-red-500 mb-2">{errors.title.message}</div>
                                )}
                            </div>

                            <div className="relative mb-5">

                                <label className="block text-xl font-bold pb-2 text-gray-700">Description</label>
                                <textarea
                                    placeholder="Description"
                                    {...register("content", { required: "Content is required" })}
                                    className="block h-64 w-full border p-2 rounded mb-2"
                                ></textarea>
                                {errors.content && (
                                    <div className="absolute inset-x-0 bottom-[-25px] text-xs text-red-500 mb-2">{errors.content.message}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 p-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Adding...' : 'Add Blog'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
