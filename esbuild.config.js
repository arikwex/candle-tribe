import esbuild from 'esbuild';
import chalk from 'chalk';

const useWatch = process.env.CLIENT_BUILD_WATCH || false;

const config = {
  entryPoints: ['client/scripts/main.js'],
  bundle: true,
  outfile: 'build/bundle.js',
};

if (useWatch) {
  config.watch = {
    onRebuild: (error, result) => {
      if (error) {
        console.error(chalk.red('Build failed:'), error);
      } else {
        console.log(chalk.green('Build success!'));
      }
    }
  };
}

let build = esbuild.build(config);

if (useWatch) {
  build = build.then(() => {
    console.log('watching...')
  });
}
