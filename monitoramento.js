// Monitoramento de Navio com Energia Solar - Module




  const batteryEl = document.getElementById("battery");
  const solarEl = document.getElementById("solar");
  const consumptionEl = document.getElementById("consumption");
  const locationEl = document.getElementById("location");

  const ctx = document.getElementById("chart").getContext("2d");

  let dataPoints = [];

  function updateData() {
    const battery = Math.floor(Math.random() * 100);
    const solar = (Math.random() * 50).toFixed(2);
    const consumption = (Math.random() * 40).toFixed(2);

    batteryEl.innerText = battery + "%";
    solarEl.innerText = solar + " kW";
    consumptionEl.innerText = consumption + " kW";

    const lat = (Math.random() * 180 - 90).toFixed(4);
    const lon = (Math.random() * 360 - 180).toFixed(4);
    locationEl.innerText = `${lat}, ${lon}`;

    dataPoints.push(solar);
    if (dataPoints.length > 20) dataPoints.shift();

    drawChart();
  }

  function drawChart() {
    ctx.clearRect(0, 0, 400, 200);
    ctx.beginPath();
    ctx.moveTo(0, 200 - dataPoints[0] * 3);

    dataPoints.forEach((val, i) => {
      ctx.lineTo(i * 20, 200 - val * 3);
    });

    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  setInterval(updateData, 2000);

  // ===== IA PARA ANÁLISE =====

  function analisarSistema(bateria, solar, consumo) {
    let status = "";

    if (bateria < 20 && solar < consumo) {
      status = "⚠️ ALERTA: Bateria baixa e consumo alto! Reduzir carga.";
    } else if (solar > consumo) {
      status = "✅ Sistema eficiente: Gerando mais energia do que consome.";
    } else if (bateria > 80) {
      status = "🔋 Bateria em ótimo nível.";
    } else {
      status = "ℹ️ Sistema operando normalmente.";
    }

    return status;
  }

  // Criar elemento de IA
  const aiCard = document.createElement("div");
  aiCard.className = "card";
  aiCard.innerHTML = `
    <h2> IA de Monitoramento</h2>
    <div class="value" id="aiStatus">Analisando...</div>
  `;
  document.querySelector(".container").appendChild(aiCard);

  const aiStatusEl = document.getElementById("aiStatus");

  // Modificar updateData para incluir IA
  const originalUpdate = updateData;
  updateData = function() {
    const battery = Math.floor(Math.random() * 100);
    const solar = (Math.random() * 50).toFixed(2);
    const consumption = (Math.random() * 40).toFixed(2);

    batteryEl.innerText = battery + "%";
    solarEl.innerText = solar + " kW";
    consumptionEl.innerText = consumption + " kW";

    const lat = (Math.random() * 180 - 90).toFixed(4);
    const lon = (Math.random() * 360 - 180).toFixed(4);
    locationEl.innerText = `${lat}, ${lon}`;

    dataPoints.push(solar);
    if (dataPoints.length > 20) dataPoints.shift();

    drawChart();

    // IA analisando
    const analise = analisarSistema(battery, parseFloat(solar), parseFloat(consumption));
    aiStatusEl.innerText = analise;
  }




class NavioSolarMonitor {
    constructor() {
        this.dataPoints = [];
        this.batteryEl = document.getElementById("battery");
        this.solarEl = document.getElementById("solar");
        this.consumptionEl = document.getElementById("consumption");
        this.locationEl = document.getElementById("location");
        this.aiStatusEl = document.getElementById("aiStatus");
        this.ctx = document.getElementById("chart")?.getContext("2d");
    }

    // Gerar dados simulados
    gerarDados() {
        return {
            bateria: Math.floor(Math.random() * 100),
            solar: parseFloat((Math.random() * 50).toFixed(2)),
            consumo: parseFloat((Math.random() * 40).toFixed(2)),
            latitude: parseFloat((Math.random() * 180 - 90).toFixed(4)),
            longitude: parseFloat((Math.random() * 360 - 180).toFixed(4))
        };
    }

    // Analisar sistema com IA
    analisarSistema(bateria, solar, consumo) {
        if (bateria < 20 && solar < consumo) {
            return "⚠️ ALERTA: Bateria baixa e consumo alto! Reduzir carga.";
        } else if (solar > consumo) {
            return "✅ Sistema eficiente: Gerando mais energia do que consome.";
        } else if (bateria > 80) {
            return "🔋 Bateria em ótimo nível.";
        }
        return "ℹ️ Sistema operando normalmente.";
    }

    // Desenhar gráfico
    desenharGrafico() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, 400, 200);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 200 - this.dataPoints[0] * 3);

        this.dataPoints.forEach((val, i) => {
            this.ctx.lineTo(i * 20, 200 - val * 3);
        });

        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
    }

    // Atualizar interface
    atualizarDados() {
        const dados = this.gerarDados();

        this.batteryEl.innerText = dados.bateria + "%";
        this.solarEl.innerText = dados.solar + " kW";
        this.consumptionEl.innerText = dados.consumo + " kW";
        this.locationEl.innerText = `${dados.latitude}, ${dados.longitude}`;

        this.dataPoints.push(dados.solar);
        if (this.dataPoints.length > 20) this.dataPoints.shift();

        this.desenharGrafico();

        const analise = this.analisarSistema(dados.bateria, dados.solar, dados.consumo);
        this.aiStatusEl.innerText = analise;
    }

    // Iniciar monitoramento
    iniciar(intervalo = 2000) {
        setInterval(() => this.atualizarDados(), intervalo);
    }
}

// Instanciar e iniciar
const monitor = new NavioSolarMonitor();
monitor.iniciar();