A toolkit of level generation and analysis utilities.

## Classes

<dl>
<dt><a href="#Generator">Generator</a></dt>
<dd><p>Generator</p>
</dd>
<dt><a href="#Map">Map</a></dt>
<dd><p>A class representing a grid map.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#distanceFill">distanceFill()</a></dt>
<dd><p>Random utils for supporting module.</p>
</dd>
<dt><a href="#floodFill">floodFill(map, x, y, value)</a> ⇒ <code>Array</code></dt>
<dd><p>Return a list of tiles that recursively
touch the given tile and have the given value.</p>
</dd>
</dl>

<a name="Generator"></a>

## Generator
Generator

**Kind**: global class  
<a name="new_Generator_new"></a>

### new Generator(map, [config])
constructor


| Param | Default |
| --- | --- |
| map |  | 
| [config] | <code>{}</code> | 

<a name="Map"></a>

## Map
A class representing a grid map.

**Kind**: global class  

* [Map](#Map)
    * [new Map(w, h)](#new_Map_new)
    * [.fill([wall], [floor], [percent])](#Map+fill)
    * [.indexToXY(i)](#Map+indexToXY) ⇒ <code>Object</code>
    * [.xyToIndex(x, y)](#Map+xyToIndex) ⇒ <code>Number</code>
    * [.set(x, y, val)](#Map+set)
    * [.get(x, y)](#Map+get) ⇒ <code>Number</code>
    * [.getNeighbors(x, y, [dist])](#Map+getNeighbors) ⇒ <code>Array</code>

<a name="new_Map_new"></a>

### new Map(w, h)
Construct a map.


| Param | Type | Description |
| --- | --- | --- |
| w | <code>Number</code> | The width of the map. |
| h | <code>Number</code> | The height of the map. |

<a name="Map+fill"></a>

### map.fill([wall], [floor], [percent])
Fill the map with two values, randomly.

**Kind**: instance method of [<code>Map</code>](#Map)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [wall] | <code>Number</code> | <code>0</code> | The first (wall) value. |
| [floor] | <code>Number</code> | <code>1</code> | The second (floor) value. |
| [percent] | <code>Number</code> | <code>0</code> | The percent of map that should be walls. |

<a name="Map+indexToXY"></a>

### map.indexToXY(i) ⇒ <code>Object</code>
Returns an x,y coord for a index in the array representing the map.

**Kind**: instance method of [<code>Map</code>](#Map)  
**Returns**: <code>Object</code> - x,y coord.  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>Number</code> | The index to turn into an x,y coord. |

<a name="Map+xyToIndex"></a>

### map.xyToIndex(x, y) ⇒ <code>Number</code>
Turns an x,y coord into an index into the values array.

**Kind**: instance method of [<code>Map</code>](#Map)  
**Returns**: <code>Number</code> - The index.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x coord. |
| y | <code>Number</code> | The y coord. |

<a name="Map+set"></a>

### map.set(x, y, val)
Set a value in the values array by x,y.

**Kind**: instance method of [<code>Map</code>](#Map)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x coord of the tile to set. |
| y | <code>Number</code> | The y coord of the tile to set. |
| val | <code>Number</code> | The value to set for the tile. |

<a name="Map+get"></a>

### map.get(x, y) ⇒ <code>Number</code>
Get a tiles value from the map by x,y.

**Kind**: instance method of [<code>Map</code>](#Map)  
**Returns**: <code>Number</code> - The tile value at x,y.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x coord. |
| y | <code>Number</code> | The y coord. |

<a name="Map+getNeighbors"></a>

### map.getNeighbors(x, y, [dist]) ⇒ <code>Array</code>
Get all neighbors for the tile within dist.

**Kind**: instance method of [<code>Map</code>](#Map)  
**Returns**: <code>Array</code> - An array of tile objects.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>Number</code> |  | The x coord. |
| y | <code>Number</code> |  | The y coord. |
| [dist] | <code>Number</code> | <code>1</code> | The distance to find neighbors within. |

<a name="distanceFill"></a>

## distanceFill()
Random utils for supporting module.

**Kind**: global function  
<a name="floodFill"></a>

## floodFill(map, x, y, value) ⇒ <code>Array</code>
Return a list of tiles that recursively
touch the given tile and have the given value.

**Kind**: global function  
**Returns**: <code>Array</code> - The list of points and their values.  

| Param | Type | Description |
| --- | --- | --- |
| map | [<code>Map</code>](#Map) | The map to get tiles from. |
| x | <code>Number</code> | The x coord of the tile. |
| y | <code>Number</code> | The y coord of the tile. |
| value | <code>Number</code> | The tile value/number to match. |

