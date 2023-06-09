function takeSomethingComplex(arg) { }
function getBar() {
    return 'some bar';
}
// 一个可能会出现的错误使用
var fail = {
    foo: 123,
    bar: getBar()
};
takeSomethingComplex(fail); // 在这里 TypeScript 会报错
