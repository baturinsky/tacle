(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/easystarjs/src/instance.js
  var require_instance = __commonJS({
    "node_modules/easystarjs/src/instance.js"(exports, module) {
      module.exports = function() {
        this.pointsToAvoid = {};
        this.startX;
        this.callback;
        this.startY;
        this.endX;
        this.endY;
        this.nodeHash = {};
        this.openList;
      };
    }
  });

  // node_modules/easystarjs/src/node.js
  var require_node = __commonJS({
    "node_modules/easystarjs/src/node.js"(exports, module) {
      module.exports = function(parent, x, y, costSoFar, simpleDistanceToTarget) {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.costSoFar = costSoFar;
        this.simpleDistanceToTarget = simpleDistanceToTarget;
        this.bestGuessDistance = function() {
          return this.costSoFar + this.simpleDistanceToTarget;
        };
      };
    }
  });

  // node_modules/heap/lib/heap.js
  var require_heap = __commonJS({
    "node_modules/heap/lib/heap.js"(exports, module) {
      (function() {
        var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min3, nlargest, nsmallest, updateItem, _siftdown, _siftup;
        floor = Math.floor, min3 = Math.min;
        defaultCmp = function(x, y) {
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        };
        insort = function(a, x, lo, hi, cmp) {
          var mid;
          if (lo == null) {
            lo = 0;
          }
          if (cmp == null) {
            cmp = defaultCmp;
          }
          if (lo < 0) {
            throw new Error("lo must be non-negative");
          }
          if (hi == null) {
            hi = a.length;
          }
          while (lo < hi) {
            mid = floor((lo + hi) / 2);
            if (cmp(x, a[mid]) < 0) {
              hi = mid;
            } else {
              lo = mid + 1;
            }
          }
          return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
        };
        heappush = function(array, item, cmp) {
          if (cmp == null) {
            cmp = defaultCmp;
          }
          array.push(item);
          return _siftdown(array, 0, array.length - 1, cmp);
        };
        heappop = function(array, cmp) {
          var lastelt, returnitem;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          lastelt = array.pop();
          if (array.length) {
            returnitem = array[0];
            array[0] = lastelt;
            _siftup(array, 0, cmp);
          } else {
            returnitem = lastelt;
          }
          return returnitem;
        };
        heapreplace = function(array, item, cmp) {
          var returnitem;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          returnitem = array[0];
          array[0] = item;
          _siftup(array, 0, cmp);
          return returnitem;
        };
        heappushpop = function(array, item, cmp) {
          var _ref;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          if (array.length && cmp(array[0], item) < 0) {
            _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
            _siftup(array, 0, cmp);
          }
          return item;
        };
        heapify = function(array, cmp) {
          var i, _i, _j, _len, _ref, _ref1, _results, _results1;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          _ref1 = function() {
            _results1 = [];
            for (var _j2 = 0, _ref2 = floor(array.length / 2); 0 <= _ref2 ? _j2 < _ref2 : _j2 > _ref2; 0 <= _ref2 ? _j2++ : _j2--) {
              _results1.push(_j2);
            }
            return _results1;
          }.apply(this).reverse();
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            i = _ref1[_i];
            _results.push(_siftup(array, i, cmp));
          }
          return _results;
        };
        updateItem = function(array, item, cmp) {
          var pos;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          pos = array.indexOf(item);
          if (pos === -1) {
            return;
          }
          _siftdown(array, 0, pos, cmp);
          return _siftup(array, pos, cmp);
        };
        nlargest = function(array, n, cmp) {
          var elem, result, _i, _len, _ref;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          result = array.slice(0, n);
          if (!result.length) {
            return result;
          }
          heapify(result, cmp);
          _ref = array.slice(n);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elem = _ref[_i];
            heappushpop(result, elem, cmp);
          }
          return result.sort(cmp).reverse();
        };
        nsmallest = function(array, n, cmp) {
          var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          if (n * 10 <= array.length) {
            result = array.slice(0, n).sort(cmp);
            if (!result.length) {
              return result;
            }
            los = result[result.length - 1];
            _ref = array.slice(n);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              elem = _ref[_i];
              if (cmp(elem, los) < 0) {
                insort(result, elem, 0, null, cmp);
                result.pop();
                los = result[result.length - 1];
              }
            }
            return result;
          }
          heapify(array, cmp);
          _results = [];
          for (i = _j = 0, _ref1 = min3(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
            _results.push(heappop(array, cmp));
          }
          return _results;
        };
        _siftdown = function(array, startpos, pos, cmp) {
          var newitem, parent, parentpos;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          newitem = array[pos];
          while (pos > startpos) {
            parentpos = pos - 1 >> 1;
            parent = array[parentpos];
            if (cmp(newitem, parent) < 0) {
              array[pos] = parent;
              pos = parentpos;
              continue;
            }
            break;
          }
          return array[pos] = newitem;
        };
        _siftup = function(array, pos, cmp) {
          var childpos, endpos, newitem, rightpos, startpos;
          if (cmp == null) {
            cmp = defaultCmp;
          }
          endpos = array.length;
          startpos = pos;
          newitem = array[pos];
          childpos = 2 * pos + 1;
          while (childpos < endpos) {
            rightpos = childpos + 1;
            if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
              childpos = rightpos;
            }
            array[pos] = array[childpos];
            pos = childpos;
            childpos = 2 * pos + 1;
          }
          array[pos] = newitem;
          return _siftdown(array, startpos, pos, cmp);
        };
        Heap = function() {
          Heap2.push = heappush;
          Heap2.pop = heappop;
          Heap2.replace = heapreplace;
          Heap2.pushpop = heappushpop;
          Heap2.heapify = heapify;
          Heap2.updateItem = updateItem;
          Heap2.nlargest = nlargest;
          Heap2.nsmallest = nsmallest;
          function Heap2(cmp) {
            this.cmp = cmp != null ? cmp : defaultCmp;
            this.nodes = [];
          }
          Heap2.prototype.push = function(x) {
            return heappush(this.nodes, x, this.cmp);
          };
          Heap2.prototype.pop = function() {
            return heappop(this.nodes, this.cmp);
          };
          Heap2.prototype.peek = function() {
            return this.nodes[0];
          };
          Heap2.prototype.contains = function(x) {
            return this.nodes.indexOf(x) !== -1;
          };
          Heap2.prototype.replace = function(x) {
            return heapreplace(this.nodes, x, this.cmp);
          };
          Heap2.prototype.pushpop = function(x) {
            return heappushpop(this.nodes, x, this.cmp);
          };
          Heap2.prototype.heapify = function() {
            return heapify(this.nodes, this.cmp);
          };
          Heap2.prototype.updateItem = function(x) {
            return updateItem(this.nodes, x, this.cmp);
          };
          Heap2.prototype.clear = function() {
            return this.nodes = [];
          };
          Heap2.prototype.empty = function() {
            return this.nodes.length === 0;
          };
          Heap2.prototype.size = function() {
            return this.nodes.length;
          };
          Heap2.prototype.clone = function() {
            var heap;
            heap = new Heap2();
            heap.nodes = this.nodes.slice(0);
            return heap;
          };
          Heap2.prototype.toArray = function() {
            return this.nodes.slice(0);
          };
          Heap2.prototype.insert = Heap2.prototype.push;
          Heap2.prototype.top = Heap2.prototype.peek;
          Heap2.prototype.front = Heap2.prototype.peek;
          Heap2.prototype.has = Heap2.prototype.contains;
          Heap2.prototype.copy = Heap2.prototype.clone;
          return Heap2;
        }();
        (function(root, factory) {
          if (typeof define === "function" && define.amd) {
            return define([], factory);
          } else if (typeof exports === "object") {
            return module.exports = factory();
          } else {
            return root.Heap = factory();
          }
        })(this, function() {
          return Heap;
        });
      }).call(exports);
    }
  });

  // node_modules/heap/index.js
  var require_heap2 = __commonJS({
    "node_modules/heap/index.js"(exports, module) {
      module.exports = require_heap();
    }
  });

  // node_modules/easystarjs/src/easystar.js
  var require_easystar = __commonJS({
    "node_modules/easystarjs/src/easystar.js"(exports, module) {
      var EasyStar2 = {};
      var Instance = require_instance();
      var Node = require_node();
      var Heap = require_heap2();
      var CLOSED_LIST = 0;
      var OPEN_LIST = 1;
      module.exports = EasyStar2;
      var nextInstanceId = 1;
      EasyStar2.js = function() {
        var STRAIGHT_COST = 1;
        var DIAGONAL_COST = 1.4;
        var syncEnabled = false;
        var pointsToAvoid = {};
        var collisionGrid;
        var costMap = {};
        var pointsToCost = {};
        var directionalConditions = {};
        var allowCornerCutting = true;
        var iterationsSoFar;
        var instances = {};
        var instanceQueue = [];
        var iterationsPerCalculation = Number.MAX_VALUE;
        var acceptableTiles;
        var diagonalsEnabled = false;
        this.setAcceptableTiles = function(tiles) {
          if (tiles instanceof Array) {
            acceptableTiles = tiles;
          } else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) {
            acceptableTiles = [tiles];
          }
        };
        this.enableSync = function() {
          syncEnabled = true;
        };
        this.disableSync = function() {
          syncEnabled = false;
        };
        this.enableDiagonals = function() {
          diagonalsEnabled = true;
        };
        this.disableDiagonals = function() {
          diagonalsEnabled = false;
        };
        this.setGrid = function(grid2) {
          collisionGrid = grid2;
          for (var y = 0; y < collisionGrid.length; y++) {
            for (var x = 0; x < collisionGrid[0].length; x++) {
              if (!costMap[collisionGrid[y][x]]) {
                costMap[collisionGrid[y][x]] = 1;
              }
            }
          }
        };
        this.setTileCost = function(tileType, cost) {
          costMap[tileType] = cost;
        };
        this.setAdditionalPointCost = function(x, y, cost) {
          if (pointsToCost[y] === void 0) {
            pointsToCost[y] = {};
          }
          pointsToCost[y][x] = cost;
        };
        this.removeAdditionalPointCost = function(x, y) {
          if (pointsToCost[y] !== void 0) {
            delete pointsToCost[y][x];
          }
        };
        this.removeAllAdditionalPointCosts = function() {
          pointsToCost = {};
        };
        this.setDirectionalCondition = function(x, y, allowedDirections) {
          if (directionalConditions[y] === void 0) {
            directionalConditions[y] = {};
          }
          directionalConditions[y][x] = allowedDirections;
        };
        this.removeAllDirectionalConditions = function() {
          directionalConditions = {};
        };
        this.setIterationsPerCalculation = function(iterations) {
          iterationsPerCalculation = iterations;
        };
        this.avoidAdditionalPoint = function(x, y) {
          if (pointsToAvoid[y] === void 0) {
            pointsToAvoid[y] = {};
          }
          pointsToAvoid[y][x] = 1;
        };
        this.stopAvoidingAdditionalPoint = function(x, y) {
          if (pointsToAvoid[y] !== void 0) {
            delete pointsToAvoid[y][x];
          }
        };
        this.enableCornerCutting = function() {
          allowCornerCutting = true;
        };
        this.disableCornerCutting = function() {
          allowCornerCutting = false;
        };
        this.stopAvoidingAllAdditionalPoints = function() {
          pointsToAvoid = {};
        };
        this.findPath = function(startX, startY, endX, endY, callback) {
          var callbackWrapper = function(result) {
            if (syncEnabled) {
              callback(result);
            } else {
              setTimeout(function() {
                callback(result);
              });
            }
          };
          if (acceptableTiles === void 0) {
            throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
          }
          if (collisionGrid === void 0) {
            throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
          }
          if (startX < 0 || startY < 0 || endX < 0 || endY < 0 || startX > collisionGrid[0].length - 1 || startY > collisionGrid.length - 1 || endX > collisionGrid[0].length - 1 || endY > collisionGrid.length - 1) {
            throw new Error("Your start or end point is outside the scope of your grid.");
          }
          if (startX === endX && startY === endY) {
            callbackWrapper([]);
            return;
          }
          var endTile = collisionGrid[endY][endX];
          var isAcceptable = false;
          for (var i = 0; i < acceptableTiles.length; i++) {
            if (endTile === acceptableTiles[i]) {
              isAcceptable = true;
              break;
            }
          }
          if (isAcceptable === false) {
            callbackWrapper(null);
            return;
          }
          var instance = new Instance();
          instance.openList = new Heap(function(nodeA, nodeB) {
            return nodeA.bestGuessDistance() - nodeB.bestGuessDistance();
          });
          instance.isDoneCalculating = false;
          instance.nodeHash = {};
          instance.startX = startX;
          instance.startY = startY;
          instance.endX = endX;
          instance.endY = endY;
          instance.callback = callbackWrapper;
          instance.openList.push(coordinateToNode(
            instance,
            instance.startX,
            instance.startY,
            null,
            STRAIGHT_COST
          ));
          var instanceId = nextInstanceId++;
          instances[instanceId] = instance;
          instanceQueue.push(instanceId);
          return instanceId;
        };
        this.cancelPath = function(instanceId) {
          if (instanceId in instances) {
            delete instances[instanceId];
            return true;
          }
          return false;
        };
        this.calculate = function() {
          if (instanceQueue.length === 0 || collisionGrid === void 0 || acceptableTiles === void 0) {
            return;
          }
          for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) {
            if (instanceQueue.length === 0) {
              return;
            }
            if (syncEnabled) {
              iterationsSoFar = 0;
            }
            var instanceId = instanceQueue[0];
            var instance = instances[instanceId];
            if (typeof instance == "undefined") {
              instanceQueue.shift();
              continue;
            }
            if (instance.openList.size() === 0) {
              instance.callback(null);
              delete instances[instanceId];
              instanceQueue.shift();
              continue;
            }
            var searchNode = instance.openList.pop();
            if (instance.endX === searchNode.x && instance.endY === searchNode.y) {
              var path = [];
              path.push({ x: searchNode.x, y: searchNode.y });
              var parent = searchNode.parent;
              while (parent != null) {
                path.push({ x: parent.x, y: parent.y });
                parent = parent.parent;
              }
              path.reverse();
              var ip = path;
              instance.callback(ip);
              delete instances[instanceId];
              instanceQueue.shift();
              continue;
            }
            searchNode.list = CLOSED_LIST;
            if (searchNode.y > 0) {
              checkAdjacentNode(
                instance,
                searchNode,
                0,
                -1,
                STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y - 1)
              );
            }
            if (searchNode.x < collisionGrid[0].length - 1) {
              checkAdjacentNode(
                instance,
                searchNode,
                1,
                0,
                STRAIGHT_COST * getTileCost(searchNode.x + 1, searchNode.y)
              );
            }
            if (searchNode.y < collisionGrid.length - 1) {
              checkAdjacentNode(
                instance,
                searchNode,
                0,
                1,
                STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y + 1)
              );
            }
            if (searchNode.x > 0) {
              checkAdjacentNode(
                instance,
                searchNode,
                -1,
                0,
                STRAIGHT_COST * getTileCost(searchNode.x - 1, searchNode.y)
              );
            }
            if (diagonalsEnabled) {
              if (searchNode.x > 0 && searchNode.y > 0) {
                if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y, searchNode)) {
                  checkAdjacentNode(
                    instance,
                    searchNode,
                    -1,
                    -1,
                    DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y - 1)
                  );
                }
              }
              if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y < collisionGrid.length - 1) {
                if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y, searchNode)) {
                  checkAdjacentNode(
                    instance,
                    searchNode,
                    1,
                    1,
                    DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y + 1)
                  );
                }
              }
              if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y > 0) {
                if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y, searchNode)) {
                  checkAdjacentNode(
                    instance,
                    searchNode,
                    1,
                    -1,
                    DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y - 1)
                  );
                }
              }
              if (searchNode.x > 0 && searchNode.y < collisionGrid.length - 1) {
                if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y, searchNode)) {
                  checkAdjacentNode(
                    instance,
                    searchNode,
                    -1,
                    1,
                    DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y + 1)
                  );
                }
              }
            }
          }
        };
        var checkAdjacentNode = function(instance, searchNode, x, y, cost) {
          var adjacentCoordinateX = searchNode.x + x;
          var adjacentCoordinateY = searchNode.y + y;
          if ((pointsToAvoid[adjacentCoordinateY] === void 0 || pointsToAvoid[adjacentCoordinateY][adjacentCoordinateX] === void 0) && isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY, searchNode)) {
            var node = coordinateToNode(
              instance,
              adjacentCoordinateX,
              adjacentCoordinateY,
              searchNode,
              cost
            );
            if (node.list === void 0) {
              node.list = OPEN_LIST;
              instance.openList.push(node);
            } else if (searchNode.costSoFar + cost < node.costSoFar) {
              node.costSoFar = searchNode.costSoFar + cost;
              node.parent = searchNode;
              instance.openList.updateItem(node);
            }
          }
        };
        var isTileWalkable = function(collisionGrid2, acceptableTiles2, x, y, sourceNode) {
          var directionalCondition = directionalConditions[y] && directionalConditions[y][x];
          if (directionalCondition) {
            var direction = calculateDirection(sourceNode.x - x, sourceNode.y - y);
            var directionIncluded = function() {
              for (var i2 = 0; i2 < directionalCondition.length; i2++) {
                if (directionalCondition[i2] === direction)
                  return true;
              }
              return false;
            };
            if (!directionIncluded())
              return false;
          }
          for (var i = 0; i < acceptableTiles2.length; i++) {
            if (collisionGrid2[y][x] === acceptableTiles2[i]) {
              return true;
            }
          }
          return false;
        };
        var calculateDirection = function(diffX, diffY) {
          if (diffX === 0 && diffY === -1)
            return EasyStar2.TOP;
          else if (diffX === 1 && diffY === -1)
            return EasyStar2.TOP_RIGHT;
          else if (diffX === 1 && diffY === 0)
            return EasyStar2.RIGHT;
          else if (diffX === 1 && diffY === 1)
            return EasyStar2.BOTTOM_RIGHT;
          else if (diffX === 0 && diffY === 1)
            return EasyStar2.BOTTOM;
          else if (diffX === -1 && diffY === 1)
            return EasyStar2.BOTTOM_LEFT;
          else if (diffX === -1 && diffY === 0)
            return EasyStar2.LEFT;
          else if (diffX === -1 && diffY === -1)
            return EasyStar2.TOP_LEFT;
          throw new Error("These differences are not valid: " + diffX + ", " + diffY);
        };
        var getTileCost = function(x, y) {
          return pointsToCost[y] && pointsToCost[y][x] || costMap[collisionGrid[y][x]];
        };
        var coordinateToNode = function(instance, x, y, parent, cost) {
          if (instance.nodeHash[y] !== void 0) {
            if (instance.nodeHash[y][x] !== void 0) {
              return instance.nodeHash[y][x];
            }
          } else {
            instance.nodeHash[y] = {};
          }
          var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
          if (parent !== null) {
            var costSoFar = parent.costSoFar + cost;
          } else {
            costSoFar = 0;
          }
          var node = new Node(parent, x, y, costSoFar, simpleDistanceToTarget);
          instance.nodeHash[y][x] = node;
          return node;
        };
        var getDistance = function(x1, y1, x2, y2) {
          if (diagonalsEnabled) {
            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);
            if (dx < dy) {
              return DIAGONAL_COST * dx + dy;
            } else {
              return DIAGONAL_COST * dy + dx;
            }
          } else {
            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);
            return dx + dy;
          }
        };
      };
      EasyStar2.TOP = "TOP";
      EasyStar2.TOP_RIGHT = "TOP_RIGHT";
      EasyStar2.RIGHT = "RIGHT";
      EasyStar2.BOTTOM_RIGHT = "BOTTOM_RIGHT";
      EasyStar2.BOTTOM = "BOTTOM";
      EasyStar2.BOTTOM_LEFT = "BOTTOM_LEFT";
      EasyStar2.LEFT = "LEFT";
      EasyStar2.TOP_LEFT = "TOP_LEFT";
    }
  });

  // node_modules/easystarjs/levels.ts
  var levelsString = `
##########
#        T
#   #    #
#  ###   #
# @#     #
#  #     #
#    #   #
#    #   t
##########
=
***************
t             *
*  ********   *
*  *          *
*  *    **    *
*  *  *       *
*     **  *   *
*  *  @   *   *
*  ********   *
*             *
****T********** 
`;

  // src/littlejs.esm.js
  var debug = true;
  var enableAsserts = true;
  var debugPointSize = 0.5;
  var showWatermark = true;
  var debugKey = "Escape";
  var debugOverlay = false;
  var debugPrimitives = [];
  var debugPhysics = false;
  var debugRaycast = false;
  var debugParticles = false;
  var debugGamepads = false;
  var debugTakeScreenshot;
  var downloadLink;
  function ASSERT(assert, output) {
    if (enableAsserts)
      output ? console.assert(assert, output) : console.assert(assert);
  }
  function debugRect(pos, size = vec2(), color = "#fff", time2 = 0, angle = 0, fill = false) {
    ASSERT(typeof color == "string", "pass in css color strings");
    debugPrimitives.push({ pos, size: vec2(size), color, time: new Timer(time2), angle, fill });
  }
  function debugCircle(pos, radius = 0, color = "#fff", time2 = 0, fill = false) {
    ASSERT(typeof color == "string", "pass in css color strings");
    debugPrimitives.push({ pos, size: radius, color, time: new Timer(time2), angle: 0, fill });
  }
  function debugPoint(pos, color, time2, angle) {
    ASSERT(typeof color == "string", "pass in css color strings");
    debugRect(pos, void 0, color, time2, angle);
  }
  function debugLine(posA, posB, color, thickness = 0.1, time2) {
    const halfDelta = vec2((posB.x - posA.x) / 2, (posB.y - posA.y) / 2);
    const size = vec2(thickness, halfDelta.length() * 2);
    debugRect(posA.add(halfDelta), size, color, time2, halfDelta.angle(), true);
  }
  function debugOverlap(pA, sA, pB, sB, color) {
    const minPos = vec2(min(pA.x - sA.x / 2, pB.x - sB.x / 2), min(pA.y - sA.y / 2, pB.y - sB.y / 2));
    const maxPos = vec2(max(pA.x + sA.x / 2, pB.x + sB.x / 2), max(pA.y + sA.y / 2, pB.y + sB.y / 2));
    debugRect(minPos.lerp(maxPos, 0.5), maxPos.subtract(minPos), color);
  }
  function debugText(text, pos, size = 1, color = "#fff", time2 = 0, angle = 0, font = "monospace") {
    ASSERT(typeof color == "string", "pass in css color strings");
    debugPrimitives.push({ text, pos, size, color, time: new Timer(time2), angle, font });
  }
  function debugSaveCanvas(canvas, filename = "screenshot", type = "image/png") {
    debugSaveDataURL(canvas.toDataURL(type), filename);
  }
  function debugSaveDataURL(dataURL, filename) {
    downloadLink.download = filename;
    downloadLink.href = dataURL;
    downloadLink.click();
  }
  function debugInit() {
    downloadLink = document.createElement("a");
  }
  function debugUpdate() {
    if (!debug)
      return;
    if (keyWasPressed(debugKey))
      debugOverlay = !debugOverlay;
    if (debugOverlay) {
      if (keyWasPressed("Digit0"))
        showWatermark = !showWatermark;
      if (keyWasPressed("Digit1"))
        debugPhysics = !debugPhysics, debugParticles = false;
      if (keyWasPressed("Digit2"))
        debugParticles = !debugParticles, debugPhysics = false;
      if (keyWasPressed("Digit3"))
        debugGamepads = !debugGamepads;
      if (keyWasPressed("Digit4"))
        debugRaycast = !debugRaycast;
      if (keyWasPressed("Digit5"))
        debugTakeScreenshot = 1;
    }
  }
  function debugRender() {
    glCopyToContext(mainContext);
    if (debugTakeScreenshot) {
      glCopyToContext(mainContext, true);
      mainContext.drawImage(overlayCanvas, 0, 0);
      overlayCanvas.width |= 0;
      const w = mainCanvas.width, h = mainCanvas.height;
      overlayContext.fillRect(0, 0, w, h);
      overlayContext.drawImage(mainCanvas, 0, 0);
      debugSaveCanvas(overlayCanvas);
      debugTakeScreenshot = 0;
    }
    if (debugGamepads && gamepadsEnable && navigator.getGamepads) {
      const gamepads = navigator.getGamepads();
      for (let i = gamepads.length; i--; ) {
        const gamepad = gamepads[i];
        if (gamepad) {
          const stickScale = 1;
          const buttonScale = 0.2;
          const centerPos = cameraPos;
          const sticks = gamepadStickData[i];
          for (let j = sticks.length; j--; ) {
            const drawPos = centerPos.add(vec2(j * stickScale * 2, i * stickScale * 3));
            const stickPos = drawPos.add(sticks[j].scale(stickScale));
            debugCircle(drawPos, stickScale, "#fff7", 0, true);
            debugLine(drawPos, stickPos, "#f00");
            debugPoint(stickPos, "#f00");
          }
          for (let j = gamepad.buttons.length; j--; ) {
            const drawPos = centerPos.add(vec2(j * buttonScale * 2, i * stickScale * 3 - stickScale - buttonScale));
            const pressed = gamepad.buttons[j].pressed;
            debugCircle(drawPos, buttonScale, pressed ? "#f00" : "#fff7", 0, true);
            debugText("" + j, drawPos, 0.2);
          }
        }
      }
    }
    let debugObject;
    if (debugOverlay) {
      const saveContext = mainContext;
      mainContext = overlayContext;
      const cameraSize = getCameraSize();
      debugRect(cameraPos, cameraSize.subtract(vec2(0.1)), "#f008");
      let bestDistance = Infinity;
      for (const o of engineObjects) {
        if (o.canvas || o.destroyed)
          continue;
        o.renderDebugInfo();
        if (!o.size.x || !o.size.y)
          continue;
        const distance = mousePos.distanceSquared(o.pos);
        if (distance < bestDistance) {
          bestDistance = distance;
          debugObject = o;
        }
      }
      if (tileCollisionSize.x > 0 && tileCollisionSize.y > 0)
        drawRect(mousePos.floor().add(vec2(0.5)), vec2(1), rgb(0, 0, 1, 0.5), 0, false);
      mainContext = saveContext;
    }
    {
      overlayContext.lineWidth = 2;
      const pointSize = debugPointSize * cameraScale;
      debugPrimitives.forEach((p) => {
        overlayContext.save();
        const pos = worldToScreen(p.pos);
        overlayContext.translate(pos.x | 0, pos.y | 0);
        overlayContext.rotate(p.angle);
        overlayContext.scale(1, p.text ? 1 : -1);
        overlayContext.fillStyle = overlayContext.strokeStyle = p.color;
        if (p.text != void 0) {
          overlayContext.font = p.size * cameraScale + "px " + p.font;
          overlayContext.textAlign = "center";
          overlayContext.textBaseline = "middle";
          overlayContext.fillText(p.text, 0, 0);
        } else if (p.points != void 0) {
          overlayContext.beginPath();
          for (const point of p.points) {
            const p2 = point.scale(cameraScale).floor();
            overlayContext.lineTo(p2.x, p2.y);
          }
          overlayContext.closePath();
          p.fill && overlayContext.fill();
          overlayContext.stroke();
        } else if (p.size == 0 || p.size.x === 0 && p.size.y === 0) {
          overlayContext.fillRect(-pointSize / 2, -1, pointSize, 3);
          overlayContext.fillRect(-1, -pointSize / 2, 3, pointSize);
        } else if (p.size.x != void 0) {
          const s = p.size.scale(cameraScale).floor();
          const w = s.x, h = s.y;
          p.fill && overlayContext.fillRect(-w / 2 | 0, -h / 2 | 0, w, h);
          overlayContext.strokeRect(-w / 2 | 0, -h / 2 | 0, w, h);
        } else {
          overlayContext.beginPath();
          overlayContext.arc(0, 0, p.size * cameraScale, 0, 9);
          p.fill && overlayContext.fill();
          overlayContext.stroke();
        }
        overlayContext.restore();
      });
      debugPrimitives = debugPrimitives.filter((r) => r.time < 0);
    }
    if (debugObject) {
      const saveContext = mainContext;
      mainContext = overlayContext;
      const raycastHitPos = tileCollisionRaycast(debugObject.pos, mousePos);
      raycastHitPos && drawRect(raycastHitPos.floor().add(vec2(0.5)), vec2(1), rgb(0, 1, 1, 0.3));
      drawLine(mousePos, debugObject.pos, 0.1, raycastHitPos ? rgb(1, 0, 0, 0.5) : rgb(0, 1, 0, 0.5), false);
      const debugText2 = "mouse pos = " + mousePos + "\nmouse collision = " + getTileCollisionData(mousePos) + "\n\n--- object info ---\n" + debugObject.toString();
      drawTextScreen(debugText2, mousePosScreen, 24, rgb(), 0.05, void 0, "center", "monospace");
      mainContext = saveContext;
    }
    {
      overlayContext.save();
      overlayContext.fillStyle = "#fff";
      overlayContext.textAlign = "left";
      overlayContext.textBaseline = "top";
      overlayContext.font = "28px monospace";
      overlayContext.shadowColor = "#000";
      overlayContext.shadowBlur = 9;
      let x = 9, y = -20, h = 30;
      if (debugOverlay) {
        overlayContext.fillText(engineName, x, y += h);
        overlayContext.fillText("Objects: " + engineObjects.length, x, y += h);
        overlayContext.fillText("Time: " + formatTime(time), x, y += h);
        overlayContext.fillText("---------", x, y += h);
        overlayContext.fillStyle = "#f00";
        overlayContext.fillText("ESC: Debug Overlay", x, y += h);
        overlayContext.fillStyle = debugPhysics ? "#f00" : "#fff";
        overlayContext.fillText("1: Debug Physics", x, y += h);
        overlayContext.fillStyle = debugParticles ? "#f00" : "#fff";
        overlayContext.fillText("2: Debug Particles", x, y += h);
        overlayContext.fillStyle = debugGamepads ? "#f00" : "#fff";
        overlayContext.fillText("3: Debug Gamepads", x, y += h);
        overlayContext.fillStyle = debugRaycast ? "#f00" : "#fff";
        overlayContext.fillText("4: Debug Raycasts", x, y += h);
        overlayContext.fillStyle = "#fff";
        overlayContext.fillText("5: Save Screenshot", x, y += h);
        let keysPressed = "";
        for (const i in inputData[0]) {
          if (keyIsDown(i, 0))
            keysPressed += i + " ";
        }
        keysPressed && overlayContext.fillText("Keys Down: " + keysPressed, x, y += h);
        let buttonsPressed = "";
        if (inputData[1])
          for (const i in inputData[1]) {
            if (keyIsDown(i, 1))
              buttonsPressed += i + " ";
          }
        buttonsPressed && overlayContext.fillText("Gamepad: " + buttonsPressed, x, y += h);
      } else {
        overlayContext.fillText(debugPhysics ? "Debug Physics" : "", x, y += h);
        overlayContext.fillText(debugParticles ? "Debug Particles" : "", x, y += h);
        overlayContext.fillText(debugRaycast ? "Debug Raycasts" : "", x, y += h);
        overlayContext.fillText(debugGamepads ? "Debug Gamepads" : "", x, y += h);
      }
      overlayContext.restore();
    }
  }
  var PI = Math.PI;
  function abs(value) {
    return Math.abs(value);
  }
  function min(valueA, valueB) {
    return Math.min(valueA, valueB);
  }
  function max(valueA, valueB) {
    return Math.max(valueA, valueB);
  }
  function sign(value) {
    return Math.sign(value);
  }
  function mod(dividend, divisor = 1) {
    return (dividend % divisor + divisor) % divisor;
  }
  function clamp(value, min3 = 0, max3 = 1) {
    return value < min3 ? min3 : value > max3 ? max3 : value;
  }
  function percent(value, valueA, valueB) {
    return (valueB -= valueA) ? clamp((value - valueA) / valueB) : 0;
  }
  function lerp(percent2, valueA, valueB) {
    return valueA + clamp(percent2) * (valueB - valueA);
  }
  function isOverlapping(posA, sizeA, posB, sizeB = vec2()) {
    return abs(posA.x - posB.x) * 2 < sizeA.x + sizeB.x && abs(posA.y - posB.y) * 2 < sizeA.y + sizeB.y;
  }
  function wave(frequency = 1, amplitude = 1, t = time) {
    return amplitude / 2 * (1 - Math.cos(t * frequency * 2 * PI));
  }
  function formatTime(t) {
    return (t / 60 | 0) + ":" + (t % 60 < 10 ? "0" : "") + (t % 60 | 0);
  }
  function rand(valueA = 1, valueB = 0) {
    return valueB + Math.random() * (valueA - valueB);
  }
  function randVector(length = 1) {
    return new Vector2().setAngle(rand(2 * PI), length);
  }
  function vec2(x = 0, y) {
    return typeof x == "number" ? new Vector2(x, y == void 0 ? x : y) : new Vector2(x.x, x.y);
  }
  function isVector2(v) {
    return v instanceof Vector2;
  }
  var Vector2 = class {
    /** Create a 2D vector with the x and y passed in, can also be created with vec2()
     *  @param {Number} [x] - X axis location
     *  @param {Number} [y] - Y axis location */
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
      ASSERT(this.isValid());
    }
    /** Sets values of this vector and returns self
     *  @param {Number} [x] - X axis location
     *  @param {Number} [y] - Y axis location
     *  @return {Vector2} */
    set(x = 0, y = 0) {
      this.x = x;
      this.y = y;
      ASSERT(this.isValid());
      return this;
    }
    /** Returns a new vector that is a copy of this
     *  @return {Vector2} */
    copy() {
      return new Vector2(this.x, this.y);
    }
    /** Returns a copy of this vector plus the vector passed in
     *  @param {Vector2} v - other vector
     *  @return {Vector2} */
    add(v) {
      ASSERT(isVector2(v));
      return new Vector2(this.x + v.x, this.y + v.y);
    }
    /** Returns a copy of this vector minus the vector passed in
     *  @param {Vector2} v - other vector
     *  @return {Vector2} */
    subtract(v) {
      ASSERT(isVector2(v));
      return new Vector2(this.x - v.x, this.y - v.y);
    }
    /** Returns a copy of this vector times the vector passed in
     *  @param {Vector2} v - other vector
     *  @return {Vector2} */
    multiply(v) {
      ASSERT(isVector2(v));
      return new Vector2(this.x * v.x, this.y * v.y);
    }
    /** Returns a copy of this vector divided by the vector passed in
     *  @param {Vector2} v - other vector
     *  @return {Vector2} */
    divide(v) {
      ASSERT(isVector2(v));
      return new Vector2(this.x / v.x, this.y / v.y);
    }
    /** Returns a copy of this vector scaled by the vector passed in
     *  @param {Number} s - scale
     *  @return {Vector2} */
    scale(s) {
      ASSERT(!isVector2(s));
      return new Vector2(this.x * s, this.y * s);
    }
    /** Returns the length of this vector
     * @return {Number} */
    length() {
      return this.lengthSquared() ** 0.5;
    }
    /** Returns the length of this vector squared
     * @return {Number} */
    lengthSquared() {
      return this.x ** 2 + this.y ** 2;
    }
    /** Returns the distance from this vector to vector passed in
     * @param {Vector2} v - other vector
     * @return {Number} */
    distance(v) {
      ASSERT(isVector2(v));
      return this.distanceSquared(v) ** 0.5;
    }
    /** Returns the distance squared from this vector to vector passed in
     * @param {Vector2} v - other vector
     * @return {Number} */
    distanceSquared(v) {
      ASSERT(isVector2(v));
      return (this.x - v.x) ** 2 + (this.y - v.y) ** 2;
    }
    /** Returns a new vector in same direction as this one with the length passed in
     * @param {Number} [length]
     * @return {Vector2} */
    normalize(length = 1) {
      const l = this.length();
      return l ? this.scale(length / l) : new Vector2(0, length);
    }
    /** Returns a new vector clamped to length passed in
     * @param {Number} [length]
     * @return {Vector2} */
    clampLength(length = 1) {
      const l = this.length();
      return l > length ? this.scale(length / l) : this;
    }
    /** Returns the dot product of this and the vector passed in
     * @param {Vector2} v - other vector
     * @return {Number} */
    dot(v) {
      ASSERT(isVector2(v));
      return this.x * v.x + this.y * v.y;
    }
    /** Returns the cross product of this and the vector passed in
     * @param {Vector2} v - other vector
     * @return {Number} */
    cross(v) {
      ASSERT(isVector2(v));
      return this.x * v.y - this.y * v.x;
    }
    /** Returns the angle of this vector, up is angle 0
     * @return {Number} */
    angle() {
      return Math.atan2(this.x, this.y);
    }
    /** Sets this vector with angle and length passed in
     * @param {Number} [angle]
     * @param {Number} [length]
     * @return {Vector2} */
    setAngle(angle = 0, length = 1) {
      this.x = length * Math.sin(angle);
      this.y = length * Math.cos(angle);
      return this;
    }
    /** Returns copy of this vector rotated by the angle passed in
     * @param {Number} angle
     * @return {Vector2} */
    rotate(angle) {
      const c = Math.cos(angle), s = Math.sin(angle);
      return new Vector2(this.x * c - this.y * s, this.x * s + this.y * c);
    }
    /** Set the integer direction of this vector, corresponding to multiples of 90 degree rotation (0-3)
     * @param {Number} [direction]
     * @param {Number} [length] */
    setDirection(direction, length = 1) {
      direction = mod(direction, 4);
      ASSERT(direction == 0 || direction == 1 || direction == 2 || direction == 3);
      return vec2(
        direction % 2 ? direction - 1 ? -length : length : 0,
        direction % 2 ? 0 : direction ? -length : length
      );
    }
    /** Returns the integer direction of this vector, corresponding to multiples of 90 degree rotation (0-3)
     * @return {Number} */
    direction() {
      return abs(this.x) > abs(this.y) ? this.x < 0 ? 3 : 1 : this.y < 0 ? 2 : 0;
    }
    /** Returns a copy of this vector that has been inverted
     * @return {Vector2} */
    invert() {
      return new Vector2(this.y, -this.x);
    }
    /** Returns a copy of this vector with each axis floored
     * @return {Vector2} */
    floor() {
      return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }
    /** Returns the area this vector covers as a rectangle
     * @return {Number} */
    area() {
      return abs(this.x * this.y);
    }
    /** Returns a new vector that is p percent between this and the vector passed in
     * @param {Vector2} v - other vector
     * @param {Number}  percent
     * @return {Vector2} */
    lerp(v, percent2) {
      ASSERT(isVector2(v));
      return this.add(v.subtract(this).scale(clamp(percent2)));
    }
    /** Returns true if this vector is within the bounds of an array size passed in
     * @param {Vector2} arraySize
     * @return {Boolean} */
    arrayCheck(arraySize) {
      ASSERT(isVector2(arraySize));
      return this.x >= 0 && this.y >= 0 && this.x < arraySize.x && this.y < arraySize.y;
    }
    /** Returns this vector expressed as a string
     * @param {Number} digits - precision to display
     * @return {String} */
    toString(digits = 3) {
      if (debug)
        return `(${(this.x < 0 ? "" : " ") + this.x.toFixed(digits)},${(this.y < 0 ? "" : " ") + this.y.toFixed(digits)} )`;
    }
    /** Checks if this is a valid vector
     * @return {Boolean} */
    isValid() {
      return typeof this.x == "number" && !isNaN(this.x) && typeof this.y == "number" && !isNaN(this.y);
    }
  };
  function rgb(r, g, b, a) {
    return new Color(r, g, b, a);
  }
  function hsl(h, s, l, a) {
    return new Color().setHSLA(h, s, l, a);
  }
  function isColor(c) {
    return c instanceof Color;
  }
  var Color = class {
    /** Create a color with the rgba components passed in, white by default
     *  @param {Number} [r] - red
     *  @param {Number} [g] - green
     *  @param {Number} [b] - blue
     *  @param {Number} [a] - alpha*/
    constructor(r = 1, g = 1, b = 1, a = 1) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      ASSERT(this.isValid());
    }
    /** Sets values of this color and returns self
     *  @param {Number} [r] - red
     *  @param {Number} [g] - green
     *  @param {Number} [b] - blue
     *  @param {Number} [a] - alpha
     *  @return {Color} */
    set(r = 1, g = 1, b = 1, a = 1) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      ASSERT(this.isValid());
      return this;
    }
    /** Returns a new color that is a copy of this
     * @return {Color} */
    copy() {
      return new Color(this.r, this.g, this.b, this.a);
    }
    /** Returns a copy of this color plus the color passed in
     * @param {Color} c - other color
     * @return {Color} */
    add(c) {
      ASSERT(isColor(c));
      return new Color(this.r + c.r, this.g + c.g, this.b + c.b, this.a + c.a);
    }
    /** Returns a copy of this color minus the color passed in
     * @param {Color} c - other color
     * @return {Color} */
    subtract(c) {
      ASSERT(isColor(c));
      return new Color(this.r - c.r, this.g - c.g, this.b - c.b, this.a - c.a);
    }
    /** Returns a copy of this color times the color passed in
     * @param {Color} c - other color
     * @return {Color} */
    multiply(c) {
      ASSERT(isColor(c));
      return new Color(this.r * c.r, this.g * c.g, this.b * c.b, this.a * c.a);
    }
    /** Returns a copy of this color divided by the color passed in
     * @param {Color} c - other color
     * @return {Color} */
    divide(c) {
      ASSERT(isColor(c));
      return new Color(this.r / c.r, this.g / c.g, this.b / c.b, this.a / c.a);
    }
    /** Returns a copy of this color scaled by the value passed in, alpha can be scaled separately
     * @param {Number} scale
     * @param {Number} [alphaScale=scale]
     * @return {Color} */
    scale(scale, alphaScale = scale) {
      return new Color(this.r * scale, this.g * scale, this.b * scale, this.a * alphaScale);
    }
    /** Returns a copy of this color clamped to the valid range between 0 and 1
     * @return {Color} */
    clamp() {
      return new Color(clamp(this.r), clamp(this.g), clamp(this.b), clamp(this.a));
    }
    /** Returns a new color that is p percent between this and the color passed in
     * @param {Color}  c - other color
     * @param {Number} percent
     * @return {Color} */
    lerp(c, percent2) {
      ASSERT(isColor(c));
      return this.add(c.subtract(this).scale(clamp(percent2)));
    }
    /** Sets this color given a hue, saturation, lightness, and alpha
     * @param {Number} [h] - hue
     * @param {Number} [s] - saturation
     * @param {Number} [l] - lightness
     * @param {Number} [a] - alpha
     * @return {Color} */
    setHSLA(h = 0, s = 0, l = 1, a = 1) {
      h = mod(h, 1);
      s = clamp(s);
      l = clamp(l);
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q, f = (p2, q2, t) => (t = mod(t, 1)) * 6 < 1 ? p2 + (q2 - p2) * 6 * t : t * 2 < 1 ? q2 : t * 3 < 2 ? p2 + (q2 - p2) * (4 - t * 6) : p2;
      this.r = f(p, q, h + 1 / 3);
      this.g = f(p, q, h);
      this.b = f(p, q, h - 1 / 3);
      this.a = a;
      ASSERT(this.isValid());
      return this;
    }
    /** Returns this color expressed in hsla format
     * @return {Array} */
    HSLA() {
      const r = clamp(this.r);
      const g = clamp(this.g);
      const b = clamp(this.b);
      const a = clamp(this.a);
      const max3 = Math.max(r, g, b);
      const min3 = Math.min(r, g, b);
      const l = (max3 + min3) / 2;
      let h = 0, s = 0;
      if (max3 != min3) {
        let d = max3 - min3;
        s = l > 0.5 ? d / (2 - max3 - min3) : d / (max3 + min3);
        if (r == max3)
          h = (g - b) / d + (g < b ? 6 : 0);
        else if (g == max3)
          h = (b - r) / d + 2;
        else if (b == max3)
          h = (r - g) / d + 4;
      }
      return [h / 6, s, l, a];
    }
    /** Returns a new color that has each component randomly adjusted
     * @param {Number} [amount]
     * @param {Number} [alphaAmount]
     * @return {Color} */
    mutate(amount = 0.05, alphaAmount = 0) {
      return new Color(
        this.r + rand(amount, -amount),
        this.g + rand(amount, -amount),
        this.b + rand(amount, -amount),
        this.a + rand(alphaAmount, -alphaAmount)
      ).clamp();
    }
    /** Returns this color expressed as a hex color code
     * @param {Boolean} [useAlpha] - if alpha should be included in result
     * @return {String} */
    toString(useAlpha = true) {
      const toHex = (c) => ((c = clamp(c) * 255 | 0) < 16 ? "0" : "") + c.toString(16);
      return "#" + toHex(this.r) + toHex(this.g) + toHex(this.b) + (useAlpha ? toHex(this.a) : "");
    }
    /** Set this color from a hex code
     * @param {String} hex - html hex code
     * @return {Color} */
    setHex(hex) {
      ASSERT(typeof hex == "string" && hex[0] == "#");
      ASSERT([4, 5, 7, 9].includes(hex.length), "Invalid hex");
      if (hex.length < 6) {
        const fromHex = (c) => clamp(parseInt(hex[c], 16) / 15);
        this.r = fromHex(1);
        this.g = fromHex(2), this.b = fromHex(3);
        this.a = hex.length == 5 ? fromHex(4) : 1;
      } else {
        const fromHex = (c) => clamp(parseInt(hex.slice(c, c + 2), 16) / 255);
        this.r = fromHex(1);
        this.g = fromHex(3), this.b = fromHex(5);
        this.a = hex.length == 9 ? fromHex(7) : 1;
      }
      ASSERT(this.isValid());
      return this;
    }
    /** Returns this color expressed as 32 bit RGBA value
     * @return {Number} */
    rgbaInt() {
      const r = clamp(this.r) * 255 | 0;
      const g = clamp(this.g) * 255 << 8;
      const b = clamp(this.b) * 255 << 16;
      const a = clamp(this.a) * 255 << 24;
      return r + g + b + a;
    }
    /** Checks if this is a valid color
     * @return {Boolean} */
    isValid() {
      return typeof this.r == "number" && !isNaN(this.r) && typeof this.g == "number" && !isNaN(this.g) && typeof this.b == "number" && !isNaN(this.b) && typeof this.a == "number" && !isNaN(this.a);
    }
  };
  var WHITE = rgb();
  var BLACK = rgb(0, 0, 0);
  var GRAY = rgb(0.5, 0.5, 0.5);
  var RED = rgb(1, 0, 0);
  var ORANGE = rgb(1, 0.5, 0);
  var YELLOW = rgb(1, 1, 0);
  var GREEN = rgb(0, 1, 0);
  var CYAN = rgb(0, 1, 1);
  var BLUE = rgb(0, 0, 1);
  var PURPLE = rgb(0.5, 0, 1);
  var MAGENTA = rgb(1, 0, 1);
  var Timer = class {
    /** Create a timer object set time passed in
     *  @param {Number} [timeLeft] - How much time left before the timer elapses in seconds */
    constructor(timeLeft) {
      this.time = timeLeft == void 0 ? void 0 : time + timeLeft;
      this.setTime = timeLeft;
    }
    /** Set the timer with seconds passed in
     *  @param {Number} [timeLeft] - How much time left before the timer is elapsed in seconds */
    set(timeLeft = 0) {
      this.time = time + timeLeft;
      this.setTime = timeLeft;
    }
    /** Unset the timer */
    unset() {
      this.time = void 0;
    }
    /** Returns true if set
     * @return {Boolean} */
    isSet() {
      return this.time != void 0;
    }
    /** Returns true if set and has not elapsed
     * @return {Boolean} */
    active() {
      return time < this.time;
    }
    /** Returns true if set and elapsed
     * @return {Boolean} */
    elapsed() {
      return time >= this.time;
    }
    /** Get how long since elapsed, returns 0 if not set (returns negative if currently active)
     * @return {Number} */
    get() {
      return this.isSet() ? time - this.time : 0;
    }
    /** Get percentage elapsed based on time it was set to, returns 0 if not set
     * @return {Number} */
    getPercent() {
      return this.isSet() ? percent(this.time - time, this.setTime, 0) : 0;
    }
    /** Returns this timer expressed as a string
     * @return {String} */
    toString() {
      if (debug) {
        return this.isSet() ? Math.abs(this.get()) + " seconds " + (this.get() < 0 ? "before" : "after") : "unset";
      }
    }
    /** Get how long since elapsed, returns 0 if not set (returns negative if currently active)
     * @return {Number} */
    valueOf() {
      return this.get();
    }
  };
  var cameraPos = vec2();
  var cameraScale = 32;
  var canvasMaxSize = vec2(1920, 1080);
  var canvasFixedSize = vec2();
  var canvasPixelated = true;
  var tilesPixelated = true;
  var fontDefault = "arial";
  var showSplashScreen = false;
  var headlessMode = false;
  var glEnable = true;
  var glOverlay = true;
  var tileSizeDefault = vec2(16);
  var tileFixBleedScale = 0;
  var enablePhysicsSolver = true;
  var objectDefaultMass = 1;
  var objectDefaultDamping = 1;
  var objectDefaultAngleDamping = 1;
  var objectDefaultElasticity = 0;
  var objectDefaultFriction = 0.8;
  var objectMaxSpeed = 1;
  var gravity = 0;
  var gamepadsEnable = true;
  var gamepadDirectionEmulateStick = true;
  var inputWASDEmulateDirection = true;
  var touchInputEnable = true;
  var touchGamepadEnable = false;
  var touchGamepadAnalog = true;
  var touchGamepadSize = 99;
  var touchGamepadAlpha = 0.3;
  var soundEnable = true;
  var soundVolume = 0.3;
  var soundDefaultRange = 40;
  var soundDefaultTaper = 0.7;
  var medalDisplaySize = vec2(640, 80);
  function setCameraPos(pos) {
    cameraPos = pos;
  }
  function setCameraScale(scale) {
    cameraScale = scale;
  }
  var EngineObject = class {
    /** Create an engine object and adds it to the list of objects
     *  @param {Vector2}  [pos=(0,0)]       - World space position of the object
     *  @param {Vector2}  [size=(1,1)]      - World space size of the object
     *  @param {TileInfo} [tileInfo]        - Tile info to render object (undefined is untextured)
     *  @param {Number}   [angle]           - Angle the object is rotated by
     *  @param {Color}    [color=(1,1,1,1)] - Color to apply to tile when rendered
     *  @param {Number}   [renderOrder]     - Objects sorted by renderOrder before being rendered
     */
    constructor(pos = vec2(), size = vec2(1), tileInfo, angle = 0, color = new Color(), renderOrder = 0) {
      ASSERT(isVector2(pos) && isVector2(size), "ensure pos and size are vec2s");
      ASSERT(typeof tileInfo !== "number" || !tileInfo, "old style tile setup");
      this.pos = pos.copy();
      this.size = size;
      this.drawSize = void 0;
      this.tileInfo = tileInfo;
      this.angle = angle;
      this.color = color;
      this.additiveColor = void 0;
      this.mirror = false;
      this.mass = objectDefaultMass;
      this.damping = objectDefaultDamping;
      this.angleDamping = objectDefaultAngleDamping;
      this.elasticity = objectDefaultElasticity;
      this.friction = objectDefaultFriction;
      this.gravityScale = 1;
      this.renderOrder = renderOrder;
      this.velocity = vec2();
      this.angleVelocity = 0;
      this.spawnTime = time;
      this.children = [];
      this.clampSpeedLinear = true;
      this.parent = void 0;
      this.localPos = vec2();
      this.localAngle = 0;
      this.collideTiles = false;
      this.collideSolidObjects = false;
      this.isSolid = false;
      this.collideRaycast = false;
      engineObjects.push(this);
    }
    /** Update the object transform, called automatically by engine even when paused */
    updateTransforms() {
      const parent = this.parent;
      if (parent) {
        const mirror = parent.getMirrorSign();
        this.pos = this.localPos.multiply(vec2(mirror, 1)).rotate(-parent.angle).add(parent.pos);
        this.angle = mirror * this.localAngle + parent.angle;
      }
      for (const child of this.children)
        child.updateTransforms();
    }
    /** Update the object physics, called automatically by engine once each frame */
    update() {
      if (this.parent)
        return;
      if (this.clampSpeedLinear) {
        this.velocity.x = clamp(this.velocity.x, -objectMaxSpeed, objectMaxSpeed);
        this.velocity.y = clamp(this.velocity.y, -objectMaxSpeed, objectMaxSpeed);
      } else {
        const length2 = this.velocity.lengthSquared();
        if (length2 > objectMaxSpeed * objectMaxSpeed) {
          const s = objectMaxSpeed / length2 ** 0.5;
          this.velocity.x *= s;
          this.velocity.y *= s;
        }
      }
      const oldPos = this.pos.copy();
      this.velocity.x *= this.damping;
      this.velocity.y *= this.damping;
      if (this.mass)
        this.velocity.y += gravity * this.gravityScale;
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;
      this.angle += this.angleVelocity *= this.angleDamping;
      ASSERT(this.angleDamping >= 0 && this.angleDamping <= 1);
      ASSERT(this.damping >= 0 && this.damping <= 1);
      if (!enablePhysicsSolver || !this.mass)
        return;
      const wasMovingDown = this.velocity.y < 0;
      if (this.groundObject) {
        const groundSpeed = this.groundObject.velocity ? this.groundObject.velocity.x : 0;
        this.velocity.x = groundSpeed + (this.velocity.x - groundSpeed) * this.friction;
        this.groundObject = 0;
      }
      if (this.collideSolidObjects) {
        const epsilon = 1e-3;
        for (const o of engineObjectsCollide) {
          if (!this.isSolid && !o.isSolid || o.destroyed || o.parent || o == this)
            continue;
          if (!isOverlapping(this.pos, this.size, o.pos, o.size))
            continue;
          const collide1 = this.collideWithObject(o);
          const collide2 = o.collideWithObject(this);
          if (!collide1 || !collide2)
            continue;
          if (isOverlapping(oldPos, this.size, o.pos, o.size)) {
            const deltaPos = oldPos.subtract(o.pos);
            const length = deltaPos.length();
            const pushAwayAccel = 1e-3;
            const velocity = length < 0.01 ? randVector(pushAwayAccel) : deltaPos.scale(pushAwayAccel / length);
            this.velocity = this.velocity.add(velocity);
            if (o.mass)
              o.velocity = o.velocity.subtract(velocity);
            debugOverlay && debugPhysics && debugOverlap(this.pos, this.size, o.pos, o.size, "#f00");
            continue;
          }
          const sizeBoth = this.size.add(o.size);
          const smallStepUp = (oldPos.y - o.pos.y) * 2 > sizeBoth.y + gravity;
          const isBlockedX = abs(oldPos.y - o.pos.y) * 2 < sizeBoth.y;
          const isBlockedY = abs(oldPos.x - o.pos.x) * 2 < sizeBoth.x;
          const elasticity = max(this.elasticity, o.elasticity);
          if (smallStepUp || isBlockedY || !isBlockedX) {
            this.pos.y = o.pos.y + (sizeBoth.y / 2 + epsilon) * sign(oldPos.y - o.pos.y);
            if (o.groundObject && wasMovingDown || !o.mass) {
              if (wasMovingDown)
                this.groundObject = o;
              this.velocity.y *= -elasticity;
            } else if (o.mass) {
              const inelastic = (this.mass * this.velocity.y + o.mass * o.velocity.y) / (this.mass + o.mass);
              const elastic0 = this.velocity.y * (this.mass - o.mass) / (this.mass + o.mass) + o.velocity.y * 2 * o.mass / (this.mass + o.mass);
              const elastic1 = o.velocity.y * (o.mass - this.mass) / (this.mass + o.mass) + this.velocity.y * 2 * this.mass / (this.mass + o.mass);
              this.velocity.y = lerp(elasticity, inelastic, elastic0);
              o.velocity.y = lerp(elasticity, inelastic, elastic1);
            }
          }
          if (!smallStepUp && isBlockedX) {
            this.pos.x = o.pos.x + (sizeBoth.x / 2 + epsilon) * sign(oldPos.x - o.pos.x);
            if (o.mass) {
              const inelastic = (this.mass * this.velocity.x + o.mass * o.velocity.x) / (this.mass + o.mass);
              const elastic0 = this.velocity.x * (this.mass - o.mass) / (this.mass + o.mass) + o.velocity.x * 2 * o.mass / (this.mass + o.mass);
              const elastic1 = o.velocity.x * (o.mass - this.mass) / (this.mass + o.mass) + this.velocity.x * 2 * this.mass / (this.mass + o.mass);
              this.velocity.x = lerp(elasticity, inelastic, elastic0);
              o.velocity.x = lerp(elasticity, inelastic, elastic1);
            } else
              this.velocity.x *= -elasticity;
          }
          debugOverlay && debugPhysics && debugOverlap(this.pos, this.size, o.pos, o.size, "#f0f");
        }
      }
      if (this.collideTiles) {
        if (tileCollisionTest(this.pos, this.size, this)) {
          if (!tileCollisionTest(oldPos, this.size, this)) {
            const isBlockedY = tileCollisionTest(vec2(oldPos.x, this.pos.y), this.size, this);
            const isBlockedX = tileCollisionTest(vec2(this.pos.x, oldPos.y), this.size, this);
            if (isBlockedY || !isBlockedX) {
              this.velocity.y *= -this.elasticity;
              if (this.groundObject = wasMovingDown) {
                const epsilon = 1e-4;
                this.pos.y = (oldPos.y - this.size.y / 2 | 0) + this.size.y / 2 + epsilon;
              } else {
                this.pos.y = oldPos.y;
              }
            }
            if (isBlockedX) {
              this.pos.x = oldPos.x;
              this.velocity.x *= -this.elasticity;
            }
            debugOverlay && debugPhysics && debugRect(this.pos, this.size, "#f00");
          }
        }
      }
    }
    /** Render the object, draws a tile by default, automatically called each frame, sorted by renderOrder */
    render() {
      drawTile(this.pos, this.drawSize || this.size, this.tileInfo, this.color, this.angle, this.mirror, this.additiveColor);
    }
    /** Destroy this object, destroy it's children, detach it's parent, and mark it for removal */
    destroy() {
      if (this.destroyed)
        return;
      this.destroyed = 1;
      this.parent && this.parent.removeChild(this);
      for (const child of this.children)
        child.destroy(child.parent = 0);
    }
    /** Convert from local space to world space
     *  @param {Vector2} pos - local space point */
    localToWorld(pos) {
      return this.pos.add(pos.rotate(-this.angle));
    }
    /** Convert from world space to local space
     *  @param {Vector2} pos - world space point */
    worldToLocal(pos) {
      return pos.subtract(this.pos).rotate(this.angle);
    }
    /** Convert from local space to world space for a vector (rotation only)
     *  @param {Vector2} vec - local space vector */
    localToWorldVector(vec) {
      return vec.rotate(this.angle);
    }
    /** Convert from world space to local space for a vector (rotation only)
     *  @param {Vector2} vec - world space vector */
    worldToLocalVector(vec) {
      return vec.rotate(-this.angle);
    }
    /** Called to check if a tile collision should be resolved
     *  @param {Number}  tileData - the value of the tile at the position
     *  @param {Vector2} pos      - tile where the collision occurred
     *  @return {Boolean}         - true if the collision should be resolved */
    collideWithTile(tileData, pos) {
      return tileData > 0;
    }
    /** Called to check if a object collision should be resolved
     *  @param {EngineObject} object - the object to test against
     *  @return {Boolean}            - true if the collision should be resolved
     */
    collideWithObject(object) {
      return true;
    }
    /** How long since the object was created
     *  @return {Number} */
    getAliveTime() {
      return time - this.spawnTime;
    }
    /** Apply acceleration to this object (adjust velocity, not affected by mass)
     *  @param {Vector2} acceleration */
    applyAcceleration(acceleration) {
      if (this.mass)
        this.velocity = this.velocity.add(acceleration);
    }
    /** Apply force to this object (adjust velocity, affected by mass)
     *  @param {Vector2} force */
    applyForce(force) {
      this.applyAcceleration(force.scale(1 / this.mass));
    }
    /** Get the direction of the mirror
     *  @return {Number} -1 if this.mirror is true, or 1 if not mirrored */
    getMirrorSign() {
      return this.mirror ? -1 : 1;
    }
    /** Attaches a child to this with a given local transform
     *  @param {EngineObject} child
     *  @param {Vector2}      [localPos=(0,0)]
     *  @param {Number}       [localAngle] */
    addChild(child, localPos = vec2(), localAngle = 0) {
      ASSERT(!child.parent && !this.children.includes(child));
      this.children.push(child);
      child.parent = this;
      child.localPos = localPos.copy();
      child.localAngle = localAngle;
    }
    /** Removes a child from this one
     *  @param {EngineObject} child */
    removeChild(child) {
      ASSERT(child.parent == this && this.children.includes(child));
      this.children.splice(this.children.indexOf(child), 1);
      child.parent = 0;
    }
    /** Set how this object collides
     *  @param {Boolean} [collideSolidObjects] - Does it collide with solid objects?
     *  @param {Boolean} [isSolid]             - Does it collide with and block other objects? (expensive in large numbers)
     *  @param {Boolean} [collideTiles]        - Does it collide with the tile collision?
     *  @param {Boolean} [collideRaycast]      - Does it collide with raycasts? */
    setCollision(collideSolidObjects = true, isSolid = true, collideTiles = true, collideRaycast = true) {
      ASSERT(collideSolidObjects || !isSolid, "solid objects must be set to collide");
      this.collideSolidObjects = collideSolidObjects;
      this.isSolid = isSolid;
      this.collideTiles = collideTiles;
      this.collideRaycast = collideRaycast;
    }
    /** Returns string containing info about this object for debugging
     *  @return {String} */
    toString() {
      if (debug) {
        let text = "type = " + this.constructor.name;
        if (this.pos.x || this.pos.y)
          text += "\npos = " + this.pos;
        if (this.velocity.x || this.velocity.y)
          text += "\nvelocity = " + this.velocity;
        if (this.size.x || this.size.y)
          text += "\nsize = " + this.size;
        if (this.angle)
          text += "\nangle = " + this.angle.toFixed(3);
        if (this.color)
          text += "\ncolor = " + this.color;
        return text;
      }
    }
    /** Render debug info for this object  */
    renderDebugInfo() {
      if (debug) {
        const size = vec2(max(this.size.x, 0.2), max(this.size.y, 0.2));
        const color1 = rgb(this.collideTiles ? 1 : 0, this.collideSolidObjects ? 1 : 0, this.isSolid ? 1 : 0, this.parent ? 0.2 : 0.5);
        const color2 = this.parent ? rgb(1, 1, 1, 0.5) : rgb(0, 0, 0, 0.8);
        drawRect(this.pos, size, color1, this.angle, false);
        drawRect(this.pos, size.scale(0.8), color2, this.angle, false);
        this.parent && drawLine(this.pos, this.parent.pos, 0.1, rgb(0, 0, 1, 0.5), false);
      }
    }
  };
  var mainCanvas;
  var mainContext;
  var overlayCanvas;
  var overlayContext;
  var mainCanvasSize = vec2();
  var textureInfos = [];
  var drawCount;
  function tile(pos = vec2(), size = tileSizeDefault, textureIndex = 0, padding = 0) {
    if (headlessMode)
      return new TileInfo();
    if (typeof size === "number") {
      ASSERT(size > 0);
      size = vec2(size);
    }
    const textureInfo = textureInfos[textureIndex];
    ASSERT(!!textureInfo, "Texture not loaded");
    const sizePadded = size.add(vec2(padding * 2));
    const cols = textureInfo.size.x / sizePadded.x | 0;
    if (typeof pos === "number")
      pos = vec2(pos % cols, pos / cols | 0);
    pos = vec2(pos.x * sizePadded.x + padding, pos.y * sizePadded.y + padding);
    return new TileInfo(pos, size, textureIndex, padding);
  }
  var TileInfo = class {
    /** Create a tile info object
     *  @param {Vector2} [pos=(0,0)]            - Top left corner of tile in pixels
     *  @param {Vector2} [size=tileSizeDefault] - Size of tile in pixels
     *  @param {Number}  [textureIndex]         - Texture index to use
     *  @param {Number}  [padding]              - How many pixels padding around tiles
     */
    constructor(pos = vec2(), size = tileSizeDefault, textureIndex = 0, padding = 0) {
      this.pos = pos.copy();
      this.size = size.copy();
      this.textureIndex = textureIndex;
      this.padding = padding;
    }
    /** Returns a copy of this tile offset by a vector
    *  @param {Vector2} offset - Offset to apply in pixels
    *  @return {TileInfo}
    */
    offset(offset) {
      return new TileInfo(this.pos.add(offset), this.size, this.textureIndex);
    }
    /** Returns a copy of this tile offset by a number of animation frames
    *  @param {Number} frame - Offset to apply in animation frames
    *  @return {TileInfo}
    */
    frame(frame2) {
      ASSERT(typeof frame2 == "number");
      return this.offset(vec2(frame2 * (this.size.x + this.padding * 2), 0));
    }
    /** Returns the texture info for this tile
    *  @return {TextureInfo}
    */
    getTextureInfo() {
      return textureInfos[this.textureIndex];
    }
  };
  var TextureInfo = class {
    /**
     * Create a TextureInfo, called automatically by the engine
     * @param {HTMLImageElement} image
     */
    constructor(image) {
      this.image = image;
      this.size = vec2(image.width, image.height);
      this.glTexture = glEnable && glCreateTexture(image);
    }
  };
  function screenToWorld(screenPos) {
    return new Vector2(
      (screenPos.x - mainCanvasSize.x / 2 + 0.5) / cameraScale + cameraPos.x,
      (screenPos.y - mainCanvasSize.y / 2 + 0.5) / -cameraScale + cameraPos.y
    );
  }
  function worldToScreen(worldPos) {
    return new Vector2(
      (worldPos.x - cameraPos.x) * cameraScale + mainCanvasSize.x / 2 - 0.5,
      (worldPos.y - cameraPos.y) * -cameraScale + mainCanvasSize.y / 2 - 0.5
    );
  }
  function getCameraSize() {
    return mainCanvasSize.scale(1 / cameraScale);
  }
  function drawTile(pos, size = vec2(1), tileInfo, color = new Color(), angle = 0, mirror, additiveColor = new Color(0, 0, 0, 0), useWebGL = glEnable, screenSpace, context) {
    ASSERT(!context || !useWebGL, "context only supported in canvas 2D mode");
    ASSERT(
      typeof tileInfo !== "number" || !tileInfo,
      "this is an old style calls, to fix replace it with tile(tileIndex, tileSize)"
    );
    const textureInfo = tileInfo && tileInfo.getTextureInfo();
    if (useWebGL) {
      if (screenSpace) {
        pos = screenToWorld(pos);
        size = size.scale(1 / cameraScale);
      }
      if (textureInfo) {
        const sizeInverse = vec2(1).divide(textureInfo.size);
        const x = tileInfo.pos.x * sizeInverse.x;
        const y = tileInfo.pos.y * sizeInverse.y;
        const w = tileInfo.size.x * sizeInverse.x;
        const h = tileInfo.size.y * sizeInverse.y;
        const tileImageFixBleed = sizeInverse.scale(tileFixBleedScale);
        glSetTexture(textureInfo.glTexture);
        glDraw(
          pos.x,
          pos.y,
          mirror ? -size.x : size.x,
          size.y,
          angle,
          x + tileImageFixBleed.x,
          y + tileImageFixBleed.y,
          x - tileImageFixBleed.x + w,
          y - tileImageFixBleed.y + h,
          color.rgbaInt(),
          additiveColor.rgbaInt()
        );
      } else {
        glDraw(pos.x, pos.y, size.x, size.y, angle, 0, 0, 0, 0, 0, color.rgbaInt());
      }
    } else {
      showWatermark && ++drawCount;
      size = vec2(size.x, -size.y);
      drawCanvas2D(pos, size, angle, mirror, (context2) => {
        if (textureInfo) {
          const x = tileInfo.pos.x + tileFixBleedScale;
          const y = tileInfo.pos.y + tileFixBleedScale;
          const w = tileInfo.size.x - 2 * tileFixBleedScale;
          const h = tileInfo.size.y - 2 * tileFixBleedScale;
          context2.globalAlpha = color.a;
          context2.drawImage(textureInfo.image, x, y, w, h, -0.5, -0.5, 1, 1);
          context2.globalAlpha = 1;
        } else {
          context2.fillStyle = color;
          context2.fillRect(-0.5, -0.5, 1, 1);
        }
      }, screenSpace, context);
    }
  }
  function drawRect(pos, size, color, angle, useWebGL, screenSpace, context) {
    drawTile(pos, size, void 0, color, angle, false, void 0, useWebGL, screenSpace, context);
  }
  function drawLine(posA, posB, thickness = 0.1, color, useWebGL, screenSpace, context) {
    const halfDelta = vec2((posB.x - posA.x) / 2, (posB.y - posA.y) / 2);
    const size = vec2(thickness, halfDelta.length() * 2);
    drawRect(posA.add(halfDelta), size, color, halfDelta.angle(), useWebGL, screenSpace, context);
  }
  function drawCanvas2D(pos, size, angle, mirror, drawFunction, screenSpace, context = mainContext) {
    if (!screenSpace) {
      pos = worldToScreen(pos);
      size = size.scale(cameraScale);
    }
    context.save();
    context.translate(pos.x + 0.5, pos.y + 0.5);
    context.rotate(angle);
    context.scale(mirror ? -size.x : size.x, -size.y);
    drawFunction(context);
    context.restore();
  }
  function drawTextScreen(text, pos, size = 1, color = new Color(), lineWidth = 0, lineColor = new Color(0, 0, 0), textAlign = "center", font = fontDefault, maxWidth = void 0, context = overlayContext) {
    context.fillStyle = color.toString();
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor.toString();
    context.textAlign = textAlign;
    context.font = size + "px " + font;
    context.textBaseline = "middle";
    context.lineJoin = "round";
    pos = pos.copy();
    (text + "").split("\n").forEach((line) => {
      lineWidth && context.strokeText(line, pos.x, pos.y, maxWidth);
      context.fillText(line, pos.x, pos.y, maxWidth);
      pos.y += size;
    });
  }
  function keyIsDown(key, device = 0) {
    ASSERT(device > 0 || typeof key !== "number" || key < 3, "use code string for keyboard");
    return inputData[device] && !!(inputData[device][key] & 1);
  }
  function keyWasPressed(key, device = 0) {
    ASSERT(device > 0 || typeof key !== "number" || key < 3, "use code string for keyboard");
    return inputData[device] && !!(inputData[device][key] & 2);
  }
  function clearInput() {
    inputData = [[]];
    touchGamepadButtons = [];
  }
  var mousePos = vec2();
  var mousePosScreen = vec2();
  var mouseWheel = 0;
  var isUsingGamepad = false;
  var preventDefaultInput = false;
  function gamepadIsDown(button, gamepad = 0) {
    return keyIsDown(button, gamepad + 1);
  }
  function gamepadStick(stick, gamepad = 0) {
    return gamepadStickData[gamepad] ? gamepadStickData[gamepad][stick] || vec2() : vec2();
  }
  var inputData = [[]];
  function inputUpdate() {
    if (headlessMode)
      return;
    if (!(touchInputEnable && isTouchDevice) && !document.hasFocus())
      clearInput();
    mousePos = screenToWorld(mousePosScreen);
    gamepadsUpdate();
  }
  function inputUpdatePost() {
    if (headlessMode)
      return;
    for (const deviceInputData of inputData)
      for (const i in deviceInputData)
        deviceInputData[i] &= 1;
    mouseWheel = 0;
  }
  function inputInit() {
    if (headlessMode)
      return;
    onkeydown = (e) => {
      if (!e.repeat) {
        isUsingGamepad = false;
        inputData[0][e.code] = 3;
        if (inputWASDEmulateDirection)
          inputData[0][remapKey(e.code)] = 3;
      }
      preventDefaultInput && e.preventDefault();
    };
    onkeyup = (e) => {
      inputData[0][e.code] = 4;
      if (inputWASDEmulateDirection)
        inputData[0][remapKey(e.code)] = 4;
    };
    function remapKey(c) {
      return inputWASDEmulateDirection ? c == "KeyW" ? "ArrowUp" : c == "KeyS" ? "ArrowDown" : c == "KeyA" ? "ArrowLeft" : c == "KeyD" ? "ArrowRight" : c : c;
    }
    onmousedown = (e) => {
      if (soundEnable && !headlessMode && audioContext && audioContext.state != "running")
        audioContext.resume();
      isUsingGamepad = false;
      inputData[0][e.button] = 3;
      mousePosScreen = mouseToScreen(e);
      e.button && e.preventDefault();
    };
    onmouseup = (e) => inputData[0][e.button] = inputData[0][e.button] & 2 | 4;
    onmousemove = (e) => mousePosScreen = mouseToScreen(e);
    onwheel = (e) => mouseWheel = e.ctrlKey ? 0 : sign(e.deltaY);
    oncontextmenu = (e) => false;
    onblur = (e) => clearInput();
    if (isTouchDevice && touchInputEnable)
      touchInputInit();
  }
  function mouseToScreen(mousePos3) {
    if (!mainCanvas || headlessMode)
      return vec2();
    const rect = mainCanvas.getBoundingClientRect();
    return vec2(mainCanvas.width, mainCanvas.height).multiply(
      vec2(percent(mousePos3.x, rect.left, rect.right), percent(mousePos3.y, rect.top, rect.bottom))
    );
  }
  var gamepadStickData = [];
  function gamepadsUpdate() {
    const applyDeadZones = (v) => {
      const min3 = 0.3, max3 = 0.8;
      const deadZone = (v2) => v2 > min3 ? percent(v2, min3, max3) : v2 < -min3 ? -percent(-v2, min3, max3) : 0;
      return vec2(deadZone(v.x), deadZone(-v.y)).clampLength();
    };
    if (touchGamepadEnable && isTouchDevice) {
      ASSERT(touchGamepadButtons, "set touchGamepadEnable before calling init!");
      if (touchGamepadTimer.isSet()) {
        const sticks = gamepadStickData[0] || (gamepadStickData[0] = []);
        sticks[0] = vec2();
        if (touchGamepadAnalog)
          sticks[0] = applyDeadZones(touchGamepadStick);
        else if (touchGamepadStick.lengthSquared() > 0.3) {
          sticks[0].x = Math.round(touchGamepadStick.x);
          sticks[0].y = -Math.round(touchGamepadStick.y);
          sticks[0] = sticks[0].clampLength();
        }
        const data = inputData[1] || (inputData[1] = []);
        for (let i = 10; i--; ) {
          const j = i == 3 ? 2 : i == 2 ? 3 : i;
          const wasDown = gamepadIsDown(j, 0);
          data[j] = touchGamepadButtons[i] ? wasDown ? 1 : 3 : wasDown ? 4 : 0;
        }
      }
    }
    if (!gamepadsEnable || !navigator || !navigator.getGamepads)
      return;
    if (!debug && !document.hasFocus())
      return;
    const gamepads = navigator.getGamepads();
    for (let i = gamepads.length; i--; ) {
      const gamepad = gamepads[i];
      const data = inputData[i + 1] || (inputData[i + 1] = []);
      const sticks = gamepadStickData[i] || (gamepadStickData[i] = []);
      if (gamepad) {
        for (let j = 0; j < gamepad.axes.length - 1; j += 2)
          sticks[j >> 1] = applyDeadZones(vec2(gamepad.axes[j], gamepad.axes[j + 1]));
        for (let j = gamepad.buttons.length; j--; ) {
          const button = gamepad.buttons[j];
          const wasDown = gamepadIsDown(j, i);
          data[j] = button.pressed ? wasDown ? 1 : 3 : wasDown ? 4 : 0;
          isUsingGamepad ||= !i && button.pressed;
        }
        if (gamepadDirectionEmulateStick) {
          const dpad = vec2(
            (gamepadIsDown(15, i) && 1) - (gamepadIsDown(14, i) && 1),
            (gamepadIsDown(12, i) && 1) - (gamepadIsDown(13, i) && 1)
          );
          if (dpad.lengthSquared())
            sticks[0] = dpad.clampLength();
        }
        touchGamepadEnable && isUsingGamepad && touchGamepadTimer.unset();
      }
    }
  }
  var isTouchDevice = !headlessMode && window.ontouchstart !== void 0;
  var touchGamepadTimer = new Timer();
  var touchGamepadButtons;
  var touchGamepadStick;
  function touchInputInit() {
    let handleTouch = handleTouchDefault;
    if (touchGamepadEnable) {
      handleTouch = handleTouchGamepad;
      touchGamepadButtons = [];
      touchGamepadStick = vec2();
    }
    document.addEventListener("touchstart", (e) => handleTouch(e), { passive: false });
    document.addEventListener("touchmove", (e) => handleTouch(e), { passive: false });
    document.addEventListener("touchend", (e) => handleTouch(e), { passive: false });
    onmousedown = onmouseup = () => 0;
    let wasTouching;
    function handleTouchDefault(e) {
      if (soundEnable && !headlessMode && audioContext && audioContext.state != "running")
        audioContext.resume();
      const touching = e.touches.length;
      const button = 0;
      if (touching) {
        const p = vec2(e.touches[0].clientX, e.touches[0].clientY);
        mousePosScreen = mouseToScreen(p);
        wasTouching ? isUsingGamepad = touchGamepadEnable : inputData[0][button] = 3;
      } else if (wasTouching)
        inputData[0][button] = inputData[0][button] & 2 | 4;
      wasTouching = touching;
      if (document.hasFocus())
        e.preventDefault();
      return true;
    }
    function handleTouchGamepad(e) {
      touchGamepadStick = vec2();
      touchGamepadButtons = [];
      isUsingGamepad = true;
      const touching = e.touches.length;
      if (touching) {
        touchGamepadTimer.set();
        if (paused && !wasTouching) {
          touchGamepadButtons[9] = 1;
          handleTouchDefault(e);
          return;
        }
      }
      const stickCenter = vec2(touchGamepadSize, mainCanvasSize.y - touchGamepadSize);
      const buttonCenter = mainCanvasSize.subtract(vec2(touchGamepadSize, touchGamepadSize));
      const startCenter = mainCanvasSize.scale(0.5);
      for (const touch of e.touches) {
        const touchPos = mouseToScreen(vec2(touch.clientX, touch.clientY));
        if (touchPos.distance(stickCenter) < touchGamepadSize) {
          touchGamepadStick = touchPos.subtract(stickCenter).scale(2 / touchGamepadSize).clampLength();
        } else if (touchPos.distance(buttonCenter) < touchGamepadSize) {
          const button = touchPos.subtract(buttonCenter).direction();
          touchGamepadButtons[button] = 1;
        } else if (touchPos.distance(startCenter) < touchGamepadSize && !wasTouching) {
          touchGamepadButtons[9] = 1;
        }
      }
      handleTouchDefault(e);
      return true;
    }
  }
  function touchGamepadRender() {
    if (!touchInputEnable || !isTouchDevice || headlessMode)
      return;
    if (!touchGamepadEnable || !touchGamepadTimer.isSet())
      return;
    const alpha = percent(touchGamepadTimer.get(), 4, 3);
    if (!alpha || paused)
      return;
    const context = overlayContext;
    context.save();
    context.globalAlpha = alpha * touchGamepadAlpha;
    context.strokeStyle = "#fff";
    context.lineWidth = 3;
    context.fillStyle = touchGamepadStick.lengthSquared() > 0 ? "#fff" : "#000";
    context.beginPath();
    const leftCenter = vec2(touchGamepadSize, mainCanvasSize.y - touchGamepadSize);
    if (touchGamepadAnalog) {
      context.arc(leftCenter.x, leftCenter.y, touchGamepadSize / 2, 0, 9);
      context.fill();
      context.stroke();
    } else {
      for (let i = 10; i--; ) {
        const angle = i * PI / 4;
        context.arc(leftCenter.x, leftCenter.y, touchGamepadSize * 0.6, angle + PI / 8, angle + PI / 8);
        i % 2 && context.arc(leftCenter.x, leftCenter.y, touchGamepadSize * 0.33, angle, angle);
        i == 1 && context.fill();
      }
      context.stroke();
    }
    const rightCenter = vec2(mainCanvasSize.x - touchGamepadSize, mainCanvasSize.y - touchGamepadSize);
    for (let i = 4; i--; ) {
      const pos = rightCenter.add(vec2().setDirection(i, touchGamepadSize / 2));
      context.fillStyle = touchGamepadButtons[i] ? "#fff" : "#000";
      context.beginPath();
      context.arc(pos.x, pos.y, touchGamepadSize / 4, 0, 9);
      context.fill();
      context.stroke();
    }
    context.restore();
  }
  var audioContext = new AudioContext();
  var audioGainNode;
  function audioInit() {
    if (!soundEnable || headlessMode)
      return;
    audioGainNode = audioContext.createGain();
    audioGainNode.connect(audioContext.destination);
    audioGainNode.gain.value = soundVolume;
  }
  var Sound = class {
    /** Create a sound object and cache the zzfx samples for later use
     *  @param {Array}  zzfxSound - Array of zzfx parameters, ex. [.5,.5]
     *  @param {Number} [range=soundDefaultRange] - World space max range of sound, will not play if camera is farther away
     *  @param {Number} [taper=soundDefaultTaper] - At what percentage of range should it start tapering
     */
    constructor(zzfxSound, range = soundDefaultRange, taper = soundDefaultTaper) {
      if (!soundEnable || headlessMode)
        return;
      this.range = range;
      this.taper = taper;
      this.randomness = 0;
      if (zzfxSound) {
        const defaultRandomness = 0.05;
        this.randomness = zzfxSound[1] != void 0 ? zzfxSound[1] : defaultRandomness;
        zzfxSound[1] = 0;
        this.sampleChannels = [zzfxG(...zzfxSound)];
        this.sampleRate = zzfxR;
      }
    }
    /** Play the sound
     *  @param {Vector2} [pos] - World space position to play the sound, sound is not attenuated if null
     *  @param {Number}  [volume] - How much to scale volume by (in addition to range fade)
     *  @param {Number}  [pitch] - How much to scale pitch by (also adjusted by this.randomness)
     *  @param {Number}  [randomnessScale] - How much to scale randomness
     *  @param {Boolean} [loop] - Should the sound loop
     *  @return {AudioBufferSourceNode} - The audio source node
     */
    play(pos, volume = 1, pitch = 1, randomnessScale = 1, loop = false) {
      if (!soundEnable || headlessMode)
        return;
      if (!this.sampleChannels)
        return;
      let pan;
      if (pos) {
        const range = this.range;
        if (range) {
          const lengthSquared = cameraPos.distanceSquared(pos);
          if (lengthSquared > range * range)
            return;
          volume *= percent(lengthSquared ** 0.5, range, range * this.taper);
        }
        pan = worldToScreen(pos).x * 2 / mainCanvas.width - 1;
      }
      const playbackRate = pitch + pitch * this.randomness * randomnessScale * rand(-1, 1);
      this.gainNode = audioContext.createGain();
      this.source = playSamples(this.sampleChannels, volume, playbackRate, pan, loop, this.sampleRate, this.gainNode);
      return this.source;
    }
    /** Set the sound volume of the most recently played instance of this sound
     *  @param {Number}  [volume] - How much to scale volume by
     */
    setVolume(volume = 1) {
      if (this.gainNode)
        this.gainNode.gain.value = volume;
    }
    /** Stop the last instance of this sound that was played */
    stop() {
      if (this.source)
        this.source.stop();
      this.source = void 0;
    }
    /** Get source of most recent instance of this sound that was played
     *  @return {AudioBufferSourceNode}
     */
    getSource() {
      return this.source;
    }
    /** Play the sound as a note with a semitone offset
     *  @param {Number}  semitoneOffset - How many semitones to offset pitch
     *  @param {Vector2} [pos] - World space position to play the sound, sound is not attenuated if null
     *  @param {Number}  [volume=1] - How much to scale volume by (in addition to range fade)
     *  @return {AudioBufferSourceNode} - The audio source node
     */
    playNote(semitoneOffset, pos, volume) {
      return this.play(pos, volume, 2 ** (semitoneOffset / 12), 0);
    }
    /** Get how long this sound is in seconds
     *  @return {Number} - How long the sound is in seconds (undefined if loading)
     */
    getDuration() {
      return this.sampleChannels && this.sampleChannels[0].length / this.sampleRate;
    }
    /** Check if sound is loading, for sounds fetched from a url
     *  @return {Boolean} - True if sound is loading and not ready to play
     */
    isLoading() {
      return !this.sampleChannels;
    }
  };
  function playSamples(sampleChannels, volume = 1, rate = 1, pan = 0, loop = false, sampleRate = zzfxR, gainNode) {
    if (!soundEnable || headlessMode)
      return;
    const channelCount = sampleChannels.length;
    const sampleLength = sampleChannels[0].length;
    const buffer = audioContext.createBuffer(channelCount, sampleLength, sampleRate);
    const source = audioContext.createBufferSource();
    sampleChannels.forEach((c, i) => buffer.getChannelData(i).set(c));
    source.buffer = buffer;
    source.playbackRate.value = rate;
    source.loop = loop;
    gainNode = gainNode || audioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(audioGainNode);
    const pannerNode = new StereoPannerNode(audioContext, { "pan": clamp(pan, -1, 1) });
    source.connect(pannerNode).connect(gainNode);
    if (audioContext.state != "running") {
      audioContext.resume().then(() => source.start());
    } else
      source.start();
    return source;
  }
  var zzfxR = 44100;
  function zzfxG(volume = 1, randomness = 0.05, frequency = 220, attack = 0, sustain = 0, release = 0.1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0, pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0, bitCrush = 0, delay = 0, sustainVolume = 1, decay = 0, tremolo = 0, filter = 0) {
    let PI22 = PI * 2, sampleRate = zzfxR, startSlide = slide *= 500 * PI22 / sampleRate / sampleRate, startFrequency = frequency *= rand(1 + randomness, 1 - randomness) * PI22 / sampleRate, b = [], t = 0, tm = 0, i = 0, j = 1, r = 0, c = 0, s = 0, f, length, quality = 2, w = PI22 * abs(filter) * 2 / sampleRate, cos = Math.cos(w), alpha = Math.sin(w) / 2 / quality, a0 = 1 + alpha, a1 = -2 * cos / a0, a2 = (1 - alpha) / a0, b0 = (1 + sign(filter) * cos) / 2 / a0, b1 = -(sign(filter) + cos) / a0, b2 = b0, x2 = 0, x1 = 0, y2 = 0, y1 = 0;
    attack = attack * sampleRate + 9;
    decay *= sampleRate;
    sustain *= sampleRate;
    release *= sampleRate;
    delay *= sampleRate;
    deltaSlide *= 500 * PI22 / sampleRate ** 3;
    modulation *= PI22 / sampleRate;
    pitchJump *= PI22 / sampleRate;
    pitchJumpTime *= sampleRate;
    repeatTime = repeatTime * sampleRate | 0;
    for (length = attack + decay + sustain + release + delay | 0; i < length; b[i++] = s * volume) {
      if (!(++c % (bitCrush * 100 | 0))) {
        s = shape ? shape > 1 ? shape > 2 ? shape > 3 ? (
          // wave shape
          Math.sin(t ** 3)
        ) : (
          // 4 noise
          clamp(Math.tan(t), 1, -1)
        ) : (
          // 3 tan
          1 - (2 * t / PI22 % 2 + 2) % 2
        ) : (
          // 2 saw
          1 - 4 * abs(Math.round(t / PI22) - t / PI22)
        ) : (
          // 1 triangle
          Math.sin(t)
        );
        s = (repeatTime ? 1 - tremolo + tremolo * Math.sin(PI22 * i / repeatTime) : 1) * sign(s) * abs(s) ** shapeCurve * // curve
        (i < attack ? i / attack : (
          // attack
          i < attack + decay ? (
            // decay
            1 - (i - attack) / decay * (1 - sustainVolume)
          ) : (
            // decay falloff
            i < attack + decay + sustain ? (
              // sustain
              sustainVolume
            ) : (
              // sustain volume
              i < length - delay ? (
                // release
                (length - i - delay) / release * // release falloff
                sustainVolume
              ) : (
                // release volume
                0
              )
            )
          )
        ));
        s = delay ? s / 2 + (delay > i ? 0 : (
          // delay
          (i < length - delay ? 1 : (length - i) / delay) * // release delay 
          b[i - delay | 0] / 2 / volume
        )) : s;
        if (filter)
          s = y1 = b2 * x2 + b1 * (x2 = x1) + b0 * (x1 = s) - a2 * y2 - a1 * (y2 = y1);
      }
      f = (frequency += slide += deltaSlide) * // frequency
      Math.cos(modulation * tm++);
      t += f + f * noise * Math.sin(i ** 5);
      if (j && ++j > pitchJumpTime) {
        frequency += pitchJump;
        startFrequency += pitchJump;
        j = 0;
      }
      if (repeatTime && !(++r % repeatTime)) {
        frequency = startFrequency;
        slide = startSlide;
        j = j || 1;
      }
    }
    return b;
  }
  var tileCollision = [];
  var tileCollisionSize = vec2();
  function getTileCollisionData(pos) {
    return pos.arrayCheck(tileCollisionSize) ? tileCollision[(pos.y | 0) * tileCollisionSize.x + pos.x | 0] : 0;
  }
  function tileCollisionTest(pos, size = vec2(), object) {
    const minX = max(pos.x - size.x / 2 | 0, 0);
    const minY = max(pos.y - size.y / 2 | 0, 0);
    const maxX = min(pos.x + size.x / 2, tileCollisionSize.x);
    const maxY = min(pos.y + size.y / 2, tileCollisionSize.y);
    for (let y = minY; y < maxY; ++y)
      for (let x = minX; x < maxX; ++x) {
        const tileData = tileCollision[y * tileCollisionSize.x + x];
        if (tileData && (!object || object.collideWithTile(tileData, vec2(x, y))))
          return true;
      }
    return false;
  }
  function tileCollisionRaycast(posStart, posEnd, object) {
    const delta = posEnd.subtract(posStart);
    const totalLength = delta.length();
    const normalizedDelta = delta.normalize();
    const unit = vec2(abs(1 / normalizedDelta.x), abs(1 / normalizedDelta.y));
    const flooredPosStart = posStart.floor();
    let pos = flooredPosStart;
    let xi = unit.x * (delta.x < 0 ? posStart.x - pos.x : pos.x - posStart.x + 1);
    let yi = unit.y * (delta.y < 0 ? posStart.y - pos.y : pos.y - posStart.y + 1);
    while (true) {
      const tileData = getTileCollisionData(pos);
      if (tileData && (!object || object.collideWithTile(tileData, pos))) {
        debugRaycast && debugLine(posStart, posEnd, "#f00", 0.02);
        debugRaycast && debugPoint(pos.add(vec2(0.5)), "#ff0");
        return pos.add(vec2(0.5));
      }
      if (xi > totalLength && yi > totalLength)
        break;
      if (xi > yi)
        pos.y += sign(delta.y), yi += unit.y;
      else
        pos.x += sign(delta.x), xi += unit.x;
    }
    debugRaycast && debugLine(posStart, posEnd, "#00f", 0.02);
  }
  var glCanvas;
  var glContext;
  var glAntialias = true;
  var glShader;
  var glActiveTexture;
  var glArrayBuffer;
  var glGeometryBuffer;
  var glPositionData;
  var glColorData;
  var glInstanceCount;
  var glAdditive;
  var glBatchAdditive;
  function glInit() {
    if (!glEnable || headlessMode)
      return;
    glCanvas = document.createElement("canvas");
    glContext = glCanvas.getContext("webgl2", { antialias: glAntialias });
    const rootElement = mainCanvas.parentElement;
    glOverlay && rootElement.appendChild(glCanvas);
    glShader = glCreateProgram(
      "#version 300 es\nprecision highp float;uniform mat4 m;in vec2 g;in vec4 p,u,c,a;in float r;out vec2 v;out vec4 d,e;void main(){vec2 s=(g-.5)*p.zw;gl_Position=m*vec4(p.xy+s*cos(r)-vec2(-s.y,s)*sin(r),1,1);v=mix(u.xw,u.zy,g);d=c;e=a;}",
      "#version 300 es\nprecision highp float;uniform sampler2D s;in vec2 v;in vec4 d,e;out vec4 c;void main(){c=texture(s,v)*d+e;}"
      // end of shader
    );
    const glInstanceData = new ArrayBuffer(gl_INSTANCE_BUFFER_SIZE);
    glPositionData = new Float32Array(glInstanceData);
    glColorData = new Uint32Array(glInstanceData);
    glArrayBuffer = glContext.createBuffer();
    glGeometryBuffer = glContext.createBuffer();
    const geometry = new Float32Array([glInstanceCount = 0, 0, 1, 0, 0, 1, 1, 1]);
    glContext.bindBuffer(gl_ARRAY_BUFFER, glGeometryBuffer);
    glContext.bufferData(gl_ARRAY_BUFFER, geometry, gl_STATIC_DRAW);
  }
  function glPreRender() {
    if (!glEnable || headlessMode)
      return;
    glContext.viewport(0, 0, glCanvas.width = mainCanvas.width, glCanvas.height = mainCanvas.height);
    glContext.clear(gl_COLOR_BUFFER_BIT);
    glContext.useProgram(glShader);
    glContext.activeTexture(gl_TEXTURE0);
    if (textureInfos[0])
      glContext.bindTexture(gl_TEXTURE_2D, glActiveTexture = textureInfos[0].glTexture);
    let offset = glAdditive = glBatchAdditive = 0;
    let initVertexAttribArray = (name, type, typeSize, size) => {
      const location = glContext.getAttribLocation(glShader, name);
      const stride = typeSize && gl_INSTANCE_BYTE_STRIDE;
      const divisor = typeSize && 1;
      const normalize = typeSize == 1;
      glContext.enableVertexAttribArray(location);
      glContext.vertexAttribPointer(location, size, type, normalize, stride, offset);
      glContext.vertexAttribDivisor(location, divisor);
      offset += size * typeSize;
    };
    glContext.bindBuffer(gl_ARRAY_BUFFER, glGeometryBuffer);
    initVertexAttribArray("g", gl_FLOAT, 0, 2);
    glContext.bindBuffer(gl_ARRAY_BUFFER, glArrayBuffer);
    glContext.bufferData(gl_ARRAY_BUFFER, gl_INSTANCE_BUFFER_SIZE, gl_DYNAMIC_DRAW);
    initVertexAttribArray("p", gl_FLOAT, 4, 4);
    initVertexAttribArray("u", gl_FLOAT, 4, 4);
    initVertexAttribArray("c", gl_UNSIGNED_BYTE, 1, 4);
    initVertexAttribArray("a", gl_UNSIGNED_BYTE, 1, 4);
    initVertexAttribArray("r", gl_FLOAT, 4, 1);
    const s = vec2(2 * cameraScale).divide(mainCanvasSize);
    const p = vec2(-1).subtract(cameraPos.multiply(s));
    glContext.uniformMatrix4fv(
      glContext.getUniformLocation(glShader, "m"),
      false,
      [
        s.x,
        0,
        0,
        0,
        0,
        s.y,
        0,
        0,
        1,
        1,
        1,
        1,
        p.x,
        p.y,
        0,
        0
      ]
    );
  }
  function glSetTexture(texture) {
    if (headlessMode || texture == glActiveTexture)
      return;
    glFlush();
    glContext.bindTexture(gl_TEXTURE_2D, glActiveTexture = texture);
  }
  function glCompileShader(source, type) {
    const shader = glContext.createShader(type);
    glContext.shaderSource(shader, source);
    glContext.compileShader(shader);
    if (debug && !glContext.getShaderParameter(shader, gl_COMPILE_STATUS))
      throw glContext.getShaderInfoLog(shader);
    return shader;
  }
  function glCreateProgram(vsSource, fsSource) {
    const program = glContext.createProgram();
    glContext.attachShader(program, glCompileShader(vsSource, gl_VERTEX_SHADER));
    glContext.attachShader(program, glCompileShader(fsSource, gl_FRAGMENT_SHADER));
    glContext.linkProgram(program);
    if (debug && !glContext.getProgramParameter(program, gl_LINK_STATUS))
      throw glContext.getProgramInfoLog(program);
    return program;
  }
  function glCreateTexture(image) {
    const texture = glContext.createTexture();
    glContext.bindTexture(gl_TEXTURE_2D, texture);
    if (image && image.width)
      glContext.texImage2D(gl_TEXTURE_2D, 0, gl_RGBA, gl_RGBA, gl_UNSIGNED_BYTE, image);
    else {
      const whitePixel = new Uint8Array([255, 255, 255, 255]);
      glContext.texImage2D(gl_TEXTURE_2D, 0, gl_RGBA, 1, 1, 0, gl_RGBA, gl_UNSIGNED_BYTE, whitePixel);
    }
    const filter = tilesPixelated ? gl_NEAREST : gl_LINEAR;
    glContext.texParameteri(gl_TEXTURE_2D, gl_TEXTURE_MIN_FILTER, filter);
    glContext.texParameteri(gl_TEXTURE_2D, gl_TEXTURE_MAG_FILTER, filter);
    return texture;
  }
  function glFlush() {
    if (!glInstanceCount)
      return;
    const destBlend = glBatchAdditive ? gl_ONE : gl_ONE_MINUS_SRC_ALPHA;
    glContext.blendFuncSeparate(gl_SRC_ALPHA, destBlend, gl_ONE, destBlend);
    glContext.enable(gl_BLEND);
    glContext.bufferSubData(gl_ARRAY_BUFFER, 0, glPositionData);
    glContext.drawArraysInstanced(gl_TRIANGLE_STRIP, 0, 4, glInstanceCount);
    if (showWatermark)
      drawCount += glInstanceCount;
    glInstanceCount = 0;
    glBatchAdditive = glAdditive;
  }
  function glCopyToContext(context, forceDraw = false) {
    if (!glEnable || !glInstanceCount && !forceDraw)
      return;
    glFlush();
    if (!glOverlay || forceDraw)
      context.drawImage(glCanvas, 0, 0);
  }
  function glDraw(x, y, sizeX, sizeY, angle, uv0X, uv0Y, uv1X, uv1Y, rgba, rgbaAdditive = 0) {
    ASSERT(typeof rgba == "number" && typeof rgbaAdditive == "number", "invalid color");
    if (glInstanceCount >= gl_MAX_INSTANCES || glBatchAdditive != glAdditive)
      glFlush();
    let offset = glInstanceCount * gl_INDICES_PER_INSTANCE;
    glPositionData[offset++] = x;
    glPositionData[offset++] = y;
    glPositionData[offset++] = sizeX;
    glPositionData[offset++] = sizeY;
    glPositionData[offset++] = uv0X;
    glPositionData[offset++] = uv0Y;
    glPositionData[offset++] = uv1X;
    glPositionData[offset++] = uv1Y;
    glColorData[offset++] = rgba;
    glColorData[offset++] = rgbaAdditive;
    glPositionData[offset++] = angle;
    glInstanceCount++;
  }
  var gl_ONE = 1;
  var gl_TRIANGLE_STRIP = 5;
  var gl_SRC_ALPHA = 770;
  var gl_ONE_MINUS_SRC_ALPHA = 771;
  var gl_BLEND = 3042;
  var gl_TEXTURE_2D = 3553;
  var gl_UNSIGNED_BYTE = 5121;
  var gl_FLOAT = 5126;
  var gl_RGBA = 6408;
  var gl_NEAREST = 9728;
  var gl_LINEAR = 9729;
  var gl_TEXTURE_MAG_FILTER = 10240;
  var gl_TEXTURE_MIN_FILTER = 10241;
  var gl_COLOR_BUFFER_BIT = 16384;
  var gl_TEXTURE0 = 33984;
  var gl_ARRAY_BUFFER = 34962;
  var gl_STATIC_DRAW = 35044;
  var gl_DYNAMIC_DRAW = 35048;
  var gl_FRAGMENT_SHADER = 35632;
  var gl_VERTEX_SHADER = 35633;
  var gl_COMPILE_STATUS = 35713;
  var gl_LINK_STATUS = 35714;
  var gl_INDICES_PER_INSTANCE = 11;
  var gl_MAX_INSTANCES = 1e4;
  var gl_INSTANCE_BYTE_STRIDE = gl_INDICES_PER_INSTANCE * 4;
  var gl_INSTANCE_BUFFER_SIZE = gl_MAX_INSTANCES * gl_INSTANCE_BYTE_STRIDE;
  var engineName = "LittleJS";
  var engineVersion = "1.11.3";
  var frameRate = 60;
  var timeDelta = 1 / frameRate;
  var engineObjects = [];
  var engineObjectsCollide = [];
  var frame = 0;
  var time = 0;
  var timeReal = 0;
  var paused = false;
  var frameTimeLastMS = 0;
  var frameTimeBufferMS = 0;
  var averageFPS = 0;
  var pluginUpdateList = [];
  var pluginRenderList = [];
  function engineInit(gameInit2, gameUpdate2, gameUpdatePost2, gameRender2, gameRenderPost2, imageSources = [], rootElement = document.body) {
    ASSERT(Array.isArray(imageSources), "pass in images as array");
    function enginePreRender() {
      mainCanvasSize = vec2(mainCanvas.width, mainCanvas.height);
      overlayContext.imageSmoothingEnabled = mainContext.imageSmoothingEnabled = !tilesPixelated;
      glPreRender();
    }
    function engineUpdate(frameTimeMS = 0) {
      let frameTimeDeltaMS = frameTimeMS - frameTimeLastMS;
      frameTimeLastMS = frameTimeMS;
      if (debug || showWatermark)
        averageFPS = lerp(0.05, averageFPS, 1e3 / (frameTimeDeltaMS || 1));
      const debugSpeedUp = debug && keyIsDown("Equal");
      const debugSpeedDown = debug && keyIsDown("Minus");
      if (debug)
        frameTimeDeltaMS *= debugSpeedUp ? 5 : debugSpeedDown ? 0.2 : 1;
      timeReal += frameTimeDeltaMS / 1e3;
      frameTimeBufferMS += paused ? 0 : frameTimeDeltaMS;
      if (!debugSpeedUp)
        frameTimeBufferMS = min(frameTimeBufferMS, 50);
      updateCanvas();
      if (paused) {
        for (const o of engineObjects)
          o.parent || o.updateTransforms();
        inputUpdate();
        pluginUpdateList.forEach((f) => f());
        debugUpdate();
        gameUpdatePost2();
        inputUpdatePost();
      } else {
        let deltaSmooth = 0;
        if (frameTimeBufferMS < 0 && frameTimeBufferMS > -9) {
          deltaSmooth = frameTimeBufferMS;
          frameTimeBufferMS = 0;
        }
        for (; frameTimeBufferMS >= 0; frameTimeBufferMS -= 1e3 / frameRate) {
          time = frame++ / frameRate;
          inputUpdate();
          gameUpdate2();
          pluginUpdateList.forEach((f) => f());
          engineObjectsUpdate();
          debugUpdate();
          gameUpdatePost2();
          inputUpdatePost();
        }
        frameTimeBufferMS += deltaSmooth;
      }
      if (!headlessMode) {
        enginePreRender();
        gameRender2();
        engineObjects.sort((a, b) => a.renderOrder - b.renderOrder);
        for (const o of engineObjects)
          o.destroyed || o.render();
        gameRenderPost2();
        pluginRenderList.forEach((f) => f());
        touchGamepadRender();
        debugRender();
        glCopyToContext(mainContext);
        if (showWatermark) {
          overlayContext.textAlign = "right";
          overlayContext.textBaseline = "top";
          overlayContext.font = "1em monospace";
          overlayContext.fillStyle = "#000";
          const text = engineName + " v" + engineVersion + " / " + drawCount + " / " + engineObjects.length + " / " + averageFPS.toFixed(1) + (glEnable ? " GL" : " 2D");
          overlayContext.fillText(text, mainCanvas.width - 3, 3);
          overlayContext.fillStyle = "#fff";
          overlayContext.fillText(text, mainCanvas.width - 2, 2);
          drawCount = 0;
        }
      }
      requestAnimationFrame(engineUpdate);
    }
    function updateCanvas() {
      if (headlessMode)
        return;
      if (canvasFixedSize.x) {
        mainCanvas.width = canvasFixedSize.x;
        mainCanvas.height = canvasFixedSize.y;
        const aspect = innerWidth / innerHeight;
        const fixedAspect = mainCanvas.width / mainCanvas.height;
        (glCanvas || mainCanvas).style.width = mainCanvas.style.width = overlayCanvas.style.width = aspect < fixedAspect ? "100%" : "";
        (glCanvas || mainCanvas).style.height = mainCanvas.style.height = overlayCanvas.style.height = aspect < fixedAspect ? "" : "100%";
      } else {
        mainCanvas.width = min(innerWidth, canvasMaxSize.x);
        mainCanvas.height = min(innerHeight, canvasMaxSize.y);
      }
      overlayCanvas.width = mainCanvas.width;
      overlayCanvas.height = mainCanvas.height;
      mainCanvasSize = vec2(mainCanvas.width, mainCanvas.height);
    }
    function startEngine() {
      new Promise((resolve) => resolve(gameInit2())).then(engineUpdate);
    }
    if (headlessMode) {
      startEngine();
      return;
    }
    const styleRoot = "margin:0;overflow:hidden;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:#000;" + // set background color
    (canvasPixelated ? "image-rendering:pixelated;" : "") + // pixel art
    "user-select:none;-webkit-user-select:none;" + // compatibility for ios
    (!touchInputEnable ? "" : (
      // no touch css settings
      "touch-action:none;-webkit-touch-callout:none"
    ));
    rootElement.style.cssText = styleRoot;
    rootElement.appendChild(mainCanvas = document.createElement("canvas"));
    mainContext = mainCanvas.getContext("2d");
    inputInit();
    audioInit();
    debugInit();
    glInit();
    rootElement.appendChild(overlayCanvas = document.createElement("canvas"));
    overlayContext = overlayCanvas.getContext("2d");
    const styleCanvas = "position:absolute";
    mainCanvas.style.cssText = overlayCanvas.style.cssText = styleCanvas;
    if (glCanvas)
      glCanvas.style.cssText = styleCanvas;
    updateCanvas();
    const promises = imageSources.map(
      (src, textureIndex) => new Promise((resolve) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onerror = image.onload = () => {
          textureInfos[textureIndex] = new TextureInfo(image);
          resolve();
        };
        image.src = src;
      })
    );
    if (!imageSources.length) {
      promises.push(new Promise((resolve) => {
        textureInfos[0] = new TextureInfo(new Image());
        resolve();
      }));
    }
    if (showSplashScreen) {
      promises.push(new Promise((resolve) => {
        let t = 0;
        console.log(`${engineName} Engine v${engineVersion}`);
        updateSplash();
        function updateSplash() {
          clearInput();
          drawEngineSplashScreen(t += 0.01);
          t > 1 ? resolve() : setTimeout(updateSplash, 16);
        }
      }));
    }
    Promise.all(promises).then(startEngine);
  }
  function engineObjectsUpdate() {
    engineObjectsCollide = engineObjects.filter((o) => o.collideSolidObjects);
    function updateObject(o) {
      if (!o.destroyed) {
        o.update();
        for (const child of o.children)
          updateObject(child);
      }
    }
    for (const o of engineObjects) {
      if (!o.parent) {
        updateObject(o);
        o.updateTransforms();
      }
    }
    engineObjects = engineObjects.filter((o) => !o.destroyed);
  }
  function drawEngineSplashScreen(t) {
    const x = overlayContext;
    const w = overlayCanvas.width = innerWidth;
    const h = overlayCanvas.height = innerHeight;
    {
      const p3 = percent(t, 1, 0.8);
      const p4 = percent(t, 0, 0.5);
      const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.hypot(w, h) * 0.7);
      g.addColorStop(0, hsl(0, 0, lerp(p4, 0, p3 / 2), p3).toString());
      g.addColorStop(1, hsl(0, 0, 0, p3).toString());
      x.save();
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
    }
    const rect = (X, Y, W, H, C) => {
      x.beginPath();
      x.rect(X, Y, W, C ? H * p : H);
      x.fillStyle = C;
      C ? x.fill() : x.stroke();
    };
    const line = (X, Y, Z, W) => {
      x.beginPath();
      x.lineTo(X, Y);
      x.lineTo(Z, W);
      x.stroke();
    };
    const circle = (X, Y, R, A = 0, B = 2 * PI, C, F) => {
      const D = (A + B) / 2, E = p * (B - A) / 2;
      x.beginPath();
      F && x.lineTo(X, Y);
      x.arc(X, Y, R, D - E, D + E);
      x.fillStyle = C;
      C ? x.fill() : x.stroke();
    };
    const color = (c = 0, l = 0) => hsl([0.98, 0.3, 0.57, 0.14][c % 4] - 10, 0.8, [0, 0.3, 0.5, 0.8, 0.9][l]).toString();
    const alpha = wave(1, 1, t);
    const p = percent(alpha, 0.1, 0.5);
    x.translate(w / 2, h / 2);
    const size = min(6, min(w, h) / 99);
    x.scale(size, size);
    x.translate(-40, -35);
    x.lineJoin = x.lineCap = "round";
    x.lineWidth = 0.1 + p * 1.9;
    const p2 = percent(alpha, 0.1, 1);
    x.setLineDash([99 * p2, 99]);
    rect(7, 16, 18, -8, color(2, 2));
    rect(7, 8, 18, 4, color(2, 3));
    rect(25, 8, 8, 8, color(2, 1));
    rect(25, 8, -18, 8);
    rect(25, 8, 8, 8);
    rect(25, 16, 7, 23, color());
    rect(11, 39, 14, -23, color(1, 1));
    rect(11, 16, 14, 18, color(1, 2));
    rect(11, 16, 14, 8, color(1, 3));
    rect(25, 16, -14, 24);
    rect(15, 29, 6, -9, color(2, 2));
    circle(15, 21, 5, 0, PI / 2, color(2, 4), 1);
    rect(21, 21, -6, 9);
    rect(37, 14, 9, 6, color(3, 2));
    rect(37, 14, 4.5, 6, color(3, 3));
    rect(37, 14, 9, 6);
    rect(50, 20, 10, -8, color(0, 1));
    rect(50, 20, 6.5, -8, color(0, 2));
    rect(50, 20, 3.5, -8, color(0, 3));
    rect(50, 20, 10, -8);
    circle(55, 2, 11.4, 0.5, PI - 0.5, color(3, 3));
    circle(55, 2, 11.4, 0.5, PI / 2, color(3, 2), 1);
    circle(55, 2, 11.4, 0.5, PI - 0.5);
    rect(45, 7, 20, -7, color(0, 2));
    rect(45, -1, 20, 4, color(0, 3));
    rect(45, -1, 20, 8);
    for (let i = 5; i--; ) {
      circle(60 - i * 6, 30, 9.9, 0, 2 * PI, color(i + 2, 3));
      circle(60 - i * 6, 30, 10, -0.5, PI + 0.5, color(i + 2, 2));
      circle(60 - i * 6, 30, 10.1, 0.5, PI - 0.5, color(i + 2, 1));
    }
    circle(36, 30, 10, PI / 2, PI * 3 / 2);
    circle(48, 30, 10, PI / 2, PI * 3 / 2);
    circle(60, 30, 10);
    line(36, 20, 60, 20);
    circle(60, 30, 4, PI, 3 * PI, color(3, 2));
    circle(60, 30, 4, PI, 2 * PI, color(3, 3));
    circle(60, 30, 4, PI, 3 * PI);
    for (let i = 6; i--; ) {
      x.beginPath();
      x.lineTo(53, 54);
      x.lineTo(53, 40);
      x.lineTo(53 + (1 + i * 2.9) * p, 40);
      x.lineTo(53 + (4 + i * 3.5) * p, 54);
      x.fillStyle = color(0, i % 2 + 2);
      x.fill();
      i % 2 && x.stroke();
    }
    rect(6, 40, 5, 5);
    rect(6, 40, 5, 5, color());
    rect(15, 54, 38, -14, color());
    for (let i = 3; i--; )
      for (let j = 2; j--; ) {
        circle(15 * i + 15, 47, j ? 7 : 1, PI, 3 * PI, color(i, 3));
        x.stroke();
        circle(15 * i + 15, 47, j ? 7 : 1, 0, PI, color(i, 2));
        x.stroke();
      }
    line(6, 40, 68, 40);
    line(77, 54, 4, 54);
    const s = engineName;
    x.font = "900 16px arial";
    x.textAlign = "center";
    x.textBaseline = "top";
    x.lineWidth = 0.1 + p * 3.9;
    let w2 = 0;
    for (let i = 0; i < s.length; ++i)
      w2 += x.measureText(s[i]).width;
    for (let j = 2; j--; )
      for (let i = 0, X = 41 - w2 / 2; i < s.length; ++i) {
        x.fillStyle = color(i, 2);
        const w3 = x.measureText(s[i]).width;
        x[j ? "strokeText" : "fillText"](s[i], X + w3 / 2, 55.5, 17 * p);
        X += w3;
      }
    x.restore();
  }

  // src/Tentacler.ts
  var EasyStar = __toESM(require_easystar(), 1);
  var est = new EasyStar.js();
  est.enableSync();
  var Tentacler = class extends EngineObject {
    constructor(pos, maxLength = 6, color = new Color(1, 0, 0)) {
      super(pos, vec2(1, 1));
      this.tacleLength = 0;
      this.maxLength = 6;
      this.pathToPlayer = [];
      this.tacle = [];
      this.maxLength = maxLength;
      this.setCollision();
      this.color = color;
      this.mass = 0;
      est.setTileCost(0, 1);
      est.setTileCost(2, 0.5);
      est.setAcceptableTiles([0, 2]);
    }
    calculatePath() {
      let myGrid = [];
      for (let y = 0; y < grid.length; y++) {
        myGrid[y] = [...grid[y]];
      }
      for (let t of tentaclers) {
        for (let i = 0; i < t.tacleLength; i++) {
          let p = t.tacle[i];
          if (!p)
            continue;
          myGrid[p.y][p.x] = t == this ? 2 : 1;
        }
      }
      est.setGrid(myGrid);
      est.enableDiagonals();
      est.disableCornerCutting();
      est.findPath(this.pos.x, this.pos.y, Math.round(playerPos.x), Math.round(playerPos.y), (path) => {
        if (!path) {
          this.pathToPlayer = [];
          return;
        }
        this.pathToPlayer = path.map((p) => xy(p)) || [];
      });
      est.calculate();
    }
    update() {
      this.calculatePath();
      let commonLength = this.pathToPlayer.length;
      for (let i = 0; i < this.pathToPlayer.length; i++) {
        if (!this.tacle[i] || !this.pathToPlayer[i] || this.pathToPlayer[i].distance(this.tacle[i]) > 0.1) {
          commonLength = i;
          break;
        }
      }
      if (commonLength < this.tacleLength) {
        this.reduceTacle();
      } else if (this.tacleLength < this.maxLength) {
        this.expandTacle();
      }
    }
    reduceTacle() {
      this.tacleLength -= 0.1;
    }
    expandTacle() {
      this.tacle = this.pathToPlayer;
      this.tacleLength += 0.05;
    }
    render() {
      this.tileInfo = spriteAtlas.enemy;
      let vpath = this.tacle.map((v) => scramble(v, 0.1));
      let remaining = this.tacleLength;
      vpath.forEach((v, i) => {
        if (i == 0 || remaining < 0)
          return;
        let a = v;
        if (remaining < 1) {
          if (remaining < 0.1)
            return;
          a = a.copy().subtract(vpath[i - 1]).scale(remaining).add(vpath[i - 1]);
        }
        let width = Math.min(0.3, 0.1 + 0.3 * (this.tacleLength - i) / this.tacleLength);
        drawLine(a, vpath[i - 1], width, this.color);
        remaining--;
      });
      drawTile(this.pos, this.drawSize, this.tileInfo, this.color, this.angle, this.mirror);
    }
  };

  // src/Character.ts
  var Character = class extends EngineObject {
    constructor(pos) {
      super(pos, vec2(0.7, 0.7));
      this.frame = 0;
      this.direction = 1;
      this.drawSize = this.size;
      this.setCollision(true, false);
      this.renderOrder = 1;
    }
    update() {
      const moveInput = this.moveInput.copy();
      if (moveInput.length() > 0) {
        this.frame++;
        if (this.direction * moveInput.x < 0) {
          this.direction = Math.sign(moveInput.x);
          this.mirror = this.direction < 0;
        }
      }
      this.velocity = this.velocity.multiply(vec2(0.5)).add(vec2(0.05 * moveInput.x, 0.05 * moveInput.y));
      super.update();
    }
    render() {
      this.tileInfo = spriteAtlas.player.frame(~~(this.frame % 20 / 10));
      drawTile(this.pos, this.drawSize, this.tileInfo, this.color, this.angle, this.mirror);
    }
    collideWithObject(object) {
      if (object instanceof Tentacler) {
      }
      return super.collideWithObject(object);
    }
  };

  // src/Player.ts
  var Player = class extends Character {
    update() {
      this.moveInput = isUsingGamepad ? gamepadStick(0) : vec2(
        (keyIsDown("ArrowRight") ? 1 : 0) - (keyIsDown("ArrowLeft") ? 1 : 0),
        (keyIsDown("ArrowUp") ? 1 : 0) - (keyIsDown("ArrowDown") ? 1 : 0)
      );
      super.update();
      setPlayerPos(this.pos);
    }
  };

  // src/main.ts
  function xy({ x, y }) {
    return vec2(x, y);
  }
  function scramble(p, v) {
    return vec2(p.x + Math.random() * v - 0.5 * v, p.y + Math.random() * v - 0.5 * v);
  }
  var levelSize = vec2(38, 20);
  var sound_bounce = new Sound([, , 1e3, , 0.03, 0.02, 1, 2, , , 940, 0.03, , , , , 0.2, 0.6, , 0.06], 0);
  var sound_break = new Sound([, , 90, , 0.01, 0.03, 4, , , , , , , 9, 50, 0.2, , 0.2, 0.01], 0);
  var sound_start = new Sound([, 0, 500, , 0.04, 0.3, 1, 2, , , 570, 0.02, 0.02, , , , 0.04]);
  var tentaclers = [];
  var Brick = class extends EngineObject {
    constructor(pos, size) {
      super(pos, size);
      this.setCollision();
      this.mass = 0;
      this.friction = 0;
      this.renderOrder = 0;
      this.tileInfo = spriteAtlas.crate;
    }
  };
  var player;
  var levelObjects = [];
  var spriteAtlas;
  function gameInit() {
    const gameTile = (i, size = 16) => tile(i, size, 0, 1);
    spriteAtlas = {
      // large tiles
      circle: gameTile(0),
      crate: gameTile(1),
      player: gameTile(2),
      enemy: gameTile(4),
      coin: gameTile(5),
      // small tiles
      gun: gameTile(vec2(0, 2), 8),
      grenade: gameTile(vec2(1, 2), 8)
    };
    initLevel(0);
    initLevel(1);
  }
  var grid = [];
  var playerPos;
  function setPlayerPos(p) {
    playerPos = p;
  }
  function initLevel(n) {
    let level = levels[n];
    tentaclers = [];
    for (let o of [...engineObjects]) {
      o.destroy();
    }
    levelSize.x = level[0].length;
    levelSize.y = level.length;
    for (let x = 0; x < levelSize.x; x++)
      for (let y = 0; y < levelSize.y; y++) {
        let c = level[levelSize.y - y - 1][x];
        let at = vec2(x, y);
        let cost = 0;
        if (c == "#" || c == "*") {
          new Brick(at, vec2(1, 1));
          cost = 1;
        }
        if (c == "@") {
          player = new Player(at);
          playerPos = at;
        }
        if (c == "T") {
          tentaclers.push(new Tentacler(at, 15, new Color(0.5, 0.5, 0)));
        }
        if (c == "t") {
          tentaclers.push(new Tentacler(at, 8, new Color(1, 0, 0)));
        }
        grid[y] ||= [];
        grid[y][x] = cost;
      }
    setCameraPos(levelSize.scale(0.5));
    setCameraScale(50);
  }
  function gameUpdate() {
  }
  function gameUpdatePost() {
  }
  function gameRender() {
    drawRect(cameraPos.add(new Vector2(-0.5, -0.5)), levelSize, new Color(0, 0.2, 0.2));
  }
  function gameRenderPost() {
  }
  var levels = [];
  window.onload = () => {
    let l1 = levelsString.split("=");
    for (let level of l1) {
      let lines = level.trim().split("\n");
      levels.push(lines);
    }
    engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ["tiles.png"]);
  };
})();
