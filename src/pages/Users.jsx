import React, { useState, useEffect } from 'react';
import { createUser, getUsers, updateUser, deleteUser } from '../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });
  const [editUser, setEditUser] = useState(null);
  const [sortOrder, setSortOrder] = useState('none'); // Sorting state
  const usersPerPage = 10;

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  // Sorting logic
  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'asc') return a.name.localeCompare(b.name);
    if (sortOrder === 'desc') return b.name.localeCompare(a.name);
    return 0;
  });

  // Filtering and sorting users
  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Add User functionality
  const handleAddUser = (e) => {
    e.preventDefault();
    createUser(newUser);
    setUsers(getUsers());
    setShowAddUserForm(false);
    setNewUser({ name: '', email: '', role: '', status: 'Active' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      setUsers(getUsers());
    }
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editUser) {
      updateUser(editUser);
      setUsers(getUsers());
      setEditUser(null);
    }
  };

  const handleEditInputChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Users</h2>

      {/* Search, Sort, and Add User */}
      <div className="mb-4 flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="none">Sort by</option>
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowAddUserForm(true)}
        >
          Add User
        </button>
      </div>

      {/* Add User Form */}
      {showAddUserForm && (
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4">Add New User</h3>
          <form onSubmit={handleAddUser}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="px-4 py-2 border rounded w-full"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="px-4 py-2 border rounded w-full"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                className="px-4 py-2 border rounded w-full"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                className="px-4 py-2 border rounded w-full"
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add User
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowAddUserForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit User Form */}
      {editUser && (
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4">Edit User</h3>
          <form onSubmit={handleSaveEdit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="px-4 py-2 border rounded w-full"
                name="name"
                value={editUser.name}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="px-4 py-2 border rounded w-full"
                name="email"
                value={editUser.email}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                className="px-4 py-2 border rounded w-full"
                name="role"
                value={editUser.role}
                onChange={handleEditInputChange} required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                className="px-4 py-2 border rounded w-full"
                name="status"
                value={editUser.status}
                onChange={handleEditInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setEditUser(null)} // Close the edit form
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td
                  className={`px-4 py-2 font-semibold ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                  {user.status}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEditUser(user)} // Open the edit form
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)} // Delete user
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;