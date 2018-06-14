//street -> geometria da rua
//startfraction-> porcentagem onde se inicia o trecho em relação a rua
//endfraction-> porcentagem onde se termina o trecho em relação a rua

//exports.lineSubstring = function(street, startfraction, endfraction){
function lineSubstring(street, startfraction, endfraction){

    //tratar a string da geometria linha
    var geomStreet = street.substr(street.indexOf("(")+2);
    geomStreet = geomStreet.substr(0,geomStreet.indexOf(")"));
    
    //divide a rua em grupo de pontos
    var pointsLine = geomStreet.split(',');

     //variaveis globais
     var distances = [];
     var frac = [];
     var index = 0;
     var distDesired = 0;
     var distTotal = 0;
     
     //loop para somar as distancias
     for (var i = 1; i < pointsLine.length; i++) {
 
         //insere as distancias no array distances
         distTotal = distTotal + getDistance(pointsLine[(i-1)].split(' ')[0], pointsLine[(i-1)].split(' ')[1], pointsLine[(i)].split(' ')[0], pointsLine[(i)].split(' ')[1]);
     }

     //loop para preencher as distancias
     for (var j = 1; j < pointsLine.length; j++) {

         //loop para somar a distancia entre o ponto inicial e o ponto procurado
         for (var k = 1; k < j+1; k++) {

            //insere as distancias no array 
            distDesired = distDesired + getDistance(pointsLine[(k-1)].split(' ')[0], pointsLine[(k-1)].split(' ')[1], pointsLine[(k)].split(' ')[0], pointsLine[(k)].split(' ')[1]);
        }
        console.log(j);
        console.log(distDesired);
        console.log(distTotal);
        distDesire = 0;
    }
}

//FUNÇÕES AUXILIARES
var getDistance = function(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

var closestPoint = function(line, point){

    //tratar a string da geometria linha
    var geomLine = line.substr(line.indexOf("(")+2);
    geomLine = geomLine.substr(0,geomLine.indexOf(")"));

    //tratar a string da geometria linha
    var geomPoint = point.substr(point.indexOf("(")+1);
    geomPoint = geomPoint.substr(0,geomPoint.indexOf(")"));

    //divide o endereço em x y
    var coordinates = geomPoint.split(' ');

    //divide a rua em grupo de pontos
    var pointsLine = geomLine.split(',');
    
    //variaveis globais
    var closestPoints = [];
    var distances = [];
    var minDistance = 1000;
    var index = 0;
    var results;
    
    //loop para encontrar qual segmento
    for (var i = 0; i < pointsLine.length-1; i++) {

        //interpola primeiro segmento de reta com x do ponto
        var APx = coordinates[0] - pointsLine[i].split(' ')[0];
        var APy = coordinates[1] - pointsLine[i].split(' ')[1];
        
        //interpola segundo segmento de reta com primeiro segundo
        var ABx = pointsLine[(i+1)].split(' ')[0] - pointsLine[i].split(' ')[0];
        var ABy = pointsLine[(i+1)].split(' ')[1] - pointsLine[i].split(' ')[1];

        //multiplicação entre as interpolações
        var magAB2 = ABx*ABx + ABy*ABy;
        var ABdotAP = ABx*APx + ABy*APy;

        //calculo da determinante
        var t = ABdotAP / magAB2;
        
        //verifica se a determinante é negativa
        if (t < 0){

            //encontra o xmin e ymin do ponto mais proximo da reta
            var xmin = pointsLine[i].split(' ')[0];
            var ymin = pointsLine[i].split(' ')[1];
        }   

        //verifica se a determinante é maior que um
        else if (t > 1){

            //encontra o xmin e ymin do ponto mais proximo da reta
            var xmin = pointsLine[(i+1)].split(' ')[0];
            var ymin = pointsLine[(i+1)].split(' ')[1];
        }

        //verifica se a determinante é de 0 até 1
        else{

            //encontra o xmin e ymin do ponto mais proximo da reta
            var xmin = parseFloat((pointsLine[i].split(' ')[0] + ABx*t));
            var ymin = parseFloat((pointsLine[i].split(' ')[1] + ABy*t));
        }   

        //insere o xmin e o ymin no array closestpoints
        closestPoints[i] = xmin+" "+ymin;

        //insere as distancias no array disstances
        distances[i] = getDistance(coordinates[0], coordinates[1], xmin, ymin);
        
        //compara distancia atual com o maior valor
        if (distances[i] < minDistance){
            minDistance = distances[i];
            index = i;
        }
    }

    return ("POINT("+closestPoints[index]+")");
}