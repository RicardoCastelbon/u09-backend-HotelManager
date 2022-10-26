import { UnAuthenticatedError, UnauthorizedError } from "../errors";
import { isTokenValid } from "../utils/jwt";

const authenticateUser = async (req: any, res: any, next: any) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  try {
    const { name, userId, role, adminId }: any = isTokenValid({ token });
    req.user = { name, userId, role, adminId };
    /* ALTERNATIVE SYNTAX 
    const payload: any = isTokenValid({ token });
    req.user = { name: payload.name, userId: payload.userId, role:payload.role};
    */
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles: any) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
