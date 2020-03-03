async function get_pred(text) {
    const threshold = 0.9;
    toxicity.load(threshold).then(model => {
        const sentences = [text];
        model.classify(sentences).then(predictions => {
            var flag = false;
            console.log(predictions);
            for (i = 0; i < 7; i++) {
                if (predictions[i].results[0].match) {
                    var div = document.getElementById("pred");
                    var alert = document.createElement("div");
                    alert.appendChild(document.createTextNode(predictions[i].label +
                        " was found in your sentence"))
                    alert.setAttribute("class", "alert alert-warning");
                    alert.setAttribute("role", "alert")
                    div.appendChild(alert);
                    flag = true;
                }
            }
            if (!flag) {
                console.log("No Toxicity was Found in Your sentence.");
                var div = document.getElementById("pred");
                var alert = document.createElement("div");
                alert.appendChild(document.createTextNode("No Toxicity was Found in your sentence."))
                alert.setAttribute("class", "alert alert-success");
                alert.setAttribute("role", "alert")
                div.appendChild(alert);
            }
            const removeSpinner = (Spinner) => Spinner.forEach(el => el.remove());
            removeSpinner(document.querySelectorAll(".spinner-border"))
        });
    });

}

function get_text() {
    var text = document.getElementById('text').value;
    console.log(text);
    var div = document.getElementById("main");
    var spinner = document.createElement("div");
    spinner.setAttribute("class", "spinner-border");
    spinner.setAttribute("role", "status")
    div.appendChild(spinner);
    get_pred(text);
    const pred_remove = document.getElementById("pred");
    while (pred_remove.lastElementChild) {
        pred_remove.removeChild(pred_remove.lastElementChild);
    }
    document.getElementById('text').value = "";
}

document.getElementById("text")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("basic-addon2").click();
        }
    });