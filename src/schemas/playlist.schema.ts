import { object, string, ref } from "yup";

const params = {
  params: object({
    playlistId: string().required("playlist is required"),
  }),
};

const payload = {
  body: object({
    name: string().required("Playlist name is required"),
    creator: string().required("Creator is required"),
    playtime: string().required("Playtime is required")
  }),
};

export const createPlaylistSchema = object({
  ...payload,
});

export const updatePlaylistSchema = object({
  ...payload,
  ...params,
});

export const deletePlaylistSchema = object({
  ...params,
});
