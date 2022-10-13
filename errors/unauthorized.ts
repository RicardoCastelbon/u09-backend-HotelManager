import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

interface UnAuthorizedError {
  statusCode: StatusCodes;
}

class UnAuthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnAuthorizedError;
