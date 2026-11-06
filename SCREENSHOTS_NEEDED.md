# Screenshots still needed for the docs

Pages are now organized as Step 1: Align and Step 2: Refine. Page names below are the doc paths. The docs currently reuse the five 1.6.0 Mac App Store slides (marketing frames with headlines). Plain, cropped screenshots of the real UI would be clearer, and several screens have never been captured.

Capture on Mac at 2560x1600 if possible, no device frame, dark mode doesn't matter (the app is always dark). PNG. Save into `public/img/docs/` using the file name given.

| File name | Screen / state | What it should show | Used on page |
|---|---|---|---|
| `main-menu.png` | Main menu | All six buttons | main-menu |
| `artwork-videos.png` | Artwork picker, VIDEOS tab | Filter list, tiles, a selected item with Download/SELECT | step-1/artwork |
| `artwork-my-imports.png` | MY IMPORTS tab | Import media button, a few imported items | step-1/artwork |
| `artwork-shaders.png` | SHADERS tab | Shader tiles + animated preview | step-1/artwork, step-2/shader |
| `artwork-online.png` | ONLINE tab | Source list, search bar, results, a selected video with source link | step-1/artwork |
| `calibration-full.png` | Corner calibration, 2+ grids | Whole screen, left and right panels visible | step-1/align |
| `calibration-overlay.png` | Calibration with Scale Controls + Rotation Controls on | The width/height sliders and rotation dial | step-1/align, gestures |
| `calibration-grid-strip.png` | Close-up of the numbered grid tiles, -GRID/+GRID/CHANGE ART | Strip with one tile mid long-press if possible | step-1/align, gestures |
| `final-display.png` | Final Display, no tool-specific detail | Panels, TOOLS list, SAVE PROJECT, bottom bar | step-2/overview |
| `final-display-unsaved.png` | Same, with "You have unsaved changes!" | Save button lit | step-2/overview, projects |
| `tools-list-scrolled.png` | TOOLS list scrolled to show Background Key, Audio, Shader | Confirms exact tool names and order | step-2/overview |
| `mask-main.png` | Mask tool with a mask selected | MASKS/SHAPES lists, Invert, MASK GRID buttons | step-2/mask |
| `mask-library.png` | Shape Library open, "My Library" tab | Tabs, Import Custom Shape, Accept | step-2/mask |
| `mask-delete-button.png` | A My Library thumbnail after long-press | The delete button | step-2/mask, gestures |
| `mask-duplicate.png` | (optional) a mask/shape list with a freshly duplicated item | | step-2/mask |
| `warp-paint-direction.png` | Warp Paint with a direction selected | Lit arrow, brush sliders, trash | step-2/warp-paint |
| `warp-paint-grid-overlay.png` | Painted warp with Display Grid Overlay on | Visible bending | step-2/warp-paint |
| `color-tool.png` | Color tool | Hue/Saturation/Brightness, overlay color, reset | step-2/color |
| `background-key-tool.png` | Background Key tool | Enable, RGB, Threshold, reset | step-2/background-key |
| `audio-tool.png` | Audio tool on a video grid | Slider | step-2/audio |
| `shader-tool.png` | Shader tool on a shader grid | Speed/Scale rows, trash | step-2/shader |
| `playback-timeline.png` | Bottom bar, timeline view | Play/Pause, slider, link toggle, Modify All | step-2/playback |
| `playback-speed.png` | Bottom bar after tapping the lightning bolt | Speed slider | step-2/playback |
| `playback-link.png` | Two grids with the same video | Link toggle with "x2" | step-2/playback |
| `saved-projects.png` | Saved Projects (called Saved Setups in 1.6.0) | Selected project, all buttons incl. import icon | projects |
| `cast-picker.png` | Cast button on + device list | | casting |
| `settings.png` | Settings screen | All options | settings |
| `about.png` | About screen | | main-menu |

## Short screen recordings (optional, great for the docs and for social)

- Long-press a grid tile to duplicate it
- Dragging a corner pin and using NUDGE
- Painting a warp with the grid overlay on
- Long-press duplicate of a mask and shape
- HIDE CONTROLS, then tap to bring them back
