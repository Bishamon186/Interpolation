

function check()
{

    var inp = document.getElementsByName("Rb");
    var check;
    for (var i = 0; i < inp.length; i++) 
    {
        if (inp[i].checked)
        {     
       	 check = inp[i].value;            
        }
        else
        {
        	check = 0;
        }
    }

    if(check!=0)
    {
    	InterpolateLagrangePolynomial(check);
    }
    else
    {
    	alert("Error: radio button ")
    }
    
}

   
function InterpolateLagrangePolynomial(NumbXValue)
{         
	var xValuesOriginalFunc;
	var yValuesOriginalFunc;
	var yValuesInterpolatedFunction=[];

	switch (NumbXValue)
	{
		case '1':

		xValuesOriginalFunc = [-1.5,-0.75,0,0.75,1.5]; 
		yValuesOriginalFunc = [-14.101,-0.9315,0,0.9316,14.1014];
			for (var i = 0; i < 5; i++) 
			{

				yValuesInterpolatedFunction.push(Polynomial(xValuesOriginalFunc[i],xValuesOriginalFunc,5));	
				
            }
            
            for (i=0; i<5;i++){

            }
            

        DrawingGraphs(xValuesOriginalFunc, yValuesOriginalFunc,yValuesInterpolatedFunction);    

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

function DrawingGraphs( xValue, yValueOriginalFunc, yValuesInterpolatedFunction)
{
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback ( function () {drawChart1 (xValue,yValueOriginalFunc);} );
google.charts.setOnLoadCallback ( function () {drawChart2 (xValue,yValuesInterpolatedFunction);} );
}        
     
function drawChart1( xValue, yValueOriginalFunc) {      

var data = new google.visualization.DataTable();  
 data.addColumn('number', 'X');
 data.addColumn('number', 'OriginalFunc');

  for (var i =0; i < 5; i++) {

  	data.addRows([[xValue[i],yValueOriginalFunc[i]]]); 
  	} 
  	
      var options = {
      	 curveType: 'function',
        hAxis: {
          title: 'Х'
        },
        vAxis: {
          title: 'Y'
        },
        pointSize: 20
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart1'));

      chart.draw(data, options);
  }

  function drawChart2( xValue,  yValuesInterpolatedFunction) {    

var data = new google.visualization.DataTable();  
 data.addColumn('number', 'X');
 data.addColumn('number', 'InterpolatedFunc');

  for (var i =0; i < 5; i++) {

  	data.addRows([[xValue[i],yValuesInterpolatedFunction[i]]]); 
  	} 
  	
      var options = {
      	 curveType: 'function',
        hAxis: {
          title: 'Х'
        },
        vAxis: {
          title: 'Y'
        },
        pointSize: 20
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart2'));

      chart.draw(data, options);
  }


	