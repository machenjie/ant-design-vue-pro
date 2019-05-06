module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            const fileName = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${fileName}`);
            delete require.cache[require.resolve(`./mock/${fileName}`)];
            res.send(mock(req.method));
          }
        }
      }
    }
  }
};
