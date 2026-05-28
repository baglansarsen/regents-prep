// Sprite sheet asset map — one PNG per pet (1024×1152, 128×128 frames).
// Sheet layout: 8 columns × 9 rows.
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
}

export default PET_SPRITES
