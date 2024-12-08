// Get all users from localStorage
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : []; // Return users or an empty array if no users exist
};

// Create a new user and store it in localStorage
export const createUser = (user) => {
  const users = getUsers();
  const newUser = { id: Date.now(), ...user }; // Assign a unique ID
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
};

// Update an existing user's data in localStorage
export const updateUser = (updatedUser) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
};

// Delete a user from localStorage
export const deleteUser = (id) => {
  const users = getUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  localStorage.setItem('users', JSON.stringify(updatedUsers));
};
