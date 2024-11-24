import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import toast from "react-hot-toast";
import Logout from "../components/Logout";
const EditBlog = () => {
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await apiClient.get(`/posts/${id}`);
          console.log("Fetched Blog Data:", response.data);
          setBlogData(response.data);
          setValue("title", response.data.title);
          setValue("content", response.data.content);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        const response = await apiClient.put(`/posts/${id}`, {
          title: data.title,
          content: data.content,
        });
        console.log("Updated Blog Response:", response.data.message);
        toast.success(response.data.message)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
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
