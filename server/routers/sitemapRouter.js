const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");
const Tour = require("../modals/tourModal");
const Post = require("../modals/postModal");
const LanguagePost = require("../modals/languagePostModal");
const date = new Date().toISOString();
const zlib = require("zlib");
const router = express.Router();

const staticRoutes = [
  {
    path: "/uganda-safaris",
  },
  {
    path: "/kenya-safaris",
  },
  {
    path: "/tanzania-safaris",
  },
  {
    path: "/rwanda-safaris",
  },
  {
    path: "/uganda-safaris/gorilla-wildlife-safaris",
  },
  {
    path: "/uganda-safaris/uganda-birding-safaris",
  },
  {
    path: "/uganda-safaris/uganda-cultural-tours",
  },
  {
    path: "/uganda-safaris/mountaineering",
  },
  {
    path: "/kenya-safaris/kenya-wildlife-safaris",
  },
  {
    path: "/kenya-safaris/kenya-birding-safaris",
  },
  {
    path: "/tanzania-safaris/tanzania-wildlife-safaris",
  },
  {
    path: "/tanzania-safaris/mountain-hiking-safaris",
  },
  {
    path: "/tanzania-safaris/tanzania-birding-tours",
  },
  {
    path: "/rwanda-safaris/rwanda-gorilla-wildlife-safaris",
  },
  {
    path: "/rwanda-safaris/rwanda-culture-safaris",
  },
  {
    path: "/rwanda-safaris/rwanda-birding-safaris",
  },
  {
    path: "/about-us",
  },
  {
    path: "/safari-updates",
  },
  {
    path: "/community-support",
  },
  {
    path: "/contact-us",
  },
  {
    path: "/safari-updates/languages",
  },
];

let sitemap;

router.get("/", async function (req, res) {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");

  // If we have a cached entry send it
  if (sitemap) return res.send(sitemap);

  try {
    // Fetching tour records and mapping
    // it the desired URL pattern
    const tourData = await Tour.find();
    const tours = tourData.map(({ slug }) => `/tours/${slug}`);
    const postData = await Post.find();
    const posts = postData.map(({ slug }) => `/safari-updates/${slug}`);
    const languagePostData = await LanguagePost.find();
    const languagePosts = languagePostData.map(
      ({ slug }) => `/safari-updates/languages/${slug}`
    );
    // Base url of our site
    (smStream = new SitemapStream({
      hostname: "https://davsafaris.com/",
    })),
      (pipeline = smStream.pipe(zlib.createGzip()));

    // Write tours URL to the stream
    tours.forEach((item) =>
      smStream.write({
        url: item,
        lastmod: date,
        changefreq: "daily",
        priority: 0.7,
      })
    );
    // Write safari updates URL to the stream
    posts.forEach((item) =>
      smStream.write({
        url: item,
        lastmod: date,
        changefreq: "daily",
        priority: 0.7,
      })
    );
    // Write safari updates URL to the stream
    languagePosts.forEach((item) =>
      smStream.write({
        url: item,
        lastmod: date,
        changefreq: "daily",
        priority: 0.7,
      })
    );

    // Manually add all the other important URLs
    staticRoutes.forEach((item) => {
      smStream.write({
        url: item.path,
        lastmod: date,
        changefreq: "monthly",
        priority: 0.9,
      });
    });

    // Cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    smStream.end();

    // Stream write the response
    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
