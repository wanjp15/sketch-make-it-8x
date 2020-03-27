import sketch from 'sketch'

export default function () {

  var ratio = 1 // 初始化缩放倍数
  var isUserCancel = false
  var scaleProportion = 'default'
  const document = sketch.getSelectedDocument()
  const selectedLayers = document.selectedLayers

  if (selectedLayers.isEmpty == true) { // 未选中对象报错

    sketch.UI.message('⚠️请先选中至少一个对象！') 

  } else {

    sketch.UI.getInputFromUser( // 用户输入图片比例
      "请选择图片比例",
      {
        type: sketch.UI.INPUT_TYPE.selection,
        possibleValues: ['3:2', '5:2', '3:1', '4:1', '16:9', '2:1'],
      },
      (err, value) => {
        if (err) {
          // most likely the user canceled the input
          isUserCancel = true
          return
        }

        if (value == '3:2') {
          ratio = 1 / 3 * 2
          scaleProportion = '3:2'
          return
        }

        if (value == '5:2') {
          ratio = 1 / 5 * 2
          scaleProportion = '5:2'
          return
        }

        if (value == '16:9') {
          ratio = 1 / 16 * 9
          scaleProportion = '16:9'
          return
        }

        if (value == '3:1') {
          ratio = 1 / 3
          scaleProportion = '3:1'
          return
        }

        if (value == '4:1') {
          ratio = 1 / 4
          scaleProportion = '4:1'
          return
        }

        if (value == '2:1') {
          ratio = 1 / 2
          scaleProportion = '2:1'
          return
        }

        /* if (value == '2:1') {
          ratio = 1 / 2 //计算比例
          scaleProportion = '2:1' //输出结果提示
          return //结束判断
        } */
      }
    )
  }

  if (isUserCancel == true) { //用户取消则不执行

  } else {

    for (var index = 0; index < selectedLayers.length; index++) { //循环读取每个选择对象

      var curLayer = selectedLayers.layers[index]

      var rect = curLayer.frame
      var curWidth = rect.width
      var curHeight = rect.height
      var scaleHeight = Math.round(ratio * curWidth) //计算值四舍五入取整

      var res = Math.round(scaleHeight / 8) //取整后取8倍数

      if (scaleHeight - res * 8 < (res + 1) * 8 - scaleHeight) {
        scaleHeight = res * 8
      } else {
        scaleHeight = (res + 1) * 8
      }

      rect.height = scaleHeight
    }

    if(selectedLayers.length == 0){

    } else {

       sketch.UI.message('已经将所选的' + selectedLayers.length + '个对象比例设置为' + scaleProportion + '🎉') //操作成功提示

    }

  }

}

