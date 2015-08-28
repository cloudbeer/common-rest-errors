# common-errors

错误列表，为了方便抛出的，尚未国际化，目前只有中文。

在程序中，例外的地方只需要抛出例外即可，如：

    if (!passport)
        throw error.WHAT_REQUIRE("手机号码或者邮箱");


在全局中处理例外，如在 koajs 中：


    app.use(function *(next) {
        try {
            yield next;
        } catch (err) {
            console.log(err);
            this.status = err.status || 500;
            this.body = {errno: err.errno || -1, errText: err.message};
            this.app.emit('error', err, this);
        }
    });
