module.exports = {
  'src/**/*.(ts|tsx)': () => 'npx tsc --noEmit',
  'src/**/*.(css|scss|ts|tsx)': (filenames) => [`npx prettier --write ${filenames.join(' ')}`],
  'src/**/*.(ts|tsx)': () => 'next lint'

  // 'src/**/*.(ts|tsx)': (filenames) => [
  //   `next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`
  // ]
};
