'use strict';

const RequireIntrinsic = require('#intrinsic/RequireIntrinsic');
const UncurryThisIntrinsic = require('#intrinsic/UncurryThisIntrinsic');
const IsCallable = require('#type/IsCallable');
const IsObject = require('#type/IsObject');
const ToIntegerOrInfinity = require('#type/ToIntegerOrInfinity');
const ToLength = require('#type/ToLength');
const GetInternalSlot = require('#internal-slot/GetInternalSlot');
const HasInternalSlot = require('#internal-slot/HasInternalSlot');
const RequireInternalSlot = require('#internal-slot/RequireInternalSlot');
const SetInternalSlot = require('#internal-slot/SetInternalSlot');

const Array = RequireIntrinsic('Array');
const ArrayEntries = UncurryThisIntrinsic('Array.prototype.entries');
const ArrayKeys = UncurryThisIntrinsic('Array.prototype.keys');
const ArrayValues = UncurryThisIntrinsic('Array.prototype.values');
const ArrayIteratorNext = UncurryThisIntrinsic('ArrayIteratorPrototype.next');
const IteratorPrototype = RequireIntrinsic('IteratorPrototype');
const ObjectCreate = RequireIntrinsic('Object.create');
const ObjectPrototype = RequireIntrinsic('Object.prototype');
const RangeError = RequireIntrinsic('RangeError');
const ReflectApply = RequireIntrinsic('Reflect.apply');
const ReflectDefineProperty = RequireIntrinsic('Reflect.defineProperty');
const Symbol = RequireIntrinsic('Symbol');
const SymbolHasInstance = RequireIntrinsic('@@hasInstance');
const SymbolIterator = RequireIntrinsic('@@iterator');
const SymbolToStringTag = RequireIntrinsic('@@toStringTag');
const TypeError = RequireIntrinsic('TypeError');

const $ImmutableListArray = Symbol('[[ImmutableListArray]]');
const $ListArray = Symbol('[[ListArray]]');
const $ListArrayIterator = Symbol('[[ListArrayIterator]]');
const $TargetList = Symbol('[[TargetList]]');

const DuplicateArray = array => {
  const size = array.length;
  const destination = new Array(size);
  for (let i = 0; i < size; i++) {
    destination[i] = array[i];
  }
  return destination;
}

const CompareArrays = (array1, array2) => {
  if (array1 === array2) {
    return true;
  }
  const size = array1.length;
  if (array2.length !== size) {
    return false;
  }
  for (let i = 0; i < size; i++) {
    const value1 = array1[i];
    const value2 = array2[i];
    if (value1 !== value1) {
      if (value2 === value2) {
        return false;
      }
    } else if (value1 !== value2) {
      return false;
    }
  }
  return true;
}

const CreateImmutableList = array => {
  const immutableList = ObjectCreate(ImmutableListPrototype);
  SetInternalSlot(immutableList, $ImmutableListArray, array);
  return immutableList;
}

const CreateList = array => {
  const list = ObjectCreate(ListPrototype);
  SetInternalSlot(list, $ListArray, array);
  return list;
}

const RequireArgumentsList = argument => {
  if (!IsObject(argument)) {
    throw new TypeError('argumentsList is not an array-like object');
  }
}

const RequireCallbackCallable = argument => {
  if (!IsCallable(argument)) {
    throw new TypeError('callback is not callable');
  }
}

const RequireIterableObject = argument => {
  if (!IsObject(argument)) {
    throw new TypeError('iterable is not an object');
  }
}

const RequirePredicateCallable = argument => {
  if (!IsCallable(argument)) {
    throw new TypeError('predicate is not callable');
  }
}

const ImmutableListAddApply = (immutableList, argumentsList) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  if (argumentsList == null) {
    return immutableList;
  }
  RequireArgumentsList(argumentsList);
  const argumentCount = ToLength(argumentsList.length);
  if (!argumentCount) {
    return immutableList;
  }
  const size = array.length;
  const destination = new Array(size + argumentCount);
  let index = 0;
  while (index < size) {
    destination[index] = array[index++];
  }
  for (let i = 0; i < argumentCount; i++) {
    destination[index++] = argumentsList[i];
  }
  return CreateImmutableList(destination);
}

const ImmutableListAdd = (immutableList, ...values) => ImmutableListAddApply(
  immutableList, values
);

const ImmutableListAll = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, immutableList]);
    if (!truthy) {
      return false;
    }
  }
  return true;
}

const ImmutableListAny = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, immutableList]);
    if (truthy) {
      return true;
    }
  }
  return false;
}

const ImmutableListClear = immutableList => {
  RequireInternalSlot(immutableList, $ImmutableListArray);
  return ImmutableListEMPTY;
}

const ImmutableListContains = (immutableList, value) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  const size = array.length;
  if (value !== value) {
    for (let i = 0; i < size; i++) {
      const nextValue = array[i];
      if (nextValue !== nextValue) {
        return true;
      }
    }
  } else {
    for (let i = 0; i < size; i++) {
      const nextValue = array[i];
      if (nextValue === value) {
        return true;
      }
    }
  }
  return false;
}

const ImmutableListCount = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  let count = 0;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, immutableList]);
    if (truthy) {
      count++;
    }
  }
  return count;
}

const ImmutableListEntries = immutableList => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  const arrayIterator = ArrayEntries(array);
  const listIterator = ObjectCreate(ListIteratorPrototype);
  SetInternalSlot(listIterator, $ListArrayIterator, arrayIterator);
  return listIterator;
}

const ImmutableListEquals = (immutableList, other) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  if (immutableList === other) {
    return true;
  }
  if (!IsObject(other)) {
    return false;
  }
  const otherArray = GetInternalSlot(other, $ImmutableListArray);
  return otherArray ? CompareArrays(array, otherArray) : false;
}

const ImmutableListFilter = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  if (!size) {
    return immutableList;
  }
  const destination = [];
  let index = 0;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, immutableList]);
    if (truthy) {
      destination[index++] = value;
    }
  }
  return (
    index !== size ? (
      index > 0 ? CreateImmutableList(destination) : ImmutableListEMPTY
    ) : immutableList
  );
}

const ImmutableListFind = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, immutableList]);
    if (truthy) {
      return value;
    }
  }
  return undefined;
}

const ImmutableListFindIndex = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, immutableList]);
    if (truthy) {
      return i;
    }
  }
  return -1;
}

const ImmutableListFindLast = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  let lastIndex = size.length - 1;
  while (lastIndex >= 0) {
    const value = array[lastIndex];
    const truthy = ReflectApply(
      predicate, null, [value, lastIndex, immutableList]
    );
    if (truthy) {
      return value;
    }
    lastIndex--;
  }
  return undefined;
}

const ImmutableListFindLastIndex = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  let lastIndex = size.length - 1;
  while (lastIndex >= 0) {
    const value = array[lastIndex];
    const truthy = ReflectApply(
      predicate, null, [value, lastIndex, immutableList]
    );
    if (truthy) {
      return lastIndex;
    }
    lastIndex--;
  }
  return -1;
}

const ImmutableListForEach = (immutableList, callback) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequireCallbackCallable(callback);
  const size = array.length;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    ReflectApply(callback, null, [value, i, immutableList]);
  }
}

const ImmutableListGet = (immutableList, index) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  index = ToIntegerOrInfinity(index);
  const size = array.length;
  if (index < 0) {
    index += size;
  }
  return index >= 0 && index < size ? array[index] : undefined;
}

const ImmutableListIndexOf = (immutableList, value, fromIndex) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  fromIndex = ToIntegerOrInfinity(fromIndex);
  const size = array.length;
  if (fromIndex < 0) {
    fromIndex += size;
  }
  if (fromIndex < 0 || fromIndex >= size) {
    return -1;
  }
  if (value !== value) {
    while (fromIndex < size) {
      const nextValue = array[fromIndex];
      if (nextValue !== nextValue) {
        return fromIndex;
      }
      fromIndex++;
    }
  } else {
    while (fromIndex < size) {
      const nextValue = array[fromIndex];
      if (nextValue === value) {
        return fromIndex;
      }
      fromIndex++;
    }
  }
  return -1;
}

const ImmutableListInsertApply = (immutableList, index, argumentsList) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  index = ToIntegerOrInfinity(index);
  if (argumentsList == null) {
    return immutableList;
  }
  RequireArgumentsList(argumentsList);
  const argumentCount = ToLength(argumentsList.length);
  if (!argumentCount) {
    return immutableList;
  }
  const size = array.length;
  if (index < 0) {
    index += size;
    if (index < 0) {
      index = 0;
    }
  } else if (index > size) {
    index = size;
  }
  const destination = new Array(size + argumentCount);
  let offset = 0;
  while (offset < index) {
    destination[offset] = array[offset++];
  }
  for (let i = 0; i < argumentCount; i++) {
    destination[offset++] = argumentsList[i];
  }
  while (index < size) {
    destination[offset++] = array[index++];
  }
  return CreateImmutableList(destination);
}

const ImmutableListInsert = (immutableList, index, ...values) => (
  ImmutableListInsertApply(immutableList, index, values)
);

const ImmutableListIsEmpty = immutableList => !ImmutableListSize(immutableList);

const ImmutableListKeys = immutableList => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  const arrayIterator = ArrayKeys(array);
  const listIterator = ObjectCreate(ListIteratorPrototype);
  SetInternalSlot(listIterator, $ListArrayIterator, arrayIterator);
  return listIterator;
}

const ImmutableListLastIndexOf = (immutableList, value, fromIndex) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  const size = array.length;
  const lastIndex = size - 1;
  if (fromIndex === undefined) {
    fromIndex = lastIndex;
  } else {
    fromIndex = ToIntegerOrInfinity(fromIndex);
    if (fromIndex < 0) {
      fromIndex += size;
      if (fromIndex < 0) {
        return -1;
      }
    } else if (fromIndex >= size) {
      fromIndex = lastIndex;
    }
  }
  if (value !== value) {
    while (fromIndex >= 0) {
      const nextValue = array[fromIndex];
      if (nextValue !== nextValue) {
        return fromIndex;
      }
      fromIndex--;
    }
  } else {
    while (fromIndex >= 0) {
      const nextValue = array[fromIndex];
      if (nextValue === value) {
        return fromIndex;
      }
      fromIndex--;
    }
  }
  return -1;
}

const ImmutableListMap = (immutableList, callback) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequireCallbackCallable(callback);
  const size = array.length;
  if (!size) {
    return immutableList;
  }
  const destination = [];
  let mappable;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    const newValue = ReflectApply(callback, null, [value, i, immutableList]);
    if (value !== value) {
      if (newValue === newValue) {
        mappable = true;
      }
    } else if (value !== newValue) {
      mappable = true;
    }
    destination[i] = newValue;
  }
  return mappable ? CreateImmutableList(destination) : immutableList;
}

const ImmutableListRemove = (immutableList, value, fromIndex) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  fromIndex = ToIntegerOrInfinity(fromIndex);
  const size = array.length;
  if (fromIndex < 0) {
    fromIndex += size;
  }
  if (fromIndex < 0 || fromIndex >= size) {
    return immutableList;
  }
  let removable;
  if (value !== value) {
    while (fromIndex < size) {
      const nextValue = array[fromIndex];
      if (nextValue !== nextValue) {
        removable = true;
        break;
      }
      fromIndex++;
    }
  } else {
    while (fromIndex < size) {
      const nextValue = array[fromIndex];
      if (nextValue === value) {
        removable = true;
        break;
      }
      fromIndex++;
    }
  }
  if (!removable) {
    return immutableList;
  }
  const lastIndex = size - 1;
  if (!lastIndex) {
    return ImmutableListEMPTY;
  }
  const destination = new Array(lastIndex);
  let offset = 0;
  while (offset < fromIndex) {
    destination[offset] = array[offset++];
  }
  while (fromIndex < lastIndex) {
    destination[offset++] = array[++fromIndex];
  }
  return CreateImmutableList(destination);
}

const ImmutableListRemoveAll = (immutableList, predicate) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  if (!size) {
    return ImmutableListEMPTY;
  }
  const destination = [];
  let index = 0;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, immutableList]);
    if (!truthy) {
      destination[index++] = value;
    }
  }
  return (
    index !== size ? (
      index > 0 ? CreateImmutableList(destination) : ImmutableListEMPTY
    ) : immutableList
  );
}

const ImmutableListRemoveAt = (immutableList, index) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  index = ToIntegerOrInfinity(index);
  const size = array.length;
  if (index < 0) {
    index += size;
  }
  if (index < 0 || index >= size) {
    return immutableList;
  }
  const lastIndex = size - 1;
  if (!lastIndex) {
    return ImmutableListEMPTY;
  }
  const destination = new Array(lastIndex);
  let offset = 0;
  while (offset < index) {
    destination[offset] = array[offset++];
  }
  while (index < lastIndex) {
    destination[offset++] = array[++index];
  }
  return CreateImmutableList(destination);
}

const ImmutableListReverse = (immutableList, start, end) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  start = ToIntegerOrInfinity(start);
  const size = array.length;
  if (start === -Infinity) {
    start = 0;
  } else if (start < 0) {
    start += size;
    if (start < 0) {
      start = 0
    }
  }
  if (end === undefined) {
    end = size;
  } else {
    end = ToIntegerOrInfinity(end);
    if (end === -Infinity) {
      end = 0;
    } else if (end < 0) {
      end += size;
    } else if (end > size) {
      end = size;
    }
  }
  if (start >= end || end - start === 1) {
    return immutableList;
  }
  const destination = new Array(size);
  let index = 0;
  while (index < start) {
    destination[index] = array[index++];
  }
  while (end > start) {
    destination[index++] = array[--end];
  }
  while (index < size) {
    destination[index] = array[index++];
  }
  return (
    CompareArrays(array, destination) ? immutableList :
      CreateImmutableList(destination)
  );
}

const ImmutableListSet = (immutableList, index, value) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  index = ToIntegerOrInfinity(index);
  const size = array.length;
  if (index < 0) {
    index += size;
  }
  if (index < 0 || index >= size) {
    return immutableList;
  }
  const currentValue = array[index];
  if (value !== value) {
    if (currentValue !== currentValue) {
      return immutableList;
    }
  } else if (value === currentValue) {
    return immutableList;
  }
  const destination = new Array(size);
  let offset = 0;
  while (offset < index) {
    destination[offset] = array[offset++];
  }
  destination[offset++] = value;
  while (offset < size) {
    destination[offset] = array[offset++];
  }
  return CreateImmutableList(destination);
}

const ImmutableListSize = immutableList => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  return array.length;
}

const ImmutableListSlice = (immutableList, start, end) => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  start = ToIntegerOrInfinity(start);
  const size = array.length;
  if (start === -Infinity) {
    start = 0;
  } else if (start < 0) {
    start += size;
    if (start < 0) {
      start = 0
    }
  }
  if (end === undefined) {
    end = size;
  } else {
    end = ToIntegerOrInfinity(end);
    if (end === -Infinity) {
      end = 0;
    } else if (end < 0) {
      end += size;
    } else if (end > size) {
      end = size;
    }
  }
  if (start >= end) {
    return ImmutableListEMPTY;
  }
  if (!start && end >= size) {
    return immutableList;
  }
  const destination = new Array(end - start);
  let index = 0;
  while (start < end) {
    destination[index++] = array[start++];
  }
  return CreateImmutableList(destination);
}

const ImmutableListToArray = immutableList => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  return DuplicateArray(array);
}

const ImmutableListToList = immutableList => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  const destination = DuplicateArray(array);
  return CreateList(destination);
}

const ImmutableListValues = immutableList => {
  const array = RequireInternalSlot(immutableList, $ImmutableListArray);
  const arrayIterator = ArrayValues(array);
  const listIterator = ObjectCreate(ListIteratorPrototype);
  SetInternalSlot(listIterator, $ListArrayIterator, arrayIterator);
  return listIterator;
}

const IsImmutableList = argument => (
  IsObject(argument) && HasInternalSlot(argument, $ImmutableListArray)
);

const IsList = argument => (
  IsObject(argument) && HasInternalSlot(argument, $ListArray)
);

const IsListIterator = argument => (
  IsObject(argument) && HasInternalSlot(argument, $ListArrayIterator)
);

const IsReadOnlyList = argument => (
  IsObject(argument) && HasInternalSlot(argument, $TargetList)
);

const ListAddApply = (list, argumentsList) => {
  const array = RequireInternalSlot(list, $ListArray);
  if (argumentsList == null) {
    return false;
  }
  RequireArgumentsList(argumentsList);
  const argumentCount = ToLength(argumentsList.length);
  if (!argumentCount) {
    return false;
  }
  const size = array.length;
  let index = size;
  for (let i = 0; i < argumentCount; i++) {
    array[index++] = argumentsList[i];
  }
  return true;
}

const ListAdd = (list, ...values) => ListAddApply(list, values);

const ListAll = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, list]);
    if (!truthy) {
      return false;
    }
  }
  return true;
}

const ListAny = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, list]);
    if (truthy) {
      return true;
    }
  }
  return false;
}

const ListAsReadOnly = list => new ReadOnlyList(list);

const ListClear = list => {
  const array = RequireInternalSlot(list, $ListArray);
  array.length = 0;
}

const ListClone = list => {
  const array = RequireInternalSlot(list, $ListArray);
  const destination = DuplicateArray(array);
  return CreateList(destination);
}

const ListContains = (list, value) => {
  const array = RequireInternalSlot(list, $ListArray);
  const size = array.length;
  if (value !== value) {
    for (let i = 0; i < size; i++) {
      const nextValue = array[i];
      if (nextValue !== nextValue) {
        return true;
      }
    }
  } else {
    for (let i = 0; i < size; i++) {
      const nextValue = array[i];
      if (nextValue === value) {
        return true;
      }
    }
  }
  return false;
}

const ListCount = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  let count = 0;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, list]);
    if (truthy) {
      count++;
    }
  }
  return count;
}

const ListEntries = list => {
  const array = RequireInternalSlot(list, $ListArray);
  const arrayIterator = ArrayEntries(array);
  const listIterator = ObjectCreate(ListIteratorPrototype);
  SetInternalSlot(listIterator, $ListArrayIterator, arrayIterator);
  return listIterator;
}

const ListEquals = (list, other) => {
  const array = RequireInternalSlot(list, $ListArray);
  if (list === other) {
    return true;
  }
  if (!IsObject(other)) {
    return false;
  }
  let otherArray = GetInternalSlot(other, $ListArray);
  if (!otherArray) {
    const otherList = GetInternalSlot(other, $TargetList);
    if (!otherList) {
      return false;
    }
    if (list === otherList) {
      return true;
    }
    otherArray = GetInternalSlot(otherList, $ListArray);
  }
  return otherArray ? CompareArrays(array, otherArray) : false;
}

const ListFilter = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  const destination = [];
  let index = 0;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, list]);
    if (truthy) {
      destination[index++] = value;
    }
  }
  return CreateList(destination);
}

const ListFind = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, list]);
    if (truthy) {
      return value;
    }
  }
  return undefined;
}

const ListFindIndex = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, list]);
    if (truthy) {
      return i;
    }
  }
  return -1;
}

const ListFindLast = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  let lastIndex = array.length - 1;
  while (lastIndex >= 0 && lastIndex < array.length) {
    const value = array[lastIndex];
    const truthy = ReflectApply(predicate, null, [value, lastIndex, list]);
    if (truthy) {
      return value;
    }
    lastIndex--;
  }
  return undefined;
}

const ListFindLastIndex = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  let lastIndex = array.length - 1;
  while (lastIndex >= 0 && lastIndex < array.length) {
    const value = array[lastIndex];
    const truthy = ReflectApply(predicate, null, [value, lastIndex, list]);
    if (truthy) {
      return lastIndex;
    }
    lastIndex--;
  }
  return -1;
}

const ListForEach = (list, callback) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequireCallbackCallable(callback);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    ReflectApply(callback, null, [value, i, list]);
  }
}

const ListGet = (list, index) => {
  const array = RequireInternalSlot(list, $ListArray);
  index = ToIntegerOrInfinity(index);
  const size = array.length;
  if (index < 0) {
    index += size;
  }
  return index >= 0 && index < size ? array[index] : undefined;
}

const ListIndexOf = (list, value, fromIndex) => {
  const array = RequireInternalSlot(list, $ListArray);
  fromIndex = ToIntegerOrInfinity(fromIndex);
  const size = array.length;
  if (fromIndex < 0) {
    fromIndex += size;
  }
  if (fromIndex < 0 || fromIndex >= size) {
    return -1;
  }
  if (value !== value) {
    while (fromIndex < size) {
      const nextValue = array[fromIndex];
      if (nextValue !== nextValue) {
        return fromIndex;
      }
      fromIndex++;
    }
  } else {
    while (fromIndex < size) {
      const nextValue = array[fromIndex];
      if (nextValue === value) {
        return fromIndex;
      }
      fromIndex++;
    }
  }
  return -1;
}

const ListInsertApply = (list, index, argumentsList) => {
  const array = RequireInternalSlot(list, $ListArray);
  index = ToIntegerOrInfinity(index);
  if (argumentsList == null) {
    return false;
  }
  RequireArgumentsList(argumentsList);
  const argumentCount = ToLength(argumentsList.length);
  if (!argumentCount) {
    return false;
  }
  const size = array.length;
  if (index < 0) {
    index += size;
    if (index < 0) {
      index = 0;
    }
  } else if (index > size) {
    index = size;
  }
  const length = size + argumentCount;
  array.length = length;
  let lastIndex = size - 1;
  let offset = length - 1;
  while (lastIndex >= index) {
    array[offset--] = array[lastIndex--];
  }
  for (let i = 0; i < argumentCount; i++) {
    array[index++] = argumentsList[i];
  }
  return true;
}

const ListInsert = (list, index, ...values) => ListInsertApply(
  list, index, values
);

const ListIsEmpty = list => !ListSize(list);

const ListKeys = list => {
  const array = RequireInternalSlot(list, $ListArray);
  const arrayIterator = ArrayKeys(array);
  const listIterator = ObjectCreate(ListIteratorPrototype);
  SetInternalSlot(listIterator, $ListArrayIterator, arrayIterator);
  return listIterator;
}

const ListLastIndexOf = (list, value, fromIndex) => {
  const array = RequireInternalSlot(list, $ListArray);
  const size = array.length;
  const lastIndex = size - 1;
  if (fromIndex === undefined) {
    fromIndex = lastIndex;
  } else {
    fromIndex = ToIntegerOrInfinity(fromIndex);
    if (fromIndex < 0) {
      fromIndex += size;
      if (fromIndex < 0) {
        return -1;
      }
    } else if (fromIndex >= size) {
      fromIndex = lastIndex;
    }
  }
  if (value !== value) {
    while (fromIndex >= 0) {
      const nextValue = array[fromIndex];
      if (nextValue !== nextValue) {
        return fromIndex;
      }
      fromIndex--;
    }
  } else {
    while (fromIndex >= 0) {
      const nextValue = array[fromIndex];
      if (nextValue === value) {
        return fromIndex;
      }
      fromIndex--;
    }
  }
  return -1;
}

const ListMap = (list, callback) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequireCallbackCallable(callback);
  const size = array.length;
  const destination = [];
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    destination[i] = ReflectApply(callback, null, [value, i, list]);
  }
  return CreateList(destination);
}

const ListRemove = (list, value, fromIndex) => {
  const array = RequireInternalSlot(list, $ListArray);
  fromIndex = ToIntegerOrInfinity(fromIndex);
  const size = array.length;
  if (fromIndex < 0) {
    fromIndex += size;
  }
  if (fromIndex < 0 || fromIndex >= size) {
    return false;
  }
  let removable;
  if (value !== value) {
    while (fromIndex < size) {
      const nextValue = array[fromIndex];
      if (nextValue !== nextValue) {
        removable = true;
        break;
      }
      fromIndex++;
    }
  } else {
    while (fromIndex < size) {
      const nextValue = array[fromIndex];
      if (nextValue === value) {
        removable = true;
        break;
      }
      fromIndex++;
    }
  }
  if (!removable) {
    return false;
  }
  const lastIndex = size - 1;
  while (fromIndex < lastIndex) {
    array[fromIndex++] = array[fromIndex];
  }
  array.length = lastIndex;
  return true;
}

const ListRemoveAll = (list, predicate) => {
  const array = RequireInternalSlot(list, $ListArray);
  RequirePredicateCallable(predicate);
  const size = array.length;
  let index = 0;
  let removedCount = 0;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, list]);
    if (truthy) {
      removedCount++;
    } else {
      if (removedCount) {
        array[index] = value;
      }
      index++;
    }
  }
  if (removedCount) {
    array.length = index;
  }
  return removedCount;
}

const ListRemoveAt = (list, index) => {
  const array = RequireInternalSlot(list, $ListArray);
  index = ToIntegerOrInfinity(index);
  const size = array.length;
  if (index < 0) {
    index += size;
  }
  if (index < 0 || index >= size) {
    return false;
  }
  const lastIndex = size - 1;
  while (index < lastIndex) {
    array[index++] = array[index];
  }
  array.length = lastIndex;
  return true;
}

const ListReverse = (list, start, end) => {
  const array = RequireInternalSlot(list, $ListArray);
  start = ToIntegerOrInfinity(start);
  const size = array.length;
  if (start === -Infinity) {
    start = 0;
  } else if (start < 0) {
    start += size;
    if (start < 0) {
      start = 0
    }
  }
  if (end === undefined) {
    end = size;
  } else {
    end = ToIntegerOrInfinity(end);
    if (end === -Infinity) {
      end = 0;
    } else if (end < 0) {
      end += size;
    } else if (end > size) {
      end = size;
    }
  }
  while (start < end) {
    const value = array[start];
    array[start++] = array[--end];
    array[end] = value;
  }
}

const ListSet = (list, index, value) => {
  const array = RequireInternalSlot(list, $ListArray);
  index = ToIntegerOrInfinity(index);
  const size = array.length;
  if (index < 0) {
    index += size;
  }
  if (index < 0 || index >= size) {
    return false;
  }
  array[index] = value;
  return true;
}

const ListSize = list => {
  const array = RequireInternalSlot(list, $ListArray);
  return array.length;
}

const ListSlice = (list, start, end) => {
  const array = RequireInternalSlot(list, $ListArray);
  start = ToIntegerOrInfinity(start);
  const size = array.length;
  if (start === -Infinity) {
    start = 0;
  } else if (start < 0) {
    start += size;
    if (start < 0) {
      start = 0
    }
  }
  if (end === undefined) {
    end = size;
  } else {
    end = ToIntegerOrInfinity(end);
    if (end === -Infinity) {
      end = 0;
    } else if (end < 0) {
      end += size;
    } else if (end > size) {
      end = size;
    }
  }
  if (start > end) {
    start = end;
  }
  const destination = new Array(end - start);
  let index = 0;
  while (start < end) {
    destination[index++] = array[start++];
  }
  return CreateList(destination);
}

const ListToArray = list => {
  const array = RequireInternalSlot(list, $ListArray);
  return DuplicateArray(array);
}

const ListToImmutableList = list => {
  const array = RequireInternalSlot(list, $ListArray);
  if (!array.length) {
    return ImmutableListEMPTY;
  }
  const destination = DuplicateArray(array);
  return CreateImmutableList(destination);
}

const ListValues = list => {
  const array = RequireInternalSlot(list, $ListArray);
  const arrayIterator = ArrayValues(array);
  const listIterator = ObjectCreate(ListIteratorPrototype);
  SetInternalSlot(listIterator, $ListArrayIterator, arrayIterator);
  return listIterator;
}

const ListIteratorNext = listIterator => {
  const arrayIterator = RequireInternalSlot(listIterator, $ListArrayIterator);
  return ArrayIteratorNext(arrayIterator);
}

const ReadOnlyListAll = (readOnlyList, predicate) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequirePredicateCallable(predicate);
  const array = GetInternalSlot(list, $ListArray);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, readOnlyList]);
    if (!truthy) {
      return false;
    }
  }
  return true;
}

const ReadOnlyListAny = (readOnlyList, predicate) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequirePredicateCallable(predicate);
  const array = GetInternalSlot(list, $ListArray);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, readOnlyList]);
    if (truthy) {
      return true;
    }
  }
  return false;
}

const ReadOnlyListClone = readOnlyList => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListClone(list);
}

const ReadOnlyListContains = (readOnlyList, value) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListContains(list, value);
}

const ReadOnlyListCount = (readOnlyList, predicate) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequirePredicateCallable(predicate);
  const array = GetInternalSlot(list, $ListArray);
  const size = array.length;
  let count = 0;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, readOnlyList]);
    if (truthy) {
      count++;
    }
  }
  return count;
}

const ReadOnlyListEntries = readOnlyList => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListEntries(list);
}

const ReadOnlyListEquals = (readOnlyList, other) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListEquals(list, other);
}

const ReadOnlyListFilter = (readOnlyList, predicate) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequirePredicateCallable(predicate);
  const array = GetInternalSlot(list, $ListArray);
  const size = array.length;
  const destination = [];
  let index = 0;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, readOnlyList]);
    if (truthy) {
      destination[index++] = value;
    }
  }
  return CreateList(destination);
}

const ReadOnlyListFind = (readOnlyList, predicate) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequirePredicateCallable(predicate);
  const array = GetInternalSlot(list, $ListArray);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, readOnlyList]);
    if (truthy) {
      return value;
    }
  }
  return undefined;
}

const ReadOnlyListFindIndex = (readOnlyList, predicate) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequirePredicateCallable(predicate);
  const array = GetInternalSlot(list, $ListArray);
  const size = array.length;
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    const truthy = ReflectApply(predicate, null, [value, i, readOnlyList]);
    if (truthy) {
      return i;
    }
  }
  return -1;
}

const ReadOnlyListFindLast = (readOnlyList, predicate) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequirePredicateCallable(predicate);
  const array = GetInternalSlot(list, $ListArray);
  let lastIndex = array.length - 1;
  while (lastIndex >= 0 && lastIndex < array.length) {
    const value = array[lastIndex];
    const truthy = ReflectApply(
      predicate, null, [value, lastIndex, readOnlyList]
    );
    if (truthy) {
      return value;
    }
    lastIndex--;
  }
  return undefined;
}

const ReadOnlyListFindLastIndex = (readOnlyList, predicate) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequirePredicateCallable(predicate);
  const array = GetInternalSlot(list, $ListArray);
  let lastIndex = array.length - 1;
  while (lastIndex >= 0 && lastIndex < array.length) {
    const value = array[lastIndex];
    const truthy = ReflectApply(
      predicate, null, [value, lastIndex, readOnlyList]
    );
    if (truthy) {
      return lastIndex;
    }
    lastIndex--;
  }
  return -1;
}

const ReadOnlyListForEach = (readOnlyList, callback) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequireCallbackCallable(callback);
  const array = GetInternalSlot(list, $ListArray);
  const size = array.length;
  for (let i = 0; i < size; i++) {
    const value = array[i];
    ReflectApply(callback, null, [value, i, readOnlyList]);
  }
}

const ReadOnlyListGet = (readOnlyList, index) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListGet(list, index);
}

const ReadOnlyListIndexOf = (readOnlyList, value, fromIndex) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListIndexOf(list, value, fromIndex);
}

const ReadOnlyListIsEmpty = readOnlyList => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListIsEmpty(list);
}

const ReadOnlyListKeys = readOnlyList => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListKeys(list);
}

const ReadOnlyListLastIndexOf = (readOnlyList, value, fromIndex) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListLastIndexOf(list, value, fromIndex);
}

const ReadOnlyListMap = (readOnlyList, callback) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  RequireCallbackCallable(callback);
  const array = GetInternalSlot(list, $ListArray);
  const size = array.length;
  const destination = [];
  for (let i = 0; i < size && i < array.length; i++) {
    const value = array[i];
    destination[i] = ReflectApply(callback, null, [value, i, readOnlyList]);
  }
  return CreateList(destination);
}

const ReadOnlyListSize = readOnlyList => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListSize(list);
}

const ReadOnlyListSlice = (readOnlyList, start, end) => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListSlice(list, start, end);
}

const ReadOnlyListToArray = readOnlyList => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListToArray(list);
}

const ReadOnlyListToImmutableList = readOnlyList => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListToImmutableList(list);
}

const ReadOnlyListValues = readOnlyList => {
  const list = RequireInternalSlot(readOnlyList, $TargetList);
  return ListValues(list);
}

const ListIteratorPrototype = ObjectCreate(IteratorPrototype, {
  next: {
    value: function next() {
      return ListIteratorNext(this);
    }
  }
});
ReflectDefineProperty(ListIteratorPrototype, SymbolToStringTag, {
  value: 'List Iterator'
});

class List {
  static of(...values) {
    const array = DuplicateArray(values);
    return CreateList(array);
  }

  constructor(iterable) {
    const array = [];
    if (iterable != null) {
      RequireIterableObject(iterable);
      let index = 0;
      for (const value of iterable) {
        array[index++] = value;
      }
    }
    SetInternalSlot(this, $ListArray, array);
  }

  get isEmpty() {
    return ListIsEmpty(this);
  }

  get size() {
    return ListSize(this);
  }

  add(...values) {
    ListAddApply(this, values);
    return this;
  }

  all(predicate) {
    return ListAll(this, predicate);
  }

  any(predicate) {
    return ListAny(this, predicate);
  }

  asReadOnly() {
    return ListAsReadOnly(this);
  }

  clear() {
    return ListClear(this);
  }

  clone() {
    return ListClone(this);
  }

  contains(value) {
    return ListContains(this, value);
  }

  count(predicate) {
    return ListCount(this, predicate);
  }

  entries() {
    return ListEntries(this);
  }

  equals(otherList) {
    return ListEquals(this, otherList);
  }

  filter(predicate) {
    return ListFilter(this, predicate);
  }

  find(predicate) {
    return ListFind(this, predicate);
  }

  findIndex(predicate) {
    return ListFindIndex(this, predicate);
  }

  findLast(predicate) {
    return ListFindLast(this, predicate);
  }

  findLastIndex(predicate) {
    return ListFindLastIndex(this, predicate);
  }

  forEach(callback) {
    return ListForEach(this, callback);
  }

  get(index) {
    return ListGet(this, index);
  }

  indexOf(value, fromIndex) {
    return ListIndexOf(this, value, fromIndex);
  }

  insert(index, ...values) {
    ListInsertApply(this, index, values);
    return this;
  }

  keys() {
    return ListKeys(this);
  }

  lastIndexOf(value, fromIndex) {
    return ListLastIndexOf(this, value, fromIndex);
  }

  map(callback) {
    return ListMap(this, callback);
  }

  remove(value, fromIndex) {
    return ListRemove(this, value, fromIndex);
  }

  removeAll(predicate) {
    return ListRemoveAll(this, predicate);
  }

  removeAt(index) {
    return ListRemoveAt(this, index);
  }

  reverse(start, end) {
    ListReverse(this, start, end);
    return this;
  }

  set(index, value) {
    ListSet(this, index, value);
    return this;
  }

  slice(start, end) {
    return ListSlice(this, start, end);
  }

  toArray() {
    return ListToArray(this);
  }

  toImmutableList() {
    return ListToImmutableList(this);
  }

  values() {
    return ListValues(this);
  }
}
ReflectDefineProperty(List, SymbolHasInstance, {
  value: IsList
});

const ListOf = List.of;
const ListPrototype = List.prototype;
const ListPrototypeValues = ListPrototype.values;
ReflectDefineProperty(ListPrototype, SymbolIterator, {
  value: ListPrototypeValues
});
ReflectDefineProperty(ListPrototype, SymbolToStringTag, {
  value: 'List'
});

class ReadOnlyList {
  constructor(target) {
    if (!IsList(target)) {
      throw new TypeError('target is not an instance of List');
    }
    SetInternalSlot(this, $TargetList, target);
  }

  get isEmpty() {
    return ReadOnlyListIsEmpty(this);
  }

  get size() {
    return ReadOnlyListSize(this);
  }

  all(predicate) {
    return ReadOnlyListAll(this, predicate);
  }

  any(predicate) {
    return ReadOnlyListAny(this, predicate);
  }

  clone() {
    return ReadOnlyListClone(this);
  }

  contains(value) {
    return ReadOnlyListContains(this, value);
  }

  count(predicate) {
    return ReadOnlyListCount(this, predicate);
  }

  entries() {
    return ReadOnlyListEntries(this);
  }

  equals(other) {
    return ReadOnlyListEquals(this, other);
  }

  filter(predicate) {
    return ReadOnlyListFilter(this, predicate);
  }

  find(predicate) {
    return ReadOnlyListFind(this, predicate);
  }

  findIndex(predicate) {
    return ReadOnlyListFindIndex(this, predicate);
  }

  findLast(predicate) {
    return ReadOnlyListFindLast(this, predicate);
  }

  findLastIndex(predicate) {
    return ReadOnlyListFindLastIndex(this, predicate);
  }

  forEach(callback) {
    return ReadOnlyListForEach(this, callback);
  }

  get(index) {
    return ReadOnlyListGet(this, index);
  }

  indexOf(value, fromIndex) {
    return ReadOnlyListIndexOf(this, value, fromIndex);
  }

  keys() {
    return ReadOnlyListKeys(this);
  }

  lastIndexOf(value, fromIndex) {
    return ReadOnlyListLastIndexOf(this, value, fromIndex);
  }

  map(callback) {
    return ReadOnlyListMap(this, callback);
  }

  slice(start, end) {
    return ReadOnlyListSlice(this, start, end);
  }

  toArray() {
    return ReadOnlyListToArray(this);
  }

  toImmutableList() {
    return ReadOnlyListToImmutableList(this);
  }

  values() {
    return ReadOnlyListValues(this);
  }
}
ReflectDefineProperty(ReadOnlyList, SymbolHasInstance, {
  value: IsReadOnlyList
});

const ReadOnlyListPrototype = ReadOnlyList.prototype;
const ReadOnlyListPrototypeValues = ReadOnlyListPrototype.values;
ReflectDefineProperty(ReadOnlyListPrototype, SymbolIterator, {
  value: ReadOnlyListPrototypeValues
});
ReflectDefineProperty(ReadOnlyListPrototype, SymbolToStringTag, {
  value: 'ReadOnlyList'
});

class ImmutableList {
  static of(...values) {
    if (!values.length) {
      return ImmutableListEMPTY;
    }
    const array = DuplicateArray(values);
    return CreateImmutableList(array);
  }

  constructor(iterable) {
    if (iterable == null) {
      return ImmutableListEMPTY;
    }
    RequireIterableObject(iterable);
    const array = [];
    let index = 0;
    for (const value of iterable) {
      array[index++] = value;
    }
    if (!index) {
      return ImmutableListEMPTY;
    }
    SetInternalSlot(this, $ImmutableListArray, array);
  }

  get isEmpty() {
    return ImmutableListIsEmpty(this);
  }

  get size() {
    return ImmutableListSize(this);
  }

  add(...values) {
    return ImmutableListAddApply(this, values);
  }

  all(predicate) {
    return ImmutableListAll(this, predicate);
  }

  any(predicate) {
    return ImmutableListAny(this, predicate);
  }

  clear() {
    return ImmutableListClear(this);
  }

  contains(value) {
    return ImmutableListContains(this, value);
  }

  count(predicate) {
    return ImmutableListCount(this, predicate);
  }

  entries() {
    return ImmutableListEntries(this);
  }

  equals(other) {
    return ImmutableListEquals(this, other);
  }

  filter(predicate) {
    return ImmutableListFilter(this, predicate);
  }

  find(predicate) {
    return ImmutableListFind(this, predicate);
  }

  findIndex(predicate) {
    return ImmutableListFindIndex(this, predicate);
  }

  findLast(predicate) {
    return ImmutableListFindLast(this, predicate);
  }

  findLastIndex(predicate) {
    return ImmutableListFindLastIndex(this, predicate);
  }

  forEach(callback) {
    return ImmutableListForEach(this, callback);
  }

  get(index) {
    return ImmutableListGet(this, index);
  }

  indexOf(value, fromIndex) {
    return ImmutableListIndexOf(this, value, fromIndex);
  }

  insert(index, ...values) {
    return ImmutableListInsertApply(this, index, values);
  }

  keys() {
    return ImmutableListKeys(this);
  }

  lastIndexOf(value, fromIndex) {
    return ImmutableListLastIndexOf(this, value, fromIndex);
  }

  map(callback) {
    return ImmutableListMap(this, callback);
  }

  remove(value, fromIndex) {
    return ImmutableListRemove(this, value, fromIndex);
  }

  removeAll(predicate) {
    return ImmutableListRemoveAll(this, predicate);
  }

  removeAt(index) {
    return ImmutableListRemoveAt(this, index);
  }

  reverse(start, end) {
    return ImmutableListReverse(this, start, end);
  }

  set(index, value) {
    return ImmutableListSet(this, index, value);
  }

  slice(start, end) {
    return ImmutableListSlice(this, start, end);
  }

  toArray() {
    return ImmutableListToArray(this);
  }

  toList() {
    return ImmutableListToList(this);
  }

  values() {
    return ImmutableListValues(this);
  }
}
ReflectDefineProperty(ImmutableList, SymbolHasInstance, {
  value: IsImmutableList
});

const ImmutableListOf = ImmutableList.of;
const ImmutableListPrototype = ImmutableList.prototype;
const ImmutableListPrototypeValues = ImmutableListPrototype.values;
ReflectDefineProperty(ImmutableListPrototype, SymbolIterator, {
  value: ImmutableListPrototypeValues
});
ReflectDefineProperty(ImmutableListPrototype, SymbolToStringTag, {
  value: 'ImmutableList'
});

const ImmutableListEMPTY = CreateImmutableList([]);
ReflectDefineProperty(ImmutableList, 'EMPTY', {
  value: ImmutableListEMPTY
});

const Collections = ObjectCreate(ObjectPrototype, {
  ImmutableList: {
    value: ImmutableList
  },
  List: {
    value: List
  },
  ReadOnlyList: {
    value: ReadOnlyList
  }
});
ReflectDefineProperty(Collections, SymbolToStringTag, {
  value: 'Collections'
});

module.exports = {
  Collections,
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
  ImmutableListMap,
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
  ListMap,
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
  ReadOnlyListMap,
  ReadOnlyListSize,
  ReadOnlyListToArray,
  ReadOnlyListToImmutableList,
  ReadOnlyListValues
};
