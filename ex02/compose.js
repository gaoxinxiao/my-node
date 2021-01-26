// const add = (x, y) => x + y
// const square = (z) => z * z

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))

// function compose(...fns) {
//     let firstFn = fns[0]
//     let otherFn = fns.slice(1)
//     return function (...args) {
//         let ret = firstFn(...args)
//         otherFn.forEach(fn => {
//             ret = fn(ret)
//         })
//         return ret
//     }
// }

// function compose(...fns) {
//     const reducer = (prevFn, nextFn) => (...args) => nextFn(prevFn(...args))
//     return fns.reduce(reducer)
// }

// const compose = (...fns) => fns.reduce((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)))

// const fn = compose(add, square, square, square)
// console.log(fn(1, 2))

function compose(middlewares) {
    return function () {
        dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i]
            if (!fn) {
                //找不到函数直接返回一个空 的 微任务
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i+1)
                })
            )
        }
    }
}


async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}
async function fn2(next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
}
function fn3(next) {
    console.log("fn3");
}
function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();
