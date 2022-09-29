const createTokenUser = (user:any) => {
  return { user: user.name, userId: user._id, role: user.role };
};
export default createTokenUser;
