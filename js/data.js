/* Way Finder survey data, exported 2026-08-31 07:13.
   Replace js/data.js with this file and push to publish it.
   Survey mode can also read it back in through Import. */
var APP_TITLE = "Way Finder";

var SEED_BUILDING = {
  "version": 1,
  "floors": [
    {
      "id": "ipd-g",
      "block": "IPD",
      "level": 0,
      "label": "IPD · Ground",
      "plan": "assets/plans/ipd-g.jpg",
      "aspect": 1.147,
      "metresPerUnit": 95,
      "calibrated": false
    },
    {
      "id": "opd-f1",
      "block": "OPD",
      "level": 1,
      "label": "OPD · 1st Floor",
      "plan": "assets/plans/opd-f1.jpg",
      "aspect": 0.9125,
      "metresPerUnit": 75,
      "calibrated": false
    },
    {
      "id": "opd-f2",
      "block": "OPD",
      "level": 2,
      "label": "OPD · 2nd Floor",
      "plan": "assets/plans/opd-f2.jpg",
      "aspect": 1.0756,
      "metresPerUnit": 75,
      "calibrated": false
    },
    {
      "id": "opd-f4",
      "block": "OPD",
      "level": 4,
      "label": "OPD · 4th Floor",
      "plan": "assets/plans/opd-f4.jpg",
      "aspect": 1.1685,
      "metresPerUnit": 75,
      "calibrated": false
    }
  ],
  "nodes": [
    {
      "id": "f1-stair-nw",
      "floor": "opd-f1",
      "x": 0.31,
      "y": 0.055,
      "kind": "stair",
      "name": "North-west staircase",
      "shaft": "opd-stair-nw",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-stair-ne",
      "floor": "opd-f1",
      "x": 0.68,
      "y": 0.055,
      "kind": "stair",
      "name": "North-east staircase",
      "shaft": "opd-stair-ne",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-stair-sw",
      "floor": "opd-f1",
      "x": 0.32,
      "y": 0.83,
      "kind": "stair",
      "name": "South-west staircase",
      "shaft": "opd-stair-sw",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-stair-e",
      "floor": "opd-f1",
      "x": 0.845,
      "y": 0.285,
      "kind": "stair",
      "name": "East block staircase",
      "shaft": "opd-stair-east",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-lift",
      "floor": "opd-f1",
      "x": 0.815,
      "y": 0.44,
      "kind": "lift",
      "name": "Lift lobby (east block)",
      "landmark": "The lift lobby in the east block",
      "shaft": "opd-lift-east",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-n",
      "floor": "opd-f1",
      "x": 0.36,
      "y": 0.105,
      "kind": "junction",
      "name": "North corridor (west end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-ne",
      "floor": "opd-f1",
      "x": 0.665,
      "y": 0.105,
      "kind": "junction",
      "name": "North corridor (east end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-1",
      "floor": "opd-f1",
      "x": 0.36,
      "y": 0.2,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-2",
      "floor": "opd-f1",
      "x": 0.36,
      "y": 0.32,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-3",
      "floor": "opd-f1",
      "x": 0.36,
      "y": 0.45,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-4",
      "floor": "opd-f1",
      "x": 0.36,
      "y": 0.56,
      "kind": "junction",
      "name": "Corridor junction (lift block turning)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-5",
      "floor": "opd-f1",
      "x": 0.36,
      "y": 0.7,
      "kind": "landmark",
      "name": "Fire plan board",
      "landmark": "The green fire evacuation board on the wall",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-6",
      "floor": "opd-f1",
      "x": 0.36,
      "y": 0.8,
      "kind": "junction",
      "name": "South corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-e-1",
      "floor": "opd-f1",
      "x": 0.665,
      "y": 0.27,
      "kind": "junction",
      "name": "East corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-e-2",
      "floor": "opd-f1",
      "x": 0.665,
      "y": 0.56,
      "kind": "junction",
      "name": "East corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-link",
      "floor": "opd-f1",
      "x": 0.78,
      "y": 0.555,
      "kind": "junction",
      "name": "Link corridor to lift block",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-stair-nw",
      "floor": "opd-f2",
      "x": 0.09,
      "y": 0.065,
      "kind": "stair",
      "name": "North-west staircase",
      "shaft": "opd-stair-nw",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-stair-ne",
      "floor": "opd-f2",
      "x": 0.53,
      "y": 0.065,
      "kind": "stair",
      "name": "North-east staircase",
      "shaft": "opd-stair-ne",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-stair-sw",
      "floor": "opd-f2",
      "x": 0.105,
      "y": 0.985,
      "kind": "stair",
      "name": "South-west staircase",
      "shaft": "opd-stair-sw",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-stair-e",
      "floor": "opd-f2",
      "x": 0.735,
      "y": 0.33,
      "kind": "stair",
      "name": "East block staircase",
      "shaft": "opd-stair-east",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-lift",
      "floor": "opd-f2",
      "x": 0.7,
      "y": 0.47,
      "kind": "lift",
      "name": "Lift lobby (east block)",
      "landmark": "The lift lobby in the east block",
      "shaft": "opd-lift-east",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-n",
      "floor": "opd-f2",
      "x": 0.13,
      "y": 0.125,
      "kind": "junction",
      "name": "North corridor (west end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-n2",
      "floor": "opd-f2",
      "x": 0.3,
      "y": 0.125,
      "kind": "junction",
      "name": "North corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-ne",
      "floor": "opd-f2",
      "x": 0.5,
      "y": 0.125,
      "kind": "junction",
      "name": "North corridor (east end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-1",
      "floor": "opd-f2",
      "x": 0.5,
      "y": 0.2,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-2",
      "floor": "opd-f2",
      "x": 0.5,
      "y": 0.33,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-3",
      "floor": "opd-f2",
      "x": 0.5,
      "y": 0.45,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-4",
      "floor": "opd-f2",
      "x": 0.5,
      "y": 0.55,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-5",
      "floor": "opd-f2",
      "x": 0.5,
      "y": 0.665,
      "kind": "junction",
      "name": "Corridor junction (lift block turning)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-6",
      "floor": "opd-f2",
      "x": 0.5,
      "y": 0.8,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-7",
      "floor": "opd-f2",
      "x": 0.5,
      "y": 0.93,
      "kind": "junction",
      "name": "South corridor (east end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-w-1",
      "floor": "opd-f2",
      "x": 0.115,
      "y": 0.3,
      "kind": "junction",
      "name": "West corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-w-2",
      "floor": "opd-f2",
      "x": 0.115,
      "y": 0.65,
      "kind": "junction",
      "name": "West corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-w-3",
      "floor": "opd-f2",
      "x": 0.12,
      "y": 0.93,
      "kind": "junction",
      "name": "South corridor (west end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-elink",
      "floor": "opd-f2",
      "x": 0.62,
      "y": 0.665,
      "kind": "junction",
      "name": "Link corridor to lift block",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-sample-a",
      "floor": "opd-f2",
      "x": 0.42,
      "y": 0.33,
      "kind": "room",
      "room": "S1",
      "name": "Sample Room A",
      "aliases": [],
      "seed": true,
      "sample": true
    },
    {
      "id": "f2-sample-b",
      "floor": "opd-f2",
      "x": 0.42,
      "y": 0.665,
      "kind": "room",
      "room": "S2",
      "name": "Sample Room B",
      "aliases": [],
      "seed": true,
      "sample": true
    },
    {
      "id": "r-1",
      "floor": "opd-f1",
      "x": 0.5734,
      "y": 0.0486,
      "w": 0.0276,
      "h": 0.0227,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-2",
      "floor": "opd-f1",
      "x": 0.5737,
      "y": 0.0758,
      "w": 0.0269,
      "h": 0.0234,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-3",
      "floor": "opd-f1",
      "x": 0.3119,
      "y": 0.1444,
      "w": 0.0558,
      "h": 0.0476,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-4",
      "floor": "opd-f1",
      "x": 0.3842,
      "y": 0.1468,
      "w": 0.031,
      "h": 0.0496,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-5",
      "floor": "opd-f1",
      "x": 0.419,
      "y": 0.1468,
      "w": 0.0317,
      "h": 0.0496,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-6",
      "floor": "opd-f1",
      "x": 0.4538,
      "y": 0.1468,
      "w": 0.031,
      "h": 0.0496,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-7",
      "floor": "opd-f1",
      "x": 0.5593,
      "y": 0.1468,
      "w": 0.0434,
      "h": 0.0496,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-8",
      "floor": "opd-f1",
      "x": 0.4886,
      "y": 0.1471,
      "w": 0.0317,
      "h": 0.0503,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-9",
      "floor": "opd-f1",
      "x": 0.5214,
      "y": 0.1471,
      "w": 0.0269,
      "h": 0.0503,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-10",
      "floor": "opd-f1",
      "x": 0.6048,
      "y": 0.1471,
      "w": 0.0407,
      "h": 0.0503,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-11",
      "floor": "opd-f1",
      "x": 0.9142,
      "y": 0.1595,
      "w": 0.0227,
      "h": 0.0241,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-12",
      "floor": "opd-f1",
      "x": 0.7857,
      "y": 0.1706,
      "w": 0.0221,
      "h": 0.0448,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-13",
      "floor": "opd-f1",
      "x": 0.888,
      "y": 0.1837,
      "w": 0.0227,
      "h": 0.0227,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-14",
      "floor": "opd-f1",
      "x": 0.1378,
      "y": 0.2071,
      "w": 0.0717,
      "h": 0.0765,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-15",
      "floor": "opd-f1",
      "x": 0.4321,
      "y": 0.2257,
      "w": 0.0358,
      "h": 0.0517,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-16",
      "floor": "opd-f1",
      "x": 0.8415,
      "y": 0.2281,
      "w": 0.0358,
      "h": 0.0634,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-17",
      "floor": "opd-f1",
      "x": 0.3215,
      "y": 0.2305,
      "w": 0.0476,
      "h": 0.0365,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-18",
      "floor": "opd-f1",
      "x": 0.5241,
      "y": 0.2374,
      "w": 0.0269,
      "h": 0.0296,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-19",
      "floor": "opd-f1",
      "x": 0.5572,
      "y": 0.2405,
      "w": 0.0324,
      "h": 0.0234,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-20",
      "floor": "opd-f1",
      "x": 0.6837,
      "y": 0.286,
      "w": 0.0689,
      "h": 0.3046,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-21",
      "floor": "opd-f1",
      "x": 0.4214,
      "y": 0.2901,
      "w": 0.0338,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-22",
      "floor": "opd-f1",
      "x": 0.4583,
      "y": 0.2901,
      "w": 0.0331,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-23",
      "floor": "opd-f1",
      "x": 0.4948,
      "y": 0.2901,
      "w": 0.0331,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-24",
      "floor": "opd-f1",
      "x": 0.2219,
      "y": 0.2905,
      "w": 0.0924,
      "h": 0.082,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-25",
      "floor": "opd-f1",
      "x": 0.3846,
      "y": 0.2905,
      "w": 0.0331,
      "h": 0.0241,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-26",
      "floor": "opd-f1",
      "x": 0.5314,
      "y": 0.2905,
      "w": 0.0331,
      "h": 0.0241,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-27",
      "floor": "opd-f1",
      "x": 0.5682,
      "y": 0.2905,
      "w": 0.0338,
      "h": 0.0241,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-28",
      "floor": "opd-f1",
      "x": 0.6058,
      "y": 0.2905,
      "w": 0.0345,
      "h": 0.0241,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-29",
      "floor": "opd-f1",
      "x": 0.8122,
      "y": 0.3312,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-30",
      "floor": "opd-f1",
      "x": 0.837,
      "y": 0.3312,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-31",
      "floor": "opd-f1",
      "x": 0.8625,
      "y": 0.3312,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-32",
      "floor": "opd-f1",
      "x": 0.0706,
      "y": 0.3456,
      "w": 0.0558,
      "h": 0.0655,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-33",
      "floor": "opd-f1",
      "x": 0.4666,
      "y": 0.3532,
      "w": 0.0262,
      "h": 0.0351,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-34",
      "floor": "opd-f1",
      "x": 0.5558,
      "y": 0.3728,
      "w": 0.1344,
      "h": 0.0827,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-35",
      "floor": "opd-f1",
      "x": 0.9139,
      "y": 0.3728,
      "w": 0.0234,
      "h": 0.0469,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-36",
      "floor": "opd-f1",
      "x": 0.3184,
      "y": 0.3753,
      "w": 0.0414,
      "h": 0.0434,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-37",
      "floor": "opd-f1",
      "x": 0.4121,
      "y": 0.3828,
      "w": 0.0868,
      "h": 0.0531,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-38",
      "floor": "opd-f1",
      "x": 0.4662,
      "y": 0.3939,
      "w": 0.0269,
      "h": 0.0407,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-39",
      "floor": "opd-f1",
      "x": 0.8122,
      "y": 0.4132,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-40",
      "floor": "opd-f1",
      "x": 0.837,
      "y": 0.4132,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-41",
      "floor": "opd-f1",
      "x": 0.8625,
      "y": 0.4135,
      "w": 0.0214,
      "h": 0.0262,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-42",
      "floor": "opd-f1",
      "x": 0.3215,
      "y": 0.4469,
      "w": 0.0489,
      "h": 0.0917,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-43",
      "floor": "opd-f1",
      "x": 0.4669,
      "y": 0.4673,
      "w": 0.0283,
      "h": 0.0496,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-44",
      "floor": "opd-f1",
      "x": 0.4118,
      "y": 0.4969,
      "w": 0.0875,
      "h": 0.1089,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-45",
      "floor": "opd-f1",
      "x": 0.6092,
      "y": 0.5227,
      "w": 0.0276,
      "h": 0.0558,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-46",
      "floor": "opd-f1",
      "x": 0.4666,
      "y": 0.5234,
      "w": 0.0289,
      "h": 0.0558,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-47",
      "floor": "opd-f1",
      "x": 0.888,
      "y": 0.5682,
      "w": 0.0227,
      "h": 0.0227,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-48",
      "floor": "opd-f1",
      "x": 0.5045,
      "y": 0.5693,
      "w": 0.0303,
      "h": 0.0276,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-49",
      "floor": "opd-f1",
      "x": 0.7857,
      "y": 0.5817,
      "w": 0.0221,
      "h": 0.0496,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-50",
      "floor": "opd-f1",
      "x": 0.5758,
      "y": 0.5837,
      "w": 0.0324,
      "h": 0.0565,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-51",
      "floor": "opd-f1",
      "x": 0.4721,
      "y": 0.5934,
      "w": 0.0276,
      "h": 0.0372,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-52",
      "floor": "opd-f1",
      "x": 0.4394,
      "y": 0.5937,
      "w": 0.031,
      "h": 0.0365,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-53",
      "floor": "opd-f1",
      "x": 0.9142,
      "y": 0.5951,
      "w": 0.0227,
      "h": 0.0227,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-54",
      "floor": "opd-f1",
      "x": 0.3208,
      "y": 0.6206,
      "w": 0.0489,
      "h": 0.0669,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-55",
      "floor": "opd-f1",
      "x": 0.5979,
      "y": 0.652,
      "w": 0.0517,
      "h": 0.0234,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-56",
      "floor": "opd-f1",
      "x": 0.3853,
      "y": 0.653,
      "w": 0.0345,
      "h": 0.0227,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-57",
      "floor": "opd-f1",
      "x": 0.5014,
      "y": 0.6678,
      "w": 0.0255,
      "h": 0.0551,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-58",
      "floor": "opd-f1",
      "x": 0.5307,
      "y": 0.6678,
      "w": 0.0262,
      "h": 0.0551,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-59",
      "floor": "opd-f1",
      "x": 0.4421,
      "y": 0.6682,
      "w": 0.0255,
      "h": 0.0544,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-60",
      "floor": "opd-f1",
      "x": 0.4717,
      "y": 0.6682,
      "w": 0.0269,
      "h": 0.0544,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-61",
      "floor": "opd-f1",
      "x": 0.3856,
      "y": 0.6826,
      "w": 0.0338,
      "h": 0.0296,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-62",
      "floor": "opd-f1",
      "x": 0.5979,
      "y": 0.7006,
      "w": 0.0503,
      "h": 0.0669,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-63",
      "floor": "opd-f1",
      "x": 0.5307,
      "y": 0.713,
      "w": 0.0262,
      "h": 0.0283,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-64",
      "floor": "opd-f1",
      "x": 0.3856,
      "y": 0.7133,
      "w": 0.0338,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-65",
      "floor": "opd-f1",
      "x": 0.4421,
      "y": 0.7133,
      "w": 0.0255,
      "h": 0.0289,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-66",
      "floor": "opd-f1",
      "x": 0.4717,
      "y": 0.7133,
      "w": 0.0269,
      "h": 0.0289,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-67",
      "floor": "opd-f1",
      "x": 0.501,
      "y": 0.7133,
      "w": 0.0262,
      "h": 0.0289,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-68",
      "floor": "opd-f1",
      "x": 0.2174,
      "y": 0.7161,
      "w": 0.1013,
      "h": 0.0551,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-69",
      "floor": "opd-f1",
      "x": 0.3856,
      "y": 0.7416,
      "w": 0.0338,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-70",
      "floor": "opd-f1",
      "x": 0.6089,
      "y": 0.7509,
      "w": 0.0269,
      "h": 0.0269,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-71",
      "floor": "opd-f1",
      "x": 0.5617,
      "y": 0.7746,
      "w": 0.0372,
      "h": 0.0358,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-72",
      "floor": "opd-f1",
      "x": 0.603,
      "y": 0.7802,
      "w": 0.0386,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-73",
      "floor": "opd-f1",
      "x": 0.4263,
      "y": 0.8318,
      "w": 0.0365,
      "h": 0.0262,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-74",
      "floor": "opd-f1",
      "x": 0.3725,
      "y": 0.8642,
      "w": 0.0269,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    }
  ],
  "edges": [
    [
      "f1-stair-nw",
      "f1-c-n"
    ],
    [
      "f1-c-n",
      "f1-c-ne"
    ],
    [
      "f1-c-ne",
      "f1-stair-ne"
    ],
    [
      "f1-c-n",
      "f1-c-1"
    ],
    [
      "f1-c-1",
      "f1-c-2"
    ],
    [
      "f1-c-2",
      "f1-c-3"
    ],
    [
      "f1-c-3",
      "f1-c-4"
    ],
    [
      "f1-c-4",
      "f1-c-5"
    ],
    [
      "f1-c-5",
      "f1-c-6"
    ],
    [
      "f1-c-6",
      "f1-stair-sw"
    ],
    [
      "f1-c-ne",
      "f1-e-1"
    ],
    [
      "f1-e-1",
      "f1-e-2"
    ],
    [
      "f1-c-4",
      "f1-e-2"
    ],
    [
      "f1-e-2",
      "f1-link"
    ],
    [
      "f1-link",
      "f1-lift"
    ],
    [
      "f1-lift",
      "f1-stair-e"
    ],
    [
      "f2-stair-nw",
      "f2-c-n"
    ],
    [
      "f2-c-n",
      "f2-c-n2"
    ],
    [
      "f2-c-n2",
      "f2-c-ne"
    ],
    [
      "f2-c-ne",
      "f2-stair-ne"
    ],
    [
      "f2-c-ne",
      "f2-c-1"
    ],
    [
      "f2-c-1",
      "f2-c-2"
    ],
    [
      "f2-c-2",
      "f2-c-3"
    ],
    [
      "f2-c-3",
      "f2-c-4"
    ],
    [
      "f2-c-4",
      "f2-c-5"
    ],
    [
      "f2-c-5",
      "f2-c-6"
    ],
    [
      "f2-c-6",
      "f2-c-7"
    ],
    [
      "f2-c-n",
      "f2-w-1"
    ],
    [
      "f2-w-1",
      "f2-w-2"
    ],
    [
      "f2-w-2",
      "f2-w-3"
    ],
    [
      "f2-w-3",
      "f2-stair-sw"
    ],
    [
      "f2-w-3",
      "f2-c-7"
    ],
    [
      "f2-c-5",
      "f2-elink"
    ],
    [
      "f2-elink",
      "f2-lift"
    ],
    [
      "f2-lift",
      "f2-stair-e"
    ],
    [
      "f2-c-2",
      "f2-sample-a"
    ],
    [
      "f2-c-5",
      "f2-sample-b"
    ]
  ]
};
