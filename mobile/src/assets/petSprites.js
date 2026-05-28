// Sprite sheet asset map — one PNG per pet, commissioned from Fiverr/Itch.io.
// Sheet layout: 128×128px frames, one animation per row.
// Row 0: idle (4f)  Row 1: walk (6f)  Row 2: jump (5f)  Row 3: eat (6f)
// Row 4: happy_dance (8f)  Row 5: sad (4f)  Row 6: cheer (5f)  Row 7: sleep (4f)
//
// To activate a pet's sprite, replace null with the require() for that file.
// The SpriteAnimation component falls back to emoji display when the value is null.

const PET_SPRITES = {
  axolotl:  null, // require('../../assets/pets/axolotl.png'),
  fox:      null, // require('../../assets/pets/fox.png'),
  capybara: null, // require('../../assets/pets/capybara.png'),
  voidCat:  null, // require('../../assets/pets/voidcat.png'),
}

export default PET_SPRITES
