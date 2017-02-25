(function($){


	var defaults={
		 width: $('.stage').width(),
		 height: $('.stage').height(),
         cellWidth: 20,
		 speed: 1,
		 initialLength: 3,
         snakeLength:3,
         eatNum:$('#num'),
         score:$('#score'),
         recordTable:$('.record table')

	}


	var Snake=function(options){
		this.options=$.extend({},defaults,options);
        this.width=this.options.width;
        this.height=this.options.height;
        this.cellWidth=this.options.cellWidth;
        this.speed=this.options.speed;
        this.initialLength=this.options.initialLength;
        this.snakeLength=this.options.snakeLength;
        this.$stage=this.options.stage;
        this.$eatNum=this.options.eatNum;
        this.$score=this.options.score;
        this.$recordTable=this.options.recordTable;

        this.record=new Array();
        this.grid=new Array();
        this.snake=new Array();
        this.food=new Array();
        this.die=false;
        this.direction = 1;//向右  2下 3左  4 上
        this.nextDirection = '';
        this.snakeTimer='';
        this.num=0;
        this.score=0;

	}

    Snake.prototype={

        init:function(){
         this.bindEvent();
            
        },

        initPlay:function(){
            if(this.die){

                for(var i=0;i<this.snakeLength;i++){
                    var x=this.snake[i][0],
                        y=this.snake[i][1];
                    this.grid[x][y].removeClass('snake');
                }

                console.log('destroy'+this.food);
                var x=this.food[0][0],
                    y=this.food[0][1];
                this.grid[x][y].removeClass('food');

                this.snakeLength=this.initialLength;
                this.num=0;
                this.score=0;
                this.$eatNum.text(this.num);
                this.$score.text(this.score);
            }
            this.createSnake();
            this.createFood();
            $("#start").attr("disabled",true);
            this.setTimer();

        },

        drawStage:function(){
            console.log('drawStage');
            var $table=$('.stage');
            for(var i=0;i<this.height/this.cellWidth;i++){
                this.grid[i]=new Array();
                var $row=$('<tr></tr>');
                for(var j=0;j<this.width/this.cellWidth;j++){
                    var $col=$('<td></td>');
                    this.grid[i][j]=$col;
                    $row.append($col);
                }
                $table.append($row);
            }
        },

        createSnake:function(){
            this.snake=this.randomObject(this.options.initialLength,'snake');
        },

        createFood:function(){
            this.food=this.randomObject(1,'food');
            console.log('create'+this.food);
        },


        //生成食物或者小蛇
        randomObject:function(len,name){
            var obj=[],
            x=Math.floor(Math.random()*this.height/this.cellWidth),
            y=Math.floor(Math.random()*this.width/this.cellWidth);

            if(this.grid[x][y].hasClass('food')||this.grid[x][y].hasClass('snake')){
             return this.randomObject(len,name);
            }

            if(len==this.options.initialLength){
                if(y<this.options.initialLength){
                    return this.randomObject(len,name);
                }
                for(i=0;i<this.options.initialLength;i++){
                    y=y-1;
                    obj.push([x,y]);
                    this.grid[x][y].addClass(name);
                }
            }else{
                obj.push([x,y]);
                this.grid[x][y].addClass(name);
            }

            return obj;
        },

        changeDirection: function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];
                var direction=this.direction;
                var keyCode = e.keyCode;
                switch(keyCode){
                    case 39://右
                    if(direction!=1 && direction !=3){
                        this.nextDirection = 1;
                    }

                    break;
                    case 40://下
                    if(direction!=2 && direction !=4){
                        this.nextDirection = 2;
                     }
                    break;
                    case 37://左
                    if(direction!=1 && direction !=3){
                    this.nextDirection = 3;
                    }
                    break;
                    case 38://上
                    if(direction!=2 && direction !=4){
                        this.nextDirection = 4;
                    }
                    break;
                    default:
                    break;
                }
        },
        bindEvent:function(){
            //里面的this指定了特定的上下文，是snake原型而不是触发事件的动漫元素
            //不能用this.init(),这是立即执行函数
            $('#playInit').on('click',$.proxy(this.drawStage,this));
            $(document).on('keydown',$.proxy(this.changeDirection,this));
            $('#start').on('click',$.proxy(this.initPlay,this));
        },

        snakeMove:function(){
            this.direction=this.nextDirection||this.direction;
            this.nextDirection='';
            var headX=this.snake[0][0],
                headY=this.snake[0][1];
            switch(this.direction){
                case 1: headY+=1;break;
                case 2: headX+=1;break;
                case 3: headY-=1;break;
                case 4: headX-=1;break;
             }

             //碰到边界或者身体，则结束游戏
             if(headX>=this.height/this.cellWidth||headX<0||headY>=this.width/this.cellWidth||headY<0||this.grid[headX][headY].hasClass('snake')){
                this.die=true;
                //模态框

                $('#start').removeAttr('disabled');
                clearTimeout(this.snakeTimer);
                return;
             }

             //碰到的是食物或者不是
             if(this.grid[headX][headY].hasClass('food')){
                this.snake.unshift([headX,headY]);
                this.grid[headX][headY].removeClass('food').addClass('snake');
                this.snakeLength+=1;
                this.num+=1;
                this.score+=10;
                this.$eatNum.text(this.num);
                this.$score.text(this.score);
                this.createFood();
             }else{
                var lastX=this.snake[this.snake.length-1][0],
                    lastY=this.snake[this.snake.length-1][1];
                this.grid[lastX][lastY].removeClass('snake');
                this.snake.pop();
                this.snake.unshift([headX,headY]);
                this.grid[headX][headY].addClass('snake');
                
             }       

             this.setTimer();
        },

        setTimer:function(){
            this.snakeTimer=setTimeout($.proxy(this.snakeMove,this),500);
        }
    }


 
var snake=new Snake({});
snake.init();
	
	
})(jQuery);