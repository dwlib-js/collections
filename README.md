# Collections API

## Abstract
The module for implementing mutable, read-only and immutable collections based
on built-in arrays, maps and sets.

## Install
`npm i --save @dwlib/collections`

## Usage
```javascript
// CJS
const Collections = require('@dwlib/collections');
const ImmutableList = require('@dwlib/collections/ImmutableList');
const ImmutableListAdd = require('@dwlib/collections/ImmutableListAdd');
const ImmutableListAddApply = require('@dwlib/collections/ImmutableListAddApply');
const ImmutableListAll = require('@dwlib/collections/ImmutableListAll');
const ImmutableListAny = require('@dwlib/collections/ImmutableListAny');
const ImmutableListClear = require('@dwlib/collections/ImmutableListClear');
const ImmutableListContains = require('@dwlib/collections/ImmutableListContains');
const ImmutableListCount = require('@dwlib/collections/ImmutableListCount');
const ImmutableListEMPTY = require('@dwlib/collections/ImmutableListEMPTY');
const ImmutableListEntries = require('@dwlib/collections/ImmutableListEntries');
const ImmutableListEquals = require('@dwlib/collections/ImmutableListEquals');
const ImmutableListFilter = require('@dwlib/collections/ImmutableListFilter');
const ImmutableListFind = require('@dwlib/collections/ImmutableListFind');
const ImmutableListFindIndex = require('@dwlib/collections/ImmutableListFindIndex');
const ImmutableListFindLast = require('@dwlib/collections/ImmutableListFindLast');
const ImmutableListFindLastIndex = require('@dwlib/collections/ImmutableListFindLastIndex');
const ImmutableListForEach = require('@dwlib/collections/ImmutableListForEach');
const ImmutableListGet = require('@dwlib/collections/ImmutableListGet');
const ImmutableListIndexOf = require('@dwlib/collections/ImmutableListIndexOf');
const ImmutableListInsert = require('@dwlib/collections/ImmutableListInsert');
const ImmutableListInsertApply = require('@dwlib/collections/ImmutableListInsertApply');
const ImmutableListIsEmpty = require('@dwlib/collections/ImmutableListIsEmpty');
const ImmutableListKeys = require('@dwlib/collections/ImmutableListKeys');
const ImmutableListLastIndexOf = require('@dwlib/collections/ImmutableListLastIndexOf');
const ImmutableListOf = require('@dwlib/collections/ImmutableListOf');
const ImmutableListRemove = require('@dwlib/collections/ImmutableListRemove');
const ImmutableListRemoveAll = require('@dwlib/collections/ImmutableListRemoveAll');
const ImmutableListRemoveAt = require('@dwlib/collections/ImmutableListRemoveAt');
const ImmutableListReverse = require('@dwlib/collections/ImmutableListReverse');
const ImmutableListSet = require('@dwlib/collections/ImmutableListSet');
const ImmutableListSize = require('@dwlib/collections/ImmutableListSize');
const ImmutableListSlice = require('@dwlib/collections/ImmutableListSlice');
const ImmutableListToArray = require('@dwlib/collections/ImmutableListToArray');
const ImmutableListToList = require('@dwlib/collections/ImmutableListToList');
const ImmutableListValues = require('@dwlib/collections/ImmutableListValues');
const IsImmutableList = require('@dwlib/collections/IsImmutableList');
const IsList = require('@dwlib/collections/IsList');
const IsListIterator = require('@dwlib/collections/IsListIterator');
const IsReadOnlyList = require('@dwlib/collections/IsReadOnlyList');
const List = require('@dwlib/collections/List');
const ListAdd = require('@dwlib/collections/ListAdd');
const ListAddApply = require('@dwlib/collections/ListAddApply');
const ListAll = require('@dwlib/collections/ListAll');
const ListAny = require('@dwlib/collections/ListAny');
const ListAsReadOnly = require('@dwlib/collections/ListAsReadOnly');
const ListClear = require('@dwlib/collections/ListClear');
const ListClone = require('@dwlib/collections/ListClone');
const ListContains = require('@dwlib/collections/ListContains');
const ListCount = require('@dwlib/collections/ListCount');
const ListEquals = require('@dwlib/collections/ListEquals');
const ListFilter = require('@dwlib/collections/ListFilter');
const ListFind = require('@dwlib/collections/ListFind');
const ListFindIndex = require('@dwlib/collections/ListFindIndex');
const ListFindLast = require('@dwlib/collections/ListFindLast');
const ListFindLastIndex = require('@dwlib/collections/ListFindLastIndex');
const ListForEach = require('@dwlib/collections/ListForEach');
const ListGet = require('@dwlib/collections/ListGet');
const ListIndexOf = require('@dwlib/collections/ListIndexOf');
const ListInsert = require('@dwlib/collections/ListInsert');
const ListInsertApply = require('@dwlib/collections/ListInsertApply');
const ListIsEmpty = require('@dwlib/collections/ListIsEmpty');
const ListIteratorNext = require('@dwlib/collections/ListIteratorNext');
const ListLastIndexOf = require('@dwlib/collections/ListLastIndexOf');
const ListOf = require('@dwlib/collections/ListOf');
const ListRemove = require('@dwlib/collections/ListRemove');
const ListRemoveAll = require('@dwlib/collections/ListRemoveAll');
const ListRemoveAt = require('@dwlib/collections/ListRemoveAt');
const ListReverse = require('@dwlib/collections/ListReverse');
const ListSet = require('@dwlib/collections/ListSet');
const ListSize = require('@dwlib/collections/ListSize');
const ListSlice = require('@dwlib/collections/ListSlice');
const ListToArray = require('@dwlib/collections/ListToArray');
const ListToImmutableList = require('@dwlib/collections/ListToImmutableList');
const ReadOnlyList = require('@dwlib/collections/ReadOnlyList');
const ReadOnlyListAll = require('@dwlib/collections/ReadOnlyListAll');
const ReadOnlyListAny = require('@dwlib/collections/ReadOnlyListAny');
const ReadOnlyListClone = require('@dwlib/collections/ReadOnlyListClone');
const ReadOnlyListContains = require('@dwlib/collections/ReadOnlyListContains');
const ReadOnlyListCount = require('@dwlib/collections/ReadOnlyListCount');
const ReadOnlyListEntries = require('@dwlib/collections/ReadOnlyListEntries');
const ReadOnlyListEquals = require('@dwlib/collections/ReadOnlyListEquals');
const ReadOnlyListFilter = require('@dwlib/collections/ReadOnlyListFilter');
const ReadOnlyListFind = require('@dwlib/collections/ReadOnlyListFind');
const ReadOnlyListFindIndex = require('@dwlib/collections/ReadOnlyListFindIndex');
const ReadOnlyListFindLast = require('@dwlib/collections/ReadOnlyListFindLast');
const ReadOnlyListFindLastIndex = require('@dwlib/collections/ReadOnlyListFindLastIndex');
const ReadOnlyListForEach = require('@dwlib/collections/ReadOnlyListForEach');
const ReadOnlyListGet = require('@dwlib/collections/ReadOnlyListGet');
const ReadOnlyListIndexOf = require('@dwlib/collections/ReadOnlyListIndexOf');
const ReadOnlyListIsEmpty = require('@dwlib/collections/ReadOnlyListIsEmpty');
const ReadOnlyListKeys = require('@dwlib/collections/ReadOnlyListKeys');
const ReadOnlyListLastIndexOf = require('@dwlib/collections/ReadOnlyListLastIndexOf');
const ReadOnlyListSize = require('@dwlib/collections/ReadOnlyListSize');
const ReadOnlyListToArray = require('@dwlib/collections/ReadOnlyListToArray');
const ReadOnlyListToImmutableList = require('@dwlib/collections/ReadOnlyListToImmutableList');
const ReadOnlyListValues = require('@dwlib/collections/ReadOnlyListValues');
// ESM
import Collections, {
  ImmutableList,
  ImmutableListAdd,
  ImmutableListAddApply,
  ImmutableListAll,
  ImmutableListAny,
  ImmutableListClear,
  ImmutableListContains,
  ImmutableListCount,
  ImmutableListEMPTY,
  ImmutableListEntries,
  ImmutableListEquals,
  ImmutableListFilter,
  ImmutableListFind,
  ImmutableListFindIndex,
  ImmutableListFindLast,
  ImmutableListFindLastIndex,
  ImmutableListForEach,
  ImmutableListGet,
  ImmutableListIndexOf,
  ImmutableListInsert,
  ImmutableListInsertApply,
  ImmutableListIsEmpty,
  ImmutableListKeys,
  ImmutableListLastIndexOf,
  ImmutableListOf,
  ImmutableListRemove,
  ImmutableListRemoveAll,
  ImmutableListRemoveAt,
  ImmutableListReverse,
  ImmutableListSet,
  ImmutableListSize,
  ImmutableListSlice,
  ImmutableListToArray,
  ImmutableListToList,
  ImmutableListValues,
  IsImmutableList,
  IsList,
  IsListIterator,
  IsReadOnlyList,
  List,
  ListAdd,
  ListAddApply,
  ListAll,
  ListAny,
  ListAsReadOnly,
  ListClear,
  ListClone,
  ListContains,
  ListCount,
  ListEquals,
  ListFilter,
  ListFind,
  ListFindIndex,
  ListFindLast,
  ListFindLastIndex,
  ListForEach,
  ListGet,
  ListIndexOf,
  ListInsert,
  ListInsertApply,
  ListIsEmpty,
  ListIteratorNext,
  ListLastIndexOf,
  ListOf,
  ListRemove,
  ListRemoveAll,
  ListRemoveAt,
  ListReverse,
  ListSet,
  ListSize,
  ListSlice,
  ListToArray,
  ListToImmutableList,
  ReadOnlyList,
  ReadOnlyListAll,
  ReadOnlyListAny,
  ReadOnlyListClone,
  ReadOnlyListContains,
  ReadOnlyListCount,
  ReadOnlyListEntries,
  ReadOnlyListEquals,
  ReadOnlyListFilter,
  ReadOnlyListFind,
  ReadOnlyListFindIndex,
  ReadOnlyListFindLast,
  ReadOnlyListFindLastIndex,
  ReadOnlyListForEach,
  ReadOnlyListGet,
  ReadOnlyListIndexOf,
  ReadOnlyListIsEmpty,
  ReadOnlyListKeys,
  ReadOnlyListLastIndexOf,
  ReadOnlyListSize,
  ReadOnlyListToArray,
  ReadOnlyListToImmutableList,
  ReadOnlyListValues
} from '@dwlib/collections';
import ImmutableList from '@dwlib/collections/ImmutableList';
import ImmutableListAdd from '@dwlib/collections/ImmutableListAdd';
import ImmutableListAddApply from '@dwlib/collections/ImmutableListAddApply';
import ImmutableListAll from '@dwlib/collections/ImmutableListAll';
import ImmutableListAny from '@dwlib/collections/ImmutableListAny';
import ImmutableListClear from '@dwlib/collections/ImmutableListClear';
import ImmutableListContains from '@dwlib/collections/ImmutableListContains';
import ImmutableListCount from '@dwlib/collections/ImmutableListCount';
import ImmutableListEMPTY from '@dwlib/collections/ImmutableListEMPTY';
import ImmutableListEntries from '@dwlib/collections/ImmutableListEntries';
import ImmutableListEquals from '@dwlib/collections/ImmutableListEquals';
import ImmutableListFilter from '@dwlib/collections/ImmutableListFilter';
import ImmutableListFind from '@dwlib/collections/ImmutableListFind';
import ImmutableListFindIndex from '@dwlib/collections/ImmutableListFindIndex';
import ImmutableListFindLast from '@dwlib/collections/ImmutableListFindLast';
import ImmutableListFindLastIndex from '@dwlib/collections/ImmutableListFindLastIndex';
import ImmutableListForEach from '@dwlib/collections/ImmutableListForEach';
import ImmutableListGet from '@dwlib/collections/ImmutableListGet';
import ImmutableListIndexOf from '@dwlib/collections/ImmutableListIndexOf';
import ImmutableListInsert from '@dwlib/collections/ImmutableListInsert';
import ImmutableListInsertApply from '@dwlib/collections/ImmutableListInsertApply';
import ImmutableListIsEmpty from '@dwlib/collections/ImmutableListIsEmpty';
import ImmutableListKeys from '@dwlib/collections/ImmutableListKeys';
import ImmutableListLastIndexOf from '@dwlib/collections/ImmutableListLastIndexOf';
import ImmutableListOf from '@dwlib/collections/ImmutableListOf';
import ImmutableListRemove from '@dwlib/collections/ImmutableListRemove';
import ImmutableListRemoveAll from '@dwlib/collections/ImmutableListRemoveAll';
import ImmutableListRemoveAt from '@dwlib/collections/ImmutableListRemoveAt';
import ImmutableListReverse from '@dwlib/collections/ImmutableListReverse';
import ImmutableListSet from '@dwlib/collections/ImmutableListSet';
import ImmutableListSize from '@dwlib/collections/ImmutableListSize';
import ImmutableListSlice from '@dwlib/collections/ImmutableListSlice';
import ImmutableListToArray from '@dwlib/collections/ImmutableListToArray';
import ImmutableListToList from '@dwlib/collections/ImmutableListToList';
import ImmutableListValues from '@dwlib/collections/ImmutableListValues';
import IsImmutableList from '@dwlib/collections/IsImmutableList';
import IsList from '@dwlib/collections/IsList';
import IsListIterator from '@dwlib/collections/IsListIterator';
import IsReadOnlyList from '@dwlib/collections/IsReadOnlyList';
import List from '@dwlib/collections/List';
import ListAdd from '@dwlib/collections/ListAdd';
import ListAddApply from '@dwlib/collections/ListAddApply';
import ListAll from '@dwlib/collections/ListAll';
import ListAny from '@dwlib/collections/ListAny';
import ListAsReadOnly from '@dwlib/collections/ListAsReadOnly';
import ListClear from '@dwlib/collections/ListClear';
import ListClone from '@dwlib/collections/ListClone';
import ListContains from '@dwlib/collections/ListContains';
import ListCount from '@dwlib/collections/ListCount';
import ListEquals from '@dwlib/collections/ListEquals';
import ListFilter from '@dwlib/collections/ListFilter';
import ListFind from '@dwlib/collections/ListFind';
import ListFindIndex from '@dwlib/collections/ListFindIndex';
import ListFindLast from '@dwlib/collections/ListFindLast';
import ListFindLastIndex from '@dwlib/collections/ListFindLastIndex';
import ListForEach from '@dwlib/collections/ListForEach';
import ListGet from '@dwlib/collections/ListGet';
import ListIndexOf from '@dwlib/collections/ListIndexOf';
import ListInsert from '@dwlib/collections/ListInsert';
import ListInsertApply from '@dwlib/collections/ListInsertApply';
import ListIsEmpty from '@dwlib/collections/ListIsEmpty';
import ListIteratorNext from '@dwlib/collections/ListIteratorNext';
import ListLastIndexOf from '@dwlib/collections/ListLastIndexOf';
import ListOf from '@dwlib/collections/ListOf';
import ListRemove from '@dwlib/collections/ListRemove';
import ListRemoveAll from '@dwlib/collections/ListRemoveAll';
import ListRemoveAt from '@dwlib/collections/ListRemoveAt';
import ListReverse from '@dwlib/collections/ListReverse';
import ListSet from '@dwlib/collections/ListSet';
import ListSize from '@dwlib/collections/ListSize';
import ListSlice from '@dwlib/collections/ListSlice';
import ListToArray from '@dwlib/collections/ListToArray';
import ListToImmutableList from '@dwlib/collections/ListToImmutableList';
import ReadOnlyList from '@dwlib/collections/ReadOnlyList';
import ReadOnlyListAll from '@dwlib/collections/ReadOnlyListAll';
import ReadOnlyListAny from '@dwlib/collections/ReadOnlyListAny';
import ReadOnlyListClone from '@dwlib/collections/ReadOnlyListClone';
import ReadOnlyListContains from '@dwlib/collections/ReadOnlyListContains';
import ReadOnlyListCount from '@dwlib/collections/ReadOnlyListCount';
import ReadOnlyListEntries from '@dwlib/collections/ReadOnlyListEntries';
import ReadOnlyListEquals from '@dwlib/collections/ReadOnlyListEquals';
import ReadOnlyListFilter from '@dwlib/collections/ReadOnlyListFilter';
import ReadOnlyListFind from '@dwlib/collections/ReadOnlyListFind';
import ReadOnlyListFindIndex from '@dwlib/collections/ReadOnlyListFindIndex';
import ReadOnlyListFindLast from '@dwlib/collections/ReadOnlyListFindLast';
import ReadOnlyListFindLastIndex from '@dwlib/collections/ReadOnlyListFindLastIndex';
import ReadOnlyListForEach from '@dwlib/collections/ReadOnlyListForEach';
import ReadOnlyListGet from '@dwlib/collections/ReadOnlyListGet';
import ReadOnlyListIndexOf from '@dwlib/collections/ReadOnlyListIndexOf';
import ReadOnlyListIsEmpty from '@dwlib/collections/ReadOnlyListIsEmpty';
import ReadOnlyListKeys from '@dwlib/collections/ReadOnlyListKeys';
import ReadOnlyListLastIndexOf from '@dwlib/collections/ReadOnlyListLastIndexOf';
import ReadOnlyListSize from '@dwlib/collections/ReadOnlyListSize';
import ReadOnlyListToArray from '@dwlib/collections/ReadOnlyListToArray';
import ReadOnlyListToImmutableList from '@dwlib/collections/ReadOnlyListToImmutableList';
import ReadOnlyListValues from '@dwlib/collections/ReadOnlyListValues';
```

## API
- `static class Collections`
  - `static ImmutableList = ImmutableList`
  - `static List = List`
  - `static ReadOnlyList = ReadOnlyList`
- `class ImmutableList`
  - `static EMPTY: ImmutableList`
  - `static of(...values: any[]?) => ImmutableList | ImmutableList.EMPTY`
  - `constructor([iterable: Iterable<Object>?]) => ImmutableList | ImmutableList.EMPTY`
  - `get isEmpty => boolean`
  - `get size => number`
  - `add(...values: any[]?) => this | ImmutableList | ImmutableList.EMPTY`
  - `all(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => boolean`
  - `any(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => boolean`
  - `clear() => ImmutableList.EMPTY`
  - `contains(value: any) => boolean`
  - `count(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => number`
  - `entries() => ListIterator`
  - `equals(other: any) => boolean`
  - `filter(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => this | ImmutableList | ImmutableList.EMPTY`
  - `find(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => any`
  - `findIndex(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => number`
  - `findLast(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => any`
  - `findLastIndex(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => number`
  - `forEach(callback: (value: any, index: number, immutableList: ImmutableList) => void) => void`
  - `get(index: number) => any`
  - `indexOf(value: any[, fromIndex: number = 0]) => number`
  - `insert(index: number, ...values: any[]?) => this | ImmutableList | ImmutableList.EMPTY`
  - `keys() => ListIterator`
  - `lastIndexOf(value: any[, fromIndex: number = this.size]) => number`
  - `remove(value: any[, fromIndex: number = 0]) => this | ImmutableList | ImmutableList.EMPTY`
  - `removeAll(predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => this | ImmutableList | ImmutableList.EMPTY`
  - `removeAt(index: number) => this | ImmutableList | ImmutableList.EMPTY`
  - `reverse([start: number = 0[, end: number = this.size]) => this | ImmutableList | ImmutableList.EMPTY`
  - `set(index: number, value: any) => this | ImmutableList | ImmutableList.EMPTY`
  - `slice([start: number = 0[, end: number = this.size]) => this | ImmutableList | ImmutableList.EMPTY`
  - `toArray() => any[]`
  - `toList() => List`
  - `values() => ListIterator`
- `class List`
  - `static of(...values: any[]?) => List`
  - `constructor([iterable: Iterable<Object>?])`
  - `get isEmpty => boolean`
  - `get size => number`
  - `add(...values: any[]?) => this`
  - `all(predicate: (value: any, index: number, list: List) => boolean) => boolean`
  - `any(predicate: (value: any, index: number, list: List) => boolean) => boolean`
  - `asReadOnly() => ReadOnlyList`
  - `clear() => void`
  - `clone() => List`
  - `contains(value: any) => boolean`
  - `count(predicate: (value: any, index: number, list: List) => boolean) => number`
  - `entries() => ListIterator`
  - `equals(other: any) => boolean`
  - `filter(predicate: (value: any, index: number, list: List) => boolean) => List`
  - `find(predicate: (value: any, index: number, list: List) => boolean) => any`
  - `findIndex(predicate: (value: any, index: number, list: List) => boolean) => number`
  - `findLast(predicate: (value: any, index: number, list: List) => boolean) => any`
  - `findLastIndex(predicate: (value: any, index: number, list: List) => boolean) => number`
  - `forEach(callback: (value: any, index: number, list: List) => void) => void`
  - `get(index: number) => any`
  - `indexOf(value: any[, fromIndex: number = 0]) => number`
  - `insert(index: number, ...values: any[]?) => this`
  - `keys() => ListIterator`
  - `lastIndexOf(value: any[, fromIndex: number = this.size]) => number`
  - `remove(value: any[, fromIndex: number = 0]) => boolean`
  - `removeAll(predicate: (value: any, index: number, list: List) => boolean) => number`
  - `removeAt(index: number) => boolean`
  - `reverse([start: number = 0[, end: number = this.size]) => this`
  - `set(index: number, value: any) => this`
  - `slice([start: number = 0[, end: number = this.size]) => List`
  - `toArray() => any[]`
  - `toImmutableList() => ImmutableList | ImmutableList.EMPTY`
  - `values() => ListIterator`
- `class ListIterator`
  - `next() => IteratorResult`
- `class ReadOnlyList`
  - `constructor(target: List)`
  - `get isEmpty => boolean`
  - `get size => number`
  - `all(predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => boolean`
  - `any(predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => boolean`
  - `clone() => List`
  - `contains(value: any) => boolean`
  - `count(predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => number`
  - `entries() => ListIterator`
  - `equals(other: any) => boolean`
  - `filter(predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => List`
  - `find(predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => any`
  - `findIndex(predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => number`
  - `findLast(predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => any`
  - `findLastIndex(predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => number`
  - `forEach(callback: (value: any, index: number, readOnlyList: ReadOnlyList) => void) => void`
  - `get(index: number) => any`
  - `indexOf(value: any[, fromIndex: number = 0]) => number`
  - `keys() => ListIterator`
  - `lastIndexOf(value: any[, fromIndex: number = this.size]) => number`
  - `slice([start: number = 0[, end: number = this.size]) => List`
  - `toArray() => any[]`
  - `toImmutableList() => ImmutableList | ImmutableList.EMPTY`
  - `values() => ListIterator`

### Builtins
- `new ImmutableList([iterable: Iterable<Object>?]) => ImmutableList | ImmutableList.EMPTY`
- `ImmutableListAdd(immutableList: ImmutableList, ...values: any[]?) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListAll(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => boolean`
- `ImmutableListAny(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => boolean`
- `ImmutableListClear(immutableList: ImmutableList) => ImmutableList.EMPTY`
- `ImmutableListContains(immutableList: ImmutableList, value: any) => boolean`
- `ImmutableListCount(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => number`
- `ImmutableListEntries(immutableList: ImmutableList) => ListIterator`
- `ImmutableListEquals(immutableList: ImmutableList, other: any) => boolean`
- `ImmutableListFilter(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListFind(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => any`
- `ImmutableListFindIndex(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => number`
- `ImmutableListFindLast(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => any`
- `ImmutableListFindLastIndex(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => number`
- `ImmutableListForEach(immutableList: ImmutableList, callback: (value: any, index: number, immutableList: ImmutableList) => void) => void`
- `ImmutableListGet(immutableList: ImmutableList, index: number) => any`
- `ImmutableListIndexOf(immutableList: ImmutableList, value: any[, fromIndex: number = 0]) => number`
- `ImmutableListInsert(immutableList: ImmutableList, index: number, ...values: any[]?) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListIsEmpty(immutableList: ImmutableList) => boolean`
- `ImmutableListKeys(immutableList: ImmutableList) => ListIterator`
- `ImmutableListLastIndexOf(immutableList: ImmutableList, value: any[, fromIndex: number = immutableList.size]) => number`
- `ImmutableListOf(...values: any[]?) => ImmutableList | ImmutableList.EMPTY`
- `ImmutableListRemove(immutableList: ImmutableList, value: any[, fromIndex: number = 0]) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListRemoveAll(immutableList: ImmutableList, predicate: (value: any, index: number, immutableList: ImmutableList) => boolean) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListRemoveAt(immutableList: ImmutableList, index: number) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListReverse(immutableList: ImmutableList[, start: number = 0[, end: number = immutableList.size]) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListSet(immutableList: ImmutableList, index: number, value: any) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListSize(immutableList: ImmutableList) => number`
- `ImmutableListSlice(immutableList: ImmutableList[, start: number = 0[, end: number = immutableList.size]) => immutableList | ImmutableList | ImmutableList.EMPTY`
- `ImmutableListToArray(immutableList: ImmutableList) => any[]`
- `ImmutableListToList(immutableList: ImmutableList) => List`
- `ImmutableListValues(immutableList: ImmutableList) => ListIterator`
- `IsImmutableList(argument: any) => boolean`
- `IsList(argument: any) => boolean`
- `IsReadOnlyList(argument: any) => boolean`
- `new List([iterable: Iterable<Object>?])`
- `ListAdd(list: List, ...values: any[]?) => boolean`
- `ListAll(list: List, predicate: (value: any, index: number, list: List) => boolean) => boolean`
- `ListAny(list: List, predicate: (value: any, index: number, list: List) => boolean) => boolean`
- `ListAsReadOnly(list: List) => ReadOnlyList`
- `ListClear(list: List) => void`
- `ListClone(list: List) => List`
- `ListContains(list: List, value: any) => boolean`
- `ListCount(list: List, predicate: (value: any, index: number, list: List) => boolean) => number`
- `ListEntries(list: List) => ListIterator`
- `ListEquals(list: List, other: any) => boolean`
- `ListFilter(list: List, predicate: (value: any, index: number, list: List) => boolean) => List`
- `ListFind(list: List, predicate: (value: any, index: number, list: List) => boolean) => any`
- `ListFindIndex(list: List, predicate: (value: any, index: number, list: List) => boolean) => number`
- `ListFindLast(list: List, predicate: (value: any, index: number, list: List) => boolean) => any`
- `ListFindLastIndex(list: List, predicate: (value: any, index: number, list: List) => boolean) => number`
- `ListForEach(list: List, callback: (value: any, index: number, list: List) => void) => void`
- `ListGet(list: List, index: number) => any`
- `ListIndexOf(list: List, value: any[, fromIndex: number = 0]) => number`
- `ListInsert(list: List, index: number, ...values: any[]?) => boolean`
- `ListIsEmpty(list: List) => boolean`
- `ListIteratorNext(listIterator: ListIterator) => IteratorResult`
- `ListKeys(list: List) => ListIterator`
- `ListLastIndexOf(list: List, value: any[, fromIndex: number = list.size]) => number`
- `ListOf(...values: any[]?) => List`
- `ListRemove(list: List, value: any[, fromIndex: number = 0]) => boolean`
- `ListRemoveAll(list: List, predicate: (value: any, index: number, list: List) => boolean) => number`
- `ListRemoveAt(list: List, index: number) => boolean`
- `ListReverse(list: List, [start: number = 0[, end: number = list.size]) => void`
- `ListSet(list: List, index: number, value: any) => boolean`
- `ListSize(list: List) => number`
- `ListSlice(list: List, [start: number = 0[, end: number = list.size]) => List`
- `ListToArray(list: List) => any[]`
- `ListToImmutableList(list: List) => ImmutableList | ImmutableList.EMPTY`
- `ListValues(list: List) => ListIterator`
- `new ReadOnlyList(target: List)`
- `ReadOnlyListAll(readOnlyList: ReadOnlyList, predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => boolean`
- `ReadOnlyListAny(readOnlyList: ReadOnlyList, predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => boolean`
- `ReadOnlyListClone(readOnlyList: ReadOnlyList) => List`
- `ReadOnlyListContains(readOnlyList: ReadOnlyList, value: any) => boolean`
- `ReadOnlyListCount(readOnlyList: ReadOnlyList, predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => number`
- `ReadOnlyListEntries(readOnlyList: ReadOnlyList) => ListIterator`
- `ReadOnlyListEquals(readOnlyList: ReadOnlyList, other: any) => boolean`
- `ReadOnlyListFilter(readOnlyList: ReadOnlyList, predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => List`
- `ReadOnlyListFind(readOnlyList: ReadOnlyList, predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => any`
- `ReadOnlyListFindIndex(readOnlyList: ReadOnlyList, predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => number`
- `ReadOnlyListFindLast(readOnlyList: ReadOnlyList, predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => any`
- `ReadOnlyListFindLastIndex(readOnlyList: ReadOnlyList, predicate: (value: any, index: number, readOnlyList: ReadOnlyList) => boolean) => number`
- `ReadOnlyListForEach(readOnlyList: ReadOnlyList, callback: (value: any, index: number, readOnlyList: ReadOnlyList) => void) => void`
- `ReadOnlyListGet(readOnlyList: ReadOnlyList, index: number) => any`
- `ReadOnlyListIndexOf(readOnlyList: ReadOnlyList, value: any[, fromIndex: number = 0]) => number`
- `ReadOnlyListIsEmpty(readOnlyList: ReadOnlyList) => boolean`
- `ReadOnlyListKeys(readOnlyList: ReadOnlyList) => ListIterator`
- `ReadOnlyListLastIndexOf(readOnlyList: ReadOnlyList, value: any[, fromIndex: number = readOnlyList.size]) => number`
- `ReadOnlyListSize(readOnlyList: ReadOnlyList) => number`
- `ReadOnlyListSlice(readOnlyList: ReadOnlyList, [start: number = 0[, end: number = readOnlyList.size]) => List`
- `ReadOnlyListToArray(readOnlyList: ReadOnlyList) => any[]`
- `ReadOnlyListToImmutableList(readOnlyList: ReadOnlyList) => ImmutableList | ImmutableList.EMPTY`
- `ReadOnlyListValues(readOnlyList: ReadOnlyList) => ListIterator`
