const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

router.post("/video", async (req, res) => {
  const { title, url, description } = req.body;
  let video = {};

  video.title = title;
  video.url = url;
  video.description = description;

  let videoModel = new Video(video);
  await videoModel.save();
  res.json(videoModel);
});

router.get("/videos", (req, res) => {
  console.log("Get request for all videos");

  Video.find({}).exec(function (err, videos) {
    if (err) {
      console.log("Error retrieving videos");
    } else {
      res.json(videos);
    }
  });
});

router.get("/videos/:id", (req, res) => {
  console.log("Get request for single video");

  Video.findById(req.params.id).exec(function (err, video) {
    if (err) {
      res.send("Error retrieving video");
    } else {
      res.json(video);
    }
  });
});

router.put("/video/:id", (req, res) => {
  console.log("Update video");

  const { title, url, description } = req.body;
  let updateVideo = {};

  updateVideo.title = title;
  updateVideo.url = url;
  updateVideo.description = description;
  Video.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateVideo,
    },
    {
      new: true,
    },
    function (err, updatedVideo) {
      if (err) {
        res.send("Error updating video");
      } else {
        res.json(updatedVideo);
      }
    }
  );
});

router.delete("/video/:id", (req, res) => {
  console.log("deleting video");

  Video.findByIdAndDelete(req.params.id, function (err, deletedVideo) {
    if (err) {
      res.send("Error deleting video");
    } else {
      res.json(deletedVideo);
    }
  });
});

module.exports = router;
