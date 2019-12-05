
import * as path from 'path';

import { DevelopmentEnvironment } from './types';
import startHmrServer from './electron/startHmrServer';
import startRenderer from './renderer/startRenderer';

import purpurLogger from './devLogger/purpurLogger';




async function main() {

  const logger = purpurLogger({
    name: 'purpurina',
    symbol: '\u26A1',
    errorSymbol: '\u2620',
    color: 'magenta'
  });

  logger.log('Starting development environment');

  process.on("unhandledRejection", (e: Error) => {
    logger.error(`Unhandled rejection `, e.stack || e);
    process.exit(1);
  });

  process.on("uncaughtException", (e: Error) => {
    logger.error(`Uncaught exception `, e.stack || e);
    process.exit(1);
  });

  const env: DevelopmentEnvironment = {
    NODE_ENV: 'development',
    cwd: process.cwd(),
    configPath: __dirname,
    projectPath: path.join(__dirname, '../'),
    distPath: path.join(__dirname, '../dist'),
    renderer: {
      host: 'localhost',
      port: 3000,
    }
  }

  await Promise.all([
    startHmrServer(logger)
      .then((r) => {
        console.log(r);
      }),
    startRenderer(env,
      purpurLogger({
        name: 'renderer',
        color: 'green',
        symbol: '\u2606',
        errorSymbol: '\u2623',
      })
    ),])

  //   child.on('error', (e) =>{
  //     console.error(e);
  //   })

  //   child.on('close', (c) =>{
  //     console.error('exited ', c);
  //   })

  // const electron = require("electron");
  // logger.info(`Starting Electron with ${electron}...`);

  // spawn(path.join(env.projectPath, 'node_modules/.bin/ts-node'), ['--version'], {
  //   cwd: process.cwd(),
  //   stdio: 'pipe'
  // }).on('error', (err:Error) => {
  //   console.error(err);
  // });



  // function exitChildHandler(code: number, signal) {
  //   if (!rendererProcess || rendererProcess === null) {
  //     return;
  //   }
  //   rendererProcess = null;
  //   const msg = `Renderer process exited with code ${code}.`;
  //   if (code !== 0) {
  //     logger.error(msg, signal);
  //   } else {
  //     logger.log(msg, signal);
  //   }
  // }
  // rendererProcess.on('close', exitChildHandler);
  // rendererProcess.on('exit', exitChildHandler);
  // rendererProcess.send({ type: 'shutdown' })



  // function exitHandler(options, exitCode) {
  //   if (rendererProcess !== null) {
  //     // logger.log("hi");

  //   }

  //   if (options.cleanup) console.log('clean');
  //   if (exitCode || exitCode === 0) console.log(exitCode);
  //   if (options.exit) process.exit();
  // }

  // //do something when app is closing
  // process.on('exit', exitHandler.bind(null, { cleanup: true }));

  // //catches ctrl+c event
  // process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  // // catches "kill pid" (for example: nodemon restart)
  // process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  // process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  //catches uncaught exceptions
  // process.on('uncaughtException', exitHandler.bind(null, { exit: true }));


  // Create webpack config for electron main and renderer
  // const PORT = 3000;
  // const config = webpackConfigFn({
  //   mode: "development",
  //   isProduction: false,
  //   port: PORT,
  // });

  // // Main webpack compilation
  // const mainPromise = new Promise<webpack.Stats>((resolve, reject) => {
  //   logger.info('Compiling main...');
  //   webpack(config.main, (err, stats) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(stats);
  //     }
  //   });
  // });


  // logger.info('Compiling renderer...');
  // logger.log(`Middleware public path: ${config.renderer.output.publicPath}`)
  // const rendererCompiler = webpack(config.renderer);

  // const devOptions: WebpackDevMiddlewareMoreOptions = {
  //   logger: logger as any,
  //   stats: webpackStats,
  //   publicPath: config.renderer.output.publicPath,
  //   quiet: false,
  //   reload: true,
  //   overlay: true,
  //   writeToDisk: true,
  //   noInfo: true,
  //   logLevel: 'warn',
  // };
  // const devMiddleware = WebpackDevMiddleware(rendererCompiler, devOptions);
  // const hotMiddleware = WebpackHotMiddleware(rendererCompiler, {
  //   // path: '/__webpack_hmr',
  //   log: logger.log,
  //   heartbeat: 10 * 1000,
  //   reload: true,
  // });

  // // Renderer Server configuration
  // const expressApp = express();
  // expressApp.use(devMiddleware);
  // expressApp.use(hotMiddleware);
  // expressApp.use(express.static(DIST_PATH));

  // // Renderer promise
  // const rendererServerPromise = new Promise<RendererServer>((resolve, reject) => {
  //   const server = expressApp.listen(PORT, 'localhost', (error) => {
  //     if (error) {
  //       reject(error);
  //     }
  //     logger.log('Renderer dev server listening on port ' + PORT + '\n');
  //     resolve({ server, devMiddleware, port: PORT });
  //   })
  // });

  // logger.info('Building main...');
  // const stats = await mainPromise;
  // {
  //   const info = stats.toJson();
  //   if (stats.hasErrors()) {
  //     logger.error("Main error:\n", info.errors.join("\n\n"));
  //     process.exit(1);
  //   }
  //   if (stats.hasWarnings()) {
  //     logger.warn("Main warnings:\n:", info.warnings.join("\n\n"));
  //   }
  //   logger.log(`Main has been built successfully!`);
  // }


  // // eslint-disable-next-line
  // const electron = require("electron");
  // logger.info(`Starting Electron with ${electron}...`);
  // const rendererServerResult = await rendererServerPromise;

  // return new Promise((resolve, reject) => {
  //   const env: NodeJS.ProcessEnv = {
  //     ...process.env,
  //     ELECTRON_WEBPACK_WDS_PORT: rendererServerResult.port.toString(10),
  //     ELECTRON_WEBPACK_WDS_HOST: 'locahost',
  //     DEVELOPMENT: JSON.stringify(true),
  //   }

  //   const electronProcess = spawn(`${electron}`,
  //     [
  //       ".", `--inspect=5858`, "--color"
  //     ],
  //     {
  //       env,
  //       // stdio: ['ignore', 'inherit', 'inherit'],
  //       stdio: ['ignore', 'inherit', 'inherit'],
  //     });

  //   logger.log(`Electron started at ${env.ELECTRON_WEBPACK_WDS_PORT}`);

  //   electronProcess.on("close", (code) => {
  //     logger.info(`Electron exited with code: ${code}`);
  //     devMiddleware.close();
  //     rendererServerResult.server.close((err) => {
  //       if (err) {
  //         logger.error('Server exited with error', err);
  //       } else {
  //         logger.log('Server exited successfully');
  //       }
  //     })
  //     resolve();
  //   })

  //   electronProcess.on("error", (err) => {
  //     logger.error(`Electron: Error occurred `, err);
  //     reject(err)
  //   })

  //   process.on('SIGTERM', () => {
  //     logger.log('Stopping dev server');
  //     devMiddleware.close();
  //     rendererServerResult.server.close((err) => {
  //       logger.error(`Server exited with error`, err);
  //       resolve();
  //     })
  //   });

  // electronPromise.then((electron) => {
  //   return electron.default;
  // }).then((electron) => {


  // });
  // })

}

main();

// spawn('npm', ['run', 'start-electron'], {
//   shell: true,
//   env: process.env,
//   stdio: 'inherit'
// })
//   .on('close', code => process.exit(code))
//   .on('error', spawnError => console.error(spawnError));


// process.on('SIGTERM', () => {
//   console.log('Stopping dev server');
//   devMiddleware.close();
//   server.close(() => {
//     process.exit(0);
//   });
// });
