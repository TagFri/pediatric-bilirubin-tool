export {eventListeners, validatedLabInputs, validatedChildInputs}
import {addLab, labError} from "./labHandling.js";
import {addChildGraph, removeChildGraph} from "./graphing.js";

let validatedChildInputs = {}
let validatedLabInputs = {}

//Initial event listeners
function eventListeners() {
    //Listen on keyup
    document.getElementById("main").addEventListener("keyup", function(event) {
        inputHandling(event.target.id, event.target.value)
    })
    document.getElementById("add-lab").addEventListener("click", addLabCheck())
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
    return(formattedValue)
    // Validate value
}

//Valid input ranges for each HTML ID
const validationCriteria = {
    "birth-weight": [500, 7500],
    "date": [[1, 31],[1,12]],
    "time": [[0, 23],[0, 59]],
    "gestation-week": [22, 45],
    "gestation-day": [0, 6],
    "bilirubin-value": [0, 1000],
}

//VALID INPUTS -> SAVE VALIDATED INPUT + ADD CSS CLASS
function addValidInput(id, integer){
    let element = document.getElementById(id)
    element.classList.add("class", "valid-input");
    element.classList.remove("class", "invalid-input");
    (element.classList.contains("child-info-input"))?validatedChildInputs[id] = integer:validatedLabInputs[id] = integer;
}
//INVALID INPUTS -> ADD CSS CLASS
function addInvalidInput(id) {
    let element = document.getElementById(id)
    element.classList.add("class", "invalid-input");
    element.classList.remove("class", "valid-input");
    (element.classList.contains("child-info-input"))?delete validatedChildInputs[id]:delete validatedLabInputs[id];
}

//VALIDATE INPUTS
function validation(id, integer) {
    //Validate time input
    if (id.includes("time")) {
        (integer != null
            &&integer[0] >= validationCriteria["time"][0][0]
            && integer[0] <= validationCriteria["time"][0][1]
            && integer[1] >= validationCriteria["time"][1][0]
            && integer[1] <= validationCriteria["time"][1][1]
        )?addValidInput(id, integer):addInvalidInput(id);
    } else if (id.includes("date")) {
        (integer != null
            &&integer[0] >= validationCriteria["date"][0][0]
            && integer[0] <= validationCriteria["date"][0][1]
            && integer[1] >= validationCriteria["date"][1][0]
            && integer[1] <= validationCriteria["date"][1][1]
        )?addValidInput(id, integer):addInvalidInput(id);
    }
    //Validates all other inputs (gram/weeks/days/mikromol)
    else {
        (integer != null
        && integer >= validationCriteria[id][0]
        && integer <= validationCriteria[id][1]
        )?addValidInput(id, integer):addInvalidInput(id);
    }
    validateChild()
}

function validateChild() {(Object.keys(validatedChildInputs).length === 5)?addChildGraph():removeChildGraph();}
function addLabCheck() {
    (Object.keys(validatedLabInputs).length === 3)?addLab():labError()
}
//INPUT HANDLING
function inputHandling(id, unformattedValue) {
    let formattedValues = inputToIntegers(unformattedValue)
    validation(id, formattedValues)
}