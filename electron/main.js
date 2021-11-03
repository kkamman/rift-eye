const { app, BrowserWindow, session, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const URL = require("url").URL;

const args = process.argv.slice(1);
const serving = args.some((arg) => arg === "--serve");

const navigationAllowedUrls = [];
const webviewAllowedUrls = [];
const externalOpenAllowedUrls = [];

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(app.getAppPath(), "electron", "preload.js"),
      sandbox: true,
    },
  });

  if (serving) {
    win.webContents.openDevTools();
    require("electron-reload")(__dirname, {
      electron: require(path.join(__dirname, "/../node_modules/electron")),
    });
    win.loadURL("http://localhost:4200");
  } else {
    let pathIndex = "./index.html";
    if (fs.existsSync(path.join(__dirname, "../dist/rift-eye/index.html"))) {
      pathIndex = "../dist/rift-eye/index.html";
    }

    win.loadFile(path.join(__dirname, pathIndex));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": `
          default-src 'none';
          script-src 'self' 'unsafe-inline';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data:;
          connect-src 'self' https://127.0.0.1:2999;
          `,
      },
    });
  });

  session.defaultSession.setCertificateVerifyProc((request, callback) => {
    const { hostname } = request;
    if (hostname === "127.0.0.1") {
      // TODO: Verify league certificate
      callback(0);
    } else {
      callback(-3);
    }
  });

  app.on("web-contents-created", (event, contents) => {
    contents.on("will-attach-webview", (event, webPreferences, params) => {
      delete webPreferences.preload;
      delete webPreferences.preloadURL;

      webPreferences.nodeIntegration = false;

      if (
        !webviewAllowedUrls.some((allowedUrl) =>
          params.src.startsWith(allowedUrl)
        )
      ) {
        event.preventDefault();
      }
    });
  });

  app.on("web-contents-created", (event, contents) => {
    contents.on("will-navigate", (event, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      if (!navigationAllowedUrls.includes(parsedUrl.origin)) {
        event.preventDefault();
      }
    });
  });

  app.on("web-contents-created", (event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
      if (externalOpenAllowedUrls.includes(url)) {
        setImmediate(() => {
          shell.openExternal(url);
        });
      }
      return { action: "deny" };
    });
  });
});
