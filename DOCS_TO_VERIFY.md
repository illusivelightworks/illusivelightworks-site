# Docs statements to verify against the real app

The docs were written from the source code and the 1.6.0 Mac screenshots, not from running the app. The widget layouts are Blueprint assets I can't see, so a few items below are inferred. Check each and tell me what to fix.

## Labels and icons I guessed
- Main menu 1.6.0 labels read off your demo frame: SAVED SETUPS, LOAD LATEST, NEW SETUP, a gear icon, About, YouTube Tutorials. Confirm.
- Main menu **ABOUT**: described as a contact/feedback form plus optional support purchases (from the code: two support tiers and a message box).
- The **trash can** on the Color, Background Key and Shader tools as the reset button (the Warp Paint trash is confirmed by the screenshot).
- The Cast button's exact location and look.
- Artwork picker: the speaker button for preview audio, and the exact **Filter by** options on each tab.
- Layer Order arrows: I describe them as forward/backward in the stack.

## Behavior I inferred
- **Invert** (Mask): described as "art shows where the mask was hiding it, and hides where it was showing it".
- **BACK** in calibration, when opened from a saved project: "returns to the last saved version".
- Warp Paint direction arrows: described as "the way the picture is pushed". Please confirm this is how it feels in use, and how strongly repeated strokes accumulate.
- Whether SAVE PROJECT's "saved" message wording matches.
- The **Edge smoothing** description ("softens jagged edges").
- Platforms: iPhone, iPad, Mac (from the App Store slides). Minimum OS versions are not stated anywhere in the docs.

## Things I deliberately left out
- Pricing, subscriptions, any limits on number of grids or projects (per the monetization plan, not decided in the docs).
- Anything about Android.
- The custom `.ilwv` video format (internal detail).

## Terminology decisions (2026-11-05)
The docs now describe the app in two steps and call Setups "Projects":
- **Step 1: Align** = choosing art + fitting it to the surface (the app's artwork picker and the corner-pin screen).
- **Step 2: Refine** = the tools screen (called Final Display internally).
- In the docs, the 1.6.1 labels are assumed to be **NEW PROJECT**, **SAVED PROJECTS** (main menu) and the **Saved Projects** screen. Confirm the exact words when 1.6.1 is built; the docs carry a "Version note" about 1.6.0 vs 1.6.1 on the Quickstart and Main menu pages to delete after most people have updated.
- Buttons that still use the old words in 1.6.0 and are not renamed in the docs: **GRID SETUP** (goes back to Step 1) and **SAVE + CONTINUE** (goes to Step 2).

## Suggested in-app changes so the app matches the docs
1. Show **STEP 1 of 2** on the artwork and corner-pin screens, and **STEP 2 of 2** on the tools screen.
2. Rename **GRID SETUP** to **BACK TO STEP 1** (or **STEP 1: ALIGN**).
3. Rename **SAVE + CONTINUE** to **CONTINUE TO STEP 2**.
4. Rename the main-menu buttons to **NEW PROJECT** and **SAVED PROJECTS**.
