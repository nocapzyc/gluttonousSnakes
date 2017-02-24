$(function(){


	var defaults={
		 width: $('.stage').width(),
		 height: $('.stage').height(),
		 speed: 1,
		 snakeLen:3
	}

	var grid=new Array();

	var Snake=function(ele,score,speed,x,y){
		this.ele=$('.gameBox');
		this.x=x;
		this.y=y;
		this.speed=speed;

	}

	function init(){
		createSnake();
		createFood();

	}

    function drawStage(){
    	console.log('每点击呢！');
		var $table=$('.stage');
		for(var i=0;i<defaults.height/20;i++){
			grid[i]=new Array();
			var $row=$('<tr></tr>');
			for(var j=0;j<defaults.width/20;j++){
				var $col=$('<td></td>');
				grid[i][j]=$col;
				$row.append($col);
			}
			$table.append($row);
		}
    }

    function createSnake(){

    	var snake=radomObject(3,'snake');
    	console.log(snake);

    }

    function createFood(){
    	var food=radomObject(1,'food');
    	console.log(food);
    }


    //生成食物或者小蛇
    function radomObject(len,name){
    		console.log(grid);
    		console.log(grid[0][0]);
    	var obj=[],
    	x=Math.floor(Math.random()*defaults.width),
    	y=Math.floor(Math.random()*defaults.height);

    	//if(grid[x][y].hasClass('food')||grid[x][y].hasClass('snake')){
    	//	return radomFood(len,name);
    	//}

    	if(len==defaults.snakeLen){
    		if(x<3){
    			return radomObject(len,name);
    		}
    		for(i=3;i>0;i--){
    			x=x-i+1;
    			obj.push('['+x+','+y+']');
    			//grid[x][y].addClass(name);
    		}
    	}else{
    		obj.push('['+x+','+y+']');
    		//grid[x][y].addClass(name);
    	}

    	return obj;
    }
      /*
    //添加食物到地图上
    function addObject(obj){
    	var food=radomFood();
    	var x=food[0];
    	var y=food[1];
    	carrier[x][y]=obj;
    	defaults.grid[x][y].addClass(name);

    }

    //监听键盘事件
    function attachEvents(e){
    	e=e||event;
    	directKey=Math.abs(e.keyCode-directKey)!=2&&e.keyCode>36&&e.keyCode<41?e.keyCode:directKey;
    	return false;
    }*/

  
  $('#playInit').on('click',drawStage());
  //$('#start').on('click',init());
    
    	


	
})