import React, { useState, useEffect } from 'react';

const UserForm = ({ selectedUser, onSave }) => {
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: { street: '', suite: '', city: '', zipcode: '' },
    phone: '',
    website: '',
    company: { name: '' },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
      setIsModalOpen(true);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUser(prevUser => ({
        ...prevUser,
        [parent]: { ...prevUser[parent], [child]: value }
      }));
    } else {
      setUser(prevUser => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.firstName || !user.lastName || !user.email) {
      alert('Please fill out all required fields.');
      return;
    }

    onSave(user);
    setUser({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      address: { street: '', suite: '', city: '', zipcode: '' },
      phone: '',
      website: '',
      company: { name: '' },
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        {selectedUser ? 'Edit User' : 'Add User'}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg lg:max-w-2xl relative shadow-lg overflow-auto" style={{ maxHeight: '80vh' }}>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                value={user.address.street}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address.suite"
                placeholder="Suite"
                value={user.address.suite}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address.city"
                placeholder="City"
                value={user.address.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address.zipcode"
                placeholder="Zipcode"
                value={user.address.zipcode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="website"
                placeholder="Website"
                value={user.website}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="company.name"
                placeholder="Company"
                value={user.company.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
