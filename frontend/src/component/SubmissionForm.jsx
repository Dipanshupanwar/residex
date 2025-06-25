import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubmissionForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    flatNo: "",
    towerName: "",
    residentType: "",
    name: "",
    mobile: "",
    email: "",
    vehicle: false,
    fourWheeler: false,
    fourWheelerNumber: "",
    twoWheeler: false,
    twoWheelerNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const baseURL = import.meta.env.VITE_path;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/submit`, form);
      alert("Form submitted successfully!");
      setForm({
        flatNo: "",
        towerName: "",
        residentType: "",
        name: "",
        mobile: "",
        email: "",
        vehicle: false,
        fourWheeler: false,
        fourWheelerNumber: "",
        twoWheeler: false,
        twoWheelerNumber: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        
        {/* Logo and Heading Section */}
        <div className="flex items-center justify-between mb-6">
          <img
            src="public/apollo-bd-city.jpg" // Update with correct image path
            alt="Apollo Logo"
            className="h-12 w-auto"
          />
          <div className="text-right w-full">
            <h1 className="text-2xl font-bold text-blue-700">
              APOLLO DB City
            </h1>
            <h2 className="text-lg font-semibold text-blue-600">
              Resident Details Submission Form
            </h2>
          </div>
        </div>

        {/* Form Starts */}
        <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">

          <div className="sm:col-span-2">
            <input
              type="text"
              name="flatNo"
              value={form.flatNo}
              onChange={handleChange}
              placeholder="Flat No"
              className="w-full px-4 py-2 border rounded focus:outline-blue-500"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <select
              name="towerName"
              value={form.towerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded text-gray-600 focus:outline-blue-500"
              required
            >
              <option value="">Select Tower Name</option>
              <option value="aurum-1">aurum-1</option>
              <option value="aurum-2">aurum-2</option>
              <option value="eldora-1">eldora-1</option>
              <option value="oracia-1">oracia-1</option>
              <option value="orville-1">orville-1</option>
              <option value="orville-2">orville-2</option>
              <option value="cressida-1">cressida-1</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              name="residentType"
              value={form.residentType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded text-gray-600 focus:outline-blue-500"
              required
            >
              <option value="">Select Resident Type</option>
              <option value="Owner">Owner</option>
              <option value="Tenant">Tenant</option>
            </select>
          </div>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded focus:outline-blue-500"
            required
          />
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full px-4 py-2 border rounded focus:outline-blue-500"
            required
          />

          <div className="sm:col-span-2">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded focus:outline-blue-500"
              required
            />
          </div>

          <div className="sm:col-span-2 space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="vehicle"
                checked={form.vehicle}
                onChange={handleChange}
              />
              Has Any Vehicle
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="fourWheeler"
                checked={form.fourWheeler}
                onChange={handleChange}
              />
              Has Four Wheeler
            </label>

            {form.fourWheeler && (
              <input
                type="text"
                name="fourWheelerNumber"
                placeholder="Enter Four Wheeler Number"
                value={form.fourWheelerNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-blue-500"
                required
              />
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="twoWheeler"
                checked={form.twoWheeler}
                onChange={handleChange}
              />
              Has Two Wheeler
            </label>

            {form.twoWheeler && (
              <input
                type="text"
                name="twoWheelerNumber"
                placeholder="Enter Two Wheeler Number"
                value={form.twoWheelerNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-blue-500"
                required
              />
            )}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
            >
              Submit Form
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/admin")}
            className="text-blue-700 underline hover:text-blue-900"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
