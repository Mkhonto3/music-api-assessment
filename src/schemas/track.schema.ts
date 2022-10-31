import { object, string, ref } from "yup";

const params = {
  params: object({
    trackId: string().required("track is required"),
  }),
};

const payload = {
  body: object({
    name: string().required("Track name is required"),
    album: string().required("Album name is required"),
    artist: string().required("Artist is required"),
    duration: string().required("Duration is required"),
    artwork: string().required("Artwork is required"),
    audio: string().required("Audio is required")
  }),
};

export const createTrackSchema = object({
  ...payload,
});

export const updateTrackSchema = object({
  ...payload,
  ...params,
});

export const deleteTrackSchema = object({
  ...params,
});
