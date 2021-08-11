/**
 * 请求host配置
 */
var host = function () {
    var hostMap = {}
    var locationHost = window.location.hostname
    hostMap['127.0.0.1'] = 'http://47.116.133.121:8010'
    hostMap['172.30.41.223'] = 'http://172.30.40.73:8010'
    hostMap['10.22.146.48'] = 'http://10.22.146.48:8010'
    hostMap['47.116.133.121'] = 'http://47.116.133.121:8010'
    return hostMap[locationHost]
}

/**
 * 判断当前是否登录
 */
var checkLogin = function () {
    if (localStorage.getItem('token')) {
        // 已登录
    } else {
        window.location.href = '/pages/user/login.html'
    }
}

/**
 * 登录
 */
var requestServerLogin = function (_url, _method, _data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: _method,
            url: host() + _url,
            data: JSON.stringify(_data),
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                resolve(response)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}

/**
 * 请求封装（string）
 */
var requestServer = function (_url, _method, _data) {
    var token = localStorage.getItem('token') // 登录凭证
    return new Promise((resolve, reject) => {
        $.ajax({
            type: _method,
            headers: {
                Authorization: 'Bearer ' + token
            },
            url: host() + _url,
            data: JSON.stringify(_data),
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                resolve(response)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}

/**
 * 请求封装（json）
 */
var requestJsonServer = function (_url, _method, _data) {
    var token = localStorage.getItem('token') // 登录凭证
    return new Promise((resolve, reject) => {
        $.ajax({
            type: _method,
            headers: {
                Authorization: 'Bearer ' + token
            },
            url: host() + _url,
            data: _data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                resolve(response)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}

/**
 * 请求封装（form-data）
 */
var requestFileServer = function (_url, _method, _data) {
    var token = localStorage.getItem('token') // 登录凭证
    var formData = new FormData() // 创建一个form对象
    for (const i in _data) {
        if (_data[i] instanceof Array) {
            // 数组
            for (let j = 0; j < _data[i].length; j++) {
                formData.append(i, _data[i][j])
            }
        } else {
            formData.append(i, _data[i])
        }
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            type: _method,
            headers: {
                Authorization: 'Bearer ' + token,
                contentType: 'multipart/form-data',
            },
            url: host() + _url,
            catch: false,
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                resolve(response)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}

/**
 * 整合表单中的值
 */
var getParams = function (dom) {
    var parame = {};
    if ($(dom).find("input[type='text']").length > 0) {
        $(dom).find("input[type='text']").each(function (i, e) {
            if ($(this).val() != null && $(this).val() != '' && $(this).attr('name') && $(this).attr('name') != '') {
                parame[$(this).attr('name')] = $(this).val()
            }
        })
    }
    if ($(dom).find("textarea").length > 0) {
        $(dom).find("textarea").each(function (i, e) {
            if ($(this).val() != null && $(this).val() != '' && $(this).attr('name') && $(this).attr('name') != '') {
                parame[$(this).attr('name')] = $(this).val()
            }
        })
    }
    if ($(dom).find("input[type='password']").length > 0) {
        $(dom).find("input[type='password']").each(function (i, e) {
            if ($(this).val() != null && $(this).val() != '' && $(this).attr('name') && $(this).attr('name') != '') {
                parame[$(this).attr('name')] = $(this).val()
            }
        })
    }
    if ($(dom).find("input[type='number']").length > 0) {
        $(dom).find("input[type='number']").each(function (i, e) {
            if ($(this).val() != null && $(this).val() != '' && $(this).attr('name') && $(this).attr('name') != '') {
                parame[$(this).attr('name')] = $(this).val()
            }
        })
    }
    if ($(dom).find("input[type='hidden']").length > 0) {
        $(dom).find("input[type='hidden']").each(function (i, e) {
            if ($(this).val() != null && $(this).val() != '' && $(this).attr('name') && $(this).attr('name') != '') {
                parame[$(this).attr('name')] = $(this).val()
            }
        })
    }
    return parame
}

/**
 * 声音提醒
 */
var ding = new Audio('/music/ding.wav')
var wrong = new Audio('/music/wrong.wav')
var soundReminder = function (type) {
    if (type == 'success') {
        ding.play()
    }
    if (type == 'error') {
        wrong.play()
    }
}

/**
 * 配货声音
 */
var soundMap = {}
soundMap['01'] = new Audio('/music/01.mp3')
soundMap['02'] = new Audio('/music/02.mp3')
soundMap['03'] = new Audio('/music/03.mp3')
soundMap['04'] = new Audio('/music/04.mp3')
soundMap['05'] = new Audio('/music/05.mp3')
soundMap['06'] = new Audio('/music/06.mp3')
soundMap['07'] = new Audio('/music/07.mp3')
soundMap['08'] = new Audio('/music/08.mp3')
soundMap['09'] = new Audio('/music/09.mp3')
soundMap['10'] = new Audio('/music/10.mp3')
soundMap['11'] = new Audio('/music/11.mp3')
soundMap['12'] = new Audio('/music/12.mp3')
soundMap['13'] = new Audio('/music/13.mp3')
soundMap['14'] = new Audio('/music/14.mp3')
soundMap['15'] = new Audio('/music/15.mp3')
soundMap['16'] = new Audio('/music/16.mp3')
soundMap['17'] = new Audio('/music/17.mp3')
soundMap['18'] = new Audio('/music/18.mp3')
soundMap['19'] = new Audio('/music/19.mp3')
soundMap['20'] = new Audio('/music/20.mp3')
var soundBasket = function (number) {
    soundMap[number].play()
}

/**
 * 消息提示
 */
var message = function (type, msg) {
    if (type == 'success') {
        $.messager.show({
            height: 'initial',
            width: '100%',
            timeout: 2000,
            showSpeed: 200,
            msg: `<div class="success-msg">${msg}</div>`,
            style: {
                position: 'fixed',
                top: 0,
                left: 0,
                padding: 0,
                'z-index': 999,
                'box-shadow': '0 1px 6px rgba(0,0,0,.2)'
            }
        })
    }
    if (type == 'error') {
        $.messager.show({
            height: 'initial',
            width: '100%',
            timeout: 2000,
            showSpeed: 200,
            msg: `<div class="error-msg">${msg}</div>`,
            style: {
                position: 'fixed',
                top: 0,
                left: 0,
                padding: 0,
                'z-index': 999,
                'box-shadow': '0 1px 6px rgba(0,0,0,.2)'
            }
        })
    }
}

/**
 * 显示加载
 */
var showLoading = function () {
    $('#loading').css('display', 'flex')
}

/**
 * 隐藏加载
 */
var hideLoading = function () {
    $('#loading').css('display', 'none')
}

/**
 * 字符串转对象
 */
var specialToJson = function (str) {
    var data = []
    str.split(' &,& ').map(function (e) {
        var _data = {}
        e.replace(/{/, '').replace(/}/, '').replace(/}/, '').split(',').map(function (_e) {
            var d = _e.split(':')
            var s = ''
            if (d[1] == 'http') {
                s += d[1] + ':' + d[2]
            } else {
                s += d[1]
            }
            _data[d[0]] = s
        })
        data.push(_data)
    })
    return data
}

/**
 * 日期格式转换
 */

var timeFormat = function (date) {
    var now = new Date(date)
    var year = now.getFullYear() // 年
    var month = String(now.getMonth() + 1).length == 1 ? '0' + String(now.getMonth() + 1) : now.getMonth() + 1 // 月
    var day = String(now.getDate()).length == 1 ? '0' + String(now.getDate()) : now.getDate() // 日
    var hour = String(now.getHours()).length == 1 ? '0' + String(now.getHours()) : now.getHours() // 时
    var minute = String(now.getMinutes()).length == 1 ? '0' + String(now.getMinutes()) : now.getMinutes() // 分
    var second = String(now.getSeconds()).length == 1 ? '0' + String(now.getSeconds()) : now.getSeconds() // 秒

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

/**
 * 日期格式转换（当前日期，无时分秒）
 */

var timeFormat1 = function () {
    var now = new Date()
    var year = now.getFullYear() // 年
    var month = String(now.getMonth() + 1).length == 1 ? '0' + String(now.getMonth() + 1) : now.getMonth() + 1 // 月
    var day = String(now.getDate()).length == 1 ? '0' + String(now.getDate()) : now.getDate() // 日
    var hour = String(now.getHours()).length == 1 ? '0' + String(now.getHours()) : now.getHours() // 时
    var minute = String(now.getMinutes()).length == 1 ? '0' + String(now.getMinutes()) : now.getMinutes() // 分
    var second = String(now.getSeconds()).length == 1 ? '0' + String(now.getSeconds()) : now.getSeconds() // 秒

    return year + '' + month + '' + day
}

/**
 * 日期转换成时间戳
 */
var timestamp = function (data) {
    if (data) {
        var now = Date.parse(new Date(data)).toString()
        now = now.substring(0, 10)
        return now
    } else {
        return ''
    }
}

/**
 * 权限按钮
 */
var permissionButton = function () {
    var list = JSON.parse(localStorage.getItem('authorities'))
    for (const i in list) {
        if (list[i].type == 3 || list[i].value) {
            $(`div[data-value='${list[i].value}']`).css('display', 'inline-block')
        }
    }
}

/**
 * 微信页面不回弹处理
 */
var onBlur = function () {
    window.scrollTo(0, document.body.scrollTop + 1)
    setTimeout(function () {
        document.body.scrollTop >= 1 && window.scrollTo(0, document.body.scrollTop - 1)
    }, 10)
}