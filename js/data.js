/* Way Finder survey data, 2026-09-15 05:01.
   Changes applied by tools/apply_changes.js: the ramps, four boxes a floor
   over the zig-zag beside the lift core, on all five OPD floors.

   Each floor's two long runs are joined to the lobby point; the two landings
   that turn between them are not, so half the twenty go nowhere. All twenty
   are called "Ramp", which puts four rows of the same word on each floor's
   list, two of them dead ends. They are segments of one ramp rather than four
   places, and reading like that in the app is a matter of joining the landings
   to the runs, or of naming them apart.

   Rooms on opd-f3 connected to the corridor by tools/link_rooms.js:
   each link is the perpendicular to the nearest corridor, a first
   approximation to be corrected on the floor with the Connect tool.
   The OPD ground floor was added from its fire-evacuation board: its
   staircases sit on the shafts the floors above already use, and its
   corridors follow the escape routes printed on the plan.
   Survey mode can read this back in through Import. */
var APP_TITLE = "Way Finder";

var SEED_BUILDING = {
  "version": 1,
  "floors": [
    {
      "id": "ipd-g",
      "hidden": true,
      "block": "IPD",
      "level": 0,
      "label": "IPD · Ground",
      "plan": "assets/plans/ipd-g.jpg",
      "aspect": 1.147,
      "metresPerUnit": 95,
      "calibrated": false
    },
    {
      "id": "opd-g",
      "block": "OPD",
      "level": 0,
      "label": "OPD · Ground",
      "plan": "assets/plans/opd-g.jpg",
      "aspect": 0.8836,
      "metresPerUnit": 79,
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
      "id": "opd-f3",
      "block": "OPD",
      "level": 3,
      "label": "OPD · 3rd Floor",
      "plan": "assets/plans/opd-f3.jpg",
      "aspect": 1.0756,
      "metresPerUnit": 75,
      "calibrated": false
    },
    {
      "id": "opd-f4",
      "hidden": true,
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
      "x": 0.31127127749127304,
      "y": 0.06460336960456832,
      "kind": "stair",
      "name": "North-west staircase",
      "shaft": "opd-stair-nw",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.05210361840681438,
      "h": 0.05829316278083102
    },
    {
      "id": "f1-stair-ne",
      "floor": "opd-f1",
      "x": 0.6816090240953411,
      "y": 0.06303717357053591,
      "kind": "stair",
      "name": "North-east staircase",
      "shaft": "opd-stair-ne",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.05421718689959909,
      "h": 0.05925240089961162
    },
    {
      "id": "f1-stair-sw",
      "floor": "opd-f1",
      "x": 0.32855819114172746,
      "y": 0.848368969762465,
      "kind": "stair",
      "name": "South-west staircase",
      "shaft": "opd-stair-sw",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.05926972520537477,
      "h": 0.058974290610689484
    },
    {
      "id": "f1-stair-e",
      "floor": "opd-f1",
      "x": 0.8435839407358023,
      "y": 0.28871674860112045,
      "kind": "stair",
      "name": "East block staircase",
      "shaft": "opd-stair-east",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.06140037114911967,
      "h": 0.052433497202241
    },
    {
      "id": "f1-c-n",
      "floor": "opd-f1",
      "x": 0.3533458245731146,
      "y": 0.10915141145654891,
      "kind": "junction",
      "name": "North corridor (west end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-ne",
      "floor": "opd-f1",
      "x": 0.6493332115836002,
      "y": 0.10981853394056412,
      "kind": "junction",
      "name": "North corridor (east end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-1",
      "floor": "opd-f1",
      "x": 0.3541745449273445,
      "y": 0.18721043926470807,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-2",
      "floor": "opd-f1",
      "x": 0.3556505150950965,
      "y": 0.32,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-3",
      "floor": "opd-f1",
      "x": 0.3536329859084245,
      "y": 0.43203015807840045,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-c-6",
      "floor": "opd-f1",
      "x": 0.3536155549001794,
      "y": 0.8059949728879774,
      "kind": "junction",
      "name": "South corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-e-1",
      "floor": "opd-f1",
      "x": 0.648721684572692,
      "y": 0.26741741318866186,
      "kind": "junction",
      "name": "East corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-stair-nw",
      "floor": "opd-f2",
      "x": 0.09102638409684108,
      "y": 0.07816679125649958,
      "kind": "stair",
      "name": "North-west staircase",
      "shaft": "opd-stair-nw",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.06888589335968406,
      "h": 0.06870716564968415
    },
    {
      "id": "f2-stair-ne",
      "floor": "opd-f2",
      "x": 0.5404529377419165,
      "y": 0.07932618759196715,
      "kind": "stair",
      "name": "North-east staircase",
      "shaft": "opd-stair-ne",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.0687579016902572,
      "h": 0.07486076906232156
    },
    {
      "id": "f2-stair-sw",
      "floor": "opd-f2",
      "x": 0.11419531407025764,
      "y": 1.000885909806164,
      "kind": "stair",
      "name": "South-west staircase",
      "shaft": "opd-stair-sw",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.07503547568073884,
      "h": 0.06513189411689946
    },
    {
      "id": "f2-stair-e",
      "floor": "opd-f2",
      "x": 0.7334746243219921,
      "y": 0.3525985855989221,
      "kind": "stair",
      "name": "East block staircase",
      "shaft": "opd-stair-east",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.07367960398153639,
      "h": 0.05906759173250964
    },
    {
      "id": "f2-c-1",
      "floor": "opd-f2",
      "x": 0.4387633731919369,
      "y": 0.16039306965716224,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-2",
      "floor": "opd-f2",
      "x": 0.43875355682699857,
      "y": 0.3515940745433468,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-3",
      "floor": "opd-f2",
      "x": 0.44028355625114785,
      "y": 0.523953356687594,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-4",
      "floor": "opd-f2",
      "x": 0.44054381909052664,
      "y": 0.5743042445160139,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-5",
      "floor": "opd-f2",
      "x": 0.4404644866777977,
      "y": 0.7418420993265888,
      "kind": "junction",
      "name": "Corridor junction (lift block turning)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-6",
      "floor": "opd-f2",
      "x": 0.4386960868378975,
      "y": 0.8353526878250475,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-c-7",
      "floor": "opd-f2",
      "x": 0.43928553846043883,
      "y": 0.9423733867948461,
      "kind": "junction",
      "name": "South corridor (east end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-w-3",
      "floor": "opd-f2",
      "x": 0.145936264899237,
      "y": 0.9441411290739397,
      "kind": "junction",
      "name": "South corridor (west end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-sample-a",
      "floor": "opd-f2",
      "x": 0.4023893319130146,
      "y": 0.3197536782348325,
      "kind": "room",
      "room": "206",
      "name": "Refraction room",
      "aliases": [],
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "f2-sample-b",
      "floor": "opd-f2",
      "x": 0.4143058436985659,
      "y": 0.6645810656405569,
      "kind": "room",
      "room": "227",
      "name": "General surgery",
      "aliases": [],
      "landmark": "",
      "shaft": "",
      "w": 0.03361168739713183,
      "h": 0.04416213128111368
    },
    {
      "id": "r-1",
      "floor": "opd-f1",
      "x": 0.5734,
      "y": 0.0486,
      "w": 0.0276,
      "h": 0.0227,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-2",
      "floor": "opd-f1",
      "x": 0.5737,
      "y": 0.0758,
      "w": 0.0269,
      "h": 0.0234,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
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
      "name": "Immunization room",
      "aliases": [],
      "room": "106",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-5",
      "floor": "opd-f1",
      "x": 0.419,
      "y": 0.1468,
      "w": 0.0317,
      "h": 0.0496,
      "kind": "room",
      "name": "Diet and nutrition counseling room",
      "aliases": [],
      "room": "105",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-6",
      "floor": "opd-f1",
      "x": 0.4538,
      "y": 0.1468,
      "w": 0.031,
      "h": 0.0496,
      "kind": "room",
      "name": "Clinical epidemiology unit",
      "aliases": [],
      "room": "104",
      "landmark": "",
      "shaft": ""
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
      "name": "CTVS",
      "aliases": [],
      "room": "103",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-9",
      "floor": "opd-f1",
      "x": 0.5214,
      "y": 0.1471,
      "w": 0.0269,
      "h": 0.0503,
      "kind": "room",
      "name": "CTVS",
      "aliases": [],
      "room": "102",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-10",
      "floor": "opd-f1",
      "x": 0.6048,
      "y": 0.1471,
      "w": 0.0407,
      "h": 0.0503,
      "kind": "room",
      "name": "CTVS",
      "aliases": [],
      "room": "101",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-11",
      "floor": "opd-f4",
      "x": 0.30107331332470866,
      "y": 0.8431235760502894,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.056671585439545535,
      "h": 0.051263014857164446
    },
    {
      "id": "r-13",
      "floor": "opd-f4",
      "x": 0.41480464726919275,
      "y": 0.8409777503399084,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.05201361384763953,
      "h": 0.04774736142961733
    },
    {
      "id": "r-15",
      "floor": "opd-f1",
      "x": 0.4436378972088368,
      "y": 0.22625960150542035,
      "w": 0.058875794417673544,
      "h": 0.052819203010840726,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "108",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-16",
      "floor": "opd-f1",
      "x": 0.8302415737326461,
      "y": 0.22921301875109976,
      "w": 0.08662240664833176,
      "h": 0.06554049300213599,
      "kind": "room",
      "name": "Toilet Male",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
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
      "x": 0.523447414947757,
      "y": 0.22504979559204774,
      "w": 0.028205170104485977,
      "h": 0.05430040881590448,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "109",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-19",
      "floor": "opd-f1",
      "x": 0.5581816407807101,
      "y": 0.22550918995605693,
      "w": 0.030436718438579757,
      "h": 0.053381620087886106,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "110",
      "landmark": "",
      "shaft": ""
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
      "room": "119",
      "landmark": "",
      "shaft": ""
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
      "room": "118",
      "landmark": "",
      "shaft": ""
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
      "room": "117",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-25",
      "floor": "opd-f1",
      "x": 0.3846,
      "y": 0.2905,
      "w": 0.0331,
      "h": 0.0241,
      "kind": "room",
      "name": "Genetic counseling",
      "aliases": [],
      "room": "120",
      "landmark": "",
      "shaft": ""
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
      "room": "116",
      "landmark": "",
      "shaft": ""
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
      "room": "115",
      "landmark": "",
      "shaft": ""
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
      "room": "114",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-29",
      "floor": "opd-f1",
      "x": 0.8122,
      "y": 0.3312,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-30",
      "floor": "opd-f1",
      "x": 0.837,
      "y": 0.3312,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-31",
      "floor": "opd-f1",
      "x": 0.8625,
      "y": 0.3312,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
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
      "name": "Conference Room",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-35",
      "floor": "opd-f4",
      "x": 0.3582495366618465,
      "y": 0.8427885840487963,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.051780753026377135,
      "h": 0.04671305568903539
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
      "name": "Serology immunology lab",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
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
      "kind": "lift",
      "name": "Lift lobby (east block)",
      "aliases": [],
      "room": "",
      "landmark": "The lift lobby in the east block",
      "shaft": "opd-lift-east",
      "canStart": true
    },
    {
      "id": "r-40",
      "floor": "opd-f1",
      "x": 0.837,
      "y": 0.4132,
      "w": 0.0214,
      "h": 0.0255,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-41",
      "floor": "opd-f1",
      "x": 0.8625,
      "y": 0.4135,
      "w": 0.0214,
      "h": 0.0262,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-42",
      "floor": "opd-f1",
      "x": 0.4756706448220883,
      "y": 0.7676147040210926,
      "kind": "room",
      "name": "Physiotherapy",
      "aliases": [],
      "w": 0.11621313999107147,
      "h": 0.06211221950322743,
      "room": "141",
      "landmark": "",
      "shaft": ""
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
      "name": "Pathology",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-45",
      "floor": "opd-f1",
      "x": 0.5801486817676311,
      "y": 0.48402893509848155,
      "w": 0.08570263646473741,
      "h": 0.13314212980303708,
      "kind": "room",
      "name": "ECG",
      "aliases": [],
      "room": "128",
      "landmark": "",
      "shaft": ""
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
      "floor": "opd-f4",
      "x": 0.3488393062861444,
      "y": 0.4187440242171288,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.051780753026377135,
      "h": 0.04671305568903539
    },
    {
      "id": "r-48",
      "floor": "opd-f1",
      "x": 0.5230200261449551,
      "y": 0.5844278335987361,
      "w": 0.06734005228991025,
      "h": 0.05785566719747204,
      "kind": "room",
      "name": "Spirometry",
      "aliases": [],
      "room": "132",
      "landmark": "",
      "shaft": "",
      "services": [
        "Spirometry",
        "EEG",
        "Andrology"
      ]
    },
    {
      "id": "r-49",
      "floor": "opd-f4",
      "x": 0.4044745477044821,
      "y": 0.41875622279548724,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.051780753026377135,
      "h": 0.04671305568903539
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
      "room": "131",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-51",
      "floor": "opd-f1",
      "x": 0.4721,
      "y": 0.5934,
      "w": 0.0276,
      "h": 0.0372,
      "kind": "room",
      "name": "Autonomic function test",
      "aliases": [],
      "room": "133",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-52",
      "floor": "opd-f1",
      "x": 0.4394,
      "y": 0.5937,
      "w": 0.031,
      "h": 0.0365,
      "kind": "room",
      "name": "Uroflometry test lab",
      "aliases": [],
      "room": "134",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-53",
      "floor": "opd-f4",
      "x": 0.46453468201060444,
      "y": 0.4166860563452884,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.051780753026377135,
      "h": 0.04671305568903539
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
      "name": "Electro Physiology Lab",
      "aliases": [],
      "room": "136",
      "landmark": "",
      "shaft": "",
      "services": [
        "Electro Physiology Lab",
        "Nerve Conduction Test"
      ]
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
      "room": "150",
      "landmark": "",
      "shaft": ""
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
      "room": "138",
      "landmark": "",
      "shaft": ""
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
      "room": "137",
      "landmark": "",
      "shaft": ""
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
      "room": "140",
      "landmark": "",
      "shaft": ""
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
      "room": "139",
      "landmark": "",
      "shaft": ""
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
      "room": "149",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-62",
      "floor": "opd-f1",
      "x": 0.5979,
      "y": 0.7006,
      "w": 0.0503,
      "h": 0.0669,
      "kind": "room",
      "name": "Neuro Rehabilitation",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
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
      "room": "148",
      "landmark": "",
      "shaft": ""
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
      "floor": "opd-f4",
      "x": 0.12229728949170583,
      "y": 0.08748052768544745,
      "kind": "stair",
      "name": "",
      "aliases": [],
      "w": 0.07638787089435847,
      "h": 0.0722441467059362,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-75",
      "floor": "ipd-g",
      "x": 0.3889,
      "y": 0.0282,
      "w": 0.106,
      "h": 0.0239,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-76",
      "floor": "ipd-g",
      "x": 0.6556,
      "y": 0.0286,
      "w": 0.106,
      "h": 0.0231,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-77",
      "floor": "ipd-g",
      "x": 0.1932,
      "y": 0.059,
      "w": 0.0274,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-78",
      "floor": "ipd-g",
      "x": 0.2209,
      "y": 0.0594,
      "w": 0.0231,
      "h": 0.0333,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-79",
      "floor": "ipd-g",
      "x": 0.247,
      "y": 0.0594,
      "w": 0.0239,
      "h": 0.0333,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-80",
      "floor": "ipd-g",
      "x": 0.2731,
      "y": 0.0594,
      "w": 0.0231,
      "h": 0.0333,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-81",
      "floor": "ipd-g",
      "x": 0.4167,
      "y": 0.0679,
      "w": 0.0504,
      "h": 0.0504,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-82",
      "floor": "ipd-g",
      "x": 0.5226,
      "y": 0.1128,
      "w": 0.0504,
      "h": 0.0291,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-83",
      "floor": "ipd-g",
      "x": 0.0953,
      "y": 0.1462,
      "w": 0.0538,
      "h": 0.106,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-84",
      "floor": "ipd-g",
      "x": 0.3641,
      "y": 0.1466,
      "w": 0.0513,
      "h": 0.0316,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-85",
      "floor": "ipd-g",
      "x": 0.1671,
      "y": 0.1479,
      "w": 0.0778,
      "h": 0.1009,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-86",
      "floor": "ipd-g",
      "x": 0.2457,
      "y": 0.1487,
      "w": 0.0761,
      "h": 0.1009,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-87",
      "floor": "ipd-g",
      "x": 0.3107,
      "y": 0.1487,
      "w": 0.0504,
      "h": 0.1009,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-88",
      "floor": "ipd-g",
      "x": 0.5115,
      "y": 0.1598,
      "w": 0.035,
      "h": 0.0291,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-89",
      "floor": "ipd-g",
      "x": 0.7239,
      "y": 0.1603,
      "w": 0.0735,
      "h": 0.0214,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-90",
      "floor": "ipd-g",
      "x": 0.6876,
      "y": 0.2115,
      "w": 0.0333,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-91",
      "floor": "ipd-g",
      "x": 0.7701,
      "y": 0.2115,
      "w": 0.0513,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-92",
      "floor": "ipd-g",
      "x": 0.7244,
      "y": 0.2128,
      "w": 0.0368,
      "h": 0.0239,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-93",
      "floor": "ipd-g",
      "x": 0.4782,
      "y": 0.2201,
      "w": 0.0333,
      "h": 0.0333,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-94",
      "floor": "ipd-g",
      "x": 0.7244,
      "y": 0.2389,
      "w": 0.0744,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-95",
      "floor": "ipd-g",
      "x": 0.2214,
      "y": 0.25,
      "w": 0.0291,
      "h": 0.0624,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-96",
      "floor": "ipd-g",
      "x": 0.097,
      "y": 0.2504,
      "w": 0.0573,
      "h": 0.0906,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-97",
      "floor": "ipd-g",
      "x": 0.8427,
      "y": 0.2547,
      "w": 0.0513,
      "h": 0.1128,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-98",
      "floor": "ipd-g",
      "x": 0.7244,
      "y": 0.265,
      "w": 0.0726,
      "h": 0.0222,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-99",
      "floor": "ipd-g",
      "x": 0.5085,
      "y": 0.2718,
      "w": 0.0308,
      "h": 0.0256,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-100",
      "floor": "ipd-g",
      "x": 0.0645,
      "y": 0.3004,
      "w": 0.0299,
      "h": 0.0282,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-101",
      "floor": "ipd-g",
      "x": 0.0991,
      "y": 0.3009,
      "w": 0.0308,
      "h": 0.0291,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-102",
      "floor": "ipd-g",
      "x": 0.9017,
      "y": 0.3068,
      "w": 0.0564,
      "h": 0.2171,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-103",
      "floor": "ipd-g",
      "x": 0.4782,
      "y": 0.309,
      "w": 0.0282,
      "h": 0.0436,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-104",
      "floor": "ipd-g",
      "x": 0.8543,
      "y": 0.3402,
      "w": 0.0282,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-105",
      "floor": "ipd-g",
      "x": 0.4774,
      "y": 0.3774,
      "w": 0.0299,
      "h": 0.0436,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-106",
      "floor": "ipd-g",
      "x": 0.5368,
      "y": 0.3778,
      "w": 0.0256,
      "h": 0.0444,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-107",
      "floor": "ipd-g",
      "x": 0.1953,
      "y": 0.3791,
      "w": 0.0282,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-108",
      "floor": "ipd-g",
      "x": 0.5081,
      "y": 0.3821,
      "w": 0.0265,
      "h": 0.0462,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-109",
      "floor": "ipd-g",
      "x": 0.297,
      "y": 0.3915,
      "w": 0.0829,
      "h": 0.0325,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-110",
      "floor": "ipd-g",
      "x": 0.6427,
      "y": 0.3923,
      "w": 0.0444,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-111",
      "floor": "ipd-g",
      "x": 0.6966,
      "y": 0.3923,
      "w": 0.0239,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-112",
      "floor": "ipd-g",
      "x": 0.8509,
      "y": 0.3962,
      "w": 0.035,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-113",
      "floor": "ipd-g",
      "x": 0.4791,
      "y": 0.4244,
      "w": 0.035,
      "h": 0.035,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-114",
      "floor": "ipd-g",
      "x": 0.5342,
      "y": 0.4248,
      "w": 0.0308,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-115",
      "floor": "ipd-g",
      "x": 0.8427,
      "y": 0.4346,
      "w": 0.0513,
      "h": 0.047,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-116",
      "floor": "ipd-g",
      "x": 0.9013,
      "y": 0.4346,
      "w": 0.0573,
      "h": 0.0487,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-117",
      "floor": "ipd-g",
      "x": 0.6735,
      "y": 0.4423,
      "w": 0.0376,
      "h": 0.0316,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-118",
      "floor": "ipd-g",
      "x": 0.7385,
      "y": 0.4423,
      "w": 0.0376,
      "h": 0.0316,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-119",
      "floor": "ipd-g",
      "x": 0.7726,
      "y": 0.4427,
      "w": 0.0256,
      "h": 0.0308,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-120",
      "floor": "ipd-g",
      "x": 0.8017,
      "y": 0.4432,
      "w": 0.0256,
      "h": 0.0299,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-121",
      "floor": "ipd-g",
      "x": 0.4094,
      "y": 0.4436,
      "w": 0.0308,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-122",
      "floor": "ipd-g",
      "x": 0.5855,
      "y": 0.4538,
      "w": 0.0342,
      "h": 0.053,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-123",
      "floor": "ipd-g",
      "x": 0.4876,
      "y": 0.4722,
      "w": 0.0504,
      "h": 0.0248,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-124",
      "floor": "ipd-g",
      "x": 0.0974,
      "y": 0.4782,
      "w": 0.0581,
      "h": 0.2726,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-125",
      "floor": "ipd-g",
      "x": 0.9179,
      "y": 0.4803,
      "w": 0.0239,
      "h": 0.0359,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-126",
      "floor": "ipd-g",
      "x": 0.8402,
      "y": 0.4808,
      "w": 0.0547,
      "h": 0.0419,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-127",
      "floor": "ipd-g",
      "x": 0.2701,
      "y": 0.4944,
      "w": 0.0325,
      "h": 0.0316,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-128",
      "floor": "ipd-g",
      "x": 0.4876,
      "y": 0.5004,
      "w": 0.0504,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-129",
      "floor": "ipd-g",
      "x": 0.1513,
      "y": 0.5115,
      "w": 0.0479,
      "h": 0.1667,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-130",
      "floor": "ipd-g",
      "x": 0.2701,
      "y": 0.5295,
      "w": 0.0325,
      "h": 0.0333,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-131",
      "floor": "ipd-g",
      "x": 0.6359,
      "y": 0.5299,
      "w": 0.0308,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-132",
      "floor": "ipd-g",
      "x": 0.488,
      "y": 0.5316,
      "w": 0.0496,
      "h": 0.0308,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-133",
      "floor": "ipd-g",
      "x": 0.5855,
      "y": 0.5487,
      "w": 0.0342,
      "h": 0.0274,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-134",
      "floor": "ipd-g",
      "x": 0.7427,
      "y": 0.5748,
      "w": 0.0325,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-135",
      "floor": "ipd-g",
      "x": 0.7778,
      "y": 0.5748,
      "w": 0.0325,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-136",
      "floor": "ipd-g",
      "x": 0.585,
      "y": 0.5765,
      "w": 0.0333,
      "h": 0.0231,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-137",
      "floor": "ipd-g",
      "x": 0.1923,
      "y": 0.5812,
      "w": 0.0239,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-138",
      "floor": "ipd-g",
      "x": 0.3778,
      "y": 0.5816,
      "w": 0.0274,
      "h": 0.035,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-139",
      "floor": "ipd-g",
      "x": 0.4094,
      "y": 0.5821,
      "w": 0.0308,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-140",
      "floor": "ipd-g",
      "x": 0.8462,
      "y": 0.5996,
      "w": 0.041,
      "h": 0.0521,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-141",
      "floor": "ipd-g",
      "x": 0.7769,
      "y": 0.6244,
      "w": 0.0342,
      "h": 0.0368,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-142",
      "floor": "ipd-g",
      "x": 0.8526,
      "y": 0.6402,
      "w": 0.0299,
      "h": 0.0256,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-143",
      "floor": "ipd-g",
      "x": 0.9013,
      "y": 0.6406,
      "w": 0.0573,
      "h": 0.2675,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-144",
      "floor": "ipd-g",
      "x": 0.6479,
      "y": 0.6436,
      "w": 0.0547,
      "h": 0.0444,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-145",
      "floor": "ipd-g",
      "x": 0.7286,
      "y": 0.6436,
      "w": 0.0368,
      "h": 0.0444,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-146",
      "floor": "ipd-g",
      "x": 0.0799,
      "y": 0.6444,
      "w": 0.0231,
      "h": 0.0496,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-147",
      "floor": "ipd-g",
      "x": 0.4812,
      "y": 0.6449,
      "w": 0.0325,
      "h": 0.047,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-148",
      "floor": "ipd-g",
      "x": 0.1457,
      "y": 0.6538,
      "w": 0.0333,
      "h": 0.0325,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-149",
      "floor": "ipd-g",
      "x": 0.5244,
      "y": 0.6556,
      "w": 0.0504,
      "h": 0.0256,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-150",
      "floor": "ipd-g",
      "x": 0.8457,
      "y": 0.6812,
      "w": 0.0419,
      "h": 0.053,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-151",
      "floor": "ipd-g",
      "x": 0.409,
      "y": 0.7043,
      "w": 0.0299,
      "h": 0.0256,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-152",
      "floor": "ipd-g",
      "x": 0.141,
      "y": 0.7064,
      "w": 0.0256,
      "h": 0.0368,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-153",
      "floor": "ipd-g",
      "x": 0.8402,
      "y": 0.7235,
      "w": 0.0547,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-154",
      "floor": "ipd-g",
      "x": 0.5098,
      "y": 0.7568,
      "w": 0.0299,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-155",
      "floor": "ipd-g",
      "x": 0.2231,
      "y": 0.7778,
      "w": 0.0291,
      "h": 0.065,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-156",
      "floor": "ipd-g",
      "x": 0.0966,
      "y": 0.7782,
      "w": 0.0581,
      "h": 0.2111,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-157",
      "floor": "ipd-g",
      "x": 0.4786,
      "y": 0.8094,
      "w": 0.0325,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-158",
      "floor": "ipd-g",
      "x": 0.7615,
      "y": 0.8141,
      "w": 0.0479,
      "h": 0.0368,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-159",
      "floor": "ipd-g",
      "x": 0.6803,
      "y": 0.8154,
      "w": 0.0462,
      "h": 0.0325,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-160",
      "floor": "ipd-g",
      "x": 0.7205,
      "y": 0.8162,
      "w": 0.0308,
      "h": 0.0308,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-161",
      "floor": "ipd-g",
      "x": 0.4085,
      "y": 0.844,
      "w": 0.0308,
      "h": 0.0265,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-162",
      "floor": "ipd-g",
      "x": 0.2543,
      "y": 0.8726,
      "w": 0.0419,
      "h": 0.0291,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-163",
      "floor": "ipd-g",
      "x": 0.4077,
      "y": 0.8897,
      "w": 0.0308,
      "h": 0.0615,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-164",
      "floor": "ipd-g",
      "x": 0.0791,
      "y": 0.915,
      "w": 0.0231,
      "h": 0.0538,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-165",
      "floor": "ipd-g",
      "x": 0.25,
      "y": 0.9239,
      "w": 0.0299,
      "h": 0.0359,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-166",
      "floor": "ipd-g",
      "x": 0.5244,
      "y": 0.9688,
      "w": 0.0538,
      "h": 0.0521,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-167",
      "floor": "ipd-g",
      "x": 0.4073,
      "y": 0.9778,
      "w": 0.0299,
      "h": 0.0359,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-168",
      "floor": "ipd-g",
      "x": 0.1453,
      "y": 0.9786,
      "w": 0.0359,
      "h": 0.0359,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-169",
      "floor": "ipd-g",
      "x": 0.4214,
      "y": 1.0624,
      "w": 0.0803,
      "h": 0.0991,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-170",
      "floor": "opd-f2",
      "x": 0.1474,
      "y": 0.0569,
      "w": 0.0341,
      "h": 0.0241,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-171",
      "floor": "opd-f2",
      "x": 0.2508,
      "y": 0.0577,
      "w": 0.0332,
      "h": 0.0241,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-172",
      "floor": "opd-f2",
      "x": 0.4124,
      "y": 0.0606,
      "w": 0.0324,
      "h": 0.0282,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-173",
      "floor": "opd-f2",
      "x": 0.1474,
      "y": 0.0851,
      "w": 0.0341,
      "h": 0.0241,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-174",
      "floor": "opd-f2",
      "x": 0.2508,
      "y": 0.086,
      "w": 0.0332,
      "h": 0.0241,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-175",
      "floor": "opd-f2",
      "x": 0.4124,
      "y": 0.093,
      "w": 0.0324,
      "h": 0.0282,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-176",
      "floor": "opd-f2",
      "x": 0.0968,
      "y": 0.1802,
      "w": 0.0772,
      "h": 0.0482,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-177",
      "floor": "opd-f2",
      "x": 0.7185212227571968,
      "y": 0.6252093282068258,
      "kind": "room",
      "name": "Toilet Female",
      "landmark": "",
      "aliases": [],
      "w": 0.09725904360624926,
      "h": 0.07398943030166405
    },
    {
      "id": "r-178",
      "floor": "opd-f2",
      "x": 0.1856,
      "y": 0.1993,
      "w": 0.0473,
      "h": 0.0415,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "204",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-179",
      "floor": "opd-f2",
      "x": 0.238,
      "y": 0.2002,
      "w": 0.049,
      "h": 0.0415,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "205",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-180",
      "floor": "opd-f2",
      "x": 0.2899,
      "y": 0.2006,
      "w": 0.0465,
      "h": 0.0424,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "203",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-181",
      "floor": "opd-f2",
      "x": 0.3414,
      "y": 0.2006,
      "w": 0.0482,
      "h": 0.0424,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "202",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-182",
      "floor": "opd-f2",
      "x": 0.3962,
      "y": 0.2014,
      "w": 0.0532,
      "h": 0.0424,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-183",
      "floor": "opd-f3",
      "x": 0.7189249289977322,
      "y": 0.6254273153969112,
      "kind": "room",
      "name": "Toilet Female",
      "landmark": "",
      "aliases": [],
      "w": 0.09926886074698327,
      "h": 0.07296571819245046
    },
    {
      "id": "r-184",
      "floor": "opd-f4",
      "x": 0.8014762501379183,
      "y": 0.6592331283502086,
      "kind": "room",
      "name": "Toilet Female",
      "landmark": "",
      "aliases": [],
      "w": 0.10282982620394399,
      "h": 0.08053418514073563
    },
    {
      "id": "r-185",
      "floor": "opd-f2",
      "x": 0.3968477383225821,
      "y": 0.2775859363406326,
      "w": 0.056536557771961204,
      "h": 0.032846767980445946,
      "kind": "room",
      "name": "Ophthalmology",
      "aliases": [],
      "room": "201",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-186",
      "floor": "opd-f2",
      "x": 0.1894,
      "y": 0.2757,
      "w": 0.0532,
      "h": 0.0581,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-187",
      "floor": "opd-f2",
      "x": 0.1042,
      "y": 0.2791,
      "w": 0.059,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-188",
      "floor": "opd-f2",
      "x": 0.0328,
      "y": 0.2919,
      "w": 0.064,
      "h": 0.0939,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-189",
      "floor": "opd-f2",
      "x": 0.2454,
      "y": 0.3181,
      "w": 0.0507,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "209",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-190",
      "floor": "opd-f2",
      "x": 0.2973,
      "y": 0.3181,
      "w": 0.0465,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "208",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-191",
      "floor": "opd-f2",
      "x": 0.3505833566158862,
      "y": 0.3177862764359392,
      "w": 0.0498,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "207",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-192",
      "floor": "opd-f2",
      "x": 0.2392,
      "y": 0.3929,
      "w": 0.0498,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "214",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-193",
      "floor": "opd-f2",
      "x": 0.2911,
      "y": 0.3929,
      "w": 0.0473,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "213",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-194",
      "floor": "opd-f2",
      "x": 0.343,
      "y": 0.3937,
      "w": 0.0482,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "212",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-195",
      "floor": "opd-f2",
      "x": 0.4003,
      "y": 0.3937,
      "w": 0.0465,
      "h": 0.0432,
      "kind": "room",
      "name": "Neurology",
      "aliases": [],
      "room": "211",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-196",
      "floor": "opd-f3",
      "x": 0.10173225705328152,
      "y": 0.37311452376097703,
      "kind": "room",
      "name": "Staff Wash Room Male",
      "aliases": [],
      "w": 0.05605830378798901,
      "h": 0.09924199704793824,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-197",
      "floor": "opd-f2",
      "x": 0.1865,
      "y": 0.3978,
      "w": 0.0473,
      "h": 0.0548,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "215",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-198",
      "floor": "opd-f2",
      "x": 0.6968,
      "y": 0.4037,
      "w": 0.0249,
      "h": 0.0316,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-199",
      "floor": "opd-f2",
      "x": 0.7259,
      "y": 0.4037,
      "w": 0.0249,
      "h": 0.0316,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-200",
      "floor": "opd-f2",
      "x": 0.755,
      "y": 0.4037,
      "w": 0.0249,
      "h": 0.0316,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-201",
      "floor": "opd-f2",
      "x": 0.191,
      "y": 0.4444,
      "w": 0.0415,
      "h": 0.0316,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-202",
      "floor": "opd-f2",
      "x": 0.10207423744336103,
      "y": 0.6352244740279828,
      "w": 0.05304847488672204,
      "h": 0.08222672900871153,
      "kind": "room",
      "name": "Staff Wash Room Female",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-203",
      "floor": "opd-f2",
      "x": 0.2874,
      "y": 0.4527,
      "w": 0.0349,
      "h": 0.0316,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-204",
      "floor": "opd-f2",
      "x": 0.755,
      "y": 0.4992,
      "w": 0.0249,
      "h": 0.0316,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-205",
      "floor": "opd-f2",
      "x": 0.6968,
      "y": 0.4996,
      "w": 0.0249,
      "h": 0.0307,
      "kind": "lift",
      "name": "Lift lobby (east block)",
      "aliases": [],
      "room": "",
      "landmark": "The lift lobby in the east block",
      "shaft": "opd-lift-east",
      "canStart": true
    },
    {
      "id": "r-206",
      "floor": "opd-f2",
      "x": 0.7259,
      "y": 0.4996,
      "w": 0.0249,
      "h": 0.0307,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-207",
      "floor": "opd-f2",
      "x": 0.24,
      "y": 0.5876,
      "w": 0.0498,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "224",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-208",
      "floor": "opd-f2",
      "x": 0.2924,
      "y": 0.588,
      "w": 0.0465,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "223",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-209",
      "floor": "opd-f2",
      "x": 0.3439,
      "y": 0.588,
      "w": 0.0482,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "222",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-210",
      "floor": "opd-f2",
      "x": 0.1873,
      "y": 0.593,
      "w": 0.0473,
      "h": 0.0548,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "225",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-211",
      "floor": "opd-f2",
      "x": 0.3975038845547576,
      "y": 0.613346686829529,
      "w": 0.050707769109515244,
      "h": 0.08533983620839491,
      "kind": "room",
      "name": "Rheumatology and clinical immunology",
      "aliases": [],
      "room": "221",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-212",
      "floor": "opd-f2",
      "x": 0.7185672192523194,
      "y": 0.2794409623180458,
      "kind": "room",
      "name": "Toilet Male",
      "landmark": "",
      "aliases": [],
      "w": 0.09972069901856584,
      "h": 0.07356981140469007
    },
    {
      "id": "r-213",
      "floor": "opd-f2",
      "x": 0.191,
      "y": 0.6408,
      "w": 0.0415,
      "h": 0.0324,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-214",
      "floor": "opd-f2",
      "x": 0.2882,
      "y": 0.6478,
      "w": 0.0349,
      "h": 0.0316,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-215",
      "floor": "opd-f2",
      "x": 0.2554,
      "y": 0.6483,
      "w": 0.0224,
      "h": 0.0473,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-216",
      "floor": "opd-f2",
      "x": 0.3281,
      "y": 0.6487,
      "w": 0.0216,
      "h": 0.0465,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-217",
      "floor": "opd-f3",
      "x": 0.7179829967061577,
      "y": 0.2801816278472898,
      "kind": "room",
      "name": "Toilet Male",
      "landmark": "",
      "aliases": [],
      "w": 0.10038260627170348,
      "h": 0.07564008823768856
    },
    {
      "id": "r-218",
      "floor": "opd-f4",
      "x": 0.7946725855792853,
      "y": 0.2914378470717686,
      "kind": "room",
      "name": "Toilet Male",
      "landmark": "",
      "aliases": [],
      "w": 0.10612353156773924,
      "h": 0.07935323863522092
    },
    {
      "id": "r-219",
      "floor": "opd-f2",
      "x": 0.1881,
      "y": 0.7076,
      "w": 0.0473,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "231",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-220",
      "floor": "opd-f2",
      "x": 0.2409,
      "y": 0.7076,
      "w": 0.0482,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "230",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-221",
      "floor": "opd-f2",
      "x": 0.2928,
      "y": 0.7076,
      "w": 0.0473,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "229",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-222",
      "floor": "opd-f2",
      "x": 0.3443,
      "y": 0.7076,
      "w": 0.0473,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "228",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-223",
      "floor": "opd-f2",
      "x": 0.397104795024516,
      "y": 0.7063925653001633,
      "w": 0.049909590049032004,
      "h": 0.047314869399673776,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-225",
      "floor": "opd-f2",
      "x": 0.1063,
      "y": 0.7479,
      "w": 0.0598,
      "h": 0.0955,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-226",
      "floor": "opd-f2",
      "x": 0.3501,
      "y": 0.7845,
      "w": 0.049,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "234",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-227",
      "floor": "opd-f2",
      "x": 0.4016,
      "y": 0.7845,
      "w": 0.0457,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "235",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-228",
      "floor": "opd-f2",
      "x": 0.2467,
      "y": 0.7849,
      "w": 0.0498,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "232",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-229",
      "floor": "opd-f2",
      "x": 0.2986,
      "y": 0.7849,
      "w": 0.0457,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "233",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-230",
      "floor": "opd-f2",
      "x": 0.1906,
      "y": 0.8272,
      "w": 0.054,
      "h": 0.0598,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-231",
      "floor": "opd-f2",
      "x": 0.294,
      "y": 0.8434,
      "w": 0.0365,
      "h": 0.0274,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-232",
      "floor": "opd-f2",
      "x": 0.397609288542468,
      "y": 0.8262428986346895,
      "w": 0.0532,
      "h": 0.0341,
      "kind": "room",
      "name": "Orthopaedics",
      "aliases": [],
      "room": "236",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-233",
      "floor": "opd-f2",
      "x": 0.3974,
      "y": 0.9066,
      "w": 0.0523,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-234",
      "floor": "opd-f2",
      "x": 0.2396,
      "y": 0.907,
      "w": 0.049,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "239",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-235",
      "floor": "opd-f2",
      "x": 0.2915,
      "y": 0.907,
      "w": 0.0465,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "238",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-236",
      "floor": "opd-f2",
      "x": 0.343,
      "y": 0.907,
      "w": 0.0482,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "237",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-237",
      "floor": "opd-f2",
      "x": 0.1873,
      "y": 0.9074,
      "w": 0.0473,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "240",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-238",
      "floor": "opd-f4",
      "x": 0.2995,
      "y": 0.0631,
      "w": 0.0369,
      "h": 0.0252,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-239",
      "floor": "opd-f4",
      "x": 0.186,
      "y": 0.064,
      "w": 0.0369,
      "h": 0.0252,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-240",
      "floor": "opd-f4",
      "x": 0.4734,
      "y": 0.0644,
      "w": 0.0351,
      "h": 0.0297,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-241",
      "floor": "opd-f4",
      "x": 0.3,
      "y": 0.0932,
      "w": 0.036,
      "h": 0.0261,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-242",
      "floor": "opd-f4",
      "x": 0.1865,
      "y": 0.0937,
      "w": 0.0378,
      "h": 0.0252,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-243",
      "floor": "opd-f4",
      "x": 0.4743,
      "y": 0.0991,
      "w": 0.0351,
      "h": 0.0306,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-244",
      "floor": "opd-f4",
      "x": 0.1302,
      "y": 0.191,
      "w": 0.0874,
      "h": 0.0595,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-247",
      "floor": "opd-f4",
      "x": 0.4117,
      "y": 0.2189,
      "w": 0.0288,
      "h": 0.045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-248",
      "floor": "opd-f4",
      "x": 0.4568,
      "y": 0.2189,
      "w": 0.0541,
      "h": 0.045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-250",
      "floor": "opd-f4",
      "x": 0.2234,
      "y": 0.2198,
      "w": 0.0378,
      "h": 0.045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-251",
      "floor": "opd-f4",
      "x": 0.2847,
      "y": 0.2198,
      "w": 0.0757,
      "h": 0.045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-252",
      "floor": "opd-f4",
      "x": 0.3414,
      "y": 0.2198,
      "w": 0.0306,
      "h": 0.045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-253",
      "floor": "opd-f4",
      "x": 0.377,
      "y": 0.2198,
      "w": 0.0333,
      "h": 0.045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-255",
      "floor": "opd-f4",
      "x": 0.225827436551218,
      "y": 0.33771761195746874,
      "w": 0.04024512689756399,
      "h": 0.06283522391493745,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-256",
      "floor": "opd-f4",
      "x": 0.4464,
      "y": 0.345,
      "w": 0.0297,
      "h": 0.045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-257",
      "floor": "opd-f4",
      "x": 0.3577,
      "y": 0.3455,
      "w": 0.0396,
      "h": 0.0459,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-258",
      "floor": "opd-f4",
      "x": 0.4005,
      "y": 0.3455,
      "w": 0.0387,
      "h": 0.0459,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-259",
      "floor": "opd-f4",
      "x": 0.3144,
      "y": 0.3459,
      "w": 0.0396,
      "h": 0.045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-260",
      "floor": "opd-f4",
      "x": 0.2703,
      "y": 0.3464,
      "w": 0.0396,
      "h": 0.0459,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-264",
      "floor": "opd-f4",
      "x": 0.232,
      "y": 0.4194,
      "w": 0.0532,
      "h": 0.0441,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-265",
      "floor": "opd-f4",
      "x": 0.2905,
      "y": 0.4203,
      "w": 0.055,
      "h": 0.0459,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-266",
      "floor": "opd-f4",
      "x": 0.8333,
      "y": 0.4212,
      "w": 0.0252,
      "h": 0.0333,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-267",
      "floor": "opd-f4",
      "x": 0.8041,
      "y": 0.4221,
      "w": 0.0261,
      "h": 0.0333,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-268",
      "floor": "opd-f4",
      "x": 0.7739,
      "y": 0.4225,
      "w": 0.0252,
      "h": 0.0342,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-269",
      "floor": "opd-f4",
      "x": 0.13771943956030624,
      "y": 0.39114505430011076,
      "w": 0.0598599758755296,
      "h": 0.08729920259219892,
      "kind": "room",
      "name": "Staff Wash Room Male",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-270",
      "floor": "opd-f4",
      "x": 0.3432,
      "y": 0.4829,
      "w": 0.0378,
      "h": 0.0342,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-271",
      "floor": "opd-f4",
      "x": 0.1369,
      "y": 0.4955,
      "w": 0.0577,
      "h": 0.0396,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-272",
      "floor": "opd-f4",
      "x": 0.4631,
      "y": 0.518,
      "w": 0.0559,
      "h": 0.0703,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-273",
      "floor": "opd-f4",
      "x": 0.8351,
      "y": 0.5239,
      "w": 0.0252,
      "h": 0.0333,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-274",
      "floor": "opd-f4",
      "x": 0.8059,
      "y": 0.5243,
      "w": 0.0261,
      "h": 0.0342,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-275",
      "floor": "opd-f4",
      "x": 0.7761,
      "y": 0.5248,
      "w": 0.0261,
      "h": 0.0333,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-277",
      "floor": "opd-f4",
      "x": 0.405,
      "y": 0.5455,
      "w": 0.0514,
      "h": 0.0477,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-278",
      "floor": "opd-f4",
      "x": 0.3491,
      "y": 0.5464,
      "w": 0.0514,
      "h": 0.0477,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-279",
      "floor": "opd-f4",
      "x": 0.2923,
      "y": 0.5473,
      "w": 0.0532,
      "h": 0.0477,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-280",
      "floor": "opd-f4",
      "x": 0.2338,
      "y": 0.5482,
      "w": 0.0532,
      "h": 0.0477,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-281",
      "floor": "opd-f4",
      "x": 0.13835137289531452,
      "y": 0.694387789613869,
      "w": 0.06649735196059506,
      "h": 0.10666792215190479,
      "kind": "room",
      "name": "Staff Wash Room Female",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-282",
      "floor": "opd-f4",
      "x": 0.4054,
      "y": 0.627,
      "w": 0.0523,
      "h": 0.0468,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-283",
      "floor": "opd-f4",
      "x": 0.3491,
      "y": 0.6279,
      "w": 0.0514,
      "h": 0.0468,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-284",
      "floor": "opd-f4",
      "x": 0.2923,
      "y": 0.6293,
      "w": 0.055,
      "h": 0.0477,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-285",
      "floor": "opd-f4",
      "x": 0.2338,
      "y": 0.6374,
      "w": 0.0532,
      "h": 0.0604,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-286",
      "floor": "opd-f4",
      "x": 0.4649,
      "y": 0.6559,
      "w": 0.0577,
      "h": 0.0721,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-287",
      "floor": "opd-f4",
      "x": 0.2378,
      "y": 0.6878,
      "w": 0.0468,
      "h": 0.0351,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-288",
      "floor": "opd-f4",
      "x": 0.345,
      "y": 0.6932,
      "w": 0.0378,
      "h": 0.0351,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-289",
      "floor": "opd-f4",
      "x": 0.4739,
      "y": 0.7117,
      "w": 0.0288,
      "h": 0.0306,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-293",
      "floor": "opd-f4",
      "x": 0.4653,
      "y": 0.7554,
      "w": 0.0568,
      "h": 0.0495,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-294",
      "floor": "opd-f4",
      "x": 0.4068,
      "y": 0.7568,
      "w": 0.0514,
      "h": 0.0486,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-295",
      "floor": "opd-f4",
      "x": 0.3505,
      "y": 0.7581,
      "w": 0.0523,
      "h": 0.0495,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-296",
      "floor": "opd-f4",
      "x": 0.2932,
      "y": 0.7595,
      "w": 0.0532,
      "h": 0.0486,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-297",
      "floor": "opd-f4",
      "x": 0.2347,
      "y": 0.7613,
      "w": 0.0532,
      "h": 0.0486,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-298",
      "floor": "opd-f4",
      "x": 0.1419,
      "y": 0.8072,
      "w": 0.0676,
      "h": 0.1045,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-300",
      "floor": "opd-f4",
      "x": 0.2279,
      "y": 0.8351,
      "w": 0.0396,
      "h": 0.027,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-301",
      "floor": "opd-f4",
      "x": 0.4698,
      "y": 0.8396,
      "w": 0.0495,
      "h": 0.0486,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-302",
      "floor": "opd-f4",
      "x": 0.2387,
      "y": 0.8788,
      "w": 0.0595,
      "h": 0.0387,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-303",
      "floor": "opd-f4",
      "x": 0.4878,
      "y": 0.891,
      "w": 0.0459,
      "h": 0.0324,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-304",
      "floor": "opd-f4",
      "x": 0.4419089431831349,
      "y": 0.9013468733859785,
      "w": 0.0386821136337302,
      "h": 0.06760625322804303,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-305",
      "floor": "opd-f4",
      "x": 0.3959,
      "y": 0.9167,
      "w": 0.0477,
      "h": 0.0369,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-306",
      "floor": "opd-f4",
      "x": 0.3023,
      "y": 0.9185,
      "w": 0.0261,
      "h": 0.0351,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-307",
      "floor": "opd-f4",
      "x": 0.3437,
      "y": 0.9185,
      "w": 0.0333,
      "h": 0.0369,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-308",
      "floor": "opd-f4",
      "x": 0.5261,
      "y": 0.964,
      "w": 0.0505,
      "h": 0.0685,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-309",
      "floor": "opd-f4",
      "x": 0.4703,
      "y": 0.9842,
      "w": 0.0505,
      "h": 0.0459,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-310",
      "floor": "opd-f4",
      "x": 0.386,
      "y": 0.986,
      "w": 0.1108,
      "h": 0.0477,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-311",
      "floor": "opd-f4",
      "x": 0.2676,
      "y": 0.9901,
      "w": 0.1171,
      "h": 0.0468,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-312",
      "floor": "opd-f1",
      "x": 0.6130931740745394,
      "y": 0.5843007461559135,
      "kind": "room",
      "name": "Dietician Room",
      "landmark": "",
      "aliases": [],
      "w": 0.0324,
      "h": 0.0565,
      "room": "130",
      "shaft": ""
    },
    {
      "id": "r-20",
      "floor": "opd-f1",
      "x": 0.3560540660763231,
      "y": 0.047212121648606685,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "w": 0.026769764460284007,
      "h": 0.020514795906689157,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-263",
      "floor": "opd-f1",
      "x": 0.38842264572553453,
      "y": 0.22664036461126066,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.042057705605738904,
      "h": 0.05633978724027383,
      "room": "107",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-276",
      "floor": "opd-f1",
      "x": 0.6027471450482489,
      "y": 0.2264491476931003,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.04151976836271487,
      "h": 0.054082443512123934,
      "room": "111",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-299",
      "floor": "opd-f1",
      "x": 0.3172978559264047,
      "y": 0.5330899504575041,
      "kind": "room",
      "name": "Wash room female",
      "aliases": [],
      "w": 0.04276460736240845,
      "h": 0.07027821103654364,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-313",
      "floor": "opd-f1",
      "x": 0.3162236158259703,
      "y": 0.30083198321602755,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.0476800870118973,
      "h": 0.06643795788617796,
      "room": "Wash Room Male",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-314",
      "floor": "opd-f1",
      "x": 0.8309330403158197,
      "y": 0.5196688967788041,
      "kind": "room",
      "name": "Toilet Female",
      "aliases": [],
      "w": 0.08519455061487557,
      "h": 0.06755593508882907,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-315",
      "floor": "opd-f2",
      "x": 0.3461407652266628,
      "y": 0.5126275549727136,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.042611907497753065,
      "h": 0.041522915454218934,
      "room": "217",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-316",
      "floor": "opd-f2",
      "x": 0.23861822478058134,
      "y": 0.5100553508785187,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "219",
      "shaft": ""
    },
    {
      "id": "r-317",
      "floor": "opd-f2",
      "x": 0.29592695797540447,
      "y": 0.5093786095831154,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "218",
      "shaft": ""
    },
    {
      "id": "r-318",
      "floor": "opd-f2",
      "x": 0.18380435279306317,
      "y": 0.5112742812636576,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "220",
      "shaft": ""
    },
    {
      "id": "f3-stair-nw",
      "floor": "opd-f3",
      "x": 0.09100491854692078,
      "y": 0.07807427095915284,
      "kind": "stair",
      "name": "North-west staircase",
      "shaft": "opd-stair-nw",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.06900240821426212,
      "h": 0.07174267530555478
    },
    {
      "id": "f3-stair-ne",
      "floor": "opd-f3",
      "x": 0.5407380950505697,
      "y": 0.07955673785185277,
      "kind": "stair",
      "name": "North-east staircase",
      "shaft": "opd-stair-ne",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.06647619010113925,
      "h": 0.07411347570370552
    },
    {
      "id": "f3-stair-sw",
      "floor": "opd-f3",
      "x": 0.11328743055732089,
      "y": 0.999985736910812,
      "kind": "stair",
      "name": "South-west staircase",
      "shaft": "opd-stair-sw",
      "canStart": true,
      "aliases": [],
      "w": 0.07710910834490756,
      "h": 0.06484473864060136,
      "room": "",
      "landmark": ""
    },
    {
      "id": "f3-stair-e",
      "floor": "opd-f3",
      "x": 0.7329459097454408,
      "y": 0.3516733574442915,
      "kind": "stair",
      "name": "East block staircase",
      "shaft": "opd-stair-east",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.07336109286458492,
      "h": 0.062031423662107066
    },
    {
      "id": "f3-c-n2",
      "floor": "opd-f3",
      "x": 0.29284700398205954,
      "y": 0.15862964828022372,
      "kind": "junction",
      "name": "North corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-w-2",
      "floor": "opd-f3",
      "x": 0.14869720380418525,
      "y": 0.6266464686109265,
      "kind": "junction",
      "name": "West corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-w-3",
      "floor": "opd-f3",
      "x": 0.1471940288272796,
      "y": 0.9435068506980947,
      "kind": "junction",
      "name": "South corridor (west end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "r-319",
      "floor": "opd-f3",
      "x": 0.4023893319130146,
      "y": 0.3197536782348325,
      "kind": "room",
      "room": "306",
      "name": "USG",
      "aliases": [],
      "landmark": "",
      "shaft": "",
      "services": [
        "USG",
        "Ultrasound"
      ]
    },
    {
      "id": "r-320",
      "floor": "opd-f3",
      "x": 0.4130348952569253,
      "y": 0.6638710311727006,
      "kind": "room",
      "room": "327",
      "name": "Pediatric Surgery",
      "aliases": [],
      "landmark": "",
      "shaft": "",
      "w": 0.031069790513850726,
      "h": 0.04274206234540112
    },
    {
      "id": "r-321",
      "floor": "opd-f3",
      "x": 0.396928399284758,
      "y": 0.2444990515600293,
      "w": 0.04802947369333915,
      "h": 0.030927377243517407,
      "kind": "room",
      "name": "Obstetrics and Gynaecology",
      "aliases": [],
      "room": "301",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-322",
      "floor": "opd-f3",
      "x": 0.2454,
      "y": 0.3181,
      "w": 0.0507,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "309",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-323",
      "floor": "opd-f3",
      "x": 0.2973,
      "y": 0.3181,
      "w": 0.0465,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "308",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-324",
      "floor": "opd-f3",
      "x": 0.3505833566158862,
      "y": 0.3177862764359392,
      "w": 0.0498,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "307",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-325",
      "floor": "opd-f3",
      "x": 0.24,
      "y": 0.5876,
      "w": 0.0498,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "324",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-326",
      "floor": "opd-f3",
      "x": 0.2924,
      "y": 0.588,
      "w": 0.0465,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "323",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-327",
      "floor": "opd-f3",
      "x": 0.3439,
      "y": 0.588,
      "w": 0.0482,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "322",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-328",
      "floor": "opd-f3",
      "x": 0.1873,
      "y": 0.593,
      "w": 0.0473,
      "h": 0.0548,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "325",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-329",
      "floor": "opd-f3",
      "x": 0.3975038845547576,
      "y": 0.613346686829529,
      "w": 0.050707769109515244,
      "h": 0.08533983620839491,
      "kind": "room",
      "name": "Pediatrics and Neonatology",
      "aliases": [],
      "room": "321",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-330",
      "floor": "opd-f3",
      "x": 0.1881,
      "y": 0.7076,
      "w": 0.0473,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "331",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-331",
      "floor": "opd-f3",
      "x": 0.2409,
      "y": 0.7076,
      "w": 0.0482,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "330",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-332",
      "floor": "opd-f3",
      "x": 0.2928,
      "y": 0.7076,
      "w": 0.0473,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "329",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-333",
      "floor": "opd-f3",
      "x": 0.3443,
      "y": 0.7076,
      "w": 0.0473,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "328",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-334",
      "floor": "opd-f3",
      "x": 0.3501,
      "y": 0.7845,
      "w": 0.049,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "334",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-335",
      "floor": "opd-f3",
      "x": 0.4016,
      "y": 0.7845,
      "w": 0.0457,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "335",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-336",
      "floor": "opd-f3",
      "x": 0.2467,
      "y": 0.7849,
      "w": 0.0498,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "332",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-337",
      "floor": "opd-f3",
      "x": 0.2986,
      "y": 0.7849,
      "w": 0.0457,
      "h": 0.0432,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "333",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-338",
      "floor": "opd-f3",
      "x": 0.397609288542468,
      "y": 0.8262428986346895,
      "w": 0.0532,
      "h": 0.0341,
      "kind": "room",
      "name": "Dermatology",
      "aliases": [],
      "room": "336",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-339",
      "floor": "opd-f3",
      "x": 0.2396,
      "y": 0.907,
      "w": 0.049,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "339",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-340",
      "floor": "opd-f3",
      "x": 0.2915,
      "y": 0.907,
      "w": 0.0465,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "338",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-341",
      "floor": "opd-f3",
      "x": 0.343,
      "y": 0.907,
      "w": 0.0482,
      "h": 0.0449,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "337",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-342",
      "floor": "opd-f3",
      "x": 0.1873,
      "y": 0.9074,
      "w": 0.0473,
      "h": 0.044,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "340",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-343",
      "floor": "opd-f3",
      "x": 0.3461407652266628,
      "y": 0.5126275549727136,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.042611907497753065,
      "h": 0.041522915454218934,
      "room": "317",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-344",
      "floor": "opd-f3",
      "x": 0.23861822478058134,
      "y": 0.5100553508785187,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "319",
      "shaft": ""
    },
    {
      "id": "r-345",
      "floor": "opd-f3",
      "x": 0.29592695797540447,
      "y": 0.5093786095831154,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "318",
      "shaft": ""
    },
    {
      "id": "r-346",
      "floor": "opd-f3",
      "x": 0.18380435279306317,
      "y": 0.5112742812636576,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "320",
      "shaft": ""
    },
    {
      "id": "r-347",
      "floor": "opd-f3",
      "x": 0.18668538210213248,
      "y": 0.3952814147915035,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "315",
      "shaft": ""
    },
    {
      "id": "r-348",
      "floor": "opd-f3",
      "x": 0.24254923845774545,
      "y": 0.39083730759695356,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "314",
      "shaft": ""
    },
    {
      "id": "r-349",
      "floor": "opd-f3",
      "x": 0.2936471744627906,
      "y": 0.3930895748308574,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "313",
      "shaft": ""
    },
    {
      "id": "r-350",
      "floor": "opd-f3",
      "x": 0.3464218636009319,
      "y": 0.39352403139611286,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "312",
      "shaft": ""
    },
    {
      "id": "r-351",
      "floor": "opd-f3",
      "x": 0.40148926932009504,
      "y": 0.3912691281341762,
      "kind": "room",
      "name": "ENT",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "311",
      "shaft": ""
    },
    {
      "id": "r-352",
      "floor": "opd-f3",
      "x": 0.23987703488731643,
      "y": 0.19813885797964498,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "304",
      "shaft": ""
    },
    {
      "id": "r-353",
      "floor": "opd-f3",
      "x": 0.29421233921179146,
      "y": 0.19862160798858036,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "303",
      "shaft": ""
    },
    {
      "id": "r-354",
      "floor": "opd-f3",
      "x": 0.18401903764641347,
      "y": 0.19812666851231964,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "305",
      "shaft": ""
    },
    {
      "id": "r-355",
      "floor": "opd-f3",
      "x": 0.3425898561212487,
      "y": 0.19888623022473567,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765,
      "room": "302",
      "shaft": ""
    },
    {
      "id": "r-356",
      "floor": "opd-f3",
      "x": 0.3986408080805119,
      "y": 0.19769106951952264,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.04369474599065215,
      "h": 0.045993757768111765
    },
    {
      "id": "r-357",
      "floor": "opd-f3",
      "x": 0.4008142143483462,
      "y": 0.5082542713579004,
      "kind": "room",
      "name": "Surgical Gastro",
      "landmark": "",
      "aliases": [],
      "w": 0.042611907497753065,
      "h": 0.041522915454218934,
      "room": "316",
      "shaft": ""
    },
    {
      "id": "r-358",
      "floor": "opd-f2",
      "x": 0.3982986666566143,
      "y": 0.49711579235986925,
      "kind": "room",
      "name": "Psychiatry",
      "aliases": [],
      "w": 0.05588646463117586,
      "h": 0.07725657612564141,
      "room": "216",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "f3-door-304",
      "floor": "opd-f3",
      "x": 0.24056967282464545,
      "y": 0.15855179555834842,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-302",
      "floor": "opd-f3",
      "x": 0.3440766376014609,
      "y": 0.15922025104727316,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-325",
      "floor": "opd-f3",
      "x": 0.14690001274558168,
      "y": 0.593,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-331",
      "floor": "opd-f3",
      "x": 0.14750226961369053,
      "y": 0.7070901566788185,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-332",
      "floor": "opd-f3",
      "x": 0.14800227147042638,
      "y": 0.7867589338632665,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-340",
      "floor": "opd-f3",
      "x": 0.18746891089333279,
      "y": 0.9441821893686584,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-339",
      "floor": "opd-f3",
      "x": 0.23875546486321125,
      "y": 0.9440133563111596,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-338",
      "floor": "opd-f3",
      "x": 0.2911621910999179,
      "y": 0.9441821893686584,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-337",
      "floor": "opd-f3",
      "x": 0.3440134395868298,
      "y": 0.9436756901961618,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-x1-w",
      "floor": "opd-f3",
      "x": 0.14729334564592844,
      "y": 0.3489241033085942,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-x2-w",
      "floor": "opd-f3",
      "x": 0.14819072941784112,
      "y": 0.4779928316029493,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-x3-w",
      "floor": "opd-f3",
      "x": 0.146047952896046,
      "y": 0.5432757711466522,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-x4-w",
      "floor": "opd-f3",
      "x": 0.1477986082748835,
      "y": 0.6732455307112161,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-x5-w",
      "floor": "opd-f3",
      "x": 0.14869721237382733,
      "y": 0.7420598392881409,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-x6-w",
      "floor": "opd-f3",
      "x": 0.14660988303125577,
      "y": 0.8666576500810288,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-314",
      "floor": "opd-f3",
      "x": 0.24234759583188228,
      "y": 0.3497600807690267,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-308",
      "floor": "opd-f3",
      "x": 0.2954853394326114,
      "y": 0.3497600807690267,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-307",
      "floor": "opd-f3",
      "x": 0.34856705342263433,
      "y": 0.3499905375989392,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-319",
      "floor": "opd-f3",
      "x": 0.24,
      "y": 0.5432297634530008,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-318",
      "floor": "opd-f3",
      "x": 0.29332365923189446,
      "y": 0.544768443972445,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-317",
      "floor": "opd-f3",
      "x": 0.3445157454166946,
      "y": 0.5441529647210931,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-330",
      "floor": "opd-f3",
      "x": 0.24347730029975162,
      "y": 0.6722239056476008,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-329",
      "floor": "opd-f3",
      "x": 0.29306938649647657,
      "y": 0.6724741487356821,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-333",
      "floor": "opd-f3",
      "x": 0.29830414171721914,
      "y": 0.7422681893593313,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-328",
      "floor": "opd-f3",
      "x": 0.34755448625566987,
      "y": 0.7425639338702165,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "p-1",
      "floor": "opd-f3",
      "x": 0.4640615197907083,
      "y": 0.15949864177959208,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-2",
      "floor": "opd-f3",
      "x": 0.43781217855783494,
      "y": 0.9423637485831899,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-3",
      "floor": "opd-f3",
      "x": 0.4393993268158822,
      "y": 0.8352800018548308,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-4",
      "floor": "opd-f3",
      "x": 0.43903422311501755,
      "y": 0.7427657695553346,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-5",
      "floor": "opd-f3",
      "x": 0.43983565650911743,
      "y": 0.6583083611102437,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-6",
      "floor": "opd-f3",
      "x": 0.4399667847429005,
      "y": 0.5750366859689302,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-7",
      "floor": "opd-f3",
      "x": 0.4394422918158908,
      "y": 0.5450080263207546,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-8",
      "floor": "opd-f3",
      "x": 0.44022903120640544,
      "y": 0.524158680576574,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-9",
      "floor": "opd-f3",
      "x": 0.4389178188970038,
      "y": 0.4436506230960275,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-10",
      "floor": "opd-f3",
      "x": 0.43839332596999403,
      "y": 0.3508203767349746,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-11",
      "floor": "opd-f3",
      "x": 0.43760659658354073,
      "y": 0.26519608431429126,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-12",
      "floor": "opd-f3",
      "x": 0.43786886305516814,
      "y": 0.15950605967677395,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-13",
      "floor": "opd-f3",
      "x": 0.14585299414332292,
      "y": 0.15858850060994986,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-14",
      "floor": "opd-f3",
      "x": 0.34969932497259765,
      "y": 0.2644433193970282,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-15",
      "floor": "opd-f3",
      "x": 0.349439524403921,
      "y": 0.23290748105591688,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-16",
      "floor": "opd-f3",
      "x": 0.24903154535194183,
      "y": 0.23306154369416643,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-17",
      "floor": "opd-f3",
      "x": 0.24934506718236868,
      "y": 0.28291541699380424,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-18",
      "floor": "opd-f3",
      "x": 0.34983187089734197,
      "y": 0.2839157240303098,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-19",
      "floor": "opd-f3",
      "x": 0.34540757690270807,
      "y": 0.44340847872457473,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-20",
      "floor": "opd-f3",
      "x": 0.3452051417382437,
      "y": 0.47861616857395395,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-21",
      "floor": "opd-f3",
      "x": 0.24398603046954548,
      "y": 0.4782131152567587,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-22",
      "floor": "opd-f3",
      "x": 0.2433787095313392,
      "y": 0.4288414019135238,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-23",
      "floor": "opd-f3",
      "x": 0.34540762323714724,
      "y": 0.4292460856526258,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-24",
      "floor": "opd-f3",
      "x": 0.34052755156983316,
      "y": 0.6573703780931205,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-25",
      "floor": "opd-f3",
      "x": 0.33868026246808175,
      "y": 0.6244423379297648,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-26",
      "floor": "opd-f3",
      "x": 0.24388450207202636,
      "y": 0.6242011018027734,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-27",
      "floor": "opd-f3",
      "x": 0.33960908546860263,
      "y": 0.6732489566419974,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-28",
      "floor": "opd-f3",
      "x": 0.1808353895265759,
      "y": 0.15789248203798098,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-29",
      "floor": "opd-f2",
      "x": 0.14730593832741695,
      "y": 0.15832058490242001,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-30",
      "floor": "opd-f2",
      "x": 0.14667876631083804,
      "y": 0.34858982766576196,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-31",
      "floor": "opd-f2",
      "x": 0.1471927102051992,
      "y": 0.47790527305955155,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-32",
      "floor": "opd-f2",
      "x": 0.14796641861435123,
      "y": 0.5437355179612687,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-33",
      "floor": "opd-f2",
      "x": 0.1462889946803298,
      "y": 0.6694076077873423,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-34",
      "floor": "opd-f2",
      "x": 0.14809639125684626,
      "y": 0.7416718731943857,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-35",
      "floor": "opd-f2",
      "x": 0.1884297184732084,
      "y": 0.3491798801945016,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-36",
      "floor": "opd-f2",
      "x": 0.23861567661987884,
      "y": 0.34943845744196667,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-37",
      "floor": "opd-f2",
      "x": 0.2955276045029743,
      "y": 0.34969704455352146,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-38",
      "floor": "opd-f2",
      "x": 0.3470070252000609,
      "y": 0.3504727861600065,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-39",
      "floor": "opd-f2",
      "x": 0.4026254905327402,
      "y": 0.3504727861600065,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-40",
      "floor": "opd-f2",
      "x": 0.24378952682154342,
      "y": 0.4787612403937017,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-41",
      "floor": "opd-f2",
      "x": 0.24404821341067018,
      "y": 0.4285964652582954,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-42",
      "floor": "opd-f2",
      "x": 0.3444201395722718,
      "y": 0.42988937122380033,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-43",
      "floor": "opd-f2",
      "x": 0.3451962190761737,
      "y": 0.4433355952378695,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-44",
      "floor": "opd-f2",
      "x": 0.34597229858007555,
      "y": 0.47927838502454223,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-45",
      "floor": "opd-f2",
      "x": 0.4388824463393022,
      "y": 0.44393834242003644,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-46",
      "floor": "opd-f2",
      "x": 0.18810070170573853,
      "y": 0.5429374864260054,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-47",
      "floor": "opd-f2",
      "x": 0.2383999185085743,
      "y": 0.5435870724762881,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-48",
      "floor": "opd-f2",
      "x": 0.29571763321592126,
      "y": 0.5444964939378737,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-49",
      "floor": "opd-f2",
      "x": 0.35147569604550377,
      "y": 0.5444964939378737,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-50",
      "floor": "opd-f2",
      "x": 0.439331478590696,
      "y": 0.5453467417886335,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-51",
      "floor": "opd-f2",
      "x": 0.18929588070639203,
      "y": 0.742183462952984,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-52",
      "floor": "opd-f2",
      "x": 0.2434301192002687,
      "y": 0.742183462952984,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-53",
      "floor": "opd-f2",
      "x": 0.29916242258116155,
      "y": 0.7419837930843348,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-54",
      "floor": "opd-f2",
      "x": 0.34550612142131754,
      "y": 0.7423831404385504,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-55",
      "floor": "opd-f2",
      "x": 0.40023962281761805,
      "y": 0.742183462952984,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-56",
      "floor": "opd-f2",
      "x": 0.18503399205679943,
      "y": 0.1584354403944455,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-57",
      "floor": "opd-f2",
      "x": 0.2394779760891205,
      "y": 0.1592019359042343,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-58",
      "floor": "opd-f2",
      "x": 0.29366636820425895,
      "y": 0.1581799467644112,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-59",
      "floor": "opd-f2",
      "x": 0.34478748180279106,
      "y": 0.15996842654079446,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-60",
      "floor": "opd-f2",
      "x": 0.4045991886133051,
      "y": 0.1584354403944455,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-61",
      "floor": "opd-f2",
      "x": 0.6170070057418088,
      "y": 0.5245498461932929,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-62",
      "floor": "opd-f2",
      "x": 0.6181821948112405,
      "y": 0.3651828718537526,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-63",
      "floor": "opd-f2",
      "x": 0.6793230416018887,
      "y": 0.3657759725934351,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-64",
      "floor": "opd-f2",
      "x": 0.6175819496355639,
      "y": 0.44787800497402575,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-65",
      "floor": "opd-f2",
      "x": 0.18464300704830103,
      "y": 0.9442358649191835,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-66",
      "floor": "opd-f2",
      "x": 0.24340290773626905,
      "y": 0.9439421828772392,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-67",
      "floor": "opd-f2",
      "x": 0.29187982580384264,
      "y": 0.9436485120381194,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-68",
      "floor": "opd-f2",
      "x": 0.34388232894664506,
      "y": 0.9433548411989995,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-69",
      "floor": "opd-f2",
      "x": 0.4067554271657955,
      "y": 0.9439421828772392,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-70",
      "floor": "opd-f1",
      "x": 0.38382337211401263,
      "y": 0.6254663076675112,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-71",
      "floor": "opd-f1",
      "x": 0.6483822112531806,
      "y": 0.6238350672389956,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-72",
      "floor": "opd-f1",
      "x": 0.43914915591597425,
      "y": 0.62520967224173,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-73",
      "floor": "opd-f1",
      "x": 0.4725460903149921,
      "y": 0.6248507091094895,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-74",
      "floor": "opd-f1",
      "x": 0.504686143031916,
      "y": 0.624671234389891,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-75",
      "floor": "opd-f1",
      "x": 0.5307213790469314,
      "y": 0.6248507159560112,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-76",
      "floor": "opd-f1",
      "x": 0.568248032318686,
      "y": 0.6243122849506941,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-77",
      "floor": "opd-f1",
      "x": 0.6108021712223158,
      "y": 0.6248507159560112,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-78",
      "floor": "opd-f1",
      "x": 0.6485230392055863,
      "y": 0.8055847160690243,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-79",
      "floor": "opd-f1",
      "x": 0.6487119979435967,
      "y": 0.45185443471935294,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-80",
      "floor": "opd-f1",
      "x": 0.6482588399052367,
      "y": 0.4382662691502929,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-81",
      "floor": "opd-f1",
      "x": 0.751572580710302,
      "y": 0.44007801419255327,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-82",
      "floor": "opd-f1",
      "x": 0.7529319511120685,
      "y": 0.3077865397854485,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-83",
      "floor": "opd-f1",
      "x": 0.6488055022187382,
      "y": 0.31925670036869186,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-84",
      "floor": "opd-f1",
      "x": 0.35417885245733005,
      "y": 0.26696453376757445,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-85",
      "floor": "opd-f1",
      "x": 0.3889747203838565,
      "y": 0.26696453376757445,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-86",
      "floor": "opd-f1",
      "x": 0.42574762244700204,
      "y": 0.2665692993478594,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-87",
      "floor": "opd-f1",
      "x": 0.46568378968725976,
      "y": 0.2653835810114874,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-88",
      "floor": "opd-f1",
      "x": 0.49652557802784636,
      "y": 0.26617406492814427,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-89",
      "floor": "opd-f1",
      "x": 0.5289490027278895,
      "y": 0.26696453376757445,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-90",
      "floor": "opd-f1",
      "x": 0.5597908061520782,
      "y": 0.26735978326451626,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-91",
      "floor": "opd-f1",
      "x": 0.600517768946661,
      "y": 0.2665692993478594,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-92",
      "floor": "opd-f1",
      "x": 0.382756094311301,
      "y": 0.18771851342293752,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-93",
      "floor": "opd-f1",
      "x": 0.42654020714894325,
      "y": 0.1868067263380343,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-94",
      "floor": "opd-f1",
      "x": 0.4584661278342126,
      "y": 0.18771851342293752,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-95",
      "floor": "opd-f1",
      "x": 0.49677723961583414,
      "y": 0.18863030050784077,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-96",
      "floor": "opd-f1",
      "x": 0.5236862368670023,
      "y": 0.18726261118503984,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-97",
      "floor": "opd-f1",
      "x": 0.5656460044204737,
      "y": 0.18863030050784077,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-98",
      "floor": "opd-f1",
      "x": 0.6085024466629871,
      "y": 0.18723892385625546,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-99",
      "floor": "opd-f1",
      "x": 0.6491179371793169,
      "y": 0.18742586445300388,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-100",
      "floor": "opd-f1",
      "x": 0.4141261044054979,
      "y": 0.6540593816270173,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-101",
      "floor": "opd-f1",
      "x": 0.4150100643092421,
      "y": 0.6854949024042258,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-102",
      "floor": "opd-f1",
      "x": 0.4153615336027545,
      "y": 0.7154963614303376,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-103",
      "floor": "opd-f1",
      "x": 0.4144349587593025,
      "y": 0.6253476318035234,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "f1-door-141",
      "floor": "opd-f1",
      "x": 0.4757238007363801,
      "y": 0.8058251035453166,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-door-128",
      "floor": "opd-f1",
      "x": 0.6486500488648537,
      "y": 0.4841602919775266,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f1-door-Wash Room Male",
      "floor": "opd-f1",
      "x": 0.3550772806468028,
      "y": 0.2993418984449542,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-door-201",
      "floor": "opd-f2",
      "x": 0.4387573563351232,
      "y": 0.27758808800351265,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-door-221",
      "floor": "opd-f2",
      "x": 0.4405253220931173,
      "y": 0.6133670583117999,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f2-door-216",
      "floor": "opd-f2",
      "x": 0.4398008892920673,
      "y": 0.496389064057307,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-320",
      "floor": "opd-f3",
      "x": 0.18382001465245307,
      "y": 0.543257274418806,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-335",
      "floor": "opd-f3",
      "x": 0.43919834000168534,
      "y": 0.784351619661756,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-321",
      "floor": "opd-f3",
      "x": 0.43990635268905376,
      "y": 0.613413458162579,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-311",
      "floor": "opd-f3",
      "x": 0.4386206769655778,
      "y": 0.3910593348669664,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-301",
      "floor": "opd-f3",
      "x": 0.39675416269576036,
      "y": 0.26484625797510475,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-306",
      "floor": "opd-f3",
      "x": 0.4021054264534117,
      "y": 0.3504851394115345,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-316",
      "floor": "opd-f3",
      "x": 0.40048631151991787,
      "y": 0.5446571259236394,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-327",
      "floor": "opd-f3",
      "x": 0.4130898217165172,
      "y": 0.6580557418620002,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "f3-door-315",
      "floor": "opd-f3",
      "x": 0.14761754543679537,
      "y": 0.3955530440474086,
      "kind": "junction",
      "name": "",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-stair-nw",
      "floor": "opd-g",
      "x": 0.3054656597086152,
      "y": 0.07348354274320604,
      "kind": "stair",
      "name": "North-west staircase",
      "shaft": "opd-stair-nw",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.052036167959140456,
      "h": 0.05957180207650439
    },
    {
      "id": "g-stair-ne",
      "floor": "opd-g",
      "x": 0.656271854760772,
      "y": 0.07470648852219688,
      "kind": "stair",
      "name": "North-east staircase",
      "shaft": "opd-stair-ne",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.053724792212742956,
      "h": 0.06134899327280424
    },
    {
      "id": "g-stair-sw",
      "floor": "opd-g",
      "x": 0.3156505917736585,
      "y": 0.8250030406138547,
      "kind": "stair",
      "name": "South-west staircase",
      "shaft": "opd-stair-sw",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.0489280053549066,
      "h": 0.0548772413928893
    },
    {
      "id": "g-stair-e",
      "floor": "opd-g",
      "x": 0.8106795161546656,
      "y": 0.30388791075480687,
      "kind": "stair",
      "name": "East block staircase",
      "shaft": "opd-stair-east",
      "canStart": true,
      "seed": true,
      "aliases": [],
      "w": 0.05913855059653084,
      "h": 0.051459608975814364
    },
    {
      "id": "g-entry-imaging",
      "floor": "opd-g",
      "x": 0.276,
      "y": 0.7,
      "kind": "entrance",
      "name": "OPD imaging entrance",
      "landmark": "The OPD imaging entrance, on the west side",
      "canStart": true,
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-nw",
      "floor": "opd-g",
      "x": 0.31797406713335274,
      "y": 0.11550578956236912,
      "kind": "junction",
      "name": "North corridor (west end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-n1",
      "floor": "opd-g",
      "x": 0.3890598389881788,
      "y": 0.11468534282203331,
      "kind": "junction",
      "name": "North corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-n2",
      "floor": "opd-g",
      "x": 0.4575299093867157,
      "y": 0.11442049001663825,
      "kind": "junction",
      "name": "North corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-ne",
      "floor": "opd-g",
      "x": 0.6600684400655775,
      "y": 0.11547988103201558,
      "kind": "junction",
      "name": "North corridor (east end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-1",
      "floor": "opd-g",
      "x": 0.457,
      "y": 0.2,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-2",
      "floor": "opd-g",
      "x": 0.457,
      "y": 0.33,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-3",
      "floor": "opd-g",
      "x": 0.457,
      "y": 0.45,
      "kind": "junction",
      "name": "Main corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-4",
      "floor": "opd-g",
      "x": 0.457,
      "y": 0.598,
      "kind": "junction",
      "name": "Main corridor (south end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-5",
      "floor": "opd-g",
      "x": 0.383,
      "y": 0.598,
      "kind": "junction",
      "name": "Imaging corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-c-6",
      "floor": "opd-g",
      "x": 0.38350951373013736,
      "y": 0.6994906983931138,
      "kind": "junction",
      "name": "Entrance corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-w-0",
      "floor": "opd-g",
      "x": 0.258,
      "y": 0.135,
      "kind": "junction",
      "name": "Oncology corridor (north end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-w-1",
      "floor": "opd-g",
      "x": 0.215,
      "y": 0.2,
      "kind": "junction",
      "name": "Oncology corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-w-2",
      "floor": "opd-g",
      "x": 0.215,
      "y": 0.33,
      "kind": "junction",
      "name": "Oncology corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-w-3",
      "floor": "opd-g",
      "x": 0.215,
      "y": 0.47,
      "kind": "junction",
      "name": "Oncology corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-w-4",
      "floor": "opd-g",
      "x": 0.215,
      "y": 0.61,
      "kind": "junction",
      "name": "Oncology corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-w-5",
      "floor": "opd-g",
      "x": 0.215,
      "y": 0.69,
      "kind": "junction",
      "name": "Oncology corridor (south end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-e-1",
      "floor": "opd-g",
      "x": 0.32,
      "y": 0.7,
      "kind": "junction",
      "name": "Entrance corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-e-2",
      "floor": "opd-g",
      "x": 0.52,
      "y": 0.6989814000242678,
      "kind": "junction",
      "name": "Entrance corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-e-3",
      "floor": "opd-g",
      "x": 0.64,
      "y": 0.7,
      "kind": "junction",
      "name": "Entrance corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-e-4",
      "floor": "opd-g",
      "x": 0.695,
      "y": 0.7003297778953568,
      "kind": "junction",
      "name": "Entrance corridor (east end)",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-s-1",
      "floor": "opd-g",
      "x": 0.32,
      "y": 0.762,
      "kind": "junction",
      "name": "South corridor",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-k-1",
      "floor": "opd-g",
      "x": 0.7169336677455669,
      "y": 0.6180522388735968,
      "kind": "junction",
      "name": "Walkway to the east block",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-r-cancer",
      "floor": "opd-g",
      "x": 0.318,
      "y": 0.156,
      "kind": "room",
      "name": "Cancer waiting",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-r-tumor",
      "floor": "opd-g",
      "x": 0.3,
      "y": 0.202,
      "kind": "room",
      "name": "Tumor registration",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-r-radonc",
      "floor": "opd-g",
      "x": 0.195,
      "y": 0.28,
      "kind": "room",
      "name": "Radiation oncology",
      "seed": true,
      "aliases": []
    },
    {
      "id": "g-r-us",
      "floor": "opd-g",
      "x": 0.412,
      "y": 0.572,
      "kind": "room",
      "name": "Ultrasound",
      "seed": true,
      "aliases": []
    },
    {
      "id": "r-360",
      "floor": "opd-g",
      "x": 0.3479977149662511,
      "y": 0.054636978670925415,
      "w": 0.02597581624516726,
      "h": 0.02071377550537118,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-362",
      "floor": "opd-g",
      "x": 0.5533385665951038,
      "y": 0.0579963070204836,
      "w": 0.02688832801216201,
      "h": 0.02419200858391965,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-366",
      "floor": "opd-g",
      "x": 0.4927,
      "y": 0.1489,
      "w": 0.0479,
      "h": 0.0306,
      "kind": "room",
      "name": "CBCT",
      "aliases": [],
      "room": "1",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-367",
      "floor": "opd-g",
      "x": 0.5399,
      "y": 0.1592,
      "w": 0.0399,
      "h": 0.0512,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-370",
      "floor": "opd-g",
      "x": 0.4934,
      "y": 0.1809,
      "w": 0.0479,
      "h": 0.0266,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "2",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-371",
      "floor": "opd-g",
      "x": 0.3388,
      "y": 0.1945,
      "w": 0.0459,
      "h": 0.0259,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "35",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-372",
      "floor": "opd-g",
      "x": 0.6755,
      "y": 0.1965,
      "w": 0.0332,
      "h": 0.0259,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-374",
      "floor": "opd-g",
      "x": 0.254,
      "y": 0.2074,
      "w": 0.0705,
      "h": 0.0532,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-375",
      "floor": "opd-g",
      "x": 0.4934,
      "y": 0.2094,
      "w": 0.0479,
      "h": 0.0253,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "3",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-376",
      "floor": "opd-g",
      "x": 0.143,
      "y": 0.2114,
      "w": 0.0678,
      "h": 0.0638,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-377",
      "floor": "opd-g",
      "x": 0.0771,
      "y": 0.2118,
      "w": 0.0545,
      "h": 0.0658,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-378",
      "floor": "opd-g",
      "x": 0.3461,
      "y": 0.2244,
      "w": 0.0312,
      "h": 0.0273,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "34",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-379",
      "floor": "opd-g",
      "x": 0.6749,
      "y": 0.232,
      "w": 0.0319,
      "h": 0.0532,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-380",
      "floor": "opd-g",
      "x": 0.7930071983996756,
      "y": 0.24449513658568187,
      "w": 0.06937231412679856,
      "h": 0.06108272455866498,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-381",
      "floor": "opd-g",
      "x": 0.0632,
      "y": 0.2467,
      "w": 0.0266,
      "h": 0.0213,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-382",
      "floor": "opd-g",
      "x": 0.1426,
      "y": 0.2537,
      "w": 0.0672,
      "h": 0.0299,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-383",
      "floor": "opd-g",
      "x": 0.4934,
      "y": 0.2646,
      "w": 0.0479,
      "h": 0.0798,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-384",
      "floor": "opd-g",
      "x": 0.0632,
      "y": 0.2749,
      "w": 0.0266,
      "h": 0.0273,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-385",
      "floor": "opd-g",
      "x": 0.379,
      "y": 0.2756,
      "w": 0.0279,
      "h": 0.0286,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "33",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-386",
      "floor": "opd-g",
      "x": 0.4285,
      "y": 0.2763,
      "w": 0.0273,
      "h": 0.0286,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "28",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-387",
      "floor": "opd-g",
      "x": 0.3301,
      "y": 0.3029,
      "w": 0.0751,
      "h": 0.0818,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-389",
      "floor": "opd-g",
      "x": 0.0632,
      "y": 0.3049,
      "w": 0.0266,
      "h": 0.0273,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-390",
      "floor": "opd-g",
      "x": 0.379,
      "y": 0.3191,
      "w": 0.0279,
      "h": 0.0239,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "27",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-391",
      "floor": "opd-g",
      "x": 0.4285,
      "y": 0.3195,
      "w": 0.0273,
      "h": 0.0246,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "32",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-392",
      "floor": "opd-g",
      "x": 0.2483,
      "y": 0.3241,
      "w": 0.0339,
      "h": 0.0565,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-393",
      "floor": "opd-g",
      "x": 0.379,
      "y": 0.3447,
      "w": 0.0279,
      "h": 0.0206,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "26",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-394",
      "floor": "opd-g",
      "x": 0.4807,
      "y": 0.3451,
      "w": 0.0226,
      "h": 0.0279,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "4",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-395",
      "floor": "opd-g",
      "x": 0.5066,
      "y": 0.3451,
      "w": 0.0226,
      "h": 0.0279,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "5",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-396",
      "floor": "opd-g",
      "x": 0.5349,
      "y": 0.3454,
      "w": 0.0286,
      "h": 0.0273,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "6",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-397",
      "floor": "opd-g",
      "x": 0.7809,
      "y": 0.3457,
      "w": 0.0206,
      "h": 0.0253,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-398",
      "floor": "opd-g",
      "x": 0.8281,
      "y": 0.3457,
      "w": 0.0206,
      "h": 0.0253,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-399",
      "floor": "opd-g",
      "x": 0.0904,
      "y": 0.3544,
      "w": 0.0745,
      "h": 0.0625,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-400",
      "floor": "opd-g",
      "x": 0.3088,
      "y": 0.366,
      "w": 0.0326,
      "h": 0.0379,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-401",
      "floor": "opd-g",
      "x": 0.3454,
      "y": 0.3664,
      "w": 0.0326,
      "h": 0.0386,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-402",
      "floor": "opd-g",
      "x": 0.2483,
      "y": 0.3687,
      "w": 0.0339,
      "h": 0.0259,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-403",
      "floor": "opd-g",
      "x": 0.379,
      "y": 0.372,
      "w": 0.0279,
      "h": 0.0273,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "25",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-404",
      "floor": "opd-g",
      "x": 0.4285,
      "y": 0.3727,
      "w": 0.0273,
      "h": 0.0273,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "30",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-406",
      "floor": "opd-g",
      "x": 0.507,
      "y": 0.3846,
      "w": 0.0751,
      "h": 0.0459,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "10",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-407",
      "floor": "opd-g",
      "x": 0.2483,
      "y": 0.4016,
      "w": 0.0339,
      "h": 0.0346,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-408",
      "floor": "opd-g",
      "x": 0.5057,
      "y": 0.4232,
      "w": 0.0233,
      "h": 0.0246,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "8",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-409",
      "floor": "opd-g",
      "x": 0.5349,
      "y": 0.4235,
      "w": 0.0286,
      "h": 0.0253,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "7",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-410",
      "floor": "opd-g",
      "x": 0.8042,
      "y": 0.4249,
      "w": 0.0206,
      "h": 0.0253,
      "kind": "lift",
      "name": "",
      "aliases": [],
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-411",
      "floor": "opd-g",
      "x": 0.2483,
      "y": 0.4395,
      "w": 0.0339,
      "h": 0.0346,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-412",
      "floor": "opd-g",
      "x": 0.3793,
      "y": 0.4551,
      "w": 0.0392,
      "h": 0.0392,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-413",
      "floor": "opd-g",
      "x": 0.4225,
      "y": 0.4555,
      "w": 0.0392,
      "h": 0.0386,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-414",
      "floor": "opd-g",
      "x": 0.3035,
      "y": 0.4581,
      "w": 0.0219,
      "h": 0.0332,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-416",
      "floor": "opd-g",
      "x": 0.496,
      "y": 0.4947,
      "w": 0.0532,
      "h": 0.0678,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "10",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-417",
      "floor": "opd-g",
      "x": 0.2483,
      "y": 0.5047,
      "w": 0.0339,
      "h": 0.0891,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-418",
      "floor": "opd-g",
      "x": 0.4176,
      "y": 0.5189,
      "w": 0.0479,
      "h": 0.0339,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-419",
      "floor": "opd-g",
      "x": 0.7926,
      "y": 0.5263,
      "w": 0.0705,
      "h": 0.0632,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-420",
      "floor": "opd-g",
      "x": 0.248,
      "y": 0.5688,
      "w": 0.0332,
      "h": 0.0326,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-421",
      "floor": "opd-g",
      "x": 0.8507,
      "y": 0.5701,
      "w": 0.0233,
      "h": 0.0233,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-422",
      "floor": "opd-g",
      "x": 0.495,
      "y": 0.5981,
      "w": 0.0539,
      "h": 0.0592,
      "kind": "room",
      "name": "",
      "aliases": [],
      "room": "12",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-423",
      "floor": "opd-g",
      "x": 0.2477,
      "y": 0.637,
      "w": 0.0339,
      "h": 0.0519,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-424",
      "floor": "opd-g",
      "x": 0.32655163489184263,
      "y": 0.5756878426246781,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.06380902590601811,
      "h": 0.01843621663134709
    },
    {
      "id": "r-425",
      "floor": "opd-g",
      "x": 0.4804,
      "y": 0.6592,
      "w": 0.0818,
      "h": 0.0565,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-426",
      "floor": "opd-g",
      "x": 0.3115,
      "y": 0.6818,
      "w": 0.0286,
      "h": 0.0299,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-427",
      "floor": "opd-g",
      "x": 0.6702,
      "y": 0.6892,
      "w": 0.0306,
      "h": 0.0445,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-428",
      "floor": "opd-g",
      "x": 0.3102,
      "y": 0.7138,
      "w": 0.0273,
      "h": 0.0259,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-429",
      "floor": "opd-g",
      "x": 0.2234,
      "y": 0.7178,
      "w": 0.1197,
      "h": 0.0525,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-430",
      "floor": "opd-g",
      "x": 0.43116868925773016,
      "y": 0.34695952777508704,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.027547227875648894,
      "h": 0.01362365765644824,
      "room": "31",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-431",
      "floor": "opd-g",
      "x": 0.5598,
      "y": 0.7533,
      "w": 0.0718,
      "h": 0.0878,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-432",
      "floor": "opd-g",
      "x": 0.3132,
      "y": 0.7626,
      "w": 0.0426,
      "h": 0.0652,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-433",
      "floor": "opd-g",
      "x": 0.3574,
      "y": 0.8258,
      "w": 0.0339,
      "h": 0.0532,
      "kind": "room",
      "name": "",
      "aliases": [],
      "seed": true,
      "auto": true
    },
    {
      "id": "r-434",
      "floor": "opd-g",
      "x": 0.43294382691120514,
      "y": 0.15570580889766772,
      "kind": "room",
      "name": "Palliative Care Clinic",
      "aliases": [],
      "w": 0.020942884612970003,
      "h": 0.04815394747358481,
      "room": "36",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-435",
      "floor": "opd-g",
      "x": 0.4752880783960196,
      "y": 0.42611298141934684,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.015297576504389843,
      "h": 0.020448267360717587,
      "room": "9",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "p-104",
      "floor": "opd-f1",
      "x": 0.35636171910374576,
      "y": 0.06979898309293217,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.026769764460284007,
      "h": 0.020514795906689157
    },
    {
      "id": "p-105",
      "floor": "opd-f1",
      "x": 0.4401547030512022,
      "y": 0.047419316861971844,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.026769764460284007,
      "h": 0.020514795906689157
    },
    {
      "id": "p-106",
      "floor": "opd-f1",
      "x": 0.4400438590148267,
      "y": 0.07079609436145383,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.026769764460284007,
      "h": 0.020514795906689157
    },
    {
      "id": "p-107",
      "floor": "opd-f3",
      "x": 0.1469870203665262,
      "y": 0.056492282228812564,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.0341,
      "h": 0.0241
    },
    {
      "id": "p-108",
      "floor": "opd-f3",
      "x": 0.14716502783478042,
      "y": 0.08466075099374767,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.0341,
      "h": 0.0241
    },
    {
      "id": "p-109",
      "floor": "opd-f3",
      "x": 0.25051169529456063,
      "y": 0.05723666593810692,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.0341,
      "h": 0.0241
    },
    {
      "id": "p-110",
      "floor": "opd-f3",
      "x": 0.25084832422461223,
      "y": 0.08567022376104125,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.0341,
      "h": 0.0241
    },
    {
      "id": "p-111",
      "floor": "opd-f3",
      "x": 0.41257242475880684,
      "y": 0.06059575075753938,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.03430655384630832,
      "h": 0.028453373494499924
    },
    {
      "id": "p-112",
      "floor": "opd-f3",
      "x": 0.41250092647253445,
      "y": 0.0924464610988093,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.032395354629286055,
      "h": 0.028784891492323703
    },
    {
      "id": "p-113",
      "floor": "opd-f3",
      "x": 0.6969452884475525,
      "y": 0.403424599194829,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02534711055688521,
      "h": 0.03142498086394485,
      "room": "",
      "shaft": ""
    },
    {
      "id": "p-115",
      "floor": "opd-f3",
      "x": 0.7263204112349756,
      "y": 0.4030317910079679,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02534711055688521,
      "h": 0.03142498086394485
    },
    {
      "id": "p-116",
      "floor": "opd-f3",
      "x": 0.7550078322954694,
      "y": 0.40381741112784014,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02534711055688521,
      "h": 0.03142498086394485
    },
    {
      "id": "p-117",
      "floor": "opd-f3",
      "x": 0.7548113460877754,
      "y": 0.5002528521300497,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02534711055688521,
      "h": 0.03142498086394485
    },
    {
      "id": "p-118",
      "floor": "opd-f3",
      "x": 0.7265168974426696,
      "y": 0.49966361643631996,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02534711055688521,
      "h": 0.03142498086394485
    },
    {
      "id": "p-119",
      "floor": "opd-f3",
      "x": 0.6972400027681569,
      "y": 0.4988779963164477,
      "kind": "lift",
      "name": "Lift lobby (east block)",
      "landmark": "The lift lobby in the east block",
      "aliases": [],
      "w": 0.02534711055688521,
      "h": 0.03142498086394485,
      "shaft": "opd-lift-east",
      "canStart": true
    },
    {
      "id": "p-114",
      "floor": "opd-g",
      "x": 0.34785383926049224,
      "y": 0.07925359862760425,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02606375670517147,
      "h": 0.021612464479093083
    },
    {
      "id": "p-120",
      "floor": "opd-g",
      "x": 0.4278748806989252,
      "y": 0.056378284412721164,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02695088359617198,
      "h": 0.022088652374114545
    },
    {
      "id": "p-121",
      "floor": "opd-g",
      "x": 0.42767030983427246,
      "y": 0.08008039939448794,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02683499101750564,
      "h": 0.020956402324050633
    },
    {
      "id": "p-122",
      "floor": "opd-g",
      "x": 0.5534714990553646,
      "y": 0.08611951948666471,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.02688832801216201,
      "h": 0.02419200858391965
    },
    {
      "id": "p-123",
      "floor": "opd-g",
      "x": 0.8042506450317642,
      "y": 0.34646542821502235,
      "kind": "lift",
      "name": "Lift lobby (east block)",
      "landmark": "The lift lobby in the east block",
      "aliases": [],
      "w": 0.0206,
      "h": 0.0253,
      "shaft": "opd-lift-east",
      "canStart": true
    },
    {
      "id": "p-124",
      "floor": "opd-g",
      "x": 0.8280887426315977,
      "y": 0.42512101938470404,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.0206,
      "h": 0.0253
    },
    {
      "id": "p-125",
      "floor": "opd-g",
      "x": 0.7804125650892315,
      "y": 0.42465832889865596,
      "kind": "lift",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.0206,
      "h": 0.0253
    },
    {
      "id": "p-126",
      "floor": "opd-g",
      "x": 0.8095237450181119,
      "y": 0.4666675700147997,
      "kind": "stair",
      "name": "East block staircase",
      "landmark": "",
      "aliases": [],
      "w": 0.05913855059653084,
      "h": 0.051459608975814364,
      "canStart": true
    },
    {
      "id": "p-127",
      "floor": "opd-f1",
      "x": 0.844324242174665,
      "y": 0.45795815245964855,
      "kind": "stair",
      "name": "East block staircase",
      "landmark": "",
      "aliases": [],
      "w": 0.06264677264359397,
      "h": 0.050638246994322345,
      "canStart": true
    },
    {
      "id": "p-128",
      "floor": "opd-f2",
      "x": 0.7329003997258093,
      "y": 0.5500263827297432,
      "kind": "stair",
      "name": "East block staircase",
      "landmark": "",
      "aliases": [],
      "w": 0.07019142692222347,
      "h": 0.05912002506988889,
      "canStart": true
    },
    {
      "id": "p-129",
      "floor": "opd-f3",
      "x": 0.733946606433451,
      "y": 0.5523592218854729,
      "kind": "stair",
      "name": "East block staircase",
      "landmark": "",
      "aliases": [],
      "w": 0.07336109286458492,
      "h": 0.062031423662107066,
      "canStart": true
    },
    {
      "id": "p-130",
      "floor": "opd-f4",
      "x": 0.6094168527458869,
      "y": 0.08278455244724212,
      "kind": "stair",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.06992426836960797,
      "h": 0.072244141104524,
      "room": "",
      "shaft": ""
    },
    {
      "id": "p-131",
      "floor": "opd-f4",
      "x": 0.8099802826622353,
      "y": 0.3687319302599115,
      "kind": "stair",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.0721790638112424,
      "h": 0.06491414599799228
    },
    {
      "id": "p-132",
      "floor": "opd-f4",
      "x": 0.8140402086483388,
      "y": 0.5809205706624387,
      "kind": "stair",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.0721790638112424,
      "h": 0.06491414599799228
    },
    {
      "id": "r-245",
      "floor": "opd-g",
      "x": 0.478047293647953,
      "y": 0.7535342966463283,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.08236418455328953,
      "h": 0.08094178331192803,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-249",
      "floor": "opd-g",
      "x": 0.6403173332772591,
      "y": 0.7568410405147754,
      "kind": "room",
      "name": "",
      "aliases": [],
      "w": 0.07987729432791879,
      "h": 0.0854047436987021
    },
    {
      "id": "r-254",
      "floor": "opd-f2",
      "x": 0.10030848431360377,
      "y": 0.37263239356234457,
      "kind": "room",
      "name": "",
      "landmark": "",
      "aliases": [],
      "w": 0.05768686430871792,
      "h": 0.09944708934171981,
      "room": "Staff Wash Room Male",
      "shaft": ""
    },
    {
      "id": "r-261",
      "floor": "opd-f3",
      "x": 0.10233099310284562,
      "y": 0.6356647735805456,
      "kind": "room",
      "name": "Staff Wash Room Female",
      "aliases": [],
      "w": 0.05523842369648421,
      "h": 0.08512321541777845,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "p-133",
      "floor": "opd-f4",
      "x": 0.560070052581455,
      "y": 0.6076539418012965,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-134",
      "floor": "opd-f4",
      "x": 0.5613591780725378,
      "y": 0.7904586690195694,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-135",
      "floor": "opd-f4",
      "x": 0.5660660865206701,
      "y": 1.0237925827519156,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-136",
      "floor": "opd-f4",
      "x": 0.19008181156890414,
      "y": 1.034538172543709,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-137",
      "floor": "opd-f4",
      "x": 0.18923319145518427,
      "y": 0.7991745837302114,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-138",
      "floor": "opd-f4",
      "x": 0.18914953596703576,
      "y": 0.5846855320097124,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-139",
      "floor": "opd-f4",
      "x": 0.18708654513609424,
      "y": 0.3818563692662334,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-140",
      "floor": "opd-f4",
      "x": 0.5570505031054795,
      "y": 0.3784090319340586,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-141",
      "floor": "opd-f4",
      "x": 0.5591135201687728,
      "y": 0.5788184616017942,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-142",
      "floor": "opd-f4",
      "x": 0.5603692223293244,
      "y": 0.1738678207389155,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-143",
      "floor": "opd-f4",
      "x": 0.1860734535793384,
      "y": 0.1732302694709773,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-144",
      "floor": "opd-f4",
      "x": 0.24368942017676712,
      "y": 0.38149543567960764,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-145",
      "floor": "opd-f4",
      "x": 0.2800636902998894,
      "y": 0.380611432601333,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-146",
      "floor": "opd-f4",
      "x": 0.35552198788143147,
      "y": 0.3802716662650928,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-147",
      "floor": "opd-f4",
      "x": 0.40038907182580247,
      "y": 0.3795921465533727,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-148",
      "floor": "opd-f4",
      "x": 0.47380794824953776,
      "y": 0.37959214655337276,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-149",
      "floor": "opd-f4",
      "x": 0.2450936691048048,
      "y": 0.5838761465596987,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-150",
      "floor": "opd-f4",
      "x": 0.281864921548276,
      "y": 0.5835785340713663,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-151",
      "floor": "opd-f4",
      "x": 0.34781497391942395,
      "y": 0.5813464063493077,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-152",
      "floor": "opd-f4",
      "x": 0.4055770971019999,
      "y": 0.5817928307584006,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-153",
      "floor": "opd-f4",
      "x": 0.471824876451547,
      "y": 0.5803002150107226,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-154",
      "floor": "opd-f2",
      "x": 0.6177090408433829,
      "y": 0.2774651353821959,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-155",
      "floor": "opd-f2",
      "x": 0.6167246178178072,
      "y": 0.6248174660553424,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-156",
      "floor": "opd-f2",
      "x": 0.6163989496894208,
      "y": 0.575271218213893,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-157",
      "floor": "opd-f3",
      "x": 0.6172329623511275,
      "y": 0.5250093416300261,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-158",
      "floor": "opd-f3",
      "x": 0.6167868064180257,
      "y": 0.5749584506067917,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-159",
      "floor": "opd-f3",
      "x": 0.6208022778949716,
      "y": 0.6209160553074621,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-160",
      "floor": "opd-f3",
      "x": 0.6174230867202182,
      "y": 0.3697720746660298,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-161",
      "floor": "opd-f3",
      "x": 0.6165257077774287,
      "y": 0.2862974803075523,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-162",
      "floor": "opd-f3",
      "x": 0.6174025250557253,
      "y": 0.45057151729589456,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-163",
      "floor": "opd-f3",
      "x": 0.7293631547753059,
      "y": 0.45057151729589456,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-164",
      "floor": "opd-f3",
      "x": 0.1983448997250409,
      "y": 0.158164361197838,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-165",
      "floor": "opd-f3",
      "x": 0.19774446482028507,
      "y": 0.07088260566250269,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-166",
      "floor": "opd-f3",
      "x": 0.3576393094079709,
      "y": 0.07653460367764733,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-167",
      "floor": "opd-f2",
      "x": 0.19841507808782188,
      "y": 0.15832164265321547,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-168",
      "floor": "opd-f2",
      "x": 0.20022335763353954,
      "y": 0.07129217078744607,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-169",
      "floor": "opd-f2",
      "x": 0.3560013218069877,
      "y": 0.0776138931610923,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-170",
      "floor": "opd-f2",
      "x": 0.14549367452811773,
      "y": 0.13204002705590986,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-171",
      "floor": "opd-f2",
      "x": 0.19903740507553513,
      "y": 0.13237876295259282,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-172",
      "floor": "opd-f2",
      "x": 0.35492418542063003,
      "y": 0.13373373238321695,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-173",
      "floor": "opd-f2",
      "x": 0.4928501131084216,
      "y": 0.13474995299521203,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-174",
      "floor": "opd-f2",
      "x": 0.49217230313051247,
      "y": 0.1594780740333992,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-175",
      "floor": "opd-f2",
      "x": 0.08805408008677595,
      "y": 0.1316886273502948,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-176",
      "floor": "opd-f1",
      "x": 0.39850672234066303,
      "y": 0.10853461706830435,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-177",
      "floor": "opd-f1",
      "x": 0.5284558715574302,
      "y": 0.10905725697857185,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-178",
      "floor": "opd-f1",
      "x": 0.3976420177415048,
      "y": 0.06105658883975351,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-179",
      "floor": "opd-f1",
      "x": 0.5288140721177441,
      "y": 0.06123080682883774,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-180",
      "floor": "opd-f1",
      "x": 0.7529130800998356,
      "y": 0.2282163424535079,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-181",
      "floor": "opd-f1",
      "x": 0.7509007805654384,
      "y": 0.4736509173399857,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-182",
      "floor": "opd-f1",
      "x": 0.7494426301502685,
      "y": 0.521263209375716,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-183",
      "floor": "opd-f1",
      "x": 0.7520158286754988,
      "y": 0.3730745509924087,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-184",
      "floor": "opd-f1",
      "x": 0.8386092571605823,
      "y": 0.37255172633812406,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-185",
      "floor": "opd-f3",
      "x": 0.09125646264081032,
      "y": 0.129671991365234,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-186",
      "floor": "opd-f3",
      "x": 0.1467113995204426,
      "y": 0.13189815577435138,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-187",
      "floor": "opd-f3",
      "x": 0.19726669352812776,
      "y": 0.13123029965790153,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-188",
      "floor": "opd-f3",
      "x": 0.35582225878755963,
      "y": 0.13310568049177857,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-189",
      "floor": "opd-f3",
      "x": 0.4921511878131018,
      "y": 0.1347940882612415,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-190",
      "floor": "opd-f3",
      "x": 0.543131661002413,
      "y": 0.1347940882612415,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-191",
      "floor": "opd-f3",
      "x": 0.4919598704227493,
      "y": 0.1600591485529236,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-192",
      "floor": "opd-f4",
      "x": 0.7028275305585875,
      "y": 0.6639581072442876,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-193",
      "floor": "opd-f4",
      "x": 0.7015398387481084,
      "y": 0.6044067592100205,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-194",
      "floor": "opd-f4",
      "x": 0.6966386315673662,
      "y": 0.4794000986599366,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-195",
      "floor": "opd-f4",
      "x": 0.6945756914689992,
      "y": 0.3855745825981396,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-196",
      "floor": "opd-f4",
      "x": 0.6976701016165497,
      "y": 0.2979353496033999,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-197",
      "floor": "opd-f4",
      "x": 0.8018501505064884,
      "y": 0.4773380305252032,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-198",
      "floor": "opd-f4",
      "x": 0.12319547397971936,
      "y": 0.14489534521612352,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-199",
      "floor": "opd-f4",
      "x": 0.18444888799852666,
      "y": 0.1413629821931443,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-200",
      "floor": "opd-f4",
      "x": 0.24293026498618295,
      "y": 0.14116380541707946,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-201",
      "floor": "opd-f4",
      "x": 0.4137565408632518,
      "y": 0.1413629821931443,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-202",
      "floor": "opd-f4",
      "x": 0.5590370705604151,
      "y": 0.14097050406707143,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-203",
      "floor": "opd-f4",
      "x": 0.6124375054415883,
      "y": 0.1386156053664725,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-204",
      "floor": "opd-f4",
      "x": 0.24216845279281174,
      "y": 0.08249037244340317,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-205",
      "floor": "opd-f4",
      "x": 0.4138911957309064,
      "y": 0.08055038486083174,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-206",
      "floor": "opd-f4",
      "x": 0.1884290855719868,
      "y": 0.6869943969961845,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-207",
      "floor": "opd-f1",
      "x": 0.3541474478112528,
      "y": 0.5352257183691184,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-208",
      "floor": "opd-f1",
      "x": 0.3535654731143365,
      "y": 0.39803897802522176,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-209",
      "floor": "opd-f1",
      "x": 0.4907099346377124,
      "y": 0.43154461905796776,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-210",
      "floor": "opd-f1",
      "x": 0.4911893780247181,
      "y": 0.45287114259489153,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-211",
      "floor": "opd-g",
      "x": 0.38837859417667886,
      "y": 0.06862298472788753,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-212",
      "floor": "opd-g",
      "x": 0.5106648970403163,
      "y": 0.11493904283383946,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-213",
      "floor": "opd-g",
      "x": 0.5120262754199998,
      "y": 0.0719982288230449,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-214",
      "floor": "opd-g",
      "x": 0.6151966511173577,
      "y": 0.11643367973074878,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-215",
      "floor": "opd-g",
      "x": 0.8053977867660687,
      "y": 0.38887028114731853,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-216",
      "floor": "opd-g",
      "x": 0.716213482409902,
      "y": 0.4651183648581645,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-217",
      "floor": "opd-g",
      "x": 0.7171527285079891,
      "y": 0.3892737910296201,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-218",
      "floor": "opd-g",
      "x": 0.717109516629225,
      "y": 0.3086635674975078,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-219",
      "floor": "opd-g",
      "x": 0.7171765563708385,
      "y": 0.119190750724279,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-220",
      "floor": "opd-g",
      "x": 0.7153772402134033,
      "y": 0.6994998510218353,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-221",
      "floor": "opd-g",
      "x": 0.9042299800017907,
      "y": 0.7012928015856713,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-222",
      "floor": "opd-g",
      "x": 0.4108503953932866,
      "y": 0.810837184584903,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-223",
      "floor": "opd-g",
      "x": 0.9065827257586263,
      "y": 0.8123889221159012,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-224",
      "floor": "opd-g",
      "x": 0.41066922365624203,
      "y": 0.6990691922341025,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-225",
      "floor": "opd-f4",
      "x": 0.15188043465531237,
      "y": 1.0840200875481623,
      "kind": "stair",
      "name": "South-west staircase",
      "landmark": "",
      "aliases": [],
      "w": 0.08220583064208052,
      "h": 0.07161971011707391,
      "canStart": true,
      "shaft": "opd-stair-sw"
    },
    {
      "id": "p-226",
      "floor": "opd-f4",
      "x": 0.21826365034084577,
      "y": 1.0338546574157164,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-227",
      "floor": "opd-f4",
      "x": 0.2167191239862415,
      "y": 1.0841690546072933,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-228",
      "floor": "opd-f2",
      "x": 0.7252562037728718,
      "y": 0.44721995961284056,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-229",
      "floor": "opd-f1",
      "x": 0.6831113608848968,
      "y": 0.10863814783648774,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-230",
      "floor": "opd-f1",
      "x": 0.308349422989155,
      "y": 0.10860229224789403,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-231",
      "floor": "opd-f1",
      "x": 0.3755444945988527,
      "y": 0.8493228586054693,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-232",
      "floor": "opd-f1",
      "x": 0.377175069505062,
      "y": 0.8054967446620575,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "r-12",
      "floor": "opd-f1",
      "x": 0.8491694643605956,
      "y": 0.16888022873449937,
      "kind": "room",
      "name": "Ramp",
      "aliases": [],
      "w": 0.1545782271809445,
      "h": 0.047968373456969166,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-14",
      "floor": "opd-f1",
      "x": 0.9013356123521671,
      "y": 0.24626915619911394,
      "kind": "room",
      "name": "Ramp",
      "aliases": [],
      "w": 0.048965768372870366,
      "h": 0.1982691772703454,
      "room": "",
      "landmark": "",
      "shaft": ""
    },
    {
      "id": "r-24",
      "floor": "opd-f1",
      "x": 0.9040925139721389,
      "y": 0.5029240437946569,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.04966170970412054,
      "h": 0.21173396607466533
    },
    {
      "id": "r-32",
      "floor": "opd-f1",
      "x": 0.8514669531381694,
      "y": 0.5839576419047579,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.1545782271809445,
      "h": 0.047968373456969166
    },
    {
      "id": "r-68",
      "floor": "opd-f2",
      "x": 0.7423321031110717,
      "y": 0.6929843487665108,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.17530743085637612,
      "h": 0.057595359134789414
    },
    {
      "id": "r-224",
      "floor": "opd-f2",
      "x": 0.7380561420288108,
      "y": 0.20943156548234787,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.17530743085637612,
      "h": 0.057595359134789414
    },
    {
      "id": "r-246",
      "floor": "opd-f2",
      "x": 0.8035060887356057,
      "y": 0.3004310891225588,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.05427151373188699,
      "h": 0.2444977192765292
    },
    {
      "id": "r-262",
      "floor": "opd-f2",
      "x": 0.8031441092516747,
      "y": 0.6038670678221305,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.05427151373188699,
      "h": 0.2444977192765292
    },
    {
      "id": "r-290",
      "floor": "opd-f3",
      "x": 0.8010296238090181,
      "y": 0.6046686843572202,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.05427151373188699,
      "h": 0.2444977192765292
    },
    {
      "id": "r-291",
      "floor": "opd-f3",
      "x": 0.8016659553106328,
      "y": 0.2974786468897888,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.05427151373188699,
      "h": 0.2444977192765292
    },
    {
      "id": "r-292",
      "floor": "opd-f3",
      "x": 0.74193904959015,
      "y": 0.20677028323440336,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.17530743085637612,
      "h": 0.057595359134789414
    },
    {
      "id": "r-359",
      "floor": "opd-f3",
      "x": 0.7425224329199207,
      "y": 0.694268956181064,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.17530743085637612,
      "h": 0.057595359134789414
    },
    {
      "id": "r-361",
      "floor": "opd-f4",
      "x": 0.8237213777361535,
      "y": 0.7356025181411828,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.17530743085637612,
      "h": 0.057595359134789414
    },
    {
      "id": "r-363",
      "floor": "opd-f4",
      "x": 0.8147850687987315,
      "y": 0.21537197446466197,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.17530743085637612,
      "h": 0.057595359134789414
    },
    {
      "id": "r-364",
      "floor": "opd-g",
      "x": 0.8190154031799326,
      "y": 0.1856519802011335,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.14776867425711904,
      "h": 0.05008607130044851
    },
    {
      "id": "r-365",
      "floor": "opd-g",
      "x": 0.818413322126755,
      "y": 0.5855493889504315,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.14776867425711904,
      "h": 0.05008607130044851
    },
    {
      "id": "r-368",
      "floor": "opd-f4",
      "x": 0.8801156845988642,
      "y": 0.3109300741849874,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.05580213195674166,
      "h": 0.2553593257414254
    },
    {
      "id": "r-369",
      "floor": "opd-f4",
      "x": 0.882018772890619,
      "y": 0.6321820572395409,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.05746595713049596,
      "h": 0.26005566721741014
    },
    {
      "id": "r-373",
      "floor": "opd-g",
      "x": 0.8675704630734518,
      "y": 0.5084314172764397,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.04753660098822843,
      "h": 0.19920911873010133
    },
    {
      "id": "r-388",
      "floor": "opd-g",
      "x": 0.86879192774192,
      "y": 0.2609695262675807,
      "kind": "room",
      "name": "Ramp",
      "landmark": "",
      "aliases": [],
      "w": 0.04753660098822843,
      "h": 0.19920911873010133
    },
    {
      "id": "p-233",
      "floor": "opd-f4",
      "x": 0.8798857668342523,
      "y": 0.47180098702989903,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-234",
      "floor": "opd-f3",
      "x": 0.7926430280781209,
      "y": 0.4503364479378128,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-235",
      "floor": "opd-f2",
      "x": 0.7959546831671271,
      "y": 0.45037267048040075,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-236",
      "floor": "opd-f1",
      "x": 0.8978232563111596,
      "y": 0.3715406551465941,
      "kind": "junction",
      "name": "",
      "aliases": []
    },
    {
      "id": "p-237",
      "floor": "opd-g",
      "x": 0.8639607501663731,
      "y": 0.38993710739220566,
      "kind": "junction",
      "name": "",
      "aliases": []
    }
  ],
  "edges": [
    [
      "f1-c-n",
      "f1-c-1"
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
      "f2-w-3",
      "f2-stair-sw"
    ],
    [
      "f2-c-5",
      "f2-sample-b"
    ],
    [
      "f3-w-3",
      "f3-stair-sw"
    ],
    [
      "f3-door-304",
      "r-352"
    ],
    [
      "f3-door-302",
      "r-355"
    ],
    [
      "f3-c-n2",
      "f3-door-302"
    ],
    [
      "f3-door-325",
      "r-328"
    ],
    [
      "f3-door-325",
      "f3-w-2"
    ],
    [
      "f3-door-331",
      "r-330"
    ],
    [
      "f3-door-332",
      "r-336"
    ],
    [
      "f3-door-340",
      "r-342"
    ],
    [
      "f3-door-339",
      "r-339"
    ],
    [
      "f3-door-338",
      "r-340"
    ],
    [
      "f3-door-337",
      "r-341"
    ],
    [
      "f3-w-3",
      "f3-door-340"
    ],
    [
      "f3-door-340",
      "f3-door-339"
    ],
    [
      "f3-door-339",
      "f3-door-338"
    ],
    [
      "f3-door-338",
      "f3-door-337"
    ],
    [
      "f3-c-n2",
      "r-353"
    ],
    [
      "f3-x3-w",
      "f3-door-325"
    ],
    [
      "f3-w-2",
      "f3-x4-w"
    ],
    [
      "f3-x4-w",
      "f3-door-331"
    ],
    [
      "f3-door-331",
      "f3-x5-w"
    ],
    [
      "f3-x5-w",
      "f3-door-332"
    ],
    [
      "f3-door-332",
      "f3-x6-w"
    ],
    [
      "f3-x6-w",
      "f3-w-3"
    ],
    [
      "f3-door-314",
      "r-348"
    ],
    [
      "f3-door-308",
      "r-323"
    ],
    [
      "f3-door-308",
      "r-349"
    ],
    [
      "f3-door-307",
      "r-324"
    ],
    [
      "f3-door-307",
      "r-350"
    ],
    [
      "f3-x1-w",
      "f3-door-314"
    ],
    [
      "f3-door-314",
      "f3-door-308"
    ],
    [
      "f3-door-308",
      "f3-door-307"
    ],
    [
      "f3-door-319",
      "r-325"
    ],
    [
      "f3-door-319",
      "r-344"
    ],
    [
      "f3-door-318",
      "r-326"
    ],
    [
      "f3-door-318",
      "r-345"
    ],
    [
      "f3-door-317",
      "r-327"
    ],
    [
      "f3-door-317",
      "r-343"
    ],
    [
      "f3-door-319",
      "f3-door-318"
    ],
    [
      "f3-door-318",
      "f3-door-317"
    ],
    [
      "f3-door-330",
      "r-331"
    ],
    [
      "f3-door-329",
      "r-332"
    ],
    [
      "f3-x4-w",
      "f3-door-330"
    ],
    [
      "f3-door-330",
      "f3-door-329"
    ],
    [
      "f3-door-333",
      "r-337"
    ],
    [
      "f3-door-328",
      "r-333"
    ],
    [
      "f3-door-328",
      "r-334"
    ],
    [
      "f3-x5-w",
      "f3-door-333"
    ],
    [
      "f3-door-333",
      "f3-door-328"
    ],
    [
      "p-2",
      "p-3"
    ],
    [
      "p-4",
      "p-5"
    ],
    [
      "p-6",
      "p-7"
    ],
    [
      "p-7",
      "p-8"
    ],
    [
      "p-8",
      "p-9"
    ],
    [
      "p-10",
      "p-11"
    ],
    [
      "p-11",
      "p-12"
    ],
    [
      "p-14",
      "p-15"
    ],
    [
      "p-15",
      "p-16"
    ],
    [
      "p-16",
      "p-17"
    ],
    [
      "p-17",
      "p-18"
    ],
    [
      "p-18",
      "p-14"
    ],
    [
      "p-9",
      "p-19"
    ],
    [
      "p-19",
      "p-20"
    ],
    [
      "p-20",
      "p-21"
    ],
    [
      "p-21",
      "p-22"
    ],
    [
      "p-22",
      "p-23"
    ],
    [
      "p-23",
      "p-19"
    ],
    [
      "p-24",
      "p-25"
    ],
    [
      "p-25",
      "p-26"
    ],
    [
      "p-26",
      "f3-door-330"
    ],
    [
      "f3-door-329",
      "p-27"
    ],
    [
      "p-27",
      "p-24"
    ],
    [
      "f3-x3-w",
      "f3-x2-w"
    ],
    [
      "p-21",
      "f3-x2-w"
    ],
    [
      "f3-x1-w",
      "p-13"
    ],
    [
      "p-12",
      "f3-door-302"
    ],
    [
      "f3-door-304",
      "f3-c-n2"
    ],
    [
      "p-28",
      "r-354"
    ],
    [
      "p-29",
      "p-30"
    ],
    [
      "p-32",
      "p-33"
    ],
    [
      "p-33",
      "p-34"
    ],
    [
      "p-34",
      "f2-w-3"
    ],
    [
      "p-31",
      "p-32"
    ],
    [
      "p-30",
      "p-31"
    ],
    [
      "p-35",
      "p-36"
    ],
    [
      "p-36",
      "p-37"
    ],
    [
      "p-37",
      "p-38"
    ],
    [
      "p-38",
      "p-39"
    ],
    [
      "p-35",
      "r-197"
    ],
    [
      "p-36",
      "r-192"
    ],
    [
      "p-37",
      "r-193"
    ],
    [
      "p-38",
      "r-194"
    ],
    [
      "p-39",
      "r-195"
    ],
    [
      "p-39",
      "f2-sample-a"
    ],
    [
      "p-38",
      "r-191"
    ],
    [
      "p-37",
      "r-190"
    ],
    [
      "p-36",
      "r-189"
    ],
    [
      "p-35",
      "p-30"
    ],
    [
      "p-39",
      "f2-c-2"
    ],
    [
      "p-40",
      "p-41"
    ],
    [
      "p-41",
      "p-42"
    ],
    [
      "p-42",
      "p-43"
    ],
    [
      "p-43",
      "p-44"
    ],
    [
      "p-44",
      "p-40"
    ],
    [
      "p-31",
      "p-40"
    ],
    [
      "p-43",
      "p-45"
    ],
    [
      "p-45",
      "f2-c-2"
    ],
    [
      "p-47",
      "p-48"
    ],
    [
      "p-48",
      "p-49"
    ],
    [
      "p-50",
      "f2-c-4"
    ],
    [
      "f2-c-3",
      "p-50"
    ],
    [
      "p-49",
      "p-50"
    ],
    [
      "p-46",
      "p-32"
    ],
    [
      "r-318",
      "p-46"
    ],
    [
      "r-210",
      "p-46"
    ],
    [
      "r-316",
      "p-47"
    ],
    [
      "r-207",
      "p-47"
    ],
    [
      "r-317",
      "p-48"
    ],
    [
      "r-208",
      "p-48"
    ],
    [
      "r-315",
      "p-49"
    ],
    [
      "r-209",
      "p-49"
    ],
    [
      "p-51",
      "p-52"
    ],
    [
      "p-52",
      "p-53"
    ],
    [
      "p-53",
      "p-54"
    ],
    [
      "p-54",
      "p-55"
    ],
    [
      "p-51",
      "p-34"
    ],
    [
      "r-219",
      "p-51"
    ],
    [
      "r-220",
      "p-52"
    ],
    [
      "r-228",
      "p-52"
    ],
    [
      "r-221",
      "p-53"
    ],
    [
      "r-229",
      "p-53"
    ],
    [
      "r-222",
      "p-54"
    ],
    [
      "r-226",
      "p-54"
    ],
    [
      "r-223",
      "p-55"
    ],
    [
      "r-227",
      "p-55"
    ],
    [
      "p-57",
      "p-58"
    ],
    [
      "p-58",
      "p-59"
    ],
    [
      "p-59",
      "p-60"
    ],
    [
      "r-178",
      "p-56"
    ],
    [
      "r-179",
      "p-57"
    ],
    [
      "r-180",
      "p-58"
    ],
    [
      "r-181",
      "p-59"
    ],
    [
      "r-182",
      "p-60"
    ],
    [
      "f2-c-1",
      "p-60"
    ],
    [
      "p-29",
      "p-56"
    ],
    [
      "p-62",
      "p-63"
    ],
    [
      "p-62",
      "p-64"
    ],
    [
      "p-65",
      "p-66"
    ],
    [
      "p-66",
      "p-67"
    ],
    [
      "p-67",
      "p-68"
    ],
    [
      "p-68",
      "p-69"
    ],
    [
      "r-237",
      "p-65"
    ],
    [
      "f2-w-3",
      "p-65"
    ],
    [
      "r-234",
      "p-66"
    ],
    [
      "r-235",
      "p-67"
    ],
    [
      "r-236",
      "p-68"
    ],
    [
      "r-233",
      "p-69"
    ],
    [
      "f2-c-7",
      "p-69"
    ],
    [
      "p-72",
      "p-73"
    ],
    [
      "p-73",
      "p-74"
    ],
    [
      "p-74",
      "p-75"
    ],
    [
      "p-75",
      "p-76"
    ],
    [
      "p-76",
      "p-77"
    ],
    [
      "p-71",
      "p-78"
    ],
    [
      "p-77",
      "p-71"
    ],
    [
      "p-79",
      "p-80"
    ],
    [
      "p-85",
      "p-86"
    ],
    [
      "p-86",
      "p-87"
    ],
    [
      "p-87",
      "p-88"
    ],
    [
      "p-88",
      "p-89"
    ],
    [
      "p-89",
      "p-90"
    ],
    [
      "p-90",
      "p-91"
    ],
    [
      "p-84",
      "p-85"
    ],
    [
      "p-92",
      "p-93"
    ],
    [
      "p-93",
      "p-94"
    ],
    [
      "p-94",
      "p-95"
    ],
    [
      "p-95",
      "p-96"
    ],
    [
      "p-96",
      "p-97"
    ],
    [
      "p-97",
      "p-98"
    ],
    [
      "p-98",
      "p-99"
    ],
    [
      "f1-e-1",
      "p-99"
    ],
    [
      "p-91",
      "f1-e-1"
    ],
    [
      "f1-c-ne",
      "p-99"
    ],
    [
      "p-83",
      "f1-e-1"
    ],
    [
      "p-80",
      "p-83"
    ],
    [
      "f1-c-2",
      "p-83"
    ],
    [
      "p-81",
      "p-80"
    ],
    [
      "p-77",
      "r-312"
    ],
    [
      "p-76",
      "r-50"
    ],
    [
      "p-77",
      "r-55"
    ],
    [
      "p-75",
      "r-58"
    ],
    [
      "r-48",
      "p-75"
    ],
    [
      "r-57",
      "p-74"
    ],
    [
      "p-73",
      "r-60"
    ],
    [
      "p-73",
      "r-51"
    ],
    [
      "p-72",
      "r-59"
    ],
    [
      "r-52",
      "p-72"
    ],
    [
      "p-100",
      "p-101"
    ],
    [
      "p-101",
      "p-102"
    ],
    [
      "p-70",
      "p-103"
    ],
    [
      "p-72",
      "p-103"
    ],
    [
      "r-61",
      "p-101"
    ],
    [
      "r-64",
      "p-102"
    ],
    [
      "p-91",
      "r-28"
    ],
    [
      "r-276",
      "p-91"
    ],
    [
      "r-19",
      "p-90"
    ],
    [
      "r-18",
      "p-89"
    ],
    [
      "r-26",
      "p-89"
    ],
    [
      "r-27",
      "p-90"
    ],
    [
      "r-23",
      "p-88"
    ],
    [
      "r-22",
      "p-87"
    ],
    [
      "r-15",
      "p-87"
    ],
    [
      "r-21",
      "p-86"
    ],
    [
      "r-25",
      "p-85"
    ],
    [
      "p-92",
      "r-263"
    ],
    [
      "p-93",
      "r-15"
    ],
    [
      "p-96",
      "r-18"
    ],
    [
      "p-97",
      "r-19"
    ],
    [
      "r-10",
      "p-98"
    ],
    [
      "r-7",
      "p-97"
    ],
    [
      "r-9",
      "p-96"
    ],
    [
      "r-8",
      "p-95"
    ],
    [
      "r-6",
      "p-94"
    ],
    [
      "r-5",
      "p-93"
    ],
    [
      "r-4",
      "p-92"
    ],
    [
      "p-92",
      "f1-c-1"
    ],
    [
      "p-84",
      "f1-c-1"
    ],
    [
      "f1-door-141",
      "r-42"
    ],
    [
      "f1-door-141",
      "p-78"
    ],
    [
      "f1-door-128",
      "r-45"
    ],
    [
      "p-79",
      "f1-door-128"
    ],
    [
      "f1-door-128",
      "p-71"
    ],
    [
      "f1-door-Wash Room Male",
      "r-313"
    ],
    [
      "f1-c-2",
      "f1-door-Wash Room Male"
    ],
    [
      "f1-door-Wash Room Male",
      "p-84"
    ],
    [
      "p-70",
      "r-56"
    ],
    [
      "f2-door-201",
      "r-185"
    ],
    [
      "f2-c-1",
      "f2-door-201"
    ],
    [
      "f2-door-201",
      "f2-c-2"
    ],
    [
      "f2-door-221",
      "r-211"
    ],
    [
      "f2-c-4",
      "f2-door-221"
    ],
    [
      "f2-door-221",
      "f2-c-5"
    ],
    [
      "f2-door-216",
      "r-358"
    ],
    [
      "f2-c-3",
      "f2-door-216"
    ],
    [
      "f2-door-216",
      "p-45"
    ],
    [
      "f2-c-6",
      "r-232"
    ],
    [
      "f3-door-320",
      "r-346"
    ],
    [
      "f3-x3-w",
      "f3-door-320"
    ],
    [
      "f3-door-320",
      "f3-door-319"
    ],
    [
      "f3-door-335",
      "r-335"
    ],
    [
      "p-3",
      "f3-door-335"
    ],
    [
      "f3-door-335",
      "p-4"
    ],
    [
      "f3-door-321",
      "r-329"
    ],
    [
      "p-5",
      "f3-door-321"
    ],
    [
      "f3-door-321",
      "p-6"
    ],
    [
      "f3-door-311",
      "r-351"
    ],
    [
      "p-9",
      "f3-door-311"
    ],
    [
      "f3-door-311",
      "p-10"
    ],
    [
      "f3-door-301",
      "r-321"
    ],
    [
      "p-14",
      "f3-door-301"
    ],
    [
      "f3-door-301",
      "p-11"
    ],
    [
      "f3-door-306",
      "r-319"
    ],
    [
      "f3-door-307",
      "f3-door-306"
    ],
    [
      "f3-door-306",
      "p-10"
    ],
    [
      "f3-door-316",
      "r-357"
    ],
    [
      "p-7",
      "f3-door-316"
    ],
    [
      "f3-door-316",
      "f3-door-317"
    ],
    [
      "f3-door-327",
      "r-320"
    ],
    [
      "p-5",
      "f3-door-327"
    ],
    [
      "f3-door-327",
      "p-24"
    ],
    [
      "f3-door-315",
      "r-347"
    ],
    [
      "f3-x2-w",
      "f3-door-315"
    ],
    [
      "f3-door-315",
      "f3-x1-w"
    ],
    [
      "f3-door-314",
      "r-322"
    ],
    [
      "p-3",
      "r-338"
    ],
    [
      "g-stair-nw",
      "g-c-nw"
    ],
    [
      "g-c-nw",
      "g-c-n1"
    ],
    [
      "g-c-n1",
      "g-c-n2"
    ],
    [
      "g-c-ne",
      "g-stair-ne"
    ],
    [
      "g-c-n2",
      "g-c-1"
    ],
    [
      "g-c-1",
      "g-c-2"
    ],
    [
      "g-c-2",
      "g-c-3"
    ],
    [
      "g-c-3",
      "g-c-4"
    ],
    [
      "g-c-4",
      "g-c-5"
    ],
    [
      "g-c-5",
      "g-c-6"
    ],
    [
      "g-c-nw",
      "g-w-0"
    ],
    [
      "g-w-0",
      "g-w-1"
    ],
    [
      "g-w-1",
      "g-w-2"
    ],
    [
      "g-w-2",
      "g-w-3"
    ],
    [
      "g-w-3",
      "g-w-4"
    ],
    [
      "g-w-4",
      "g-w-5"
    ],
    [
      "g-w-5",
      "g-entry-imaging"
    ],
    [
      "g-entry-imaging",
      "g-e-1"
    ],
    [
      "g-e-1",
      "g-c-6"
    ],
    [
      "g-e-2",
      "g-e-3"
    ],
    [
      "g-e-3",
      "g-e-4"
    ],
    [
      "g-e-1",
      "g-s-1"
    ],
    [
      "g-s-1",
      "g-stair-sw"
    ],
    [
      "g-r-cancer",
      "g-c-nw"
    ],
    [
      "g-r-tumor",
      "g-w-0"
    ],
    [
      "g-r-radonc",
      "g-w-2"
    ],
    [
      "g-r-us",
      "g-c-4"
    ],
    [
      "p-133",
      "p-134"
    ],
    [
      "p-134",
      "p-135"
    ],
    [
      "p-138",
      "p-139"
    ],
    [
      "p-140",
      "p-141"
    ],
    [
      "p-143",
      "p-139"
    ],
    [
      "p-140",
      "p-142"
    ],
    [
      "p-133",
      "p-141"
    ],
    [
      "p-144",
      "p-145"
    ],
    [
      "p-145",
      "p-146"
    ],
    [
      "p-146",
      "p-147"
    ],
    [
      "p-147",
      "p-148"
    ],
    [
      "p-148",
      "p-140"
    ],
    [
      "p-139",
      "p-144"
    ],
    [
      "p-144",
      "r-264"
    ],
    [
      "p-145",
      "r-265"
    ],
    [
      "p-145",
      "r-260"
    ],
    [
      "p-146",
      "r-47"
    ],
    [
      "p-146",
      "r-257"
    ],
    [
      "p-147",
      "r-258"
    ],
    [
      "r-49",
      "p-147"
    ],
    [
      "r-53",
      "p-148"
    ],
    [
      "p-149",
      "p-150"
    ],
    [
      "p-150",
      "p-151"
    ],
    [
      "p-151",
      "p-152"
    ],
    [
      "p-152",
      "p-153"
    ],
    [
      "p-153",
      "p-141"
    ],
    [
      "p-138",
      "p-149"
    ],
    [
      "r-280",
      "p-149"
    ],
    [
      "r-285",
      "p-149"
    ],
    [
      "r-284",
      "p-150"
    ],
    [
      "r-279",
      "p-150"
    ],
    [
      "r-278",
      "p-151"
    ],
    [
      "r-283",
      "p-151"
    ],
    [
      "r-282",
      "p-152"
    ],
    [
      "r-277",
      "p-152"
    ],
    [
      "r-272",
      "p-153"
    ],
    [
      "f2-c-3",
      "p-61"
    ],
    [
      "p-64",
      "p-61"
    ],
    [
      "p-63",
      "f2-stair-e"
    ],
    [
      "p-154",
      "r-212"
    ],
    [
      "p-62",
      "p-154"
    ],
    [
      "p-61",
      "p-155"
    ],
    [
      "r-177",
      "p-155"
    ],
    [
      "f2-c-4",
      "p-156"
    ],
    [
      "p-128",
      "p-156"
    ],
    [
      "p-157",
      "p-158"
    ],
    [
      "p-158",
      "p-159"
    ],
    [
      "p-160",
      "p-161"
    ],
    [
      "p-8",
      "p-157"
    ],
    [
      "p-6",
      "p-158"
    ],
    [
      "r-183",
      "p-159"
    ],
    [
      "p-158",
      "p-129"
    ],
    [
      "p-162",
      "p-163"
    ],
    [
      "p-162",
      "p-157"
    ],
    [
      "p-160",
      "p-162"
    ],
    [
      "p-118",
      "p-163"
    ],
    [
      "p-161",
      "r-217"
    ],
    [
      "p-160",
      "f3-stair-e"
    ],
    [
      "p-13",
      "p-28"
    ],
    [
      "p-28",
      "p-164"
    ],
    [
      "p-164",
      "f3-door-304"
    ],
    [
      "p-165",
      "p-109"
    ],
    [
      "p-165",
      "p-107"
    ],
    [
      "p-165",
      "p-108"
    ],
    [
      "p-165",
      "p-110"
    ],
    [
      "p-111",
      "p-166"
    ],
    [
      "p-112",
      "p-166"
    ],
    [
      "p-116",
      "p-163"
    ],
    [
      "p-115",
      "p-163"
    ],
    [
      "p-113",
      "p-163"
    ],
    [
      "p-119",
      "p-163"
    ],
    [
      "p-117",
      "p-163"
    ],
    [
      "p-167",
      "p-56"
    ],
    [
      "p-57",
      "p-167"
    ],
    [
      "p-170",
      "p-171"
    ],
    [
      "p-171",
      "p-172"
    ],
    [
      "p-172",
      "p-173"
    ],
    [
      "p-173",
      "p-174"
    ],
    [
      "p-174",
      "f2-c-1"
    ],
    [
      "p-168",
      "p-171"
    ],
    [
      "r-170",
      "p-168"
    ],
    [
      "r-173",
      "p-168"
    ],
    [
      "r-171",
      "p-168"
    ],
    [
      "r-174",
      "p-168"
    ],
    [
      "p-169",
      "r-172"
    ],
    [
      "p-169",
      "r-175"
    ],
    [
      "p-169",
      "p-172"
    ],
    [
      "f2-stair-ne",
      "p-173"
    ],
    [
      "p-34",
      "r-225"
    ],
    [
      "p-33",
      "r-202"
    ],
    [
      "p-30",
      "r-254"
    ],
    [
      "p-170",
      "p-175"
    ],
    [
      "f2-stair-nw",
      "p-175"
    ],
    [
      "p-29",
      "p-170"
    ],
    [
      "p-176",
      "p-177"
    ],
    [
      "f1-c-n",
      "p-176"
    ],
    [
      "p-176",
      "p-178"
    ],
    [
      "p-106",
      "p-178"
    ],
    [
      "p-105",
      "p-178"
    ],
    [
      "r-20",
      "p-178"
    ],
    [
      "p-104",
      "p-178"
    ],
    [
      "r-1",
      "p-179"
    ],
    [
      "r-2",
      "p-179"
    ],
    [
      "p-177",
      "p-179"
    ],
    [
      "p-177",
      "f1-c-ne"
    ],
    [
      "r-16",
      "p-180"
    ],
    [
      "p-82",
      "p-180"
    ],
    [
      "f1-stair-e",
      "p-82"
    ],
    [
      "p-181",
      "p-182"
    ],
    [
      "p-127",
      "p-181"
    ],
    [
      "p-81",
      "p-181"
    ],
    [
      "r-314",
      "p-182"
    ],
    [
      "p-82",
      "p-183"
    ],
    [
      "p-81",
      "p-183"
    ],
    [
      "p-183",
      "p-184"
    ],
    [
      "r-30",
      "p-184"
    ],
    [
      "r-31",
      "p-184"
    ],
    [
      "r-41",
      "p-184"
    ],
    [
      "r-40",
      "p-184"
    ],
    [
      "r-39",
      "p-184"
    ],
    [
      "r-29",
      "p-184"
    ],
    [
      "f3-door-315",
      "r-196"
    ],
    [
      "f3-w-2",
      "r-261"
    ],
    [
      "p-185",
      "p-186"
    ],
    [
      "p-186",
      "p-187"
    ],
    [
      "p-187",
      "p-188"
    ],
    [
      "p-188",
      "p-189"
    ],
    [
      "p-189",
      "p-190"
    ],
    [
      "f3-stair-ne",
      "p-190"
    ],
    [
      "p-186",
      "p-13"
    ],
    [
      "p-187",
      "p-165"
    ],
    [
      "p-188",
      "p-166"
    ],
    [
      "p-1",
      "p-12"
    ],
    [
      "p-189",
      "p-191"
    ],
    [
      "p-1",
      "p-191"
    ],
    [
      "p-192",
      "p-193"
    ],
    [
      "p-193",
      "p-194"
    ],
    [
      "p-194",
      "p-195"
    ],
    [
      "p-195",
      "p-196"
    ],
    [
      "p-133",
      "p-193"
    ],
    [
      "p-132",
      "p-193"
    ],
    [
      "p-197",
      "p-194"
    ],
    [
      "r-266",
      "p-197"
    ],
    [
      "r-267",
      "p-197"
    ],
    [
      "r-268",
      "p-197"
    ],
    [
      "r-275",
      "p-197"
    ],
    [
      "r-274",
      "p-197"
    ],
    [
      "r-273",
      "p-197"
    ],
    [
      "p-195",
      "p-131"
    ],
    [
      "p-196",
      "r-218"
    ],
    [
      "p-198",
      "p-199"
    ],
    [
      "p-201",
      "p-202"
    ],
    [
      "p-202",
      "p-203"
    ],
    [
      "p-143",
      "p-142"
    ],
    [
      "p-202",
      "p-142"
    ],
    [
      "r-239",
      "p-204"
    ],
    [
      "r-242",
      "p-204"
    ],
    [
      "r-238",
      "p-204"
    ],
    [
      "r-241",
      "p-204"
    ],
    [
      "r-240",
      "p-205"
    ],
    [
      "r-243",
      "p-205"
    ],
    [
      "p-205",
      "p-201"
    ],
    [
      "p-130",
      "p-203"
    ],
    [
      "r-74",
      "p-198"
    ],
    [
      "p-139",
      "r-269"
    ],
    [
      "p-206",
      "p-138"
    ],
    [
      "p-137",
      "p-206"
    ],
    [
      "f1-c-6",
      "p-207"
    ],
    [
      "f1-c-3",
      "p-207"
    ],
    [
      "r-44",
      "p-207"
    ],
    [
      "r-299",
      "p-207"
    ],
    [
      "f1-c-3",
      "p-208"
    ],
    [
      "f1-c-2",
      "p-208"
    ],
    [
      "f1-c-3",
      "p-209"
    ],
    [
      "p-210",
      "p-209"
    ],
    [
      "p-79",
      "p-210"
    ],
    [
      "p-212",
      "p-213"
    ],
    [
      "g-c-n2",
      "p-212"
    ],
    [
      "p-212",
      "p-214"
    ],
    [
      "g-c-ne",
      "p-214"
    ],
    [
      "r-397",
      "p-215"
    ],
    [
      "p-123",
      "p-215"
    ],
    [
      "r-398",
      "p-215"
    ],
    [
      "p-124",
      "p-215"
    ],
    [
      "r-410",
      "p-215"
    ],
    [
      "p-125",
      "p-215"
    ],
    [
      "p-216",
      "p-217"
    ],
    [
      "p-217",
      "p-218"
    ],
    [
      "p-218",
      "p-219"
    ],
    [
      "p-216",
      "g-k-1"
    ],
    [
      "g-e-4",
      "p-220"
    ],
    [
      "p-220",
      "p-221"
    ],
    [
      "p-220",
      "g-k-1"
    ],
    [
      "p-222",
      "p-223"
    ],
    [
      "g-c-6",
      "p-224"
    ],
    [
      "p-224",
      "g-e-2"
    ],
    [
      "p-222",
      "p-224"
    ],
    [
      "p-215",
      "p-217"
    ],
    [
      "g-stair-e",
      "p-218"
    ],
    [
      "p-216",
      "p-126"
    ],
    [
      "p-211",
      "g-c-n1"
    ],
    [
      "p-120",
      "p-211"
    ],
    [
      "p-211",
      "p-121"
    ],
    [
      "p-114",
      "p-211"
    ],
    [
      "r-360",
      "p-211"
    ],
    [
      "r-362",
      "p-213"
    ],
    [
      "p-122",
      "p-213"
    ],
    [
      "p-226",
      "p-227"
    ],
    [
      "p-227",
      "p-225"
    ],
    [
      "p-136",
      "p-226"
    ],
    [
      "p-135",
      "p-226"
    ],
    [
      "p-136",
      "p-137"
    ],
    [
      "p-137",
      "p-134"
    ],
    [
      "r-198",
      "p-228"
    ],
    [
      "r-199",
      "p-228"
    ],
    [
      "r-200",
      "p-228"
    ],
    [
      "r-204",
      "p-228"
    ],
    [
      "r-206",
      "p-228"
    ],
    [
      "r-205",
      "p-228"
    ],
    [
      "p-64",
      "p-228"
    ],
    [
      "p-199",
      "p-200"
    ],
    [
      "p-201",
      "p-200"
    ],
    [
      "p-204",
      "p-200"
    ],
    [
      "f1-stair-ne",
      "p-229"
    ],
    [
      "p-229",
      "f1-c-ne"
    ],
    [
      "f1-c-n",
      "p-230"
    ],
    [
      "f1-stair-nw",
      "p-230"
    ],
    [
      "p-231",
      "p-232"
    ],
    [
      "f1-c-6",
      "p-232"
    ],
    [
      "f1-door-141",
      "p-232"
    ],
    [
      "f1-stair-sw",
      "p-231"
    ],
    [
      "p-197",
      "p-233"
    ],
    [
      "p-233",
      "r-369"
    ],
    [
      "p-233",
      "r-368"
    ],
    [
      "p-163",
      "p-234"
    ],
    [
      "r-291",
      "p-234"
    ],
    [
      "r-290",
      "p-234"
    ],
    [
      "p-228",
      "p-235"
    ],
    [
      "r-246",
      "p-235"
    ],
    [
      "r-262",
      "p-235"
    ],
    [
      "p-184",
      "p-236"
    ],
    [
      "r-14",
      "p-236"
    ],
    [
      "r-24",
      "p-236"
    ],
    [
      "p-215",
      "p-237"
    ],
    [
      "r-388",
      "p-237"
    ],
    [
      "r-373",
      "p-237"
    ]
  ]
};
