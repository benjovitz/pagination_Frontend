
import { handleHttpErrors,sanitizeStringWithTableRows } from "../../utils.js";
import { paginator } from "../../lib/paginator/paginate.js"
const URL = "http://localhost:8080/api/cars/"
const SIZE = 10;
let pageNo = 0

export async function initServerPag(){
    try {
        const response = await fetch(URL+`?size=${SIZE}&page=${pageNo}&sort=kilometers`).then(handleHttpErrors) 
        
        const cars = response.content
        TOTAL_RECORDS=response.totalElements        
        let tablerows = cars.map(c=>`
        <tr>
        <td>${c.brand}</td>
        <td>${c.model}</td>
        <td>${c.color}</td>
        <td>${c.kilometers}</td>
        <tr>`).join("")
        document.getElementById("tbody").innerHTML=sanitizeStringWithTableRows(tablerows)
        pageNo++    
    } catch (error) {
        console.log(error)
    }
}
let TOTAL_RECORDS = 1000
const TOTAL = Math.ceil(TOTAL_RECORDS / SIZE)
/*
  paginator({
    target: document.getElementById("car-paginator"),
    total: TOTAL,
    current: pageNo,
    click: initServerPag
  });
*/