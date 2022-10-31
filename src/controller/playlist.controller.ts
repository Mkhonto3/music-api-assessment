import { Request, Response } from "express";
import { get } from "lodash";
import {
  createPlaylist,
  findPlaylist,
  findAndUpdate,
  deletePlaylist,
} from "../service/playlist.service";
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 , checkperiod: 60 });

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

export async function createPlaylistHandler(req: Request, res: Response) {

  const userId = get(req, "user._id", verifyCache);
  const body = req.body;

  const playlist = await createPlaylist({ ...body, user: userId });

  return res.send(playlist);
}

export async function updatePlaylistHandler(req: Request, res: Response) {
  const userId = get(req, "user._id", verifyCache);
  const playlistId = get(req, "params.playlistId");
  const update = req.body;

  const playlist = await findPlaylist({ playlistId });

  if (!playlist) {
    return res.sendStatus(404);
  }

  if (String(playlist.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedPlaylist = await findAndUpdate({ playlistId }, update, { new: true });

  return res.send(updatedPlaylist);
}
export async function getPlaylistHandler(req: Request, res: Response) {
  const playlistId = get(req, "params.playlistId", verifyCache);
  const playlist = await findPlaylist({ playlistId });

  if (!playlist) {
    return res.sendStatus(404);
  }

  return res.send(playlist);
}

export async function deletePlaylistHandler(req: Request, res: Response) {
  const userId = get(req, "user._id", verifyCache);
  const playlistId = get(req, "params.playlistId");

  const playlist = await findPlaylist({ playlistId });

  if (!playlist) {
    return res.sendStatus(404);
  }

  if (String(playlist.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deletePlaylist({ playlistId });

  return res.sendStatus(200);
}
