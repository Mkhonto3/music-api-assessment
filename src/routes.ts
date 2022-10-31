import { Express} from "express";
import {
  createPlaylistHandler,
  updatePlaylistHandler,
  getPlaylistHandler,
  deletePlaylistHandler,
} from "./controller/playlist.controller";
import {
  createTrackHandler,
  updateTrackHandler,
  getTrackHandler,
  deleteTrackHandler,
} from "./controller/track.controller";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { requiresUser, validadeRequest } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schemas/user.schema";
import {
  createPlaylistSchema,
  updatePlaylistSchema,
  deletePlaylistSchema,
} from "./schemas/playlist.schema";
import {
  createTrackSchema,
  updateTrackSchema,
  deleteTrackSchema,
} from "./schemas/track.schema";

export default function (app: Express) {

  // Register user
  app.post("/api/users", validadeRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validadeRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a Playlist
  app.post(
    "/api/playlists",
    [requiresUser, validadeRequest(createPlaylistSchema)],
    createPlaylistHandler
  );

  // Update a playlists
  app.put(
    "/api/playlists/:playlistId",
    [requiresUser, validadeRequest(updatePlaylistSchema)],
    updatePlaylistHandler
  );

  // Get a playlists
  app.get("/api/playlists/:playlistId", getPlaylistHandler);

  // Delete a playlists
  app.delete(
    "/api/playlists/:playlistId",
    [requiresUser, validadeRequest(deletePlaylistSchema)],
    deletePlaylistHandler
  );

   // Create a Tracks
   app.post(
    "/api/tracks",
    [requiresUser, validadeRequest(createTrackSchema)],
    createTrackHandler
  );

  // Update a Tracks
  app.put(
    "/api/tracks/:trackId",
    [requiresUser, validadeRequest(updateTrackSchema)],
    updateTrackHandler
  );

  // Get a tracks
  app.get("/api/tracks/:trackId", getTrackHandler);

  // Delete a tracks
  app.delete(
    "/api/tracks/:trackId",
    [requiresUser, validadeRequest(deleteTrackSchema)],
    deleteTrackHandler
  );
}
