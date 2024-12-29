import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import toast from "react-hot-toast";
import Logout from "../components/Logout";
import { useGetPostByIdQuery, useUpdatePostMutation } from "../reduxQuery/slice/authApi";
const EditBlog = () => {
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate()
  const { data: post, error, isLoading } = useGetPostByIdQuery(id);
  const [updatePost,] = useUpdatePostMutation();
  console.log("post", "id", id, post);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // const response = await apiClient.get(`/posts/${id}`);
          // console.log("Fetched Blog Data:", response.data);
          setBlogData(post);
          setValue("title", post.title);
          setValue("content", post.content);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      // Use the updatePost mutation
      const response = await updatePost({
        id: id, // Assuming post.id is passed as a prop or state
        data: {
          title: data.title, // Dynamically use data from the form
          content: data.content,
        },
      }).unwrap(); // Unwrap the resolved value for better error handling
  
      // Log and show a success message
      console.log('Updated Blog Response:', response.message);
      toast.success(response.message);
  
      // Optional: Navigate to another page after success
      navigate('/dashboard');
    } catch (error) {
      // Handle any errors
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog.');
    }
  };
  

  if (!blogData) return <div className=" w-full min-h-screen flex items-center justify-center">
    <p className="text-xl font-extrabold">Loading blog data...</p>;
  </div>

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <div className="w-full h-20  flex items-center justify-end px-4">
        <Logout />
      </div>
      <div className="flex-grow flex xs:p-4  items-center justify-center">
        <div className="xs:w-full md:w-2/3 bg-slate-300-600 bg-white mx-auto shadow-lg p-6 rounded-lg">
          <div className="w-full flex justify-center ">

            <h1 className="text-2xl  font-bold mb-4">Edit Blog</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block ext-3xl font-bold pb-2  text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="block w-full  rounded-lg p-2 border-2  mb-2"
            />
            <label className="block ext-3xl font-bold pb-2  text-gray-700">Description</label>
            <textarea
              placeholder="Description"
              {...register("content", { required: true })}
              className="block w-full  h-64 rounded-lg p-2 border-2    mb-2"
            ></textarea>
            <button type="submit" className=" bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 p-2 ">
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
