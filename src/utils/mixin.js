let mixin = {
    activated : function(){
        let canvasObj = document.getElementsByTagName('canvas');
        if(canvasObj&&canvasObj.length>0){
            let canvasH = canvasObj[0].clientHeight;
            // console.log('canvasH',canvasH);
            if(canvasH==0){
                location.reload();
            }
        }
    }
}
export { mixin }