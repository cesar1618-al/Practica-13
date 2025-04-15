var centesimas = 0;
var segundos = 0;
var minutos = 0;
var control;

function inicio() {
    control = setInterval(cronometo, 10);
    document.getElementById("bInicio").disabled = true;
    document.getElementById("bTiempoTotal").disabled = false;
    document.getElementById("bPausa").disabled = false;
    document.getElementById("bReinicio").disabled = false;
    document.getElementById("bSector1").disabled = false;
    document.getElementById("bSector2").disabled = false;
    document.getElementById("bSector3").disabled = false;
}

function detener() {
    clearInterval(control);
    document.getElementById("bInicio").disabled = false;
    document.getElementById("bTiempoTotal").disabled = false;
    document.getElementById("bPausa").disabled = true;
    document.getElementById("bReinicio").disabled = true;
    document.getElementById("bSector1").disabled = true;
    document.getElementById("bSector2").disabled = true;
    document.getElementById("bSector3").disabled = true;
}

function reiniciar() {
    clearInterval(control);
    centesimas = 0;
    segundos = 0;
    minutos = 0;
    document.getElementById("centesimas").innerHTML = "00";
    document.getElementById("segundos").innerHTML = "00";
    document.getElementById("minutos").innerHTML = "00";
    document.getElementById("bInicio").disabled = false;
    document.getElementById("bTiempoTotal").disabled = true;
    document.getElementById("bPausa").disabled = true;
    document.getElementById("bReinicio").disabled = true;
    document.getElementById("bSector1").disabled = true;
    document.getElementById("bSector2").disabled = true;
    document.getElementById("bSector3").disabled = true;
    document.getElementById("sector1").innerHTML = "";
    document.getElementById("sector2").innerHTML = "";
    document.getElementById("sector3").innerHTML = "";
}

function sector1() {
    document.getElementById("sector1").innerHTML +=
        `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}:${String(centesimas).padStart(2, '0')}, `;
}

function sector2() {
    document.getElementById("sector2").innerHTML +=
        `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}:${String(centesimas).padStart(2, '0')}, `;
}

function sector3() {
    document.getElementById("sector3").innerHTML +=
        `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}:${String(centesimas).padStart(2, '0')}, `;
}

function cronometo() {
    centesimas++;
    if (centesimas > 99) {
        centesimas = 0;
        segundos++;
    }
    if (segundos > 59) {
        segundos = 0;
        minutos++;
    }

    let c = centesimas < 10 ? "0" + centesimas : centesimas;
    let s = segundos < 10 ? "0" + segundos : segundos;
    let m = minutos < 10 ? "0" + minutos : minutos;

    document.getElementById("centesimas").innerHTML = c;
    document.getElementById("segundos").innerHTML = s;
    document.getElementById("minutos").innerHTML = m;
}

function tiempoTotal() {
    let sector1Text = document.getElementById("sector1").innerHTML.trim();
    let sector2Text = document.getElementById("sector2").innerHTML.trim();
    let sector3Text = document.getElementById("sector3").innerHTML.trim();

    let totalCent = 0;

    [sector1Text, sector2Text, sector3Text].forEach(sector => {
        let tiempos = sector.split(', ').filter(t => t);
        tiempos.forEach(tiempo => {
            let [m, s, c] = tiempo.split(':').map(Number);
            totalCent += (m * 6000) + (s * 100) + c;
        });
    });

    let totalMinutos = Math.floor(totalCent / 6000);
    let totalSegundos = Math.floor((totalCent % 6000) / 100);
    let totalCentesimas = totalCent % 100;

    document.getElementById("tiempototal").innerHTML =
        `${totalMinutos.toString().padStart(2, '0')}:${totalSegundos.toString().padStart(2, '0')}:${totalCentesimas.toString().padStart(2, '0')}`;
}
