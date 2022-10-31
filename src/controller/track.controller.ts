import { Request, Response } from "express";
import { get } from "lodash";
import {
  createTrack,
  findTrack,
  findAndUpdate,
  deleteTrack,
} from "../service/track.service";
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

export async function createTrackHandler(req: Request, res: Response) {
  const userId = get(req, "user._id", verifyCache);
  const body = req.body;

  const track = await createTrack({ ...body, user: userId });

  return res.send(track);
}

export async function updateTrackHandler(req: Request, res: Response) {
  const userId = get(req, "user._id", verifyCache);
  const trackId = get(req, "params.trackId", verifyCache);
  const update = req.body;

  const track = await findTrack({ trackId });

  if (!track) {
    return res.sendStatus(404);
  }

  if (String(track.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedTrack= await findAndUpdate({ trackId }, update, { new: true });

  return res.send(updatedTrack);
}
export async function getTrackHandler(req: Request, res: Response) {
  const trackId = get(req, "params.trackId", verifyCache);
  const track = await findTrack({ trackId });

  if (!track) {
    return res.sendStatus(404);
  }

  return res.send(track);
}

export async function deleteTrackHandler(req: Request, res: Response) {
  const userId = get(req, "user._id", verifyCache);
  const trackId = get(req, "params.trackId", verifyCache);

  const track = await findTrack({ trackId });

  if (!track) {
    return res.sendStatus(404);
  }

  if (String(track.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteTrack({ trackId });

  return res.sendStatus(200);
}
