module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
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
