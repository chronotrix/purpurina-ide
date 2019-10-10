# purpurina-ide

_Work in progress_

Welcome to Purpurina IDE project! This project is walking in very baby steps.

I do not recommend to use/fork since I change (a lot) of times the structure. Basically is very unstable yet.

## Change-log

You can check bellow which features I'm working on:

- Console;
- Project Directory;

The current goal:

- Import assets;
- Scene view;
- Basic object Inspector:
  - Change object position;
  - Insert Sprites;
  - Add scripts into objects;
- Play test inside the workspace;
  - Using _Express_ to make a local server;
- Build!;

## Installing Dependencies

Just run in your favorite command prompt the following line:

```bash
npm install
```

## Development

More details in future...

- `npm run dev` to run Electron and dev server
- `npm run start-browser` to run in Browser

### VSCode path alias issue

run `tsc --traceResolution`
For specific path alias `tsc --traceResolution | grep @shared`
