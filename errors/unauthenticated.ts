import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

interface UnAuthenticatedError {
  statusCode: StatusCodes;
}

class UnAuthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError;
