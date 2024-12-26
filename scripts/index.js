// CHILD COMPOUND VARIABLES
let birthDay = null
let birthMonth = null
let birthHour = null
let birthMinute = null
//CHILD COMPLETE VARIABLES
let birthWeight = null
let birthDate = null
let gestationDay = null
let gestationWeek = null
//LAB COMPOUND VARIABLES
let labDay = null
let labMonth = null
let labHour = null
let labMinute = null
//LAB COMPLETE VARIABLES
let labValue = null
let labDate = null
//LAB COLLECTION
let labCollection = {
    // date: value
    //TODO LAG Key:Value når man danner ul elemenet. Indeksering for fjerning?
}

document.addEventListener("DOMContentLoaded", function() {
    //Validate input on blur event
    let inputs = document.getElementsByTagName("input")
    for (let input of inputs) {input.addEventListener("keydown", validate)}
    let addButton = document.getElementById("add-lab")
    addButton.addEventListener("click", addLab)
    let aboutButton = document.getElementById("about-us-info")
    aboutButton.addEventListener("click", aboutUs)
})


//INPUT MASKING
Inputmask("999[9]g").mask("birth-weight")
Inputmask("99/99").mask("birthtime-date")
Inputmask("99:99").mask("birthtime-time")
Inputmask("99/99").mask("lab-date")
Inputmask("99:99").mask("lab-time")
Inputmask("99u").mask("gestation-week")
Inputmask("9d").mask("gestation-day")
Inputmask("99[9] µmol/L").mask("bilirubin-value")

//VALIDATION ARRAYS
let validDays = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
let validMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
let validHours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
let validMinutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]

//Auto-next on input completion
const numberOfCharForCompletion = {
    "birth-weight": 4,
    "birthtime-date": 4,
    "birthtime-time": 4,
    "gestation-week": 2,
    "gestation-day": 1,
    "lab-date": 4,
    "lab-time": 4,
    "bilirubin-value": 3
}

const nextInputElement = {
    "birth-weight": "birthtime-date",
    "birthtime-date": "birthtime-time",
    "birthtime-time": "gestation-week",
    "gestation-week": "gestation-day",
    "gestation-day": "lab-date",
    "lab-date": "lab-time",
    "lab-time": "bilirubin-value",
    "bilirubin-value": "add-lab"
}

//todo change from input to tabable: https://stackoverflow.com/questions/7208161/focus-next-element-in-tab-index
let inputs = document.getElementsByTagName("input")
Array.from(inputs).forEach(function(input) {
    input.addEventListener("keyup", function(event) {
        if (countDigitsInString(input.value) === numberOfCharForCompletion[input.id] && document.getElementById(input.id).classList.contains("valid-input")) {
            document.getElementById(nextInputElement[input.id]).focus()
            input.removeEventListener("keyup", function() {})
        }
        })
    });

function countDigitsInString(string) {
    return string.replace(/[^0-9]/g, '').length;
}

//VALIDATE INPUTS AFTER BLUR
function validate() {

    //REMOVE MASKING + VALIDATING INPUT
    //FOR BIRTHDATE
    if (this.id == "birthtime-date") {
        //SPLIT AND SAVE DATE VARIABLES
        birthDay = this.value.slice(0, 2) // get days
        birthMonth = this.value.slice(3, 5) // get months
        //VALIDATE DATE
        if (validDays.includes(birthDay) && validMonths.includes(birthMonth)) {
            this.classList.add("valid-input")
            this.classList.remove("invalid-input")
            convertToDateTime()
        } else {
            this.classList.add("invalid-input")
            this.classList.remove("valid-input")
        }
        //FOR LABDATE
    } else if (this.id == "lab-date") {
        //SPLIT AND SAVE DATE VARIABLES
        labDay = this.value.slice(0, 2)
        labMonth = this.value.slice(3, 5)
        //VALIDATE DATE
        if (validDays.includes(labDay) && validMonths.includes(labMonth)) {
            this.classList.add("valid-input")
            this.classList.remove("invalid-input")
            convertToDateTime()
        } else {
            this.classList.add("invalid-input")
            this.classList.remove("valid-input")
        }
        //FOR BIRTH TIME
    } else if (this.id == "birthtime-time") {
        //SPLIT AND SAVE TIME VARIABLES
        birthHour = this.value.slice(0, 2)
        birthMinute = this.value.slice(3, 5)
        //VALIDATE TIME
        if (birthHour <= 23 && birthHour >= 0 && birthMinute <= 59 && birthMinute > 0) {
            //Add birthtime to global variable
            this.classList.add("valid-input")
            this.classList.remove("invalid-input")
            convertToDateTime()
        } else {
            this.classList.add("invalid-input")
            this.classList.remove("valid-input")
        }
        //FOR LAB TIME
    } else if (this.id == "lab-time") {
        //SPLIT AND SAVE TIME VARIABLES
        labHour = this.value.slice(0, 2)
        labMinute = this.value.slice(3, 5)
        //VALIDATE TIME
        if (labHour <= 23 && labHour >= 0 && labMinute <= 59 && labMinute > 0) {
            //Add birthtime to global variable
            this.classList.add("valid-input")
            this.classList.remove("invalid-input")
            convertToDateTime()
        } else {
            this.classList.add("invalid-input")
            this.classList.remove("valid-input")
        }

        //FOR BIRTHWEIGHT
    } else if (this.value.includes("g")) {
        //CONVERT TO INTEGER(REMOVE ENDING, DECIMAL SYSTEM)
        birthWeight = parseInt(this.value.replace(/g|u|d| µmol\/L|/g, ''),10)
        if (birthWeight >= 500 && birthWeight < 7500) {
            this.classList.add("valid-input")
            this.classList.remove("invalid-input")
        } else {
            this.classList.add("invalid-input")
            this.classList.remove("valid-input")
        }
        //FOR GESTATIONAL DAYS
    } else if (this.value.includes("d")) {
        gestationDay = parseInt(this.value.replace(/g|u|d| µmol\/L|/g, ''),10)
        if (gestationDay <= 6 && gestationDay >= 0) {
            this.classList.add("valid-input")
            this.classList.remove("invalid-input")
        } else {
            this.classList.add("invalid-input")
            this.classList.remove("valid-input")
        }
        //FOR GESTATIONAL WEEKS
    } else if (this.value.includes("u")) {
        gestationWeek = parseInt(this.value.replace(/g|u|d| µmol\/L|/g, ''),10)
        console.log(gestationWeek)
        if (gestationWeek <= 45 && gestationWeek >= 22) {
            this.classList.add("valid-input")
            this.classList.remove("invalid-input")
        } else {
            this.classList.add("invalid-input")
            this.classList.remove("valid-input")
        }
    } else if (this.value.includes(" µmol")) {
        labValue = parseInt(this.value.replace(/g|u|d| µmol\/L|/g, ''),10)
        if (labValue <= 1000 && labValue >= 0) {
            this.classList.add("valid-input")
            this.classList.remove("invalid-input")
        } else {
            this.classList.add("invalid-input")
            this.classList.remove("valid-input")
        }
    }
}
function convertToDateTime() {
    //CONVERT CHILD DATE
    if (birthMonth && birthDay && birthHour && birthMinute) {
        //CALCULATE MISSING YEAR INPUT
        const dateToday = new Date()
        let currentMonth = dateToday.getMonth() +1
        if (dateToday.getMonth() > birthMonth) {
            birthDate = new Date(dateToday.getFullYear() -1 + "-" + birthMonth + "-" + birthDay + "T" + birthHour + ":" + birthMinute)
        } else {
            birthDate = new Date(dateToday.getFullYear() + "-" + birthMonth + "-" + birthDay + "T" + birthHour + ":" + birthMinute)
        }
    }
    console.log(birthDate)
    //CONVERT LAB DATE
    if (labMonth && labDay && labHour && labMinute) {
        //CALCULATE MISSING YEAR INPUT
        const dateToday = new Date()
        let currentMonth = dateToday.getMonth() +1
        if (dateToday.getMonth() > labMonth) {
            labDate = new Date(dateToday.getFullYear() -1 + "-" + labMonth + "-" + labDay + "T" + labHour + ":" + labMinute)
        } else {
            labDate = new Date(dateToday.getFullYear() + "-" + labMonth + "-" + labDay + "T" + labHour + ":" + labMinute)
        }
    }
    console.log(labDate)
}

function addLab() {
    if (labDate && labDate) {
        const ul = document.getElementById("lab-list")
        //List element
        const li = document.createElement("li")
        li.classList.add("individual-lab")

        //Remove button
        const btn = document.createElement("button")
        btn.classList.add("remove-lab")
        const img = document.createElement("img")
        img.classList.add("individual-lab-remove")
        img.src = "assets/icons/fjern.svg"
        img.alt = "delete-icon"
        btn.appendChild(img)
        //ADD INPUT VALUES
        const lab = document.createElement("p")
        lab.innerText = labValue
        const date = document.createElement("p")
        date.innerText =("0" + labDate.getDate()).slice(-2)+"/"+("0" + (labDate.getMonth() + 1)).slice(-2)
        const time = document.createElement("p")
        time.innerText = labDate.getHours() + ":" + labDate.getMinutes()

        //APPEND ALL TO LI
        li.appendChild(btn)
        li.appendChild(lab)
        li.appendChild(date)
        li.appendChild(time)
        //APPEND LI TO HTML
        ul.appendChild(li)

        //RESET INPUT AND REMOVE ERROR MESSAGE & FOCUS ON INPUT
        resetLabInputs()
        document.getElementById("Lab-add-error").innerHTML = ""
        document.getElementById("lab-date").focus()
    } else {
        document.getElementById("Lab-add-error").innerHTML = "Fyll inn alle feltene"
    }
}
function resetLabInputs() {
    //RESET INPUT FIELDS
    const labDateInput = document.getElementById("lab-date")
    labDateInput.value = null
    labDateInput.classList.remove("valid-input")
    const labTimeInput = document.getElementById("lab-time")
    labTimeInput.value = null
    labTimeInput.classList.remove("valid-input")
    const bilirubinValueInput = document.getElementById("bilirubin-value")
    bilirubinValueInput.value = null
    bilirubinValueInput.classList.remove("valid-input")
    //RESET GLOBAL VARIABLES
    labDay = null
    labMonth = null
    labHour = null
    labMinute = null
    labValue = null
    labDate = null
}
function removelab() {
    const ul = document.getElementById("lab-list")
    ul.removeChild(ul.lastChild)
}

function aboutUs() {
    alert("Her kommer om oss, hvordan siden fungerer, samt en penere alert box når jeg får tid")
    //Todo Lag custom JS alert box med info og flowchart...
}