let users = [];

exports.createUser = (user) => {
  users.push(user);
};

exports.getUsers = () => {
  return users;
};

exports.deleteUser = (userId) => {
  users = users.filter((user) => user.id !== userId);
};

exports.getUserHobbies = (userId) => {
  const user = users.find((user) => user.id === userId);
  return user ? user.hobbies : null;
};

exports.updateUserHobbies = (userId, hobbies) => {
  const user = users.find((user) => user.id === userId);

  if (user) {
    user.hobbies = Array.from(new Set([...user.hobbies, ...hobbies]));
  }
};
