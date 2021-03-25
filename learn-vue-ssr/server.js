const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const VueServerRender = require('vue-server-renderer');

const app = new Koa();
const router = new Router();

const ServerBundle = require('./dist/vue-ssr-server-bundle');
const template = fs.readFileSync('./dist/index.ssr.html', 'utf-8');
const clientManifest = require('./dist/vue-ssr-client-manifest');
const render = VueServerRender.createBundleRenderer(ServerBundle, {
  template,
  clientManifest
});

router.get('/', async ctx => {
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString({ url: '/' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
});

app.use(router.routes());
app.use(static(path.resolve(__dirname, 'dist')));

app.use(async ctx => {
  try {
    ctx.body = await new Promise((resolve, reject) => {
      render.renderToString({ url: ctx.url }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (e) {
    ctx.body = e;
  }
});

app.listen(3000);
