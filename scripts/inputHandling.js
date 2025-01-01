export {eventListeners, validatedLabInputs, validatedChildInputs}
import {updateGraph} from "./graphing.js";

let validatedChildInputs = {}
let validatedLabInputs = {}

//Initial event listeners
function eventListeners() {
    //Listen on keyup
    document.getElementById("main").addEventListener("keyup", function(event) {
        inputHandling(event.target.id, event.target.value)
    })
    document.getElementById("add-lab").addEventListener("click",function() {console.log("todo")}) //todo Lab check())
}

//VALID INPUTS -> SAVE VALIDATED INPUT FROM ARRAY+ ADD CSS CLASS
function validInputClass(id, integer){
    let element = document.getElementById(id)
    element.classList.add("class", "valid-input");
    element.classList.remove("class", "invalid-input");
    (element.classList.contains("child-info-input"))?validatedChildInputs[id] = integer:validatedLabInputs[id] = integer;
}
//INVALID INPUTS -> DELETE VALIDATED INPUT FROM ARRAY +  CSS CLASS
function invalidInputClass(id) {
    let element = document.getElementById(id)
    element.classList.add("class", "invalid-input");
    element.classList.remove("class", "valid-input");
    (element.classList.contains("child-info-input"))?delete validatedChildInputs[id]:delete validatedLabInputs[id];
}

//CONVERT INPUT TO INTEGERS
function inputToIntegers(unformattedValue) {
    //Format values: remove masking and split minutes/hours & months/days
    let formattedValue = null
    if (/[gud]/.test(unformattedValue)) {
        formattedValue =  parseInt(unformattedValue.substring(0, unformattedValue.length - 1))
    } else if ((/µmol\/L/).test(unformattedValue)) {
        formattedValue =  parseInt(unformattedValue.substring(0, unformattedValue.length - 6))
    } else if (/[:/]/.test(unformattedValue)) {
        let ddhh = parseInt(unformattedValue.substring(0, 2)) // days or hours
        let mmmm = parseInt(unformattedValue.substring(3, 5)) // months or minutes
        formattedValue = [ddhh, mmmm]
    }
    console.log(formattedValue)
    return(formattedValue)
    // Validate value
}

//VALIDATE INPUTS
function validation(id, integer) {
    //Valid input ranges for each HTML ID
    const validationCriteria = {
        "birth-weight": [500, 7500],
        "date": [[1, 31],[1,12]],
        "time": [[0, 23],[0, 59]],
        "gestation-week": [22, 45],
        "gestation-day": [0, 6],
        "bilirubin-value": [0, 1000],
    }
    //Validate time/date input
    let sorting = id.includes("time")?"time":"date";
    if (id.includes("time")||id.includes("date")) {
        (integer != null
            &&  integer[0] >= validationCriteria[sorting][0][0]
            && integer[0] <= validationCriteria[sorting][0][1]
            && integer[1] >= validationCriteria[sorting][1][0]
            && integer[1] <= validationCriteria[sorting][1][1])
        ?validInputClass(id, integer):invalidInputClass(id);
    }
    //Validates all other inputs (gram/weeks/days/mikromol)
    else {
        (integer != null
        && integer >= validationCriteria[id][0]
        && integer <= validationCriteria[id][1]
        )?validInputClass(id, integer):invalidInputClass(id);
    }
    //CHECK IF ALL INPUTS FOR CHILD IS VALID
    validateChild()
}

// ON EVENT LISTEN KEY-UP FOR CHILD INFO:
function inputHandling(id, unformattedValue) {
    //CONVERT RAW INPUT TO INTEGERS -> VALIDATE INPUT
    validation(id, inputToIntegers(unformattedValue))
}

//IF ALL CHILD INPUTS ARE VALID: UPDATE GRAPHS
function validateChild() {
    if (Object.keys(validatedChildInputs).length === 5 ||
        Object.keys(validatedLabInputs).includes("birth-time" && "birth-date")) {
        updateGraph()
    }else {
        //todo: DELETE OLD GRAPH IF THINGS CHANGES
    }}


//TODO IMPLEMENT LABS