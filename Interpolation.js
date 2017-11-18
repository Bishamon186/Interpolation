function checkSelectedPoints()
{
  document.getElementById('status').innerHTML = "";
  var inp = document.getElementsByName("Rb");
  var check = 0;

  for (var i = 0; i < inp.length; i++)
  {
    if (inp[i].checked)
    {
      check = inp[i].value;
    }

  }

  if(check!=0)
  {
    InterpolateLagrangePolynomial(check);
  }
  else
  {
    alert("Error: select points");
    document.getElementById('status').innerHTML = "Error: select points";
  }

}

function checkOk(){
  var number = document.getElementById("number").value;
  var number2;
  var result;
  var inp = document.getElementsByName("Rb");
  var check = 0;

  for (var i = 0; i < inp.length; i++)
  {
    if (inp[i].checked)
    {
      check++;

    }

  }

  if (check==0)
  {
    alert("Error: select points");
    document.getElementById("F(x)").innerHTML = "Error: select points";
  }
  else {
    number2 = Number(number);

    switch (check)
    {
      case 1:
        xValuesOriginalFunc = [-1.5,0,1.5];        
        result = Polynomial(number2,xValuesOriginalFunc,3);
        alert("F("+number2+")=" +result);
        document.getElementById("F(x)").innerHTML = "F("+number2+")=" +result;
        break;
         case 2:
        xValuesOriginalFunc = [-3.14, -1.57,0,1.57,3.14];
        
        result = Polynomial(number2,xValuesOriginalFunc,5);
        alert("F("+number2+")=" +result);
        document.getElementById("F(x)").innerHTML = "F("+number2+")=" +result;
        break;
         case 3:
        xValuesOriginalFunc = [-3.14,-2.512,-1.884,-1.256,-0.628,0,0.628,1.256,1.884,2.512,3.14];       
        result = Polynomial(number2,xValuesOriginalFunc,11);
        alert("F("+number2+")=" +result);
        document.getElementById("F(x)").innerHTML = "F("+number2+")=" +result;
        break;
         case 4:
        xValuesOriginalFunc = [-3.14,-2.512,-1.884,-1.256,-0.628,0,0.628,1.256,1.884,2.512,3.14];
        result = Polynomial(number2,xValuesOriginalFunc,11);
        alert("F("+number2+")=" +result);
        document.getElementById("F(x)").innerHTML = "F("+number2+")=" +result;
        break;
      default:
        alert("Error");
        break;
    }
  }
}

function InterpolateLagrangePolynomial(NumbXValue)
{
  var xValuesOriginalFunc = [];
  var yValuesOriginalFunc = [];
  var yValuesInterpolatedFunction=[];
  var xValuePoint = [];
  var yValuePoint = []
  var xValuesInterpolatedFunction = [];
  var size
  switch (NumbXValue)
  {
    case '1':
     size = 3;
      xValuePoint = [-1.5,0,1.5];
      yValuePoint = [-0.9975,0,0.9975];
      for (var i =-3.14 ; i<3.14;i+=0.0314)
      {
        xValuesOriginalFunc.push(i);
        yValuesOriginalFunc.push(FunctionValueEvaluation(i));
      }
      for (var i = -3.14; i <= 3.14; i+=0.0314)
      {
      	xValuesInterpolatedFunction.push(i);
        yValuesInterpolatedFunction.push(Polynomial(i,xValuePoint,size));        
      }
      drawChart( xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction, yValuesInterpolatedFunction,xValuePoint,yValuePoint);      
      break;

    case '2':
    size = 5;
      xValuePoint = [-3.14, -1.57,0,1.57,3.14];
      yValuePoint = [0,-0.999999683,0,0.999999683,0];
      for (var i =-4 ; i<4;i+=0.04)
      {
        xValuesOriginalFunc.push(i);
        yValuesOriginalFunc.push(FunctionValueEvaluation(i));
      }

      for (i =-4 ; i<=4;i+=0.04)
      {
      	xValuesInterpolatedFunction.push(i);
        yValuesInterpolatedFunction.push(Polynomial(i,xValuePoint,size));
        
      }
      drawChart( xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction, yValuesInterpolatedFunction,xValuePoint,yValuePoint);  
    break;

    case '3':
     size = 11;
      xValuePoint = [-3.14,-2.512,-1.884,-1.256,-0.628,0,0.628,1.256,1.884,2.512,3.14];
      yValuePoint = [0,-0.58882,-0.951351,-0.95086,-0.58753,0,0.58753,0.95086,0.951351,0.58882,0];
      for (var i =-4 ; i<4;i+=0.04)
      {
        xValuesOriginalFunc.push(i);
        yValuesOriginalFunc.push(FunctionValueEvaluation(i));
      }
      for (i =-4 ; i<=4;i+=0.04)
      {
      	xValuesInterpolatedFunction.push(i);
        yValuesInterpolatedFunction.push(Polynomial(i,xValuePoint,size));        
      }
      drawChart( xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction, yValuesInterpolatedFunction,xValuePoint,yValuePoint);
    
    break;

    case '4':
     size = 11;
      xValuePoint = [-3.14,-2.512,-1.884,-1.256,-0.628,0,0.628,1.256,1.884,2.512,3.14];
      yValuePoint = [0,-0.58882,-0.951351,-0.95086,-0.58753,0,5,0.95086,0.951351,0.58882,0];
      for (var i =-3.14 ; i<=3.14;i+=0.0628)
      {
        xValuesOriginalFunc.push(i);
        yValuesOriginalFunc.push(FunctionValueEvaluation(i));
      }

      yValuesOriginalFunc[60]=5;
     
      for (i =-4 ; i<=4;i+=0.04)
      {
      	xValuesInterpolatedFunction.push(i);
        yValuesInterpolatedFunction.push(Polynomial(i,xValuePoint,size));        
      }
      drawChart( xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction, yValuesInterpolatedFunction,xValuePoint,yValuePoint);    
    break;
    default:
      alert("Error");
      break;
  }

}

function Polynomial (x, xValuesOriginalFunc, size)
{
  var yValuesInterpolatedFunction = 0;

  for (var i = 0; i < size; i++)
  {
    var basicsPol = 1;
    for (var j = 0; j < size; j++)
    {
      if (j != i)
      {
        basicsPol *= (x - xValuesOriginalFunc[j])/(xValuesOriginalFunc[i] - xValuesOriginalFunc[j]);
      }
    }

    yValuesInterpolatedFunction += basicsPol * FunctionValueEvaluation(xValuesOriginalFunc[i]);
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

  var data1 = [];
  var data2=[];
  var data3 = [];

  for(i=0; i < xValueOriginalFunc.length; i++)
  {
  	
		data1.push([xValueOriginalFunc[i],yValueOriginalFunc[i]]);

  }
  for(i=0; i < xValueInterpolatedFunction.length; i++)
  {
  	 data2.push([xValueInterpolatedFunction[i],yValueInterpolatedFunction[i]]);

  }  
  for(i=0; i < xValuePoint.length; i++)
  {
  	 data3.push([xValuePoint[i],yValuePoint[i]]);

  }     

  	$(document).ready(function(){
   $.plot(out, [{
            data: data1,
            lines: { show: true }
        },
        {
            data: data2,
            lines: { show: true },
            points: { show: false}
        },
        {
            data: data3,
            points: { show: true }
        },
        ]);
  })

}



