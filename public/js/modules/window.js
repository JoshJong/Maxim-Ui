/**
 * Created by owenhong on 2016/2/24.
 */
define(function(require, exports, module) {
    var init = function() {

        //TODO ��ֹ�ļ���ק������
        $(window).on('dragover', function (e) {
            e.preventDefault();
            e.originalEvent.dataTransfer.dropEffect = 'none';
        });
        $(window).on('drop', function (e) {
            e.preventDefault();
        });

        //TODO ������򿪴��� ������
        $("body").on("click", ".drop-files-box .logs-text-box a,#apply-tiny-api", function () {
            var $ftpSwitch = $("input[name='ftpSwitch']").prop("checked");
            var $url = $(this).data("href");

            if($ftpSwitch === true){
                if (!$url == undefined || !$url == "") {
                    gui.Shell.openExternal($url);
                }
            }else{
                if (!$url == undefined || !$url == "") {
                    gui.Shell.showItemInFolder($url);
                }
            }
        });


        //TODO ȫ�ֿ��ƴ��ڿ���
        $("#closeSortware").click(function(){
            win.close();
        });
        $("#enterFullscreen").click(function(){
            win.toggleFullscreen();
        });

        $("#minimize").click(function(){
            win.minimize();
        });

        //TODO dialog config
        var $DialogConfig = {
            frame:false,
            toolbar:false,
            position: 'center',
            height:500,
            width:640
        }

        //TODO ȫ������
        var globalSetting;
        $("#settingBtn").click(function(){
            if(!globalSetting){
                globalSetting = gui.Window.open('globalSetting',{
                    frame:$DialogConfig.frame,
                    toolbar:$DialogConfig.toolbar,
                    position: $DialogConfig.position,
                    width:512,
                    height: 370,
                    focus:true
                });

                globalSetting.on('close', function () {
                    this.hide(); // PRETEND TO BE CLOSED ALREADY
                    globalSetting = undefined;
                    this.close(true);//��ֹ����û��ɱ��
                });
            }else{
                globalSetting.focus();
            }
        });

        //TODO ������Ŀ
        var addProjectWin;
        var addProjectWinFun = function(){
            if(!addProjectWin){
                var $menuListSite = $(".menu-list li").size();

                addProjectWin = gui.Window.open('addProject?itemsIndex=' + $menuListSite,{
                    frame:$DialogConfig.frame,
                    toolbar:$DialogConfig.toolbar,
                    position: $DialogConfig.position,
                    width:$DialogConfig.width,
                    height: $DialogConfig.height,
                    focus:true
                });

                addProjectWin.on('close', function () {
                    this.hide(); // PRETEND TO BE CLOSED ALREADY
                    updateCssSprite(true,$menuListSite);
                    addProjectWin = undefined;
                    this.close(true);
                });
            }else{
                addProjectWin.focus();
            }
        }
        $("#addProject").click(function(){
            addProjectWinFun();
        });


        //TODO �༭��Ŀ
        var editProjectWin;
        var editProjectWinFun = function(){
            if(!editProjectWin) {
                var $currentItems = $("input[name='itemsIndex']").val();
                editProjectWin = gui.Window.open('editProject?itemsIndex=' + $currentItems, {
                    frame: $DialogConfig.frame,
                    toolbar: $DialogConfig.toolbar,
                    position: $DialogConfig.position,
                    width: $DialogConfig.width,
                    height: $DialogConfig.height,
                    focus: true
                });

                editProjectWin.on('close', function () {
                    this.hide(); // PRETEND TO BE CLOSED ALREADY
                    updateCssSprite(false, $currentItems);
                    editProjectWin = undefined;
                    this.close(true);
                });
            }else{
                editProjectWin.focus();
            }
        }
        $(".edit-btn").click(function() {
            if($(".menu-list li").size() > 0){
                editProjectWinFun();
            }else{
                addProjectWinFun();
            }
        });


        //ɾ����Ŀ
        $("#deletProject").click(function(e){
            e.preventDefault();

            var $currentItems = $("input[name='currentIndex']").val();

            var r = confirm("�Ƿ�ȷ��ɾ������Ŀ��")
            if(r==true){
                $.get("/deleteProject?itemsIndex=" + $currentItems).done(function(data){
                    alert('ɾ���ɹ���');
                    win.close();
                }).fail(function(data){
                    alert("ɾ��ʧ�ܣ�")
                });
            }
        });

        //TODO ȡ����ť��ǰ����
        $("#cancelWin").click(function(e){
            e.preventDefault();
            win.close();
        });
    }


    exports.init = init;
});