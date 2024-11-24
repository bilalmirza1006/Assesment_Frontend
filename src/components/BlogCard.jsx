import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Modal = ({ isOpen, closeModal, title, content, blogId, setBlogs, blogs }) => {
    const navigate = useNavigate();
    const {  role } = useSelector((state) => state.auth);

    if (!isOpen) return null;
    const handleEdit = () => {
        closeModal();
        navigate(`/edit-blog/${blogId}`);
    };
    const handleDelete = async () => {
        try {
            const response = await apiClient.delete(`/posts/${blogId}`);
            console.log("response", response.data.message);
            toast.success(response.data.message);
            window.location.reload();
            closeModal()
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 xs:w-[90%]  sm:w-1/3 md:w-1/2 lg:w-1/3 ">
                <label className="block text-2xl pb-2 font-bold text-gray-700">Title</label>
                <p className=" mb-4 rounded-lg p-2 border-2">{title}</p>
                <div className="h-72  overflow-auto">
                    <label className="block text-2xl font-bold pb-2 text-gray-700">Description </label>
                    <p className=" h-60 rounded-lg p-2 border-2">{content}</p>
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <button
                            onClick={closeModal}
                            className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                        >
                            Close
                        </button>
                    </div>
                    <div>
                        {role === 'admin' &&
                            <div  className="space-x-3">

                                <button
                                    onClick={handleEdit}
                                    className="py-2 px-4  bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="py-2 px-4  bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlogCard = ({ blog, setBlogs, blogs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [title, setTitle] = useState("")
    const [id, setId] = useState("")

    const handleOpenModal = (content, blogTitle, _id) => {
        setModalContent(content);
        setTitle(blogTitle);
        setIsModalOpen(true);
        setId(_id)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalContent("");
    };

    if (!blog || typeof blog !== "object") {
        return (
            <div className="p-4 border rounded-lg shadow-md bg-white">
                <p className="text-red-500">Invalid blog data</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h3 className="text-xl font-semibold">{blog.title
                    ? blog.title.length > 50
                        ? `${blog.title.slice(0, 20)}...`
                        : blog.title
                    : "No description available"}</h3>
                <p className="h-12 text-gray-600 mt-2">
                    {blog.content
                        ? blog.content.length > 100
                            ? `${blog.content.slice(0, 70)}...`
                            : blog.content
                        : "No description available"}
                </p>
                <button
                    onClick={() => handleOpenModal(blog.content, blog.title, blog._id)}
                    className="mt-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700">
                    Details
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                closeModal={handleCloseModal}
                content={modalContent}
                title={title}
                blogId={blog._id}
                setBlogs={setBlogs}
                blogs={blogs}
            />
        </div>
    );
};

export default BlogCard;
