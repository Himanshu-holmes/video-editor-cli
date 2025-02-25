# 🎬 Video Processing CLI

This tool helps you **trim** and **merge** videos efficiently using `bun`.

## 📂 Folder Structure
Ensure the following folders exist in the **root directory**:
/videos put your videos here


## ✂️ Trimming a Video
```sh
bun src/index.ts vde --trim 00:00:00 00:00:10 --filename Sanam.Teri.Kasam.2016.1080p.Hindi.BluRay.5.1.ESub.x264-HDHub4u.Tv.mkv
```

## Merging a Video
```sh
bun src/index.ts vde  --merge  Sanam.Teri.Kasam.2016.1080p.Hindi.BluRay.5.1.ESub.x264-HDHub4u.Tv.mkv clip.mkv
```

