import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({});
  const baseURL = import.meta.env.VITE_path;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminAuth");
    if (!isLoggedIn) {
      navigate("/admin");
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    const res = await axios.get(`${baseURL}/api/data`);
    setData(res.data);
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm(item);
  };

  const handleUpdate = async () => {
    try {
      const { _id, __v, ...cleanForm } = form;
      const res = await axios.put(`${baseURL}/api/update/${editId}`, cleanForm);
      console.log("Updated:", res.data);
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this entry?");
    if (confirm) {
      await axios.delete(`${baseURL}/api/delete/${id}`);
      fetchData();
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Residents");
    XLSX.writeFile(wb, "resident-data.xlsx");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  const filteredData = data.filter((item) =>
    item.flatNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
  <h2 className="text-2xl font-bold text-blue-700">Admin Dashboard</h2>

  <div className="flex gap-2">
    <button
      onClick={() => navigate("/")}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Go to Form
    </button>
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  </div>
</div>


      {/* Search and Export */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by Flat No."
          className="border px-3 py-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleExport}
        >
          Export to Excel
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-xs sm:text-sm">
              {[
                "Flat No",
                "Tower",
                "Type",
                "Name",
                "Mobile",
                "Email",
                "Vehicle",
                "4W",
                "4W Number",
                "2W",
                "2W Number",
                "Date",
                "Actions",
              ].map((h, i) => (
                <th key={i} className="p-2 border whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id} className="border">
                {editId === item._id ? (
                  <>
                    <td>
                      <input
                        value={form.flatNo}
                        onChange={(e) => setForm({ ...form, flatNo: e.target.value })}
                        className="w-full border px-1"
                      />
                    </td>
                    <td>
                      <input
                        value={form.towerName}
                        onChange={(e) => setForm({ ...form, towerName: e.target.value })}
                        className="w-full border px-1"
                      />
                    </td>
                    <td>
                      <input
                        value={form.residentType}
                        onChange={(e) => setForm({ ...form, residentType: e.target.value })}
                        className="w-full border px-1"
                      />
                    </td>
                    <td>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border px-1"
                      />
                    </td>
                    <td>
                      <input
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full border px-1"
                      />
                    </td>
                    <td>
                      <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border px-1"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={form.vehicle}
                        onChange={(e) => setForm({ ...form, vehicle: e.target.checked })}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={form.fourWheeler}
                        onChange={(e) => setForm({ ...form, fourWheeler: e.target.checked })}
                      />
                    </td>
                    <td>
                      <input
                        value={form.fourWheelerNumber || ""}
                        onChange={(e) =>
                          setForm({ ...form, fourWheelerNumber: e.target.value })
                        }
                        className="w-full border px-1"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={form.twoWheeler}
                        onChange={(e) => setForm({ ...form, twoWheeler: e.target.checked })}
                      />
                    </td>
                    <td>
                      <input
                        value={form.twoWheelerNumber || ""}
                        onChange={(e) =>
                          setForm({ ...form, twoWheelerNumber: e.target.value })
                        }
                        className="w-full border px-1"
                      />
                    </td>
                    <td className="border px-2">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="space-x-2">
                      <button onClick={handleUpdate} className="text-green-600">
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2">{item.flatNo}</td>
                    <td className="border px-2">{item.towerName}</td>
                    <td className="border px-2">{item.residentType}</td>
                    <td className="border px-2">{item.name}</td>
                    <td className="border px-2">{item.mobile}</td>
                    <td className="border px-2">{item.email}</td>
                    <td className="border px-2">{item.vehicle ? "Yes" : "No"}</td>
                    <td className="border px-2">{item.fourWheeler ? "Yes" : "No"}</td>
                    <td className="border px-2">{item.fourWheelerNumber || "-"}</td>
                    <td className="border px-2">{item.twoWheeler ? "Yes" : "No"}</td>
                    <td className="border px-2">{item.twoWheelerNumber || "-"}</td>
                    <td className="border px-2">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="border px-2 space-x-2">
                      <button onClick={() => handleEdit(item)} className="text-blue-600">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-600">
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
