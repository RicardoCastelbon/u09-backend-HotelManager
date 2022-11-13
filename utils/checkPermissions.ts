import { UnauthorizedError } from "../errors";

const checkPermissions = (reqUser, resourceUserId) => {
  //if(requestUser.role === 'admin') return
  if (
    reqUser.userId === resourceUserId.toString() ||
    reqUser.adminId === resourceUserId.toString()
  )
    return;
  throw new UnauthorizedError("Not authorized to access this route");
};

export default checkPermissions;
