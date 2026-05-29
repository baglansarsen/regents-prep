// Sprite sheet asset map — one PNG per pet.
// Standard sheet: 1024×1152, 128×128 frames (8 cols × 9 rows).
// @2x sheet (newbunny): 2048×2304, 256×256 frames — same layout.
// Row 0: idle (4f)  Row 1: walk (6f)  Row 2: jump (5f)  Row 3: eat (6f)
// Row 4: happy_dance (8f)  Row 5: sad (4f)  Row 6: cheer (5f)  Row 7: sleep (4f)
// Row 8: (extra row supplied by artist — reserved)

const PET_SPRITES = {
  axolotl:  require('../../assets/pets/axolotl.png'),
  fox:      require('../../assets/pets/fox.png'),
  capybara: require('../../assets/pets/capybara.png'),
  voidCat:  require('../../assets/pets/voidcat.png'),
  bear:     require('../../assets/pets/bear.png'),
  bunny:    require('../../assets/pets/bunny.png'),
  newbunny: require('../../assets/pets/newbunny.png'),
}

// Frame size in pixels for each pet's sprite sheet (default 128 for standard sheets).
export const PET_FRAME_SIZES = {
  newbunny: 256,
}

export default PET_SPRITES
