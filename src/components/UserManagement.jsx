import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '../services/api';
import UserList from './UserList';
import UserForm from './UserForm';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const limit = 10;
        const response = await fetchUsers(currentPage, limit);
        setUsers(response.data.map(user => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1] || '',
          email: user.email,
          department: 'N/A',
          address: user.address,
          phone: user.phone,
          website: user.website,
          company: user.company,
        })));
        setTotalPages(Math.ceil(response.headers['x-total-count'] / limit));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, [currentPage]);

  const handleAddUser = async (user) => {
    try {
      const response = await addUser(user);
      user.id = response.data.id;
      setUsers([...users, user]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (user) => {
    try {
      await updateUser(user.id, user);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSaveUser = (user) => {
    if (user.id) {
      handleEditUser(user);
    } else {
      handleAddUser(user);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">User Management</h1>
        <div className="max-w-xs relative">
          <UserForm selectedUser={selectedUser} onSave={handleSaveUser} />
        </div>
      </div>

      <UserList users={users} onEdit={handleSelectUser} onDelete={handleDeleteUser} />

      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">{currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
