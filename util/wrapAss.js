function wrapAsync(fn){
    return function(reques,respon,next){
        fn(reques,respon,next).catch(next)
    }
}

module.exports = wrapAsync