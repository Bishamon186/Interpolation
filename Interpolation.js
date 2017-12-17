function checkSelectedPoints()
{
  document.getElementById('status').innerHTML = "";
  var inp = document.getElementsByName("Rb");
  var selectedTable = 0;

  for (var i = 0; i < inp.length; i++)
  {
    if (inp[i].checked)
    {
      selectedTable = inp[i].value;
    }

  }

  if(selectedTable!=0)
  {
    InterpolateLagrangePolynomial(selectedTable);
  }
  else
  {
    alert("Error: select points");
    document.getElementById('status').innerHTML = "Error: select points";
  }

}

function checkSelectedTableBeforeCalculatingValue(){
  var number = document.getElementById("number").value;
  var result;
  var inp = document.getElementsByName("Rb");
  var selectedTable = 0;

  for (var i = 0; i < inp.length; i++)
  {
    if (inp[i].checked)
    {
      selectedTable++;

    }

  }

  if (selectedTable==0)
  {
    alert("Error: select points");
    document.getElementById("F(x)").innerHTML = "Error: select points";
  }
  else {
    number = Number(number);

    switch (selectedTable)
    {
      case 1:
        xValuesOriginalFunc = [-1.5,0,1.5];        
        result = Polynomial(number,xValuesOriginalFunc,3);
        alert("F("+number+")=" +result);
        document.getElementById("F(x)").innerHTML = "F("+number+")=" +result;
        break;
         case 2:
        xValuesOriginalFunc = [-3.14, -1.57,0,1.57,3.14];
        
        result = Polynomial(number,xValuesOriginalFunc,5);
        alert("F("+number+")=" +result);
        document.getElementById("F(x)").innerHTML = "F("+number+")=" +result;
        break;
         case 3:
        xValuesOriginalFunc = [-3.14,-2.512,-1.884,-1.256,-0.628,0,0.628,1.256,1.884,2.512,3.14];       
        result = Polynomial(number,xValuesOriginalFunc,11);
        alert("F("+number+")=" +result);
        document.getElementById("F(x)").innerHTML = "F("+number+")=" +result;
        break;
         case 4:
        xValuesOriginalFunc = [-3.14,-2.512,-1.884,-1.256,-0.628,0,0.628,1.256,1.884,2.512,3.14];
        result = Polynomial(number,xValuesOriginalFunc,11);
        alert("F("+number+")=" +result);
        document.getElementById("F(x)").innerHTML = "F("+number+")=" +result;
        break;
      default:
        alert("Error");
        break;
    }
  }
}

function InterpolateLagrangePolynomial(NumbXValue)
{
  var xValuesOriginalFunc = []; //координаты точек данной функции
  var yValuesOriginalFunc = [];
  var yValuesInterpolatedFunction=[]; //координаты точек интерполированной функции
  var xValuesInterpolatedFunction = [];
  var xValuePoint = [];	//узлы интерполяции
  var yValuePoint = [];   
  var count; //кол-во узлов интерполяции
  var res;
  switch (NumbXValue)
  {
    case '1':
     count = 3; //3 узла
      xValuePoint = [-1.5,0,1.5];
      yValuePoint = [-0.9975,0,0.9975];

      res = CalculatingCoordinatesFunctionPoints(count,3.14,xValuePoint,yValuePoint,xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction,yValuesInterpolatedFunction);        

      break;

    case '2':
    count = 5; //5 узлов
      xValuePoint = [-3.14, -1.57,0,1.57,3.14];
      yValuePoint = [0,-0.999999683,0,0.999999683,0];
      res = CalculatingCoordinatesFunctionPoints(count,4,xValuePoint,yValuePoint,xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction,yValuesInterpolatedFunction);  
     
    break;

    case '3':
     count = 11; //11 узлов
      xValuePoint = [-3.14,-2.512,-1.884,-1.256,-0.628,0,0.628,1.256,1.884,2.512,3.14];
      yValuePoint = [0,-0.58882,-0.951351,-0.95086,-0.58753,0,0.58753,0.95086,0.951351,0.58882,0];
      res = CalculatingCoordinatesFunctionPoints(count,4,xValuePoint,yValuePoint,xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction,yValuesInterpolatedFunction); 
      
    break;

    case '4'://тут ошибка в заданной функции
     count = 11; //11 узлов 
      xValuePoint = [-3.14,-2.512,-1.884,-1.256,-0.628,0,0.628,1.256,1.884,2.512,3.14];
      yValuePoint = [0,-0.58882,-0.951351,-0.95086,-0.58753,0,0.58753,5,0.951351,0.58882,0];
       res = CalculatingCoordinatesFunctionPoints(count,3.14,xValuePoint,yValuePoint,xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction,yValuesInterpolatedFunction); 
    break;
    default:
      alert("Error");
      break;
  }
    
  xValuesOriginalFunc = res.xOriginalFunc;
  yValuesOriginalFunc = res.yOriginalFunc;
  xValuesInterpolatedFunction = res.xInterpolatedFunction;
  yValuesInterpolatedFunction = res.yInterpolatedFunction;

   drawChart( xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction, yValuesInterpolatedFunction,xValuePoint,yValuePoint);  //функция рисования графиков

}

function CalculatingCoordinatesFunctionPoints(count,scope,xValuePoint,yValuePoint,xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction,yValuesInterpolatedFunction)
{

  var result;


  for (var i =(-1*scope) ; i<scope;i+=scope/100)// цикл для вычисления координат точек функций
      {
        
        xValuesOriginalFunc.push(i);
        yValuesOriginalFunc.push(FunctionValueEvaluation(i));
        xValuesInterpolatedFunction.push(i);
        yValuesInterpolatedFunction.push(Polynomial(i,xValuePoint,yValuePoint,count));  
      }



result = {xOriginalFunc: xValuesOriginalFunc, yOriginalFunc: yValuesOriginalFunc,xInterpolatedFunction:xValuesInterpolatedFunction,yInterpolatedFunction:yValuesInterpolatedFunction};
return result;
}


function Polynomial (x, xValuesOriginalFunc,yValuesOriginalFunc, count) //вычисление значения интерполированной функции в заданной точке x, с узлами интерполяции xValuesOriginalFunc
{
  var yValuesInterpolatedFunction = 0;

  for (var i = 0; i < count; i++)
  {
    var basicsPol = 1;
    for (var j = 0; j < count; j++)
    {
      if (j != i)
      {
        basicsPol *= (x - xValuesOriginalFunc[j])/(xValuesOriginalFunc[i] - xValuesOriginalFunc[j]);
      }
    }

	yValuesInterpolatedFunction += basicsPol * yValuesOriginalFunc[i];

}
  
  return yValuesInterpolatedFunction;

}

function FunctionValueEvaluation(x)
{
  return Math.sin(x);
}


function drawChart( xValueOriginalFunc,yValueOriginalFunc ,xValueInterpolatedFunction,yValueInterpolatedFunction, xValuePoint, yValuePoint) {

  var i = 0;
  var out = document.getElementById("placeholder");

  var dataOriginalFunc = [];
  var dataInterpolatedFunc=[];
  var points = [];

  for(i=0; i < xValueOriginalFunc.length; i++)
  {
  	
		dataOriginalFunc.push([xValueOriginalFunc[i],yValueOriginalFunc[i]]);

  }
  for(i=0; i < xValueInterpolatedFunction.length; i++)
  {
  	 dataInterpolatedFunc.push([xValueInterpolatedFunction[i],yValueInterpolatedFunction[i]]);

  }  
  for(i=0; i < xValuePoint.length; i++)
  {
  	 points.push([xValuePoint[i],yValuePoint[i]]);

  }     

  	$(document).ready(function(){
   $.plot(out, [{
            data: dataOriginalFunc,
             label: "Исходная функция",
            lines: { show: true }
        },
        {
            data: dataInterpolatedFunc,
            lines: { show: true },
            label: "Интерполированная функия",
            points: { show: false}
        },
        {
            data: points,
            points: { show: true }
        },
        ]);
  })

}



