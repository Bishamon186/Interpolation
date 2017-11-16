

function check()
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
    document.getElementById('status').innerHTML = "Error: radio button";
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


  if (check==0){
    alert("Error: select points and interpolate function");
  }
  else {
    number2 = Number(number);

    switch (check)
    {
      case 1:
        xValuesOriginalFunc = [-1.5,-0.75,0,0.75,1.5];
        yValuesOriginalFunc = [-14.101,-0.9315,0,0.9316,14.1014];
        result = Polynomial(number2,xValuesOriginalFunc,5);
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
  var xValuesInterpolatedFunction1 = [];
  var xValuesInterpolatedFunction = [];
  var size
  switch (NumbXValue)
  {
    case '1':
      size = 5;
      xValuesInterpolatedFunction1 = [-1.5,-0.75,0,0.75,1.5];
      for (var i =-1.5 ; i<1.5;i+=0.015)
      {
        xValuesOriginalFunc.push(i);
        yValuesOriginalFunc.push(FunctionValueEvaluation(i));
      }
      for (var i = -1.5; i <= 1.5; i+=0.075)
      {
      	xValuesInterpolatedFunction.push(i);
        yValuesInterpolatedFunction.push(Polynomial(i,xValuesInterpolatedFunction1,size));
        
      }

      drawChart( xValuesOriginalFunc,yValuesOriginalFunc,xValuesInterpolatedFunction, yValuesInterpolatedFunction);
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
  return Math.tan(x);
}


function drawChart( xValueOriginalFunc,yValueOriginalFunc ,xValueInterpolatedFunction,yValueInterpolatedFunction) {

  var i = 0;
  var out = document.getElementById("placeholder");

  var data1 = [];
  var data2=[];

  for(i=0; i < xValueOriginalFunc.length; i++)
  {
  	
		data1.push([xValueOriginalFunc[i],yValueOriginalFunc[i]]);

  }
  for(i=0; i < xValueInterpolatedFunction.length; i++)
  {
  	 data2.push([xValueInterpolatedFunction[i],yValueInterpolatedFunction[i]]);

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
        }]);
  })
  	

}



