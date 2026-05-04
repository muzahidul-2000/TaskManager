import jwt from "jsonwebtoken";

function generateToken(userId) {
  return jwt.sign(
    { userId },
    "xyzabc1223343lndbshfh3",
    { expiresIn: "1h" }
  );
}
export default generateToken;