const createTokenUser = (user: any) => {
  return {
    name: user.name,
    lastName:user.lastName,
    email: user.email,
    userId: user._id,
    role: user.role,
  };
};
export default createTokenUser;
