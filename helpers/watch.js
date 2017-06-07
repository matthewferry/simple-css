const fs = require('fs');
const spawn = require('child_process').spawn;

fs.watch('lib', {
  recursive: true, // watch everything in the directory
}, (e, file) => {
  // Use the extension of the file as the npm script name
  const script = file.split('.').pop();

  if (['css'].includes(script)) {
    // Spawn the process
    const p = spawn('npm', ['run', `build-${script}`], {
      stdio: 'inherit', // pipe output to the console
    });

    // Print something when the process completes
    p.on('close', (code) => {
      if (code === 1) {
        console.error(`✖ "npm run ${script}" failed.`);
      } else {
        console.log('Watching for changes...');
      }
    });
  }
});

console.log('Watching for changes...');
