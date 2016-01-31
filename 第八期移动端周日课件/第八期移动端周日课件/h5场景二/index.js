function getEle(ele){
    return document.querySelector(ele);
}
var main = getEle("#main");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if(winW/winH<desW/desH){
    main.style.webkitTransform = "scale("+winH/desH+")";
}else{
    main.style.webkitTransform = "scale("+winW/desW+")";
}
var bell = getEle("#bell");
var say = getEle("#say");
var music = getEle("#music");

var arr= ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png','phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
var num = 0;
var progress = getEle(".progress");
var loading = getEle("#loading");
function fnLoad(){
    for(var i = 0;i<arr.length;i++){
        var oImg = new Image();/*创建图片实例*/
        oImg.src = "images/"+arr[i];
        oImg.onload = function(){/*图片加载成功就会触发onload事件*/
            num++; /*图片加载成功之后num累加*/
            progress.style.width = num/arr.length*100+"%"; /*已经加载的图片占所有图片的百分比,这个和进度条是同步的*/
            progress.addEventListener("webkitTransitionEnd",function(){
                if(num ==arr.length&&loading){
                        main.removeChild(loading);
                        loading = null;
                        fnPhone.init()
                }
            },false)

        }
    }
}
fnLoad();
var phone = getEle("#phone");
var listenTouch = getEle(".listenTouch");
var hangUp = getEle(".hangUp");
var fnPhone = {
    init: function(){
        bell.play();/*播放*/
        /*初始化:利用事件委托把touchstart事件绑定在phone上面*/
        phone.addEventListener("touchstart",this.touch,false);
    },
    touch : function(e){
       var target = e.target;
        if(target.className =="listenTouch"){
            bell.pause();/*停止*/
            say.play();
            listenTouch.parentNode.style.display = "none";
            hangUp.parentNode.style.webkitTransform ="translate(0,0)";

        }else if(target.className =="hangUp" ){
            fnPhone.closePhone();
        }
    },
    closePhone:function(){
        say.pause();
        phone.style.webkitTransform = "translate(0,"+desH+"px)";
        window.setTimeout(function(){
            main.removeChild(phone);
            fnMessage();

        },1000);

    }

}



//function fnMessage(){
//    var oLis = document.querySelectorAll("#message>ul>li");
//  for(var i = 0;i<oLis.length;i++){
//      (function(i){
//          window.setTimeout(function(){
//              oLis[i].style.opacity = 1;
//              oLis[i].style.webkitTransform = "translate(0,0)";
//          },1000*i);
//      })(i)
//
//  }
//}
//fnMessage();

function fnMessage(){
    music.play();
    var message = document.querySelector("#message");
    var oLis = document.querySelectorAll("#message>ul>li");
    var msg = getEle("#message>ul");
    var h = null;
    var  n = 0 ;
   var timer =  window.setInterval(function(){
       if(n == oLis.length){
           window.clearInterval(timer);
           main.removeChild(message);
           fnCube();
       }else{
           h+=oLis[n].offsetHeight-30; /*把每个li的高度累加赋值给h*/
           oLis[n].style.opacity = 1;
           oLis[n].style.webkitTransform = "translate(0,0)";
           if(n>=3){
               msg.style.webkitTransform = "translate(0,"+(-h)+"px)"; /*ul整体往上移动前几个li累加后的值*/
           }
           n++;
       }
    },1000)

}


function fnCube(){

    var startX = -45;
    var startY = -45;
    var x = 0;
    var y =0;
    var cubeBox = document.querySelector(".cubeBox");
    cubeBox.style.webkitTransform = "scale(0.7) rotateX(-45deg) rotateY(-45deg)";
    document.addEventListener("touchstart",start,false);
    document.addEventListener("touchmove",move,false);
    document.addEventListener("touchend",end,false);

    function start(e){
        var touch = e.changedTouches[0];
        this.touchStart = {x:touch.pageX,y:touch.pageY};
    }

    function move(e){
        this.flag = true;
        var touch = e.changedTouches[0];
        var moveTouch  = {x:touch.pageX,y:touch.pageY};
        x = moveTouch.x - this.touchStart.x;
        y = moveTouch.y - this.touchStart.y;
        cubeBox.style.webkitTransform ="scale(0.7) rotateX("+(startY+y)+"deg) rotateY("+(startX+x)+"deg)";
    }
    function end(e){
        if(this.flag){
            startX += x;
            startY += y;
        }

    }

}


