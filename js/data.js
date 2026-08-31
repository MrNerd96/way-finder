/* Seed building.
 *
 * The floor plans are the hospital's own fire-evacuation boards, photographed,
 * de-skewed and cropped by tools/extract_plans.py.
 *
 * Every node below is marked seed:true. The positions were read off those
 * photos by eye — the corridors, lifts and staircases are in roughly the right
 * place, but nothing here has been checked against the actual building. Treat
 * it as a scaffold to correct while walking, not as data.
 *
 * Coordinates are normalised to the plan image WIDTH: x runs 0..1 across the
 * image, y runs 0..aspect down it. That keeps the data valid if the plan images
 * are ever re-exported at a different resolution.
 */
/* The title in the header. This is configuration, not survey data, so it lives
   outside SEED_BUILDING — otherwise a name saved into someone's browser months
   ago would outlive every change made here. Set it to whatever the site should
   be called, or leave it for a name-free build. */
var APP_TITLE = 'Way Finder';

var SEED_BUILDING = {
  version: 1,

  floors: [
    {
      id: 'ipd-g', block: 'IPD', level: 0, label: 'IPD · Ground',
      plan: 'assets/plans/ipd-g.jpg', aspect: 1.1470,
      metresPerUnit: 95, calibrated: false
    },
    {
      id: 'opd-f1', block: 'OPD', level: 1, label: 'OPD · 1st Floor',
      plan: 'assets/plans/opd-f1.jpg', aspect: 0.9125,
      metresPerUnit: 75, calibrated: false
    },
    {
      id: 'opd-f2', block: 'OPD', level: 2, label: 'OPD · 2nd Floor',
      plan: 'assets/plans/opd-f2.jpg', aspect: 1.0756,
      metresPerUnit: 75, calibrated: false
    },
    {
      id: 'opd-f4', block: 'OPD', level: 4, label: 'OPD · 4th Floor',
      plan: 'assets/plans/opd-f4.jpg', aspect: 1.1685,
      metresPerUnit: 75, calibrated: false
    }
  ],

  /* kind: room | junction | lift | stair | entrance | counter | toilet | landmark
     shaft: lifts and staircases that are the same physical shaft share this id,
            which is how the router moves between floors. */
  nodes: [
    /* ---- OPD 1st floor ---------------------------------------------------- */
    { id: 'f1-stair-nw', floor: 'opd-f1', x: 0.310, y: 0.055, kind: 'stair', name: 'North-west staircase', shaft: 'opd-stair-nw', canStart: true, seed: true },
    { id: 'f1-stair-ne', floor: 'opd-f1', x: 0.680, y: 0.055, kind: 'stair', name: 'North-east staircase', shaft: 'opd-stair-ne', canStart: true, seed: true },
    { id: 'f1-stair-sw', floor: 'opd-f1', x: 0.320, y: 0.830, kind: 'stair', name: 'South-west staircase', shaft: 'opd-stair-sw', canStart: true, seed: true },
    { id: 'f1-stair-e',  floor: 'opd-f1', x: 0.845, y: 0.285, kind: 'stair', name: 'East block staircase', shaft: 'opd-stair-east', canStart: true, seed: true },
    { id: 'f1-lift',     floor: 'opd-f1', x: 0.815, y: 0.440, kind: 'lift',  name: 'Lift lobby (east block)', landmark: 'The lift lobby in the east block', shaft: 'opd-lift-east', canStart: true, seed: true },

    { id: 'f1-c-n',  floor: 'opd-f1', x: 0.360, y: 0.105, kind: 'junction', name: 'North corridor (west end)', seed: true },
    { id: 'f1-c-ne', floor: 'opd-f1', x: 0.665, y: 0.105, kind: 'junction', name: 'North corridor (east end)', seed: true },
    { id: 'f1-c-1',  floor: 'opd-f1', x: 0.360, y: 0.200, kind: 'junction', name: 'Main corridor', seed: true },
    { id: 'f1-c-2',  floor: 'opd-f1', x: 0.360, y: 0.320, kind: 'junction', name: 'Main corridor', seed: true },
    { id: 'f1-c-3',  floor: 'opd-f1', x: 0.360, y: 0.450, kind: 'junction', name: 'Main corridor', seed: true },
    { id: 'f1-c-4',  floor: 'opd-f1', x: 0.360, y: 0.560, kind: 'junction', name: 'Corridor junction (lift block turning)', seed: true },
    { id: 'f1-c-5',  floor: 'opd-f1', x: 0.360, y: 0.700, kind: 'landmark', name: 'Fire plan board', landmark: 'The green fire evacuation board on the wall', canStart: true, seed: true },
    { id: 'f1-c-6',  floor: 'opd-f1', x: 0.360, y: 0.800, kind: 'junction', name: 'South corridor', seed: true },
    { id: 'f1-e-1',  floor: 'opd-f1', x: 0.665, y: 0.270, kind: 'junction', name: 'East corridor', seed: true },
    { id: 'f1-e-2',  floor: 'opd-f1', x: 0.665, y: 0.560, kind: 'junction', name: 'East corridor', seed: true },
    { id: 'f1-link', floor: 'opd-f1', x: 0.780, y: 0.555, kind: 'junction', name: 'Link corridor to lift block', seed: true },

    /* ---- OPD 2nd floor ---------------------------------------------------- */
    { id: 'f2-stair-nw', floor: 'opd-f2', x: 0.090, y: 0.065, kind: 'stair', name: 'North-west staircase', shaft: 'opd-stair-nw', canStart: true, seed: true },
    { id: 'f2-stair-ne', floor: 'opd-f2', x: 0.530, y: 0.065, kind: 'stair', name: 'North-east staircase', shaft: 'opd-stair-ne', canStart: true, seed: true },
    { id: 'f2-stair-sw', floor: 'opd-f2', x: 0.105, y: 0.985, kind: 'stair', name: 'South-west staircase', shaft: 'opd-stair-sw', canStart: true, seed: true },
    { id: 'f2-stair-e',  floor: 'opd-f2', x: 0.735, y: 0.330, kind: 'stair', name: 'East block staircase', shaft: 'opd-stair-east', canStart: true, seed: true },
    { id: 'f2-lift',     floor: 'opd-f2', x: 0.700, y: 0.470, kind: 'lift',  name: 'Lift lobby (east block)', landmark: 'The lift lobby in the east block', shaft: 'opd-lift-east', canStart: true, seed: true },

    { id: 'f2-c-n',   floor: 'opd-f2', x: 0.130, y: 0.125, kind: 'junction', name: 'North corridor (west end)', seed: true },
    { id: 'f2-c-n2',  floor: 'opd-f2', x: 0.300, y: 0.125, kind: 'junction', name: 'North corridor', seed: true },
    { id: 'f2-c-ne',  floor: 'opd-f2', x: 0.500, y: 0.125, kind: 'junction', name: 'North corridor (east end)', seed: true },
    { id: 'f2-c-1',   floor: 'opd-f2', x: 0.500, y: 0.200, kind: 'junction', name: 'Main corridor', seed: true },
    { id: 'f2-c-2',   floor: 'opd-f2', x: 0.500, y: 0.330, kind: 'junction', name: 'Main corridor', seed: true },
    { id: 'f2-c-3',   floor: 'opd-f2', x: 0.500, y: 0.450, kind: 'junction', name: 'Main corridor', seed: true },
    { id: 'f2-c-4',   floor: 'opd-f2', x: 0.500, y: 0.550, kind: 'junction', name: 'Main corridor', seed: true },
    { id: 'f2-c-5',   floor: 'opd-f2', x: 0.500, y: 0.665, kind: 'junction', name: 'Corridor junction (lift block turning)', seed: true },
    { id: 'f2-c-6',   floor: 'opd-f2', x: 0.500, y: 0.800, kind: 'junction', name: 'Main corridor', seed: true },
    { id: 'f2-c-7',   floor: 'opd-f2', x: 0.500, y: 0.930, kind: 'junction', name: 'South corridor (east end)', seed: true },
    { id: 'f2-w-1',   floor: 'opd-f2', x: 0.115, y: 0.300, kind: 'junction', name: 'West corridor', seed: true },
    { id: 'f2-w-2',   floor: 'opd-f2', x: 0.115, y: 0.650, kind: 'junction', name: 'West corridor', seed: true },
    { id: 'f2-w-3',   floor: 'opd-f2', x: 0.120, y: 0.930, kind: 'junction', name: 'South corridor (west end)', seed: true },
    { id: 'f2-elink', floor: 'opd-f2', x: 0.620, y: 0.665, kind: 'junction', name: 'Link corridor to lift block', seed: true },

    /* Two throwaway rooms so search and routing have something to chew on.
       Delete them as soon as you have entered real ones. */
    { id: 'f2-sample-a', floor: 'opd-f2', x: 0.420, y: 0.330, kind: 'room', room: 'S1', name: 'Sample Room A', aliases: [], seed: true, sample: true },
    { id: 'f2-sample-b', floor: 'opd-f2', x: 0.420, y: 0.665, kind: 'room', room: 'S2', name: 'Sample Room B', aliases: [], seed: true, sample: true }
  ],

  edges: [
    ['f1-stair-nw', 'f1-c-n'], ['f1-c-n', 'f1-c-ne'], ['f1-c-ne', 'f1-stair-ne'],
    ['f1-c-n', 'f1-c-1'], ['f1-c-1', 'f1-c-2'], ['f1-c-2', 'f1-c-3'],
    ['f1-c-3', 'f1-c-4'], ['f1-c-4', 'f1-c-5'], ['f1-c-5', 'f1-c-6'],
    ['f1-c-6', 'f1-stair-sw'],
    ['f1-c-ne', 'f1-e-1'], ['f1-e-1', 'f1-e-2'], ['f1-c-4', 'f1-e-2'],
    ['f1-e-2', 'f1-link'], ['f1-link', 'f1-lift'], ['f1-lift', 'f1-stair-e'],

    ['f2-stair-nw', 'f2-c-n'], ['f2-c-n', 'f2-c-n2'], ['f2-c-n2', 'f2-c-ne'],
    ['f2-c-ne', 'f2-stair-ne'], ['f2-c-ne', 'f2-c-1'],
    ['f2-c-1', 'f2-c-2'], ['f2-c-2', 'f2-c-3'], ['f2-c-3', 'f2-c-4'],
    ['f2-c-4', 'f2-c-5'], ['f2-c-5', 'f2-c-6'], ['f2-c-6', 'f2-c-7'],
    ['f2-c-n', 'f2-w-1'], ['f2-w-1', 'f2-w-2'], ['f2-w-2', 'f2-w-3'],
    ['f2-w-3', 'f2-stair-sw'], ['f2-w-3', 'f2-c-7'],
    ['f2-c-5', 'f2-elink'], ['f2-elink', 'f2-lift'], ['f2-lift', 'f2-stair-e'],
    ['f2-c-2', 'f2-sample-a'], ['f2-c-5', 'f2-sample-b']
  ]
};
