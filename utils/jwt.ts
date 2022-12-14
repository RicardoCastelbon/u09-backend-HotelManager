import jwt from "jsonwebtoken";

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  //send token via cookie
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    //if the project is in production can send cookies in https only
    //secure: process.env.NODE_ENV === "production",
    secure: true,
    signed: true,
    sameSite: "none",
  });
};

export { attachCookiesToResponse, isTokenValid };
