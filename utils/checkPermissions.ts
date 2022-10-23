import { UnauthorizedError } from "../errors";

const checkPermissions = (reqUser: any, resourceUserId: any) => {
  //if(requestUser.role === 'admin') return
  if (reqUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authorized to access this route");
};

export default checkPermissions;
