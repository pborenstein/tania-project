module.exports = function (eleventyConfig) {

    // stupid way to get css files
    // into output directory
  eleventyConfig.setTemplateFormats(["css","md"])


  //  Set our markdown processor just how we like it.

  const md = require("markdown-it")({
                      html: true,
                      breaks: true,
                      linkify: false,
                      typographer: true
                    })

  eleventyConfig.setLibrary("md", md)


  return {
    dir: {
      output: "dist",
      input:  "src",
        includes: "_includes", //  These are inside the `input` directory
        data:     "_data"
    },
   passthroughFileCopy: true
  }
}
