# Assets

The `assets/` folder is excluded from version control for two reasons:

1. **Space** — audio/image files are large (~500 MB+). Keeping them in git bloats the
   repo and slows down clones/pushes.
2. **Privacy** — audio narration (voice overs) and raw source images are not intended
   for public distribution.

Assets are loaded locally from disk via Remotion's `staticFile()`. To render or
preview, ensure `public/assets/` is present on your local machine.
