// 成功的对象
class SuccessModel{
    constructor({msg='success',code=200,data}){
        this.msg = msg
        this.code=code
        if(data){
            this.data = data
        }
    }
}
// 失败的对象
class ErrorModel{
    constructor({msg='error',code=400}){
        this.msg = msg
        this.code=code
    }
}
module.exports = {
    SuccessModel,
    ErrorModel
}