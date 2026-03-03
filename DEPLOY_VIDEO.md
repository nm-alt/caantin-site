# Hero video (homepage)

The homepage “See Shylock in action” video is controlled by:

- **`NEXT_PUBLIC_HERO_VIDEO_URL`** (optional) – full URL to an MP4. If set (e.g. in Vercel env), that URL is used.
- If not set, the app uses **`/demo.mp4`** (current file in `public/`).

## To use the new video without pushing the file (Git push fails on large binary)

1. Upload `public/demo-collections.mp4` somewhere that gives a direct MP4 URL, e.g.:
   - [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (dashboard or CLI)
   - [LinkFile.io](https://linkfile.io) or [VidPlay.io](https://vidplay.io) (upload, copy direct link)
2. In Vercel: Project → Settings → Environment Variables → add `NEXT_PUBLIC_HERO_VIDEO_URL` = that URL.
3. Redeploy.

## To use the file from the repo (e.g. after fixing push)

1. Install Git LFS: `brew install git-lfs && git lfs install`
2. In the repo: `git lfs track "public/*.mp4"`, add `.gitattributes`, then add and push the video. The homepage will use `/demo-collections.mp4` when the env var is not set.
