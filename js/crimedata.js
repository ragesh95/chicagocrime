const fs=require('fs');
var readLine=require('readline');
var barArr=[];
var lineArr=[];
for(var i=2001;i<=2016;i++){
  var bobj={year: i, OVER$500: 0, $500ANDUNDER: 0};
  var lobj={year: i, ARRESTED: 0, NOTARRESTED: 0};
  barArr.push(bobj);
  lineArr.push(lobj);
}
var rd=readLine.createInterface({
  input: fs.createReadStream('../csv/crimedata.csv'),
  output: process.stdout,
  terminal: false
});
rd.on('line',function(line){
  var data=line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
  var id=data[0]+"";
  if(id.length<=4)
   return;
  var year=data[17];
  var arrested=data[8];
  var type=data[6];
  if(data[5]==="ASSAULT"){
    if(arrested==="TRUE"||arrested==="true"){
      lineArr[year-2001].ARRESTED++;
    }
    else if(arrested==="FALSE"||arrested==="false"){
      lineArr[year-2001].NOTARRESTED++;
    }
  }
  if(type==="OVER $500"){
    barArr[year-2001].OVER$500++;
  }
  else if(type==="$500 AND UNDER"){
    barArr[year-2001].$500ANDUNDER++;
  }
});
rd.on('close',function(){
  fs.writeFileSync('../json/linejson.json',JSON.stringify(lineArr));
  fs.writeFileSync('../json/barjson.json',JSON.stringify(barArr));
});
