import { useState, useEffect } from 'react';
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
function useAxios(baseUrl, formatter) {
  const [dataArr, setDataArr] = useState([]);

  /** addData: Makes an axios request with the baseUrl and optional urlResource
   * and adds it to the state array.
   */
  async function addData(urlResource="") {
    const response = await axios.get(`${baseUrl}/${urlResource}`);
    let formattedData = formatter(response.data);
    setDataArr(data => [...data, { ...formattedData, id: uuid() }]);
    console.log("here is your new formatted data: ", dataArr);
  }

  /**removeData: remove data from dataArr state */
  function removeData(){
    setDataArr([]);
  }

  return [dataArr, addData, removeData];
}

// add cardData to local storage
function useLocalStorage(key, initialValue){
  const [items, setItems] = useState([]);
  let itemData = window.localStorage.getItem(key);
  if(itemData){
    setItems(itemData);
  }else{
    window.localStorage.setItem(key, initialValue);
    setItems(initialValue);
  }

  function addItem(items){
    setItems(itemsArray => [...itemsArray, { ...items }]);
  }
  
  useEffect(() => {
    window.localStorage.setItem(key, items);
  }, [items, key]);

  return [items, addItem];

}

export { useFlip, useAxios, useLocalStorage };