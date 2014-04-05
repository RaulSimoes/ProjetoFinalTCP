/**************************************
********* GRAFICO DE Area ************
**************************************/

// CARREGA A API
google.load('visualization', '1.0', {'packages':['corechart']});

// CARREGA OS GRaFICOS, DE PIZZA E aREA.
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
// InformaÃ§Ãµes do GrÃ¡fico
var ufs =
['Nº Buracos'];

var meses = ['2014/04', '2014/05', '2014/06', '2014/07', '2014/08', '2014/09', '2014/10', '2014/11', '2014/12'];
var vendasporuf = [[165, 135, 157, 139, 136]];

// Criar e popular os dados
var data = new google.visualization.DataTable();
data.addColumn('string', 'mes');
    for (var i = 0; i < ufs.length; ++i) {
    data.addColumn('number', ufs[i]);
    }
    data.addRows(meses.length);
    for (var i = 0; i < meses.length; ++i) {
    data.setCell(i, 0, meses[i]);
    }
    for (var i = 0; i < ufs.length; ++i) {
    var uf = vendasporuf[i];
    for (var mes = 0; mes < meses.length; ++mes) {
    data.setCell(mes, i + 1, uf[mes]);
}
}

//escolher a DIV que vai exibir o grÃ¡fico
var vDiv = document.getElementById('grafico_area');

//Instanciar os grÃ¡ficos.
var ac = new google.visualization.AreaChart(vDiv);
    ac.draw(data, {
    title : 'Buracos por Bairro',
    isStacked: true,
    width: 578,
    height: 400,
    vAxis: {title: "Buracos"},
    hAxis: {title: "Bairros"}
});
}