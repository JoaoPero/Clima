let form = document.querySelector(".busca");

form.addEventListener("submit", async (event) => {
  let input = document.querySelector("#searchInput").value;
  event.preventDefault();

  if (input != "") {
    showMsg("Carregando...");
    //encodeURI -> converte o valor da input para padrão JSON (São Paulo = S%C3%A3o%20Paulo)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=57dad9fde786559184b42adf664f1570`;
    let results = await fetch(url);
    let json = await results.json();

    if (json.cod == 200) {
      // 200=OK || 404=Erro
      clearMsg();
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        wind: json.wind.speed,
        windDeg: json.wind.deg,
      });
    } else {
      clearMsg();
      showMsg(`Cidade de "${input}" não encontrada`);
      document.querySelector(".aviso").style.color = "#ff6347";
    }
  } else {
    clearMsg();
    showMsg(`Informe uma cidade!`);
  }
});

function showInfo(json) {
  showMsg("");

  document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}.`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp.toFixed(1)}<sup>ºC</sup>`;
  document.querySelector(".ventoInfo").innerHTML = `${json.wind.toFixed(1)} <span>km/h</span>`;
  document.querySelector(".ventoPonto").style.transform = `rotate(${json.windDeg}deg)`;
  document.querySelector(".info img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  document.querySelector(".aviso").style.color = "#fff";
  document.querySelector("#searchInput").value = "";
  document.querySelector(".resultado").style.display = "block";
}

function showMsg(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function clearMsg() {
  document.querySelector(".resultado").style.display = "none";
}
