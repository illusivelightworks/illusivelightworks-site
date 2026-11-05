# Screenshots still needed for the docs

The docs currently reuse the five 1.6.0 Mac App Store slides (marketing frames with headlines). Plain, cropped screenshots of the real UI would be clearer, and several screens have never been captured.

Capture on Mac at 2560x1600 if possible, no device frame, dark mode doesn't matter (the app is always dark). PNG. Save into `public/img/docs/` using the file name given.

| File name | Screen / state | What it should show | Used on page |
|---|---|---|---|
| `main-menu.png` | Main menu | All six buttons | main-menu |
| `artwork-videos.png` | Artwork picker, VIDEOS tab | Filter list, tiles, a selected item with Download/SELECT | artwork |
| `artwork-my-imports.png` | MY IMPORTS tab | Import media button, a few imported items | artwork |
| `artwork-shaders.png` | SHADERS tab | Shader tiles + animated preview | artwork, shader |
| `artwork-online.png` | ONLINE tab | Source list, search bar, results, a selected video with source link | artwork |
| `calibration-full.png` | Corner calibration, 2+ grids | Whole screen, left and right panels visible | calibration |
| `calibration-overlay.png` | Calibration with Scale Controls + Rotation Controls on | The width/height sliders and rotation dial | calibration, gestures |
| `calibration-grid-strip.png` | Close-up of the numbered grid tiles, -GRID/+GRID/CHANGE ART | Strip with one tile mid long-press if possible | calibration, gestures |
| `final-display.png` | Final Display, no tool-specific detail | Panels, TOOLS list, SAVE PROJECT, bottom bar | final-display |
| `final-display-unsaved.png` | Same, with "You have unsaved changes!" | Save button lit | final-display, projects |
| `tools-list-scrolled.png` | TOOLS list scrolled to show Background Key, Audio, Shader | Confirms exact tool names and order | final-display |
| `mask-main.png` | Mask tool with a mask selected | MASKS/SHAPES lists, Invert, MASK GRID buttons | mask |
| `mask-library.png` | Shape Library open, "My Library" tab | Tabs, Import Custom Shape, Accept | mask |
| `mask-delete-button.png` | A My Library thumbnail after long-press | The delete button | mask, gestures |
| `mask-duplicate.png` | (optional) a mask/shape list with a freshly duplicated item | | mask |
| `warp-paint-direction.png` | Warp Paint with a direction selected | Lit arrow, brush sliders, trash | warp-paint |
| `warp-paint-grid-overlay.png` | Painted warp with Display Grid Overlay on | Visible bending | warp-paint |
| `color-tool.png` | Color tool | Hue/Saturation/Brightness, overlay color, reset | color |
| `background-key-tool.png` | Background Key tool | Enable, RGB, Threshold, reset | background-key |
| `audio-tool.png` | Audio tool on a video grid | Slider | audio |
| `shader-tool.png` | Shader tool on a shader grid | Speed/Scale rows, trash | shader |
| `playback-timeline.png` | Bottom bar, timeline view | Play/Pause, slider, link toggle, Modify All | playback |
| `playback-speed.png` | Bottom bar after tapping the lightning bolt | Speed slider | playback |
| `playback-link.png` | Two grids with the same video | Link toggle with "x2" | playback |
| `saved-setups.png` | Saved Setups | Selected project, all buttons incl. import icon | projects |
| `cast-picker.png` | Cast button on + device list | | casting |
| `settings.png` | Settings screen | All options | settings |
| `about.png` | About screen | | main-menu |

## Short screen recordings (optional, great for the docs and for social)

- Long-press a grid tile to duplicate it
- Dragging a corner pin and using NUDGE
- Painting a warp with the grid overlay on
- Long-press duplicate of a mask and shape
- HIDE CONTROLS, then tap to bring them back
