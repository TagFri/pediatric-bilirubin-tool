import {validatedLabInputs, validatedChildInputs} from "./validation.js";
export {addChildGraph, removeChildGraph, graphLab, basicGraph}

let childGraphedValues = {}
let labGraphedValues = {}

function basicGraph() {
    const ctx = document.getElementById('graph');
    new Chart(ctx, {
        type: 'line',
        data: {
            //Dates (0 = birthdate, each consequently +1day until 10(14?) days of age)
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            //One dataset = one line
            datasets: [
                {//LIGHT LIMIT
                label: "Lysgrense",
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
                }
                ]
        },

        options: {
            //Turn off animation on initilizing
            animation: false,
            plugins: {
                legend: {
                    //Turn on/off top-description for each graph
                    display: false
                },
                tooltip: {
                    //Turn on/off hover box on each datapoint
                    enabled: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function addChildGraph() {
    (childGraphedValues = validatedChildInputs)?console.log("nothing changed"):newGraph();
}

function newGraph() {
    childGraphedValues = validatedChildInputs

}

function removeChildGraph() {
    //todo
    console.log("removeChildGraph")
}

function graphLab() {
    labGraphedValues = validatedLabInputs

    console.log("graphLab")
}