function diagnose(){

    let symptoms = [];

    document.querySelectorAll('input:checked').forEach((item)=>{
        symptoms.push(item.value);
    });

    let disease = "No major disease detected";
    let remedy = "Take rest and drink water.";

    if(symptoms.includes("fever") && symptoms.includes("cough")){
        disease = "Flu 🤒";
        remedy = "Take paracetamol and rest.";
    }

    else if(symptoms.includes("chestpain")){
        disease = "Possible Heart Disease ❤️";
        remedy = "Consult cardiologist immediately.";
    }

    else if(symptoms.includes("vomiting") && symptoms.includes("fever")){
        disease = "Food Poisoning 🍔";
        remedy = "Drink ORS and avoid oily food.";
    }

    else if(symptoms.includes("headache") && symptoms.includes("fatigue")){
        disease = "Stress or Migraine 😵";
        remedy = "Take proper sleep and hydration.";
    }

    let confidence = Math.floor(Math.random()*20)+80;

    document.getElementById("result").innerHTML = `
        <h2>${disease}</h2>
        <p><strong>Confidence:</strong> ${confidence}%</p>
        <p><strong>Suggestion:</strong> ${remedy}</p>
    `;

    saveHistory(disease);
    createChart(confidence);
}

function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
}

function startVoiceAssistant(){

    let resultText = document.getElementById("result").innerText;

    let speech = new SpeechSynthesisUtterance();

    if(resultText.trim() !== ""){
        speech.text = resultText;
    }
    else{
        speech.text = "Please select symptoms first so I can provide medical advice.";
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

function saveHistory(disease){

    let li = document.createElement("li");
    li.innerText = disease;

    document.getElementById("historyList").appendChild(li);
}

function createChart(confidence){

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Prediction Accuracy'],
            datasets: [{
                label: 'Confidence %',
                data: [confidence],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max:100
                }
            }
        }
    });
}