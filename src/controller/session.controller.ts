import { Request, Response } from "express";
import { validadePassword } from "../service/user.service";
import {
  createAccessToken,
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { sign } from "../utils/jwt.utils";
import config from "config";
import { get } from "lodash";
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60, checkperiod: 60 });

const verifyCache = (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    if (cache.has(id)) {
      return res.status(200).json(cache.get(id));
    }
    return next();
  } catch (err: any) {
    throw new Error(err);
  }
};

export async function createUserSessionHandler(req: Request, res: Response) {
  //validade the email and password
  const user = await validadePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password.");
  }

  //create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  //create access token
  const accessToken = createAccessToken({ user, session });

  //create a refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"), // 1year
  });

  //send refresh token & access token back
  return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "User.session", verifyCache);

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id", verifyCache);

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
