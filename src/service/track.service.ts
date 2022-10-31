import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Track, { TrackDocument } from "../model/track.model";

export function createTrack(input: DocumentDefinition<TrackDocument>) {
  return Track.create(input);
}

export function findTrack(
  query: FilterQuery<TrackDocument>,
  options: QueryOptions = { lean: true }
) {
  return Track.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<TrackDocument>,
  update: UpdateQuery<TrackDocument>,
  options: QueryOptions
) {
  return Track.findOneAndUpdate(query, update, options);
}

export function deleteTrack(query: FilterQuery<TrackDocument>) {
  return Track.deleteOne(query);
}
