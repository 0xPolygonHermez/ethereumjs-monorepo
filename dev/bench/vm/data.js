window.BENCHMARK_DATA = {
  "lastUpdate": 1684163178596,
  "repoUrl": "https://github.com/hermeznetwork/ethereumjs-monorepo",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7f0a06a68433e902a16a8aa8bc6fcdfc861be135",
          "message": "Merge pull request #1626 from ethereumjs/monorepo-add-rlp\n\nrlp: add to monorepo",
          "timestamp": "2022-01-10T17:08:04-08:00",
          "tree_id": "a32a8acc39b115fda08ec5d698864c342c3d8066",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/7f0a06a68433e902a16a8aa8bc6fcdfc861be135"
        },
        "date": 1641863584928,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 12938,
            "range": "±5.01%",
            "unit": "ops/sec",
            "extra": "73 samples"
          },
          {
            "name": "Block 9422906",
            "value": 13628,
            "range": "±2.21%",
            "unit": "ops/sec",
            "extra": "80 samples"
          },
          {
            "name": "Block 9422907",
            "value": 12402,
            "range": "±7.31%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422908",
            "value": 10265,
            "range": "±14.17%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422910",
            "value": 13837,
            "range": "±2.38%",
            "unit": "ops/sec",
            "extra": "80 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "Holger.Drewes@gmail.com",
            "name": "Holger Drewes",
            "username": "holgerd77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ee0004729119338c2bbd37434df8a202ad92e440",
          "message": "VM: Adopted Backwards-compatible Dynamic Gas Cost Refactoring (#1553)\n\n* VM: report dynamic gas values in `fee` field of `step` event (#1364)\r\n* vm: codes: add dynamicGas property\r\nvm: codes: make codes more typesafe\r\n* vm: create no-op dynamic gas handlers\r\n* vm: first batch of dynamic gas up to 0x3f\r\n* vm: add other opcodes to gas map\r\nvm: change step event fee type from number to BN\r\nvm: deduct dynamic gas\r\nvm: fix stack peek\r\nvm: do not add gasLimit to gas cost for CREATE\r\n* vm: move errors to gas map\r\n* vm: fix memory dynamic  gas bug\r\n* vm: fix gas bugs caused by not considering base fee\r\n* vm: fix message call gas related bugs, clone current gas left\r\n* add typedoc for peek\r\nuse underscore for unused peek params (and fix eslint config)\r\nformat some comment newlines for readability\r\nswitch from require to import for exceptions\r\n* simplify the 2929 state manager castings in runTx\r\n* add changelog entry\r\n* vm: add EIP1283 tests\r\n* vm: split non-eip2929 and eip2929 gas costs\r\n* vm: fix gas costs\r\n* vm: add early-hardfork coverage\r\n* vm: clarify pre-Constantinople SSTORE gas\r\nvm: clarify EIP-150 comment\r\n* run coverage for all state and blockchain tests, remove redundant istanbul run\r\n* vm: fix CALLCODE gas\r\nvm: explicitly clone gasLimit for maxCallGas\r\n* vm: remove TODO in interpreter\r\n* update defaultCost to BN, cast 2929 statemanager to simplify use syntax\r\n* use underscore for unused variables, simplify types since they can be inferred\r\n* vm: fix browser tests + fix rebase\r\n* VM: moved dynamic fee to dedicated dynamicFee field in step event and retained fee behavior and type for backwards compatibility\r\n* VM: aligned InterpreterStep and step event object property documentation, completed missing step event properties\r\n* VM: test fix\r\n* vm: fix hardhat e2e tests\r\n* vm: fix MSTORE opcodes\r\n* vm: added dynamicGas property to push0 (EIP-3855) opcode\r\n* hardhat e2e: add temporary workaround for skipping tests with inconsistent memory field\r\n* nit style: use underscore instead of comment out unused variable\r\nCo-authored-by: Jochem Brouwer <jochembrouwer96@gmail.com>\r\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>",
          "timestamp": "2022-01-12T12:37:04-08:00",
          "tree_id": "ca4f6fbea31b489e48faabea0379acfc43490e00",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/ee0004729119338c2bbd37434df8a202ad92e440"
        },
        "date": 1642020106641,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 17585,
            "range": "±5.76%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422906",
            "value": 13940,
            "range": "±10.87%",
            "unit": "ops/sec",
            "extra": "65 samples"
          },
          {
            "name": "Block 9422907",
            "value": 16981,
            "range": "±2.40%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422908",
            "value": 17262,
            "range": "±2.42%",
            "unit": "ops/sec",
            "extra": "75 samples"
          },
          {
            "name": "Block 9422910",
            "value": 17267,
            "range": "±2.44%",
            "unit": "ops/sec",
            "extra": "74 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "81c2bf08d4946a3a24c8d5c0ea505c8c74ae31ed",
          "message": "ci: bump karma-typescript version (#1631)\n\n* bump karma-typescript to new release\r\n\r\n* bump libp2p-bootstrap\r\n\r\n* update package-lock",
          "timestamp": "2022-01-13T10:38:50+01:00",
          "tree_id": "75e553d9382b37eed3a16a52d61dda18b415804b",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/81c2bf08d4946a3a24c8d5c0ea505c8c74ae31ed"
        },
        "date": 1642067055559,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 10724,
            "range": "±6.83%",
            "unit": "ops/sec",
            "extra": "71 samples"
          },
          {
            "name": "Block 9422906",
            "value": 11725,
            "range": "±2.52%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "Block 9422907",
            "value": 11541,
            "range": "±2.62%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422908",
            "value": 8135,
            "range": "±12.50%",
            "unit": "ops/sec",
            "extra": "58 samples"
          },
          {
            "name": "Block 9422910",
            "value": 11002,
            "range": "±3.04%",
            "unit": "ops/sec",
            "extra": "77 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17355484+acolytec3@users.noreply.github.com",
            "name": "acolytec3",
            "username": "acolytec3"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "93c4c4ad182d4b4be54b6346aab70f615fb21bb8",
          "message": "VM: Jump dest analysis enhancements (#1629)\n\n* Change valid jumps to single array\r\n* Switch array to Uint8Array\r\n* use correct opt code\r\n* Check for jumpsub\r\n* Address feedback\r\n* Address fixes\r\n* More efficiency\r\n* Adjust if/else logic for efficiency\r\n* Move comments\r\nCo-authored-by: Holger Drewes <Holger.Drewes@gmail.com>\r\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>",
          "timestamp": "2022-01-13T13:34:03-08:00",
          "tree_id": "ad3f72a3cc8eb16cd84041e4fabe6cf31f19ae86",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/93c4c4ad182d4b4be54b6346aab70f615fb21bb8"
        },
        "date": 1642109897767,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 18940,
            "range": "±5.42%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422906",
            "value": 16200,
            "range": "±10.14%",
            "unit": "ops/sec",
            "extra": "68 samples"
          },
          {
            "name": "Block 9422907",
            "value": 19718,
            "range": "±1.79%",
            "unit": "ops/sec",
            "extra": "82 samples"
          },
          {
            "name": "Block 9422908",
            "value": 19672,
            "range": "±2.25%",
            "unit": "ops/sec",
            "extra": "83 samples"
          },
          {
            "name": "Block 9422910",
            "value": 19439,
            "range": "±2.08%",
            "unit": "ops/sec",
            "extra": "82 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9440a834effdc82fd2f707e98691901af840d4bf",
          "message": "rlp: add to root readme (#1642)\n\n* add rlp to root readme\r\n* add carryforward for rlp flag since it is not always tested on every build unless its paths are modified",
          "timestamp": "2022-01-17T11:36:45-08:00",
          "tree_id": "4649bc7fffb229b0fa93c8abeeebaa73bafc078d",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/9440a834effdc82fd2f707e98691901af840d4bf"
        },
        "date": 1642448510583,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 10213,
            "range": "±6.69%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422906",
            "value": 10939,
            "range": "±2.71%",
            "unit": "ops/sec",
            "extra": "81 samples"
          },
          {
            "name": "Block 9422907",
            "value": 11131,
            "range": "±2.39%",
            "unit": "ops/sec",
            "extra": "83 samples"
          },
          {
            "name": "Block 9422908",
            "value": 8746,
            "range": "±10.37%",
            "unit": "ops/sec",
            "extra": "66 samples"
          },
          {
            "name": "Block 9422910",
            "value": 8901,
            "range": "±14.64%",
            "unit": "ops/sec",
            "extra": "77 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17355484+acolytec3@users.noreply.github.com",
            "name": "acolytec3",
            "username": "acolytec3"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6bb2f23047112e3a984e98e5a2ee6bb449b08d48",
          "message": "Client: Add tests to verify shutdown (#1641)\n\n* Add tests to verify client shutdown\r\n\r\n* Add libp2p test\r\n\r\n* Address feedback\r\n\r\n* most libp2p into separate file",
          "timestamp": "2022-01-18T09:59:54+01:00",
          "tree_id": "252885a906432a910769a3dbd142781f62692eee",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/6bb2f23047112e3a984e98e5a2ee6bb449b08d48"
        },
        "date": 1642496696631,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 14269,
            "range": "±7.35%",
            "unit": "ops/sec",
            "extra": "71 samples"
          },
          {
            "name": "Block 9422906",
            "value": 15998,
            "range": "±2.57%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "Block 9422907",
            "value": 10696,
            "range": "±16.34%",
            "unit": "ops/sec",
            "extra": "56 samples"
          },
          {
            "name": "Block 9422908",
            "value": 15453,
            "range": "±2.54%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422910",
            "value": 15929,
            "range": "±2.60%",
            "unit": "ops/sec",
            "extra": "79 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17355484+acolytec3@users.noreply.github.com",
            "name": "acolytec3",
            "username": "acolytec3"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "751a5d18ae4307145b5e3df881aaa40a81e8b3b4",
          "message": "VM: Add comparison testing between branchs for State Test Runner (#1634)\n\n* Add diff tester and performance\r\n\r\n* update script\r\n\r\n* Simplify script\r\n\r\n* Readme updates\r\n\r\n* move start\r\n\r\n* Update stashing logic in script",
          "timestamp": "2022-01-18T17:34:16+01:00",
          "tree_id": "bd89dc94267ad0c9b79afbd5142f3ab626231fd1",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/751a5d18ae4307145b5e3df881aaa40a81e8b3b4"
        },
        "date": 1642523896405,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 20894,
            "range": "±5.54%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422906",
            "value": 17924,
            "range": "±9.38%",
            "unit": "ops/sec",
            "extra": "68 samples"
          },
          {
            "name": "Block 9422907",
            "value": 19472,
            "range": "±12.37%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "Block 9422908",
            "value": 21277,
            "range": "±2.06%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "Block 9422910",
            "value": 21636,
            "range": "±1.40%",
            "unit": "ops/sec",
            "extra": "79 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "contact@rockwaterweb.com",
            "name": "Gabriel Rocheleau",
            "username": "gabrocheleau"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "476039af70fcafd7e68aea155c672109258fecfd",
          "message": "tx: input value testing (#1620)\n\n* tx: helper methods to generate tx values\r\n\r\n* tx: helper methods to generate tx values\r\n\r\n* chore: scaffold test and add extra to values\r\n\r\n* chore: add missing spread operator\r\n\r\n* chore: single value for each tx key\r\n\r\n* tx: add generateCombinations method and legacy + eip 1559 test cases\r\n\r\n* chore: remove console log\r\n\r\n* chore: use london hardfork for eip1559\r\n\r\n* tx: refactor generateCombinations interface and properly compare hash\r\n\r\n* tx: deterministically randomly sample 1000 elements from array for testing\r\n\r\n* chore: remove v\r\n\r\n* chore: remove todo\r\n\r\n* chore: clearer variable declarations and types\r\n\r\n* tx: fix and simplify random sampling\r\n\r\n* tx: display tx hash in testing output\r\n\r\n* tx: convert buffer to hex for output log",
          "timestamp": "2022-01-19T10:13:59+01:00",
          "tree_id": "0789028bdfc67fa7ff6084fd274ac13123ea93fe",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/476039af70fcafd7e68aea155c672109258fecfd"
        },
        "date": 1642583890851,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 18325,
            "range": "±6.33%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422906",
            "value": 19684,
            "range": "±2.13%",
            "unit": "ops/sec",
            "extra": "81 samples"
          },
          {
            "name": "Block 9422907",
            "value": 14694,
            "range": "±12.58%",
            "unit": "ops/sec",
            "extra": "66 samples"
          },
          {
            "name": "Block 9422908",
            "value": 19628,
            "range": "±1.98%",
            "unit": "ops/sec",
            "extra": "81 samples"
          },
          {
            "name": "Block 9422910",
            "value": 19223,
            "range": "±2.15%",
            "unit": "ops/sec",
            "extra": "81 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "eb5bb56013163fbad5fb59c6b9f021a3c0fd2aaa",
          "message": "ci: fix node-versions run for node <16 (#1653)\n\n* re-add updating to npm v7 for node versions <16\r\n* only upgrade npm for node v <16\r\n* fix bin/rlp js: node 12 doesn't support ES11 which added support for nullish coalescing operator (??) so we'll use ternary here\r\nalternatively we could write this file in TS and compile to e.g. dist/bin/rlp (like we do in the client bin), but maybe if the file gets more complicated, in its current state i don't think it's so neccessary\r\n* use same errorMsg format for JSON.parse, remove unneeded extra Uint8Array.from (already is uint8array)",
          "timestamp": "2022-01-19T10:37:25-08:00",
          "tree_id": "f0e49214c8ef4d7fc012c32f0fc94352faa86356",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/eb5bb56013163fbad5fb59c6b9f021a3c0fd2aaa"
        },
        "date": 1642618480162,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 20998,
            "range": "±5.93%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422906",
            "value": 18985,
            "range": "±9.05%",
            "unit": "ops/sec",
            "extra": "70 samples"
          },
          {
            "name": "Block 9422907",
            "value": 17541,
            "range": "±15.29%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422908",
            "value": 20856,
            "range": "±2.02%",
            "unit": "ops/sec",
            "extra": "75 samples"
          },
          {
            "name": "Block 9422910",
            "value": 21523,
            "range": "±1.69%",
            "unit": "ops/sec",
            "extra": "80 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "56fbb0b056a815ffc970993699605b3b74a653d6",
          "message": "rlp: v3 updates from integration (#1648)\n\n* rlp updates\r\n* util: add arrToBufArr and bufArrToArr and tests\r\n* util updates, add deprecation notice for re-exports\r\n* rlp tsconfig: include rootDir for composite option\r\n* remove util exports deprecation notices\r\n* rlp: add readme note for buffer compatibility\r\n* undo capitalization",
          "timestamp": "2022-01-24T11:26:14-08:00",
          "tree_id": "845cf099191756909c349f0e48cff81a297832c8",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/56fbb0b056a815ffc970993699605b3b74a653d6"
        },
        "date": 1643052671495,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 14954,
            "range": "±7.70%",
            "unit": "ops/sec",
            "extra": "72 samples"
          },
          {
            "name": "Block 9422906",
            "value": 16284,
            "range": "±2.74%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "Block 9422907",
            "value": 11462,
            "range": "±13.47%",
            "unit": "ops/sec",
            "extra": "56 samples"
          },
          {
            "name": "Block 9422908",
            "value": 15809,
            "range": "±2.81%",
            "unit": "ops/sec",
            "extra": "80 samples"
          },
          {
            "name": "Block 9422910",
            "value": 16079,
            "range": "±2.61%",
            "unit": "ops/sec",
            "extra": "79 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66335769+ScottyPoi@users.noreply.github.com",
            "name": "ScottyPoi",
            "username": "ScottyPoi"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5de8729e348e724bd762ae7cc5f3b72c9e093ee1",
          "message": "Devp2p, Client: Fix duplicated debug messages (#1643)\n\n* devp2p: update debug package\r\n\r\n* blockchain: update debug package\r\n\r\n* client: update debug package\r\n\r\n* vm: update debug package\r\n\r\n* devp2p/dpt fix for #1485\r\n\r\n* devp2p/eth: Fix for 485\r\n\r\n* devp2p: Fix for #1485:  add base debug\r\n\r\n* devp2p/dpt  #1485:  change to debug.extend()\r\n\r\n* devp2p:dpt:server change to degub.extend()\r\n\r\n* devp2p:eth change to debug.extend()\r\n\r\n* devp2p/les:  change to debug.extend()\r\n\r\n* devp2p:rlpx:  change to debug.extend()\r\n\r\n* rlps: change to debug.extend()\r\n\r\n* Update debug to use IP as first tag",
          "timestamp": "2022-01-25T10:26:58+01:00",
          "tree_id": "c71eb9dd1eea1fb89cfe7be87248fb5d9626bce6",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/5de8729e348e724bd762ae7cc5f3b72c9e093ee1"
        },
        "date": 1643103080861,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 20102,
            "range": "±4.87%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422906",
            "value": 17241,
            "range": "±10.92%",
            "unit": "ops/sec",
            "extra": "68 samples"
          },
          {
            "name": "Block 9422907",
            "value": 20719,
            "range": "±1.88%",
            "unit": "ops/sec",
            "extra": "79 samples"
          },
          {
            "name": "Block 9422908",
            "value": 20140,
            "range": "±2.63%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422910",
            "value": 11872,
            "range": "±14.37%",
            "unit": "ops/sec",
            "extra": "47 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "Holger.Drewes@gmail.com",
            "name": "Holger Drewes",
            "username": "holgerd77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c4cc93002f45bbed46acb07cd12d0475c1269599",
          "message": "vm, client: removed ProofStateManager interface, added optional getProof, verifyProof methods to StateManager interface (#1660)",
          "timestamp": "2022-01-25T11:06:17+01:00",
          "tree_id": "8812d4bb4d27030a0fcf2ebd01a6589f3762fd96",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/c4cc93002f45bbed46acb07cd12d0475c1269599"
        },
        "date": 1643105432193,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 19888,
            "range": "±5.00%",
            "unit": "ops/sec",
            "extra": "75 samples"
          },
          {
            "name": "Block 9422906",
            "value": 17398,
            "range": "±9.40%",
            "unit": "ops/sec",
            "extra": "66 samples"
          },
          {
            "name": "Block 9422907",
            "value": 20668,
            "range": "±1.77%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422908",
            "value": 20308,
            "range": "±2.72%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "Block 9422910",
            "value": 12293,
            "range": "±13.79%",
            "unit": "ops/sec",
            "extra": "48 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cesarbrazon10@gmail.com",
            "name": "Cesar Brazon",
            "username": "cbrzn"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4d087b47e9f0342355cbdceb6863703cbb79a6be",
          "message": "Monorepo (& Tx, VM): Examples scripts in CI (#1658)\n\n* chore(examples): examples added to ci\r\n\r\n* chore(examples-ci): remove script from VM (for now) & rename examples workflow file\r\n\r\n* chore(ci): new script formwatted with prettier & example workflow changes to run with non-test branches\r\n\r\nCo-authored-by: Holger Drewes <Holger.Drewes@gmail.com>",
          "timestamp": "2022-01-25T11:31:20+01:00",
          "tree_id": "b17cec483cd24478d63c45145943fbf2849f2080",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/4d087b47e9f0342355cbdceb6863703cbb79a6be"
        },
        "date": 1643106931969,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 20152,
            "range": "±5.96%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422906",
            "value": 17188,
            "range": "±10.37%",
            "unit": "ops/sec",
            "extra": "67 samples"
          },
          {
            "name": "Block 9422907",
            "value": 20933,
            "range": "±1.71%",
            "unit": "ops/sec",
            "extra": "80 samples"
          },
          {
            "name": "Block 9422908",
            "value": 20419,
            "range": "±2.64%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "Block 9422910",
            "value": 12051,
            "range": "±13.53%",
            "unit": "ops/sec",
            "extra": "46 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "aa7d323a1bddc5e1250c6861402c733037f32fa2",
          "message": "ci: add concurrency (#1667)\n\n* ci: add concurrency\r\n\r\n* clean up extra comment newlines (also testing that a new commit cancels in-progress runs)",
          "timestamp": "2022-01-27T13:19:26+01:00",
          "tree_id": "ccf3c6d488a77f9f7c8ba717dd9933c4a7568317",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/aa7d323a1bddc5e1250c6861402c733037f32fa2"
        },
        "date": 1643286248556,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 17327,
            "range": "±5.40%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422906",
            "value": 14521,
            "range": "±10.24%",
            "unit": "ops/sec",
            "extra": "63 samples"
          },
          {
            "name": "Block 9422907",
            "value": 17546,
            "range": "±2.63%",
            "unit": "ops/sec",
            "extra": "71 samples"
          },
          {
            "name": "Block 9422908",
            "value": 17233,
            "range": "±3.74%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422910",
            "value": 16652,
            "range": "±2.82%",
            "unit": "ops/sec",
            "extra": "72 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "Holger.Drewes@gmail.com",
            "name": "Holger Drewes",
            "username": "holgerd77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "06bdad5bc09ba0e364cb1b8b3ff902602d7a91b8",
          "message": "New Minor Releases (VM Dynamic GasCosts, EIP-2681, Sepolia, various other) (#1640)\n\n* trie: bumped version to v4.2.3, added CHANGELOG entry, updated upstream dependency versions\r\n\r\n* Util: bumped version to v7.1.4, added CHANGELOG entry, updated upstream dependency versions\r\n\r\n* Util: rebuild documentation\r\n\r\n* Common: bumped version to v2.6.1, added CHANGELOG entry, updated upstream dependency versions\r\n\r\n* Common: rebuild documentation\r\n\r\n* Monorepo: updated package-lock.json\r\n\r\n* tx: bumped version to v3.5.0, added CHANGELOG entry, updated upstream dependency versions\r\n\r\n* tx: rebuild documentation\r\n\r\n* devp2p: bumped version to v4.2.1, added CHANGELOG entry, updated upstream dependency versions\r\n\r\n* Common: small README updates\r\n\r\n* VM: bumped version to v5.7.0, added CHANGELOG entry, updated upstream dependency versions\r\n\r\n* Monorepo: updated package-lock.json\r\n\r\n* Client: bumped version to v0.3.0, added CHANGELOG entry, updated minimal Node engine version in package.json\r\n\r\n* Monorepo: updated package-lock.json\r\n\r\n* Minor Releases: Apply suggestions from code review\r\n\r\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>\r\n\r\n* monorepo: updated package-lock.json\r\n\r\n* Minor Releases: updated CHANGELOG files, updated release date\r\n\r\n* Util: rebuild documentation\r\n\r\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>",
          "timestamp": "2022-02-01T09:56:06+01:00",
          "tree_id": "524dba3ab974c3ca57211fcfcea950c0be92830b",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/06bdad5bc09ba0e364cb1b8b3ff902602d7a91b8"
        },
        "date": 1643706077146,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 16653,
            "range": "±5.44%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422906",
            "value": 15035,
            "range": "±10.09%",
            "unit": "ops/sec",
            "extra": "68 samples"
          },
          {
            "name": "Block 9422907",
            "value": 16865,
            "range": "±2.95%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422908",
            "value": 16497,
            "range": "±4.11%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422910",
            "value": 6737,
            "range": "±18.09%",
            "unit": "ops/sec",
            "extra": "57 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17355484+acolytec3@users.noreply.github.com",
            "name": "acolytec3",
            "username": "acolytec3"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b22424783fd538af0644d5e93d783871943be5e1",
          "message": "vm: skip `_runStepHook` method if no step event listener (#1676)\n\nCo-authored-by: Holger Drewes <Holger.Drewes@gmail.com>",
          "timestamp": "2022-02-01T15:00:30+01:00",
          "tree_id": "01c402171904c05532d585a919f7217ae2badfae",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/b22424783fd538af0644d5e93d783871943be5e1"
        },
        "date": 1643724324308,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 16031,
            "range": "±5.37%",
            "unit": "ops/sec",
            "extra": "75 samples"
          },
          {
            "name": "Block 9422906",
            "value": 13584,
            "range": "±11.69%",
            "unit": "ops/sec",
            "extra": "65 samples"
          },
          {
            "name": "Block 9422907",
            "value": 16561,
            "range": "±2.77%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422908",
            "value": 16634,
            "range": "±3.50%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422910",
            "value": 16244,
            "range": "±5.78%",
            "unit": "ops/sec",
            "extra": "76 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jochembrouwer96@gmail.com",
            "name": "Jochem Brouwer",
            "username": "jochem-brouwer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "64b48b06c74458c7f2bd150b3e16bb723b357221",
          "message": "vm/tests: add support for test networks with activated EIPs (#1617)\n\n* vm/tests: add support for test networks with activated EIPs\r\n\r\n* vm/tests: remove console.log\r\n\r\n* Change deprecated forCustomChain to custom\r\n\r\n* vm/tests: add extra information about activating EIPs\r\n\r\n* vm/tests: remove console.log\r\n\r\nCo-authored-by: acolytec3 <17355484+acolytec3@users.noreply.github.com>\r\nCo-authored-by: Holger Drewes <Holger.Drewes@gmail.com>",
          "timestamp": "2022-02-01T17:13:49+01:00",
          "tree_id": "cfa9bd376e03b4f30310789e1b156f9e678f3b46",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/64b48b06c74458c7f2bd150b3e16bb723b357221"
        },
        "date": 1643732321097,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 16057,
            "range": "±5.59%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422906",
            "value": 13731,
            "range": "±10.51%",
            "unit": "ops/sec",
            "extra": "65 samples"
          },
          {
            "name": "Block 9422907",
            "value": 16886,
            "range": "±2.68%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "Block 9422908",
            "value": 16630,
            "range": "±3.56%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422910",
            "value": 15700,
            "range": "±6.28%",
            "unit": "ops/sec",
            "extra": "76 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "Holger.Drewes@gmail.com",
            "name": "Holger Drewes",
            "username": "holgerd77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e83ded1e0385c4a4728a8674105eacf91bfeb8bb",
          "message": "Block -> Release: Bumped version to v3.6.1, added CHANGELOG entry, updated upstream dependency versions (#1683)",
          "timestamp": "2022-02-02T20:46:07+01:00",
          "tree_id": "72d6e8f00bb488f68aa8aa65763d669853d8b374",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/e83ded1e0385c4a4728a8674105eacf91bfeb8bb"
        },
        "date": 1643831456754,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 17171,
            "range": "±4.80%",
            "unit": "ops/sec",
            "extra": "75 samples"
          },
          {
            "name": "Block 9422906",
            "value": 15425,
            "range": "±9.87%",
            "unit": "ops/sec",
            "extra": "69 samples"
          },
          {
            "name": "Block 9422907",
            "value": 17745,
            "range": "±2.77%",
            "unit": "ops/sec",
            "extra": "80 samples"
          },
          {
            "name": "Block 9422908",
            "value": 15572,
            "range": "±8.76%",
            "unit": "ops/sec",
            "extra": "70 samples"
          },
          {
            "name": "Block 9422910",
            "value": 8290,
            "range": "±21.85%",
            "unit": "ops/sec",
            "extra": "62 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17355484+acolytec3@users.noreply.github.com",
            "name": "acolytec3",
            "username": "acolytec3"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "52aefb83451fec6731b8b826b23f7498f2877c6e",
          "message": "vm: fix keyMap iterator in blockchain test runner (#1684)\n\n* vm: fix keyMap iterator in blockchain test runner\r\n\r\n* Update packages/vm/tests/util.ts\r\n\r\n* Update packages/vm/tests/util.ts\r\n\r\n* Update packages/vm/tests/util.ts\r\n\r\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>",
          "timestamp": "2022-02-03T11:59:07+01:00",
          "tree_id": "f5d71e502c618bb21722cf73e9a3f08432ff0606",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/52aefb83451fec6731b8b826b23f7498f2877c6e"
        },
        "date": 1643886264338,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 19471,
            "range": "±5.59%",
            "unit": "ops/sec",
            "extra": "68 samples"
          },
          {
            "name": "Block 9422906",
            "value": 15430,
            "range": "±14.13%",
            "unit": "ops/sec",
            "extra": "72 samples"
          },
          {
            "name": "Block 9422907",
            "value": 19625,
            "range": "±2.54%",
            "unit": "ops/sec",
            "extra": "71 samples"
          },
          {
            "name": "Block 9422908",
            "value": 12773,
            "range": "±13.19%",
            "unit": "ops/sec",
            "extra": "47 samples"
          },
          {
            "name": "Block 9422910",
            "value": 12816,
            "range": "±25.51%",
            "unit": "ops/sec",
            "extra": "65 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cesarbrazon10@gmail.com",
            "name": "Cesar Brazon",
            "username": "cbrzn"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "be06be6be600186392d5c4e76bbe8f0916e0f3fa",
          "message": "VM: trying to simplify examples (#1670)\n\nCo-authored-by: Holger Drewes <Holger.Drewes@gmail.com>",
          "timestamp": "2022-02-03T12:44:15+01:00",
          "tree_id": "5b26d7d18ba002df5ad0beeada43162c2010ccea",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/be06be6be600186392d5c4e76bbe8f0916e0f3fa"
        },
        "date": 1643888940750,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 19288,
            "range": "±5.59%",
            "unit": "ops/sec",
            "extra": "70 samples"
          },
          {
            "name": "Block 9422906",
            "value": 16665,
            "range": "±11.48%",
            "unit": "ops/sec",
            "extra": "72 samples"
          },
          {
            "name": "Block 9422907",
            "value": 20029,
            "range": "±2.87%",
            "unit": "ops/sec",
            "extra": "73 samples"
          },
          {
            "name": "Block 9422908",
            "value": 12957,
            "range": "±12.71%",
            "unit": "ops/sec",
            "extra": "49 samples"
          },
          {
            "name": "Block 9422910",
            "value": 15301,
            "range": "±24.13%",
            "unit": "ops/sec",
            "extra": "69 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17355484+acolytec3@users.noreply.github.com",
            "name": "acolytec3",
            "username": "acolytec3"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3d9a1818f00872bd4c5eca056910eb4002c22e6e",
          "message": "vm: Check vm.DEBUG for emitting step event (#1681)\n\n* Check vm.DEBUG for emitting step event\r\n\r\n* Update packages/vm/src/evm/interpreter.ts\r\n\r\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>\r\n\r\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>\r\nCo-authored-by: Holger Drewes <Holger.Drewes@gmail.com>",
          "timestamp": "2022-02-03T15:06:04+01:00",
          "tree_id": "48e8844236392c53ee583cb7da7912c622096e7f",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/3d9a1818f00872bd4c5eca056910eb4002c22e6e"
        },
        "date": 1643897455160,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 16672,
            "range": "±6.56%",
            "unit": "ops/sec",
            "extra": "73 samples"
          },
          {
            "name": "Block 9422906",
            "value": 14120,
            "range": "±10.90%",
            "unit": "ops/sec",
            "extra": "62 samples"
          },
          {
            "name": "Block 9422907",
            "value": 17719,
            "range": "±2.50%",
            "unit": "ops/sec",
            "extra": "75 samples"
          },
          {
            "name": "Block 9422908",
            "value": 17065,
            "range": "±3.48%",
            "unit": "ops/sec",
            "extra": "72 samples"
          },
          {
            "name": "Block 9422910",
            "value": 17455,
            "range": "±3.04%",
            "unit": "ops/sec",
            "extra": "75 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4ff89e8072973a9443d8b46c2f460eec788722dd",
          "message": "vm: add guard for EIP-3607 (#1691)\n\n* add guard for EIP-3607 and tests\r\n* 3607: update minimumHardfork to chainstart, since older HFs were added (see https://github.com/ethereum/tests/blob/develop/GeneralStateTests/stEIP3607/transactionCollidingWithNonEmptyAccount_calls.json#L114)\r\n* enable EIP-3607 for blockchain tests to pass ethereum/tests\r\n* organize lines\r\n* fix comment typos\r\n* simplify stripping hex prefix from testData.lastbockhash (uses `isHexPrefixed` which should be faster than `subtr(0, 2)`)",
          "timestamp": "2022-02-04T13:40:18-08:00",
          "tree_id": "7d1a67094c2f8422132de66e6fb1d3652070f9bb",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/4ff89e8072973a9443d8b46c2f460eec788722dd"
        },
        "date": 1644011062253,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 20253,
            "range": "±6.60%",
            "unit": "ops/sec",
            "extra": "70 samples"
          },
          {
            "name": "Block 9422906",
            "value": 19555,
            "range": "±9.91%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422907",
            "value": 20367,
            "range": "±2.36%",
            "unit": "ops/sec",
            "extra": "71 samples"
          },
          {
            "name": "Block 9422908",
            "value": 10247,
            "range": "±15.29%",
            "unit": "ops/sec",
            "extra": "41 samples"
          },
          {
            "name": "Block 9422910",
            "value": 19988,
            "range": "±2.05%",
            "unit": "ops/sec",
            "extra": "76 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "68f714921094ee7c6941c9fbbf9aacaf24838706",
          "message": "patch releases: common v2.6.2, vm v5.7.1 (#1692)\n\n* update changelog, versions, package-lock\r\n* nit: flatten if statement",
          "timestamp": "2022-02-04T16:44:19-08:00",
          "tree_id": "1b16a840996847794e64f55dab5a655ae6f5cad9",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/68f714921094ee7c6941c9fbbf9aacaf24838706"
        },
        "date": 1644022188007,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 11410,
            "range": "±5.11%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422906",
            "value": 12179,
            "range": "±2.72%",
            "unit": "ops/sec",
            "extra": "82 samples"
          },
          {
            "name": "Block 9422907",
            "value": 9416,
            "range": "±10.69%",
            "unit": "ops/sec",
            "extra": "65 samples"
          },
          {
            "name": "Block 9422908",
            "value": 12096,
            "range": "±2.94%",
            "unit": "ops/sec",
            "extra": "80 samples"
          },
          {
            "name": "Block 9422910",
            "value": 12135,
            "range": "±3.12%",
            "unit": "ops/sec",
            "extra": "81 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jochembrouwer96@gmail.com",
            "name": "Jochem Brouwer",
            "username": "jochem-brouwer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0b08be2c053a6c3773a6d1a0bc5bf0f9a6eb67bd",
          "message": "vm: Fix contract REVERT bug: upon creation, REVERT return data > maxCodeSize (#1700)\n\n* vm: fix contract REVERT bug\r\n* vm: cleanup revert fix\r\n* vm/tests: address review points",
          "timestamp": "2022-02-08T11:08:14-08:00",
          "tree_id": "50ba6f59ee18907e0a022e0046e4cbc0604b4a87",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/0b08be2c053a6c3773a6d1a0bc5bf0f9a6eb67bd"
        },
        "date": 1644347560082,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 19639,
            "range": "±5.85%",
            "unit": "ops/sec",
            "extra": "75 samples"
          },
          {
            "name": "Block 9422906",
            "value": 16719,
            "range": "±10.45%",
            "unit": "ops/sec",
            "extra": "66 samples"
          },
          {
            "name": "Block 9422907",
            "value": 20139,
            "range": "±2.04%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "Block 9422908",
            "value": 19581,
            "range": "±2.99%",
            "unit": "ops/sec",
            "extra": "75 samples"
          },
          {
            "name": "Block 9422910",
            "value": 13526,
            "range": "±13.93%",
            "unit": "ops/sec",
            "extra": "53 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jochembrouwer96@gmail.com",
            "name": "Jochem Brouwer",
            "username": "jochem-brouwer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1a49ee1ed50edaef87098c015dd67444d565cdbd",
          "message": "tx/tests: add hardforks (#1702)\n\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>",
          "timestamp": "2022-02-08T14:38:11-08:00",
          "tree_id": "d053793f3a7fcb7648f9bcdf263a627e3dc11441",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/1a49ee1ed50edaef87098c015dd67444d565cdbd"
        },
        "date": 1644360704289,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 19450,
            "range": "±5.14%",
            "unit": "ops/sec",
            "extra": "73 samples"
          },
          {
            "name": "Block 9422906",
            "value": 16852,
            "range": "±9.95%",
            "unit": "ops/sec",
            "extra": "67 samples"
          },
          {
            "name": "Block 9422907",
            "value": 20498,
            "range": "±2.05%",
            "unit": "ops/sec",
            "extra": "79 samples"
          },
          {
            "name": "Block 9422908",
            "value": 20030,
            "range": "±2.46%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422910",
            "value": 11794,
            "range": "±13.34%",
            "unit": "ops/sec",
            "extra": "47 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fa06b1aca1bba7fa74b7db3a003887484beeacad",
          "message": "vm: improve `runTx` and `evm` debug logs (#1677)",
          "timestamp": "2022-02-08T15:27:47-08:00",
          "tree_id": "a5fc8f4cadb342bbfc2cb70f3048d5683d90410b",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/fa06b1aca1bba7fa74b7db3a003887484beeacad"
        },
        "date": 1644363147556,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 12150,
            "range": "±5.15%",
            "unit": "ops/sec",
            "extra": "79 samples"
          },
          {
            "name": "Block 9422906",
            "value": 11237,
            "range": "±7.57%",
            "unit": "ops/sec",
            "extra": "71 samples"
          },
          {
            "name": "Block 9422907",
            "value": 12793,
            "range": "±2.68%",
            "unit": "ops/sec",
            "extra": "79 samples"
          },
          {
            "name": "Block 9422908",
            "value": 12719,
            "range": "±3.07%",
            "unit": "ops/sec",
            "extra": "82 samples"
          },
          {
            "name": "Block 9422910",
            "value": 12748,
            "range": "±2.97%",
            "unit": "ops/sec",
            "extra": "81 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ryan@ryanio.com",
            "name": "Ryan Ghods",
            "username": "ryanio"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e4f6c11e5fcec101d3f11d072d2e16cd47c6f657",
          "message": "merge: kintsugi updates (#1565)\n\n* * Add EIP-4399: Supplant DIFFICULTY opcode with RANDOM\n* EIP-3675 changes: validate extraData does not exceed 32 bytes\n* Remove pithos files\n\n* implement updated Engine API spec\n\n* Apply suggestions from code review\n\n* add files for merge-devnet-0, small fixes to successfully sync to head\n\n* update readme, add kintsugi docker files, move log timestamp to start of log\n\n* v3 spec update: rename message field to validationError\n\n* throw proper rpc error message shape on internal error\n\n* allow ws and http on the same port\n\n* update instructions to merge-devnet-3\n\n* receiptRoot -> receiptsRoot\nfeeReceipient -> suggestedFeeReceipient\n\n* use mergeForkBlock if provided\n\n* wip: respect message ordering in forkchoiceUpdated\n\n* update instructions to latest\n\n* update docker-compose (closes #1644)\n\n* update docker-compose: use bootnode from config/el_bootnode.txt\n\n* Rename coinbase to feeRecipient as per v1.0.0-alpha.5 spec (#1659)\n\n* add preMerge hardfork to implement setting FORK_NEXT value from EIP-3675\n\n* remove mergeForkBlock logic from common (solved by preMerge hardfork)\n\n* set preMerge value to null (this is set when parsing the genesis.json file in the client)\n\n* fix getUncleCountByBlockNumber validation\n\n* update lodestar kintsugi instructions\n\n* kintsugi config update (#1682)\n\n* engine: pass feeRecipient as coinbase\n\n* vm: simplify 0x44 opcode for eip-4399\n\n* engine: temporarily comment out following message order (need to find a way to get access to the request id)\n\n* execution: only skipBlockValidation if consensus is PoA (based on comment)\n\n* client: fix tests with enabled block verification (removed hardcoded gasLimit, set timestamp based on parent block plus one)\n\n* client: add tests for new pendingBlock class\n\n* client: add two more tests to pendingBlock for increased coverage\n\n* kintsugi docker: remove extra WORKDIR, move instructions up in readme\n\n* fix root Dockerfile typo (should match version 16 above)\n\n* engine: improve while condition and getting stateRoot for executing previous blocks prior to head\n\n* turn off debug logs in command for quicker exec\n\n* remove default --logFile param (to use less space)\n\n* add missing vm changelog entry\n\n* simplify exec log post merge by removing td output (since it is constant)\n\n* clean up TODOs (message ordering removed in kiln spec, so can be removed here)\n\nCo-authored-by: g11tech <76567250+g11tech@users.noreply.github.com>",
          "timestamp": "2022-02-09T09:13:20-05:00",
          "tree_id": "e858d8bf857485f2f88d81f7c283a7f189c72515",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/e4f6c11e5fcec101d3f11d072d2e16cd47c6f657"
        },
        "date": 1644416322863,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 16399,
            "range": "±5.98%",
            "unit": "ops/sec",
            "extra": "73 samples"
          },
          {
            "name": "Block 9422906",
            "value": 15048,
            "range": "±9.05%",
            "unit": "ops/sec",
            "extra": "68 samples"
          },
          {
            "name": "Block 9422907",
            "value": 16535,
            "range": "±3.27%",
            "unit": "ops/sec",
            "extra": "73 samples"
          },
          {
            "name": "Block 9422908",
            "value": 16129,
            "range": "±4.44%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422910",
            "value": 7708,
            "range": "±10.56%",
            "unit": "ops/sec",
            "extra": "35 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "76567250+g11tech@users.noreply.github.com",
            "name": "g11tech",
            "username": "g11tech"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8a316ec037be0f0e5e85e47046bb60ab737e96e3",
          "message": "client: move execution from full sync (#1663)\n\n* Move execution out from full sync to client\r\n* Move execution out of synchronizer\r\n* Update packages/client/lib/config.ts\r\nCo-authored-by: Ryan Ghods <ralxzryan@gmail.com>\r\n* PascalCase for SyncMode keys\r\n* refactoring how execution and services are bundled in client\r\n* rebasing onto the kintsugi merged master\r\n* lint cleanup\r\n* remove redundant condition for running execution\r\n* small nits\r\nCo-authored-by: Ryan Ghods <ryan@ryanio.com>",
          "timestamp": "2022-02-14T22:02:50-08:00",
          "tree_id": "218121fd2e7301e831129ed0ea6f29b430194c92",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/8a316ec037be0f0e5e85e47046bb60ab737e96e3"
        },
        "date": 1644905335486,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 9994,
            "range": "±7.03%",
            "unit": "ops/sec",
            "extra": "59 samples"
          },
          {
            "name": "Block 9422906",
            "value": 11378,
            "range": "±4.06%",
            "unit": "ops/sec",
            "extra": "69 samples"
          },
          {
            "name": "Block 9422907",
            "value": 8238,
            "range": "±12.81%",
            "unit": "ops/sec",
            "extra": "53 samples"
          },
          {
            "name": "Block 9422908",
            "value": 9975,
            "range": "±9.18%",
            "unit": "ops/sec",
            "extra": "66 samples"
          },
          {
            "name": "Block 9422910",
            "value": 10473,
            "range": "±5.12%",
            "unit": "ops/sec",
            "extra": "68 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cesarbrazon10@gmail.com",
            "name": "Cesar Brazon",
            "username": "cbrzn"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f4f34c8d668c359aa56abd984ffa69aaac4f1b08",
          "message": "Client: Geth genesis parser minor fix (#1720)",
          "timestamp": "2022-02-16T11:26:49-08:00",
          "tree_id": "c2e5b085ea21e302149af021168ccb1f81448cdb",
          "url": "https://github.com/ethereumjs/ethereumjs-monorepo/commit/f4f34c8d668c359aa56abd984ffa69aaac4f1b08"
        },
        "date": 1645039893756,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 19292,
            "range": "±9.27%",
            "unit": "ops/sec",
            "extra": "76 samples"
          },
          {
            "name": "Block 9422906",
            "value": 20717,
            "range": "±2.02%",
            "unit": "ops/sec",
            "extra": "80 samples"
          },
          {
            "name": "Block 9422907",
            "value": 16552,
            "range": "±15.45%",
            "unit": "ops/sec",
            "extra": "65 samples"
          },
          {
            "name": "Block 9422908",
            "value": 19989,
            "range": "±1.75%",
            "unit": "ops/sec",
            "extra": "74 samples"
          },
          {
            "name": "Block 9422910",
            "value": 19995,
            "range": "±2.06%",
            "unit": "ops/sec",
            "extra": "77 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "Holger.Drewes@gmail.com",
            "name": "Holger Drewes",
            "username": "holgerd77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cf2b55d33cb8d0d4e63fb6805259c00514942bd2",
          "message": "Merge pull request #2701 from ethereumjs/develop-v7-merge-master\n\nMerge develop-v7 into master (v2?) (V7 releases)",
          "timestamp": "2023-05-15T14:32:56+02:00",
          "tree_id": "00dff3ff4a7f73bd50ac723fb784f90cdcc64a21",
          "url": "https://github.com/hermeznetwork/ethereumjs-monorepo/commit/cf2b55d33cb8d0d4e63fb6805259c00514942bd2"
        },
        "date": 1684163177990,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Block 9422905",
            "value": 32826,
            "range": "±3.42%",
            "unit": "ops/sec",
            "extra": "79 samples"
          },
          {
            "name": "Block 9422906",
            "value": 32589,
            "range": "±2.20%",
            "unit": "ops/sec",
            "extra": "86 samples"
          },
          {
            "name": "Block 9422907",
            "value": 29211,
            "range": "±8.65%",
            "unit": "ops/sec",
            "extra": "79 samples"
          },
          {
            "name": "Block 9422908",
            "value": 31882,
            "range": "±2.45%",
            "unit": "ops/sec",
            "extra": "84 samples"
          },
          {
            "name": "Block 9422910",
            "value": 30895,
            "range": "±2.35%",
            "unit": "ops/sec",
            "extra": "87 samples"
          }
        ]
      }
    ]
  }
}