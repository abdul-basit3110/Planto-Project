import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import plantImage from "../assets/plant.jpg";

const AddPlants = () => {
  const nav = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/");
    }
  }, [nav]);

  const [formData, setFormData] = useState({
    plantname: "",
    type: "",
    category: "",
    description: "",
    price: "",
    status: "",
    image: null,
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const resetForm = () => {
    setFormData({
      plantname: "",
      type: "",
      category: "",
      description: "",
      price: "",
      status: "",
      image: null,
    });
    setUploadedImageUrl(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (!selectedFile) return;

    setImageUploading(true);
    setUploadedImageUrl(null);

    const data = new FormData();
    data.append("image", selectedFile);

    try {
      const response = await fetch(
        "https://eb-project-backend-kappa.vercel.app/api/v0/plants/uploadImage",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      console.log("Image upload success:", result);

      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          image: result.imageUrl,
        }));
        setUploadedImageUrl(result.imageUrl);
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong during image upload.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        "https://eb-project-backend-kappa.vercel.app/api/v0/plants/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log("Form submitted:", result);

      if (response.ok) {
        alert("Data uploaded successfully!");
        resetForm();
      } else {
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong during data upload.");
    }
  };

  return (
    <div className="flex h-screen">
      <LeftSidebar />

      <div className="flex pt-10 pl-10 bg-[#181D14] w-full h-screen overflow-y-auto">
        <div className="max-w-2xl rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-white">Add New Plant</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-1">Plant Name</label>
                <input
                  type="text"
                  name="plantname"
                  value={formData.plantname}
                  placeholder="Enter Plant Name"
                  onChange={handleChange}
                  className="w-full bg-[#232e24] text-white px-4 py-2 rounded-lg focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  placeholder="Enter Type of Plant"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 text-white bg-[#232e24] py-2 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full text-white bg-[#232e24] px-4 py-2 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="succulent">Succulent</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  placeholder="Enter Description"
                  onChange={handleChange}
                  rows={3}
                  className="w-full text-white px-4 py-2 bg-[#232e24] rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  placeholder="Enter Price"
                  onChange={handleChange}
                  className="w-full bg-[#232e24] text-white px-4 py-2 rounded-lg focus:outline-none"
                  required
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-white mb-2">Plant Image</label>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="rounded-2xl cursor-pointer w-20 h-20 border border-gray-400 mt-1 flex items-center justify-center bg-[#232e24]"
                >
                  {imageUploading ? (
                    <span className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full inline-block" />
                  ) : uploadedImageUrl ? (
                    <img
                      src={uploadedImageUrl}
                      alt="Uploaded Preview"
                      className="rounded-2xl w-20 h-20 object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm text-center px-2">Choose File</span>
                  )}
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-[#232e24] text-white px-4 py-2 rounded-lg focus:outline-none"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full md:w-[200px] bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Add Plant
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlants;

