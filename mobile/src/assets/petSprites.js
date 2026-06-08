// Sprite sheet asset map — one PNG per pet.
// Standard sheet: 1024×1152, 128×128 frames (8 cols × 9 rows).
// @2x sheet (newbunny): 2048×2304, 256×256 frames — same layout.
// Row 0: idle (4f)  Row 1: walk (6f)  Row 2: jump (5f)  Row 3: eat (6f)
// Row 4: happy_dance (8f)  Row 5: sad (4f)  Row 6: cheer (5f)  Row 7: sleep (4f)
// Row 8: (extra row supplied by artist — reserved)

const PET_SPRITES = {
  dog:     null,
  cat:     null,
  parrot:  null,
  rabbit:  null,
  fish:    null,
  hamster: null,
}

// Frame size in pixels for each pet's sprite sheet (not used with emoji fallback).
export const PET_FRAME_SIZES = {}

export default PET_SPRITES
