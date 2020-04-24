import { useState } from 'react';
import uuid from "uuid";
import axios from 'axios';

/** useFlip: custom toggle hook switches state between true/false 
 * Returns an array of the state and the toggle function.
*/
function useFlip(initialValue=true) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue(v => !v);
  }

  return [value, toggle];
}

/** useAxios: custom hook for making axios requests which are stored in an array.
 * Takes a baseUrl which will be used for requests. Returns an array of the state
 * array and a function to make requests that will be added to that array.
 */
function useAxios(baseUrl) {
  const [dataArr, setDataArr] = useState([]);

  /** addData: Makes an axios request with the baseUrl and optional urlResource
   * and adds it to the state array.
   */
  async function addData(urlResource="") {
    const response = await axios.get(`${baseUrl}/${urlResource}`);
    setDataArr(data => [...data, { ...response.data, id: uuid() }]);
  }

  return [dataArr, addData];
}

export { useFlip, useAxios };