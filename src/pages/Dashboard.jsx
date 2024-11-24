import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import apiClient from "../api/apiClient";
import Logout from "../components/Logout";
const Dashboard = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    // const userType = useSelector((state) => state.userState.role);
    const {  role } = useSelector((state) => state.auth);

    console.log('role', role);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await apiClient.get(`/posts`);
                console.log("response.data", response.data);
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    console.log("dashboard blogs", blogs);

    const addBlogHandle = () => {
        navigate('/add-blog')
    }

    return (
        <div className="w-full min-h-screen py-10 p-6 bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-7xl flex justify-end pr-5">
                    <Logout />
                </div>
                <div className="flex flex-wrap items-center   justify-between p-4">
                    <h1 className="text-3xl font-semibold ">Dashboard</h1>
                    {
                        role === 'admin' &&
                        <button
                            onClick={addBlogHandle}
                            className="mt-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700">
                            Add Blog
                        </button>
                    }
                </div>
                {blogs.length === 0 ? (
                    <p className="text-xl text-center text-gray-600">No Blog Available</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {blogs.map((blog) => {
                            return (
                                <BlogCard key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
