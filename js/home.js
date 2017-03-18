// 竖向Tab标签
$(document).ready(function(){
    alert("comein");
    var $tab_li = $('li');
    $tab_li.click(function(){
        $(this).addClass('jintabin').siblings().removeClass('jintabin');
        var index = $tab_li.index(this);
        $('div.jinitem > div').eq(index).show().siblings().hide();
    }); 

$(".jinsu1").click(function(){
    $(this).attr('src',$(this).attr('src')=='images/su11.png'?'images/su12.png':'images/su11.png');
})
$(".jinsu2").click(function(){
    if(confirm("确认报修任务完成")) {
         $(this).attr('src',$(this).attr('src')=='images/su21.png'?'images/su22.png':'images/su21.png');   
        }
        else{return false;}
})
//报修详情显示消失
    $("#jina2").click(function(){
        $("#jindetails").show();
    });
    $(".jinfinal").click(function(){
        $("#jindetails").hide();
    })
    })


