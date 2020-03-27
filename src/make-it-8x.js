import sketch from 'sketch'

export default function () {

  const document = sketch.getSelectedDocument()
  const selectedLayers = document.selectedLayers

  if (selectedLayers.isEmpty == true) {

    sketch.UI.message('⚠️请先选中至少一个对象！')

  } else {
  
      for (var index = 0; index < selectedLayers.length; index++) {
  
        var curLayer = selectedLayers.layers[index]
        var rect = curLayer.frame
        var curHeight = rect.height
        var scaleHeight = Math.round(curHeight)
        var res = Math.round(scaleHeight / 8)
  
        if (scaleHeight - res * 8 < (res + 1) * 8 - scaleHeight) {

          scaleHeight = res * 8

        } else {

          scaleHeight = (res + 1) * 8

        }
  
        rect.height = scaleHeight
      }
  
      if(selectedLayers.length == 0){
  
      } else {
  
         sketch.UI.message('已经将所选的' + selectedLayers.length + '个对象的高度设置为 8 的倍数🎉')
  
      }

  }

}

