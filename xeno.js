var classArry = {
	"ドリフター":[79,53,64],
	"ジェネラルソード":[98,63,74],
	"フルメタルジャガー":[79,60,70],
	"ヘヴィーストライカー":[126,58,44],
	"スタークルセイダー":[86,84,64],
	"エリートプランナー":[71,68,102],
	"ギャラクシーナイト":[94,63,76]

}
var affixLevel =[
	[0,30,55,60,65,70,75,80,85,90,95,100,150],
	[0,9,14,16,17,18,19,20,21,22,23,24,25],
	[0,12,22,24,26,28,30,32,34,36,38,40,50],
	[0,25,50,55,60,65,70,75,80,85,90,95,100],
	[0,18,28,30,33,36,38,40,42,44,46,48,50]
]
$(function($) {
	$("input,select").change(function() {

	   $("input:text").each(function() {
	    if ( isNaN( this.value ) || this.value == "")  this.value = 0;
	   });
	
	    baseCalc();
	});
});

function clearForm(i){
	$("form")[i].reset();
	baseCalc();
}


function parseTable(id){


	
	var data = [];
	var tr = $("table#"+id+" tr");
	for( var i=0,l=tr.length;i<l;i++ ){
	    var cells = tr.eq(i).children();
	    for( var j=0,m=cells.length;j<m;j++ ){
	        if( typeof data[i] == "undefined" )
	            data[i] = [];
	        data[i][j] = cells[j].childNodes[0].value;
		if ( !isNaN(data[i][j]) ) data[i][j] = parseInt(data[i][j]);
	    }
	}
	return data;
}

function baseCalc(simchk){

	function clearForm(){
		$("input")[0].reset();
		baseCalc();
	}

	var obj = {
		fpUp 	: {},
		fpBoost : {},
		spUp 	: {},
		spBoost : {},
		mpUp 	: {},
		mpBoost : {},
		atUpF	: {},
		atUpS	: {},
		elUp	: {},
		paCr	: {},
		wpAtk	: {},
		lastSt	: {}
	};

	var classSelected = $("tr#classSt")[0].cells[0].childNodes[0].value;

	obj.fpUp.shoki = classArry[classSelected][0];
	obj.spUp.shoki = classArry[classSelected][1];
	obj.mpUp.shoki = classArry[classSelected][2];

	if (simchk != 1){
	$("tr#classSt")[0].cells[1].childNodes[0].data = obj.fpUp.shoki;
	$("tr#classSt")[0].cells[2].childNodes[0].data = obj.spUp.shoki;
	$("tr#classSt")[0].cells[3].childNodes[0].data = obj.mpUp.shoki;
	}
	var data = parseTable("bougu");

	obj.fpUp.bougu = affixLevel[0][data[1][1]] + affixLevel[0][data[2][1]] + affixLevel[0][data[3][1]] + affixLevel[0][data[4][1]] + affixLevel[0][data[5][1]];
	obj.fpBoost.bougu = affixLevel[1][data[1][2]] + affixLevel[1][data[2][2]] + affixLevel[1][data[3][2]] + affixLevel[1][data[4][2]] + affixLevel[1][data[5][2]];
	obj.spUp.bougu = affixLevel[0][data[1][3]] + affixLevel[0][data[2][3]] + affixLevel[0][data[3][3]] + affixLevel[0][data[4][3]] + affixLevel[0][data[5][3]];
	obj.spBoost.bougu = affixLevel[1][data[1][4]] + affixLevel[1][data[2][4]] + affixLevel[1][data[3][4]] + affixLevel[1][data[4][4]] + affixLevel[1][data[5][4]];
	obj.mpUp.bougu = affixLevel[2][data[1][5]] + affixLevel[2][data[2][5]] + affixLevel[2][data[3][5]] + affixLevel[2][data[4][5]] + affixLevel[2][data[5][5]];
	obj.mpBoost.bougu = affixLevel[1][data[1][6]] + affixLevel[1][data[2][6]] + affixLevel[1][data[3][6]] + affixLevel[1][data[4][6]] + affixLevel[1][data[5][6]];

	for ( var i=1 ; i<= 5 ; i++){
		if ( data[i][7] == "sd-1") obj.mpUp.bougu += 50;
		if ( data[i][7] == "sd-2") obj.mpBoost.bougu += 25;
	}

	var fpbsTemp = obj.fpBoost.bougu;
	var spbsTemp = obj.spBoost.bougu;
	var mpbsTemp = obj.mpBoost.bougu;

	if (fpbsTemp > 100) fpbsTemp = 100;
	if (spbsTemp > 100) spbsTemp = 100;
	if (mpbsTemp > 100) mpbsTemp = 100;

	var bouguFp = parseInt( ( obj.fpUp.shoki + obj.fpUp.bougu ) * ( 100 + fpbsTemp) /100) ;
	var bouguSp = parseInt( ( obj.spUp.shoki + obj.spUp.bougu ) * ( 100 + spbsTemp) /100) ;
	var bouguMp = parseInt( ( obj.mpUp.shoki + obj.mpUp.bougu ) * ( 100 + mpbsTemp) /100) ;

	if (simchk != 1){
	$("tr#bouguSt")[0].cells[1].childNodes[0].data = bouguFp;
	$("tr#bouguSt")[0].cells[2].childNodes[0].data = bouguSp;
	$("tr#bouguSt")[0].cells[3].childNodes[0].data = bouguMp;

	$("tr#bouguBs")[0].cells[1].childNodes[0].data = fpbsTemp + "%";
	$("tr#bouguBs")[0].cells[2].childNodes[0].data = spbsTemp + "%";
	$("tr#bouguBs")[0].cells[3].childNodes[0].data = mpbsTemp + "%";
	}

	var data = parseTable("buki");

	obj.wpAtk.kakutou = data[1][1];
	obj.wpAtk.shageki = data[2][1];
	obj.fpUp.buki = affixLevel[0][data[1][2]] + affixLevel[0][data[2][2]];
	obj.fpBoost.buki = affixLevel[1][data[1][3]] + affixLevel[1][data[2][3]];
	obj.spUp.buki = affixLevel[0][data[1][4]] + affixLevel[0][data[2][4]];
	obj.spBoost.buki = affixLevel[1][data[1][5]] + affixLevel[1][data[2][5]];
	obj.mpUp.buki = affixLevel[2][data[1][6]] + affixLevel[2][data[2][6]];
	obj.mpBoost.buki = affixLevel[1][data[1][7]] + affixLevel[1][data[2][7]];

	obj.atUpF.buki  = affixLevel[3][data[1][8]];
	obj.atUpS.buki  = affixLevel[3][data[2][8]];
	obj.elUp.buki  = affixLevel[4][data[1][9]] + affixLevel[4][data[2][9]];

	obj.paCr.buki = 0;
	if ( $("#partsc1").is(':checked') ) obj.paCr.buki += 1;
	if ( $("#partsc2").is(':checked') ) obj.paCr.buki += 1;


	var fpbsTemp = obj.fpBoost.bougu + obj.fpBoost.buki;
	var spbsTemp = obj.spBoost.bougu + obj.spBoost.buki;
	var mpbsTemp = obj.mpBoost.bougu + obj.mpBoost.buki;

	if (fpbsTemp > 100) fpbsTemp = 100;
	if (spbsTemp > 100) spbsTemp = 100;
	if (mpbsTemp > 100) mpbsTemp = 100;

	var bukiFp = parseInt(( obj.fpUp.shoki + obj.fpUp.bougu + obj.fpUp.buki ) * ( 100 + fpbsTemp) /100);
	var bukiSp = parseInt(( obj.spUp.shoki + obj.spUp.bougu + obj.spUp.buki ) * ( 100 + spbsTemp) /100);
	var bukiMp = parseInt(( obj.mpUp.shoki + obj.mpUp.bougu + obj.mpUp.buki ) * ( 100 + mpbsTemp) /100);

	if (simchk != 1){
	$("tr#bukiSt")[0].cells[1].childNodes[0].data = bukiFp;
	$("tr#bukiSt")[0].cells[2].childNodes[0].data = bukiSp;
	$("tr#bukiSt")[0].cells[3].childNodes[0].data = bukiMp;
	$("tr#bukiSt")[0].cells[4].childNodes[0].data = obj.atUpF.buki;
	$("tr#bukiSt")[0].cells[5].childNodes[0].data = obj.atUpS.buki;
	$("tr#bukiSt")[0].cells[6].childNodes[0].data = obj.elUp.buki;
	$("tr#bukiSt")[0].cells[7].childNodes[0].data = obj.paCr.buki;

	$("tr#bukiBs")[0].cells[1].childNodes[0].data = fpbsTemp + "%";
	$("tr#bukiBs")[0].cells[2].childNodes[0].data = spbsTemp + "%";
	$("tr#bukiBs")[0].cells[3].childNodes[0].data = mpbsTemp + "%";
	}


	var deviceNum = simDevice(simchk);


	var maxDamage = 0;
	var maxDDevice = {};

	for ( var num= 0;num < deviceNum.fpUp.length;num++){

	obj.fpUp.device = ( deviceNum.fpUp[num] ) * 150 ;
	obj.fpBoost.device = ( deviceNum.fpBoost[num] ) * 25 ;
	obj.spUp.device = ( deviceNum.spUp[num] ) * 150 ;
	obj.spBoost.device = ( deviceNum.spBoost[num] ) * 25 ;
	obj.atUpF.device  =( deviceNum.atUpF[num]  ) * 100 ;
	obj.atUpS.device  =( deviceNum.atUpS[num]  ) * 100 ;
	obj.elUp.device = ( deviceNum.elUp[num] ) * 50 ;
	obj.paCr.device = ( deviceNum.paCr[num] )  ;
	
	var fpbsTemp = obj.fpBoost.bougu + obj.fpBoost.buki + obj.fpBoost.device ;
	var spbsTemp = obj.spBoost.bougu + obj.spBoost.buki + obj.spBoost.device;

	if (fpbsTemp > 100) fpbsTemp = 100;
	if (spbsTemp > 100) spbsTemp = 100;

	var deviceFp = parseInt(( obj.fpUp.shoki + obj.fpUp.bougu + obj.fpUp.buki + obj.fpUp.device ) * ( 100 + fpbsTemp) /100);
	var deviceSp = parseInt(( obj.spUp.shoki + obj.spUp.bougu + obj.spUp.buki + obj.spUp.device ) * ( 100 + spbsTemp) /100);
	var deviceMp = bukiMp;

	if (simchk != 1){
	$("tr#deviceSt")[0].cells[1].childNodes[0].data = deviceFp;
	$("tr#deviceSt")[0].cells[2].childNodes[0].data = deviceSp;
	$("tr#deviceSt")[0].cells[3].childNodes[0].data = deviceMp;
	$("tr#deviceSt")[0].cells[4].childNodes[0].data = obj.atUpF.buki + obj.atUpF.device;
	$("tr#deviceSt")[0].cells[5].childNodes[0].data = obj.atUpS.buki + obj.atUpS.device;
	$("tr#deviceSt")[0].cells[6].childNodes[0].data = obj.elUp.buki + obj.elUp.device;
	$("tr#deviceSt")[0].cells[7].childNodes[0].data = obj.paCr.buki + obj.paCr.device;

	$("tr#deviceBs")[0].cells[1].childNodes[0].data = fpbsTemp + "%";
	$("tr#deviceBs")[0].cells[2].childNodes[0].data = spbsTemp + "%";
	$("tr#deviceBs")[0].cells[3].childNodes[0].data = mpbsTemp + "%";
	}
	var data = parseTable("skill");
	
	obj.fpBoost.skill = data[1][1] ;
	obj.spBoost.skill = data[1][2] ;
	obj.mpBoost.skill = data[1][3] ;

	var fpbsTemp = obj.fpBoost.bougu + obj.fpBoost.buki + obj.fpBoost.device ;
	var spbsTemp = obj.spBoost.bougu + obj.spBoost.buki + obj.spBoost.device;
	var mpbsTemp = obj.mpBoost.bougu + obj.mpBoost.buki;

	if (fpbsTemp > 100) fpbsTemp = 100;
	if (spbsTemp > 100) spbsTemp = 100;
	if (mpbsTemp > 100) mpbsTemp = 100;

	fpbsTemp += obj.fpBoost.skill;
	spbsTemp += obj.spBoost.skill;
	mpbsTemp += obj.mpBoost.skill;
	
	obj.lastSt.fp = parseInt(( obj.fpUp.shoki + obj.fpUp.bougu + obj.fpUp.buki + obj.fpUp.device ) * ( 100 + fpbsTemp) /100);
	obj.lastSt.sp = parseInt(( obj.spUp.shoki + obj.spUp.bougu + obj.spUp.buki + obj.spUp.device ) * ( 100 + spbsTemp) /100);
	obj.lastSt.mp = parseInt(( obj.mpUp.shoki + obj.mpUp.bougu + obj.mpUp.buki ) * ( 100 + mpbsTemp) /100);

	if (simchk != 1){	
	$("tr#skillSt")[0].cells[1].childNodes[0].data = obj.lastSt.fp;
	$("tr#skillSt")[0].cells[2].childNodes[0].data = obj.lastSt.sp;
	$("tr#skillSt")[0].cells[3].childNodes[0].data = obj.lastSt.mp;

	$("tr#skillBs")[0].cells[1].childNodes[0].data = fpbsTemp + "%";
	$("tr#skillBs")[0].cells[2].childNodes[0].data = spbsTemp + "%";
	$("tr#skillBs")[0].cells[3].childNodes[0].data = mpbsTemp + "%";
	}

	var damageResult = damageCalc(obj,simchk);

	if (simchk == 1){	
	if ( maxDamage < damageResult ){
		maxDamage = damageResult;
		maxDDevice = {
			fpUp	:deviceNum.fpUp[num],
			fpBoost	:deviceNum.fpBoost[num],
			spUp	:deviceNum.spUp[num],
			spBoost	:deviceNum.spBoost[num],
			atUpF	:deviceNum.atUpF[num],
			atUpS	:deviceNum.atUpS[num],
			elUp	:deviceNum.elUp[num],
			paCr	:deviceNum.paCr[num],
		}
	}}

	}
	if (simchk == 1) deviceResult(maxDamage,maxDDevice);
	
}

function damageCalc(obj,simchk){

	var data = parseTable("arts");

	var damage = {

	weaponAtk:0,
	weaponBoost:0,
	powerSt:0,
	powerBoost:data[3][2] + data[3][3] + data[3][4],
	baseD:0
	
	};
	var tempType;

	switch(data[1][1]){
	
	case "arts-1":

		damage.weaponAtk = obj.wpAtk.kakutou;
		damage.weaponBoost = obj.atUpF.buki + obj.atUpF.device;
		damage.powerSt = obj.lastSt.fp;
		tempType = "格闘力";

		break;

	case "arts-2":

		damage.weaponAtk = obj.wpAtk.shageki;
		damage.weaponBoost = obj.atUpS.buki + obj.atUpS.device;
		damage.powerSt = obj.lastSt.sp;
		tempType = "射撃力";

		break;

	case "arts-3":

		damage.weaponAtk = obj.wpAtk.kakutou;
		damage.weaponBoost = obj.atUpF.buki + obj.atUpF.device;
		damage.powerSt = obj.lastSt.mp;
		tempType = "潜在力";

		break;

	case "arts-4":

		damage.weaponAtk = obj.wpAtk.shageki;
		damage.weaponBoost = obj.atUpS.buki + obj.atUpS.device;
		damage.powerSt = obj.lastSt.mp;
		tempType = "潜在力";

		break;

	}

	if ( $("#manuchk").is(':checked') && simchk != 1 ) damage.powerSt = $("#manuvalue").val();

	var tempAtk = parseInt( damage.weaponAtk * ( damage.weaponBoost + 100 ) /100) 
	var tempPow = parseInt( damage.powerSt * ( damage.powerBoost + 100 ) /100)
	var tempArts = data[1][2];
	var tempArtsSp = data[1][3];
	damage.baseD = parseInt( tempPow * tempArts /100 )+ tempAtk;
	damage.baseDmin = parseInt( tempPow * tempArts /100 )+ parseInt(tempAtk * (100 - data[1][8])/100);
	damage.baseDmax = parseInt( tempPow * tempArts /100 )+ parseInt(tempAtk * (100 + data[1][8])/100);

	if (simchk != 1){	
	$("th#powerSt")[0].childNodes[0].data = tempType;
	$("tr#result1")[0].cells[5].childNodes[0].data = damage.weaponAtk;
	$("tr#result1")[0].cells[6].childNodes[0].data = damage.weaponBoost;
	$("tr#result1")[0].cells[7].childNodes[0].data = tempAtk;
	$("tr#result2")[0].cells[1].childNodes[0].data = damage.powerSt;
	$("tr#result2")[0].cells[5].childNodes[0].data = tempPow ; 
	$("tr#result2")[0].cells[6].childNodes[0].data = parseInt(tempPow * tempArts / 100); 
	$("tr#result2")[0].cells[7].childNodes[0].data = damage.baseD;
	}


	var data = parseTable("crit");

	
	var critX = 100 + obj.elUp.buki + obj.elUp.device;
	

	for ( var i=1;i<=3; i+=2){
		for ( var j=1;j<=8;j++ ){
			if (!isNaN(data[i][j]))critX += data[i][j];
		}
	}
	if ( $("#artspchk").is(':checked') ) critX += tempArtsSp;
	
	if (simchk != 1){	
	$("td#critX")[0].childNodes[0].data = critX;
	$("td#critElX")[0].childNodes[0].data = obj.elUp.buki + obj.elUp.device;
	}

	var data = parseTable("parts");
	var partsRank = data[1][1] - ( obj.paCr.buki + obj.paCr.device );

	if (partsRank < -5) partsRank = -5;

	var PARTS = [250,200,150,125,115,100,85,75,50,25,10];
	var partsX = PARTS[partsRank+5];
	
	var partsText = partsRank + "(" + partsX + "%)";
	var elemX = 100 - data[1][6] + data[1][7];

	if (simchk != 1){	
	$("td#partsNum")[0].childNodes[0].data = obj.paCr.buki + obj.paCr.device;
	$("td#partsX")[0].childNodes[0].data = partsText;
	$("td#elemX")[0].childNodes[0].data = elemX;
	}
	var data = parseTable("indiv");

	var indivX = data[1][1] / 100 * data[1][2] /100 * data[1][3]/100 * data[1][4]/100 * ( 100 + data[1][5])/100;

	var data = parseTable("damage");

	var castX = data[1][1];
	damage.lastD = parseInt( damage.baseD * ( castX /100 ) * ( critX /100 ) * ( partsX /100 ) * ( elemX /100 ) * indivX * 1.025 );
	damage.lastDmin = parseInt( damage.baseDmin * ( castX /100 ) * ( critX /100 ) * ( partsX /100 ) * ( elemX /100 ) * indivX );
	damage.lastDmax = parseInt( damage.baseDmax * ( castX /100 ) * ( critX /100 ) * ( partsX /100 ) * ( elemX /100 ) * indivX * 1.05);

	if (simchk != 1){	
	$("tr#result3")[0].cells[0].childNodes[0].data = damage.baseD;
	$("tr#result3")[0].cells[2].childNodes[0].data = critX;
	$("tr#result3")[0].cells[3].childNodes[0].data = partsX;
	$("tr#result3")[0].cells[4].childNodes[0].data = elemX;
	$("tr#result3")[0].cells[5].childNodes[0].data = "(" + indivX + "倍)";
	$("tr#result3")[0].cells[7].childNodes[0].data = damage.lastD;

	$("tr#result5")[0].cells[1].childNodes[0].data = damage.lastD;
	$("tr#result5")[0].cells[2].childNodes[0].data = damage.lastDmin;
	$("tr#result5")[0].cells[3].childNodes[0].data = damage.lastDmax;
	}

	return damage.lastD;
	
}

function simDevice(simchk){

	var data = parseTable("device");

	var deviceNum = { 
		"fpUp"	 :[],
		"fpBoost":[],
		"spUp"   :[],
		"spBoost":[],
		"atUpF" :[],
		"atUpS" :[],
		"elUp"   :[],
		"paCr"   :[],
		"times":0
	};

	if (simchk != 1){
		deviceNum = { 
			"fpUp"	 :[data[1][1] + data[2][1]],
			"fpBoost":[data[1][2] + data[2][2]],
			"spUp"   :[data[1][3] + data[2][3]],
			"spBoost":[data[1][4] + data[2][4]],
			"atUpF" :[data[1][5]],
			"atUpS" :[data[2][5]],
			"elUp"   :[data[1][6] + data[2][6]],
			"paCr"   :[data[1][7] + data[2][7]],
			"times":1
		};
		return deviceNum;
	}

	var artsType = $("select#artsType").val();
	
	var deviceMax = {
		
		"all"	:$("select#devmax").val(),
		"fpUp"	 :6,
		"fpBoost":6,
		"spUp"   :6,
		"spBoost":6,
		"atUpF" :3,
		"atUpS" :3,
		"elUp"   :6,
		"paCr"   :6,
	}

	switch(artsType){
	case "arts-1":
		deviceMax.spUp = 0;
		deviceMax.spBoost = 0;
		deviceMax.atUpS = 0;
		break;

	case "arts-2":
		deviceMax.fpUp = 0;
		deviceMax.fpBoost = 0;
		deviceMax.atUpF = 0;
		break;

	case "arts-3":
		deviceMax.fpUp = 0;
		deviceMax.fpBoost = 0;
		deviceMax.spUp = 0;
		deviceMax.spBoost = 0;
		deviceMax.atUpS = 0;
		break;

	case "arts-4":
		deviceMax.fpUp = 0;
		deviceMax.fpBoost = 0;
		deviceMax.spUp = 0;
		deviceMax.spBoost = 0;
		deviceMax.atUpF = 0;
		break;
	}

	for ( var i=0;i<= Math.min( deviceMax.all,deviceMax.fpUp) ; i++){
	 for ( var j=0 ;j<= Math.min(deviceMax.all-i,deviceMax.fpBoost);j++){
	  for ( var k=0 ;k<= Math.min(deviceMax.all-i-j,deviceMax.spUp);k++){
	   for ( var l=0 ;l<= Math.min(deviceMax.all-i-j-k,deviceMax.spBoost);l++){
	    for ( var m=0 ;m<= Math.min(deviceMax.all-i-j-k-l,deviceMax.atUpF);m++){
	     for ( var n=0 ;n<= Math.min(deviceMax.all-i-j-k-l-m,deviceMax.atUpS);n++){
	      for ( var o=0 ;o<= Math.min(deviceMax.all-i-j-k-l-m-n,deviceMax.elUp);o++){
	       for ( var p=0 ;p<= Math.min(deviceMax.all-i-j-k-l-m-n-o,deviceMax.paCr);p++){
			deviceNum.fpUp.push(i);
			deviceNum.fpBoost.push(j);
			deviceNum.spUp.push(k);
			deviceNum.spBoost.push(l);
			deviceNum.atUpF.push(m);
			deviceNum.atUpS.push(n);
			deviceNum.elUp.push(o);
			deviceNum.paCr.push(p);
		}}}}}}}

	}
	return deviceNum;

}

function deviceResult(maxDamage,maxDDevice){

	$("tr#simnum")[0].cells[1].childNodes[0].data = maxDDevice.fpUp;
	$("tr#simnum")[0].cells[2].childNodes[0].data = maxDDevice.fpBoost;
	$("tr#simnum")[0].cells[3].childNodes[0].data = maxDDevice.spUp;
	$("tr#simnum")[0].cells[4].childNodes[0].data = maxDDevice.spBoost;
	$("tr#simnum")[0].cells[5].childNodes[0].data = maxDDevice.atUpF + maxDDevice.atUpS;
	$("tr#simnum")[0].cells[6].childNodes[0].data = maxDDevice.elUp;
	$("tr#simnum")[0].cells[7].childNodes[0].data = maxDDevice.paCr;

	$("td#simdamage")[0].childNodes[0].data = maxDamage;


}
