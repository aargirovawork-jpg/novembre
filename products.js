/* One source of truth for every component.
   cm      real height of the garment incl. hanger, gives relative scale
   w, h    pixel size of the keyed asset in ../assets
   N, p    frames per direction of the ping-pong video, frame where the garment stands in profile
   hx      x of the hanger hook (0..1);  pl, pr  left/right edge of the profile;  front  width seen from the front */
window.ASSETS = '';

window.PRODUCTS = [
  { id: 'trench',     name: 'Le Trench, Sand',         price: 189, cm: 125, w: 420, h: 800, gb: 71.0, N: 95, p: 24, hx: .4952, pl: 94,  pr: 294, front: 405 },
  { id: 'blazer',     name: 'Double-Breasted Blazer',   price: 149, cm: 84,  w: 572, h: 800, gb: 80.0, N: 95, p: 33, hx: .4921, pl: 219, pr: 345, front: 560 },
  { id: 'shirt',      name: 'Poplin Shirt, White',     price: 69,  cm: 84,  w: 530, h: 800, gb: 67.0, N: 95, p: 23, hx: .4943, pl: 208, pr: 310, front: 529 },
  { id: 'sweater',    name: 'Half-Zip Knit, Noir',     price: 99,  cm: 70,  w: 468, h: 800, gb: 59.5, N: 95, p: 26, hx: .4904, pl: 180, pr: 276, front: 467 },
  { id: 'bomber',     name: 'Bomber Cuir, Noir',       price: 229, cm: 66,  w: 548, h: 800, gb: 74.0, N: 95, p: 74, hx: .4918, pl: 195, pr: 348, front: 547 },
  { id: 'longsleeve', name: 'Long Sleeve, White',      price: 35,  cm: 72,  w: 504, h: 800, gb: 74.0, N: 95, p: 29, hx: .496,  pl: 202, pr: 289, front: 489 },
  { id: 'jeans',      name: 'Straight Jean, Mid Blue', price: 79,  cm: 104, w: 300, h: 800, gb: 72.0, N: 95, p: 63, hx: .5,    pl: 119, pr: 174, front: 286 },
  { id: 'dress',      name: 'Petite Robe Noire',        price: 95,  cm: 94,  w: 464, h: 800, gb: 74.5, N: 95, p: 23, hx: .4946, pl: 181, pr: 268, front: 444 },
  { id: 'trousers',   name: 'Pleated Wide Trouser',     price: 89,  cm: 108, w: 374, h: 800, gb: 74.0, N: 96, p: 27, hx: .5,    pl: 148, pr: 232, front: 353 },
];

window.OUTFITS = [
  // tag: everyday | work | evening
  { title: 'Weekday',       tag: 'everyday', note: 'Trench over a white long sleeve, easy blue jeans.',        items: ['trench', 'longsleeve', 'jeans'] },
  { title: 'Office',        tag: 'work',     note: 'A black blazer, crisp poplin and wide trousers.',          items: ['blazer', 'shirt', 'trousers'] },
  { title: 'Evening',       tag: 'evening',  note: 'The little black dress under a leather bomber.',           items: ['bomber', 'dress'] },
  { title: 'City walk',     tag: 'everyday', note: 'Leather bomber, white long sleeve, mid-blue denim.',       items: ['bomber', 'longsleeve', 'jeans'] },
  { title: 'Soft Monday',   tag: 'work',     note: 'Poplin collar peeking out of a black half-zip knit.',      items: ['sweater', 'shirt', 'trousers'] },
  { title: 'Dinner',        tag: 'evening',  note: 'The blazer thrown over the black dress.',                  items: ['blazer', 'dress'] },
  { title: 'Cold morning',  tag: 'everyday', note: 'Sand trench, black knit and wide trousers for the commute.', items: ['trench', 'sweater', 'trousers'] },
  { title: 'Studio day',    tag: 'work',     note: 'Blazer with a white long sleeve and jeans, dressed down.', items: ['blazer', 'longsleeve', 'jeans'] },
  { title: 'Opening night', tag: 'evening',  note: 'Trench worn open over the black dress.',                   items: ['trench', 'dress'] },
];

window.money = n => '€' + n;
window.byId = id => window.PRODUCTS.find(p => p.id === id);
