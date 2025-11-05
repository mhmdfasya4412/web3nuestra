var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/data/config.js
var require_config = __commonJS({
  "src/data/config.js"(exports, module) {
    var config2 = {
      title: "Muhammad F. Nuestra",
      author: "Muhammad F. Nuestra",
      description: "This is Muhammad F. Nuestra personal website",
      siteURL: "https://nuestra.xd/",
      language: "en-us",
      email: "cyberaioff@gmail.com",
      locale: "en-US",
      socialBanner: "/images/twitter-card.png",
      repo: "https://github.com/DemuraAIdev/deweb3",
      analytics: {
        umami: {
          websiteId: "53d258db-c042-4355-8f0f-3c51617c3ef2",
          url: "https://umami.vahry.my.id/script.js"
        },
        plausible: {
          domain: "vahry.my.id",
          url: "https://plausible.vahry.my.id/js/script.js"
        }
      }
    };
    module.exports = config2;
  }
});

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { writeFileSync } from "fs";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import path from "path";

// src/lib/utils.ts
import { omit } from "contentlayer/utils";
var isProduction = process.env.NODE_ENV === "production";
function dateSortDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}
function sortPosts(allBlogs, dateKey = "date") {
  return allBlogs.sort((a, b) => dateSortDesc(a[dateKey], b[dateKey]));
}
function coreContent(content) {
  return omit(content, ["body", "_raw", "_id"]);
}
function allCoreContent(contents) {
  if (isProduction)
    return contents.map((c) => coreContent(c)).filter((c) => !("draft" in c && c.draft === true));
  return contents.map((c) => coreContent(c));
}

// contentlayer.config.ts
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// src/lib/plugin/remarkexfrontmatter.js
import { visit } from "unist-util-visit";
import yaml from "js-yaml";
function remarkExtractFrontmatter() {
  return (tree, file) => {
    visit(tree, "yaml", (node) => {
      file.data.frontmatter = yaml.load(node.value);
    });
  };
}

// src/lib/plugin/recodetile.js
import { visit as visit2 } from "unist-util-visit";
function remarkCodeTitles() {
  return (tree) => visit2(tree, "code", (node, index, parent) => {
    const nodeLang = node.lang || "";
    let language = "";
    let title = "";
    if (nodeLang.includes(":")) {
      language = nodeLang.slice(0, nodeLang.search(":"));
      title = nodeLang.slice(nodeLang.search(":") + 1, nodeLang.length);
    }
    if (!title) {
      return;
    }
    const className = "remark-code-title";
    const titleNode = {
      type: "mdxJsxFlowElement",
      name: "div",
      attributes: [{ type: "mdxJsxAttribute", name: "className", value: className }],
      children: [{ type: "text", value: title }],
      data: { _xdmExplicitJsx: true }
    };
    parent.children.splice(index, 0, titleNode);
    node.lang = language;
  });
}

// src/lib/plugin/reimgjsx.js
import { visit as visit3 } from "unist-util-visit";
import { sync } from "probe-image-size";
import fs from "fs";
function remarkImgToJsx() {
  return (tree) => {
    visit3(
      tree,
      // only visit p tags that contain an img element
      (node) => node.type === "paragraph" && node.children.some((n) => n.type === "image"),
      (node) => {
        const imageNodeIndex = node.children.findIndex((n) => n.type === "image");
        const imageNode = node.children[imageNodeIndex];
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sync(fs.readFileSync(`${process.cwd()}/public${imageNode.url}`));
          imageNode.type = "mdxJsxFlowElement", imageNode.name = "Image", imageNode.attributes = [
            { type: "mdxJsxAttribute", name: "alt", value: imageNode.alt },
            { type: "mdxJsxAttribute", name: "src", value: imageNode.url },
            { type: "mdxJsxAttribute", name: "width", value: dimensions.width },
            { type: "mdxJsxAttribute", name: "height", value: dimensions.height }
          ];
          node.type = "div";
          node.children[imageNodeIndex] = imageNode;
        }
      }
    );
  };
}

// src/lib/plugin/toc-headings.js
import { visit as visit4 } from "unist-util-visit";
import slugger from "github-slugger";
import { remark } from "remark";
function toString(node, options) {
  var { includeImageAlt = true } = options || {};
  return one(node, includeImageAlt);
}
function one(node, includeImageAlt) {
  return node && typeof node === "object" && // @ts-ignore looks like a literal.
  (node.value || // @ts-ignore looks like an image.
  (includeImageAlt ? node.alt : "") || // @ts-ignore looks like a parent.
  "children" in node && all(node.children, includeImageAlt) || Array.isArray(node) && all(node, includeImageAlt)) || "";
}
function all(values, includeImageAlt) {
  var result = [];
  var index = -1;
  while (++index < values.length) {
    result[index] = one(values[index], includeImageAlt);
  }
  return result.join("");
}
function remarkTocHeadings() {
  return (tree, file) => {
    const toc = [];
    visit4(tree, "heading", (node) => {
      const textContent = toString(node);
      toc.push({
        value: textContent,
        url: "#" + slugger.slug(textContent),
        depth: node.depth
      });
    });
    file.data.toc = toc;
  };
}
function extractTocHeadings(markdown) {
  return this, null, function* () {
    const vfile = yield remark().use(remarkTocHeadings).process(markdown);
    return vfile.data.toc;
  };
}

// contentlayer.config.ts
var import_config = __toESM(require_config());
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
var slugger2 = new GithubSlugger();
var root = process.cwd();
var computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath
  },
  toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) }
};
function createSearchIndex(allBlogs) {
  writeFileSync(`public/search.json`, JSON.stringify(allCoreContent(sortPosts(allBlogs))));
  console.log("Local search index generated...");
}
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "json" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        //image: doc.images ? doc.images[0] : config.socialBanner,
        url: `${import_config.default.siteURL}/${doc._raw.flattenedPath}`
      })
    }
  }
}));
var Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/data",
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      //@ts-ignore
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "src", "data") }],
      //@ts-ignore
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify
    ]
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData();
    createSearchIndex(allBlogs);
  }
});
export {
  Authors,
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-WJYB5OGK.mjs.map
