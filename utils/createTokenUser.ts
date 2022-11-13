const createTokenUser = (user) => {
  return {
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    userId: user._id,
    role: user.role,
    adminId: user.admin,
  };
};
export default createTokenUser;
