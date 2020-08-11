module.exports = function (eleventyConfig) {

    // stupid way to get css files
    // into output directory
  eleventyConfig.setTemplateFormats(["css","md"])


  return {
    dir: {
      output:   "_site",
      input:    "src",
      includes: "_includes", //  These are inside the `input` directory
      data:     "_data"
    },
    passthroughFileCopy: true
  }
}
