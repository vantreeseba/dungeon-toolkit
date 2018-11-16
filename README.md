A toolkit of level generation and analysis utilities.

<a name="Map"></a>

## Map
A class representing a grid map.

**Kind**: global class  

* [Map](#Map)
    * [new Map(w, h)](#new_Map_new)
    * [.copy()](#Map+copy) ⇒ [<code>Map</code>](#Map)
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

<a name="Map+copy"></a>

### map.copy() ⇒ [<code>Map</code>](#Map)
Make a copy of this map.

**Kind**: instance method of [<code>Map</code>](#Map)  
**Returns**: [<code>Map</code>](#Map) - The copy of this map.  
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

