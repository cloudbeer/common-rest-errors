'use strict';

var YError = function (msg, errno, httpStatus) {
    var error = new Error(msg);
    error.status = httpStatus || 200;
    if (errno == null) errno = -1;
    error.errno = errno;
    return error;
};

YError.prototype.parse = function (errInfo) {
    if (typeof errInfo == "string") {
        try {
            errInfo = JSON.parse(errInfo);
            return YError(errInfo.errText, errInfo.errno);
        } catch (e) {
        }
    }
    var rtn = new Error(errInfo);
    rtn.errno = -1;
    return rtn;
};

var errors = {
    //validate error
    CUSTOM: function (msg) {
        msg = msg || "未知错误。";
        return YError(msg, -1);
    },
    WHAT_REQUIRE: function (what) {
        what = what || "参数";
        return YError("需要" + what + "。", -1001);
    },
    WHAT_WRONG_RANGE: function (what, min, max) {
        what = what || '参数';
        var msg = what + "取值范围错误。";
        if (min != null) {
            msg += "，最小值 " + min;
        }
        if (max != null) {
            msg += "，最大值 " + max;
        }
        return YError(msg, -1002);
    },
    WHAT_WRONG_FORMAT: function (what) {
        what = what || '参数';
        return YError(what + "格式不正确。", -1003);
    },
    WHAT_NOT_SAME: function (what) {
        what = what || '参数';
        return YError("两次输入的" + what + "值不一样。", -1004);
    },
    WHAT_NOT_EXISTS: function (what) {
        what = what || '对象';
        return YError(what + " 不存在。", -1005);
    },
    WHAT_TOO_MUCH: function (what, max_count) {
        what = what || '对象';
        var info = what + "数量太多了。";
        if (max_count)
            info += "最多允许数量是 " + max_count;
        return YError(info, -1006);
    },
    WHAT_NOT_BELONGS_TO_YOU: function (what) {
        what = what || '对象';
        return YError(what + "不属于你。未经授权获取他人信息是违法行为。", -1007);
    },
    WHAT_NOT_FOUND: function (what) {
        what = what || '对象';
        return YError(what + "不存在。", -1007);
    },
    WHAT_TOO_LONG: function (what) {
        return YError(what + "字数超长了。", -1008);
    },
    WHAT_EXISTED: function (what) {
        what = what || '对象';
        return YError(what + "已经存在。", -1009);
    },
    WHAT_OCCUPIED: function (what) {
        what = what || '对象';
        return YError(what + "被占用。", -1010);

    },

    ACCESS_TOKEN_NOT_FOUND: YError("access_token 不存在。", -2001),
    ACCESS_TOKEN_EXPIRED: YError("access_token 已经过期。", -2002),

    TICKET_EXPIRED: YError("票据已经过期，请重新获取。", -2050),
    TICKET_VERIFY_FAILED: YError("票据校验失败。篡改登录信息是违法行为！", -2051),
    TICKET_ILLEGAL: YError("非法票据。篡改登录信息是违法行为！", -2052),
    SIGN_VERIFY_FAILED: YError("签名验证失败！", -2053),


    PASSWORD_NOT_STRONG: YError("密码太简单，必须要 8 位以上，并由字母数字或符号组合。", -3001),
    CHINA_MOBILE_ILLEGAL: YError("不正确的手机号码。", -3002),
    EMAIL_ILLEGAL: YError("不正确的Email。", -3003),
    CAPTCHA_VALIDATE_FAIL: YError("验证码校验失败。", -3004),
    PASSPORT_ILLEGAL: YError("不正确的登录凭据，必须是手机或者 Email。", -3005),
    MEMBER_ONLY: YError("您还没有登录，请先登录。", -3006),

    LOGIN_ERROR_COMMON: YError("登录失败", -3050),
    LOGIN_ERROR_BECAUSE: function (what) {
        return YError("登录失败，原因：" + what, -3051);
    },
    LOGIN_USER_NOT_EXISTS: YError("您的用户名不存在。", -3052),
    LOGIN_USER_NOT_APPROVED: YError("您的用户名审核不通过,系统已经重置该用户名。", -3053),
    LOGIN_USER_FORBIDDEN: YError("您已经被系统屏蔽。", -3054),
    LOGIN_USER_TOO_MUCH_FAILED: YError("您登录失败的次数太多，请稍后再试。", -3055),
    LOGIN_IP_TOO_MUCH_FAILED: YError("您登录失败的次数太多。暴力破解他人密码是违法行为！", -3056),
    LOGIN_IP_TOO_MUCH_USER: YError("该IP当日登录帐号数已达上限。", -3056),

    NO_RIGHTS: YError("您没有权限访问。", -4001),

};

module.exports = errors;
module.exports.YError = YError;
