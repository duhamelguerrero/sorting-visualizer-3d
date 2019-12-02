import _ from "lodash";
import { setCubes, editCube } from "../actions/cubes.actions";

const defaultComparator = (a, b) => (a.height > b.height ? -1 : 1);

export const quickSort = (
  originalArray,
  dispatch,
  comparator = defaultComparator
) => {
  // immutable version
  const array = _.cloneDeep(originalArray);
  const animation = [];

  const swap = (leftIndex, rightIndex) => {
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;

    const newCubes = array.reduce((obj, el, index) => {
      obj[el.id] = {
        ...el,
        order: index
      };

      return obj;
    }, {});

    animation.push({
      animations: () => {
        dispatch(setCubes({ ...newCubes }));
      },
      time: 100
    });
  };
  const partition = (left, right) => {
    var pivot = array[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer

    animation.push({
      animations: () => {
        dispatch(
          editCube(pivot.id, {
            color: "red"
          })
        );
      },
      time: 300
    });

    while (i <= j) {
      while (array[i].height > pivot.height) {
        i++;
      }
      while (array[j].height < pivot.height) {
        j--;
      }
      if (i <= j) {
        swap(i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  };

  const recursiveSort = (left, right) => {
    if (array.length > 1) {
      const index = partition(left, right); //index returned from partition

      if (left < index - 1) {
        //more elements on the left side of the pivot
        recursiveSort(left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        recursiveSort(index, right);
      }
    }
    return array;
  };

  // Sort the entire array.
  recursiveSort(0, array.length - 1);
  return [array, animation];
};

export const bubbleSort = (
  originalArray,
  dispatch,
  comparator = defaultComparator
) => {
  // immutable version
  const array = _.cloneDeep(originalArray);
  const n = array.length;
  const animation = [];

  const swap = (leftIndex, rightIndex) => {
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;

    const newCubes = array.reduce((obj, el, index) => {
      obj[el.id] = {
        ...el,
        order: index
      };

      return obj;
    }, {});

    animation.push({
      animations: () => {
        dispatch(setCubes({ ...newCubes }));
      },
      time: 100
    });
  };

  // A function to implement bubble sort
  const bubbleSort = () => {
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (comparator(array[j], array[j + 1]) === 1) swap(j, j + 1);
      }
    }
  };

  bubbleSort();
  return [array, animation];
};
