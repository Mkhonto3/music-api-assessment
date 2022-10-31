import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Playlist, { PlaylistDocument } from "../model/playlist.model";

export function createPlaylist(input: DocumentDefinition<PlaylistDocument>) {
  return Playlist.create(input);
}

export function findPlaylist(
  query: FilterQuery<PlaylistDocument>,
  options: QueryOptions = { lean: true }
) {
  return Playlist.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<PlaylistDocument>,
  update: UpdateQuery<PlaylistDocument>,
  options: QueryOptions
) {
  return Playlist.findOneAndUpdate(query, update, options);
}

export function deletePlaylist(query: FilterQuery<PlaylistDocument>) {
  return Playlist.deleteOne(query);
}
