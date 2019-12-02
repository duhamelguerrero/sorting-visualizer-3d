import { map } from "./map";
import uuidv4 from "uuid/v4";

export const getRandomCubes = amount => {
  return [...new Array(amount)].reduce((obj, _, index) => {
    const id = uuidv4();
    const height = Math.floor(map(Math.random(), 0, 1, 20, 150));

    obj[id] = {
      id,
      order: index,
      color: "green",
      height: height,
      position: {
        x: 1,
        y: height / 40,
        z: 1
      }
    };

    return obj;
  }, {});
};
