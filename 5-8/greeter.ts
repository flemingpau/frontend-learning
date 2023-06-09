type SomethingComplex = {
  foo: number;
  bar: string;
};

function takeSomethingComplex(arg: SomethingComplex) {}

function getBar(): string {
  return 'some bar';
}

// 一个可能会出现的错误使用
const fail = {
  foo: 123,
  bar: getBar()
};

takeSomethingComplex(fail); // 在这里 TypeScript 会报错