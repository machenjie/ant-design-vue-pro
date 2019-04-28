module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: true
      },
      "ant"
    ],
    [
      "import",
      {
        libraryName: "lodash",
        libraryDirectory: "",
        camel2DashComponentName: false // default: true
      },
      "lodash"
    ]
  ]
};
