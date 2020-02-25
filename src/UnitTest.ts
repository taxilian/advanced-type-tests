
// Used to detect if the type is any
interface SuperUnlikelyType {
    ["/*1235324"]: {'/?..': '999999937'};
}

export type UnionToIntersection<U> =
    (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;

export type OnlyAny<T> = T extends SuperUnlikelyType ? T : never;

export type Yes = 'pass';
export type No = 'fail';

export type BothAny<X, Y> = X extends OnlyAny<X> ? Y extends OnlyAny<Y> ? Yes : No : No;
export type BothBool<X, Y> = (X|Y) extends OnlyAny<X|Y> ? No : boolean extends (X&Y) ? Yes : No;
export type Invert<T> = IsTrue<T> extends Yes ? No : Yes;
export type IsAny<T> = T extends OnlyAny<T> ? Yes : No;
export type IsArray<T> = T extends any[] ? Yes : No;
export type NotAny<T> = Invert<IsAny<T>>;
export type IsTrue<T> = T extends OnlyAny<T> ? No : UnionToIntersection<T> extends Yes ? Yes : No;
export type TypeExtends<X, Y> = X extends Y ? Yes : No;
export type TypeNotExtends<X, Y> = Invert<TypeExtends<X, Y>>;
export type KeyIsIn<X extends string, Y> = X extends keyof Y ? Y[X] extends any ? Yes : No : No;

type t_KeyIsIn1 = KeyIsIn<'indexOf', string>;
type t_KeyIsIn2 = Invert<KeyIsIn<'fooBar', string>>;

type TESTAGG_KeyIsInTests = t_KeyIsIn1 & t_KeyIsIn2;

export type And<A, B> = A extends Yes ? B extends Yes ? Yes : No : No;
export type And3<A, B, C> = And<A, B> extends Yes ? C extends Yes ? Yes : No : No;
export type And4<A, B, C, D> = And3<A, B, C> extends Yes ? D extends Yes ? Yes : No : No;

export type Or<A, B> = A extends Yes ? Yes : B extends Yes ? Yes : No;
export type Or3<A, B, C> = Or<A, B> extends Yes ? Yes : C extends Yes ? Yes : No;
export type Or4<A, B, C, D> = Or3<A, B, C> extends Yes ? Yes : D extends Yes ? Yes : No;

export type IfThen<Cond, Then, Else = never> = IsTrue<Cond> extends Yes ? Then : Else;

export type FilterKeys<T> = { [P in keyof T]: T[P] extends T ? never : P }[keyof T];
export type FilterType<T> = { [P in FilterKeys<T>]: T[P] };

interface TypeToFilter {
    asdf: string;
    fdsa: number;
    huh: any;
    goaway: never;
}
type FilteredTypeTest = FilterType<TypeToFilter>;
type t_TypeFiltered = Invert<TypeExtends<keyof[FilteredTypeTest], 'goaway'>>;
type t_TypeFiltered2 = And3<KeyIsIn<'asdf', FilteredTypeTest>, KeyIsIn<'fdsa', FilteredTypeTest>, KeyIsIn<'huh', FilteredTypeTest>>;

type TESTAGG_FilterTests = t_TypeFiltered & t_TypeFiltered2;

type t_TestIfThen = TypeEquals<IfThen<Yes, string, No>, string>;
type t_TestIfThen2 = TypeEquals<IfThen<No, No, string>, string>;

type t_AndTest1 = And<Yes, Yes>;
type t_AndTest2 = Invert<And<Yes, No>>;
type t_AndTest3 = Invert<And<No, Yes>>;
type t_AndTest4 = Invert<And<No, No>>;

type t_And3Test1 = And3<Yes, Yes, Yes>;
type t_And3Test2 = Invert<And3<Yes, No, No>>;
type t_And3Test3 = Invert<And3<Yes, Yes, No>>;
type t_And3Test4 = Invert<And3<Yes, No, Yes>>;
type t_And3Test5 = Invert<And3<No, Yes, Yes>>;
type t_And3Test6 = Invert<And3<No, No, No>>;
type t_And3Test7 = Invert<And3<No, Yes, No>>;
type t_And3Test8 = Invert<And3<No, No, Yes>>;

type TESTAGG_AndTests = t_AndTest1 & t_AndTest2 & t_AndTest3 & t_AndTest4
    & t_And3Test1 & t_And3Test2 & t_And3Test3 & t_And3Test4
    & t_And3Test5 & t_And3Test6 & t_And3Test7 & t_And3Test8
    & t_TestIfThen & t_TestIfThen2;

type t_OrTest1 = Or<Yes, Yes>;
type t_OrTest2 = Or<Yes, No>;
type t_OrTest3 = Or<No, Yes>;
type t_OrTest4 = Invert<Or<No, No>>;

type t_Or3Test1 = Or3<Yes, Yes, Yes>;
type t_Or3Test2 = Or3<Yes, No, No>;
type t_Or3Test3 = Or3<Yes, Yes, No>;
type t_Or3Test4 = Or3<Yes, No, Yes>;
type t_Or3Test5 = Or3<No, Yes, Yes>;
type t_Or3Test6 = Invert<Or3<No, No, No>>;
type t_Or3Test7 = Or3<No, Yes, No>;
type t_Or3Test8 = Or3<No, No, Yes>;

type TESTAGG_OrTests = t_OrTest1 & t_OrTest2 & t_OrTest3 & t_OrTest4
    & t_Or3Test1 & t_Or3Test2 & t_Or3Test3 & t_Or3Test4
    & t_Or3Test5 & t_Or3Test6 & t_Or3Test7 & t_Or3Test8;

export type IsBoolTrue<T> = TypeExtends<T, true>;

// Tests to ensure IsBoolTrue works
type t_IsBoolTrueT = IsBoolTrue<true>;
type t_IsBoolTrueF = Invert<IsBoolTrue<false>>;
type t_IsBoolTrueBool = Invert<IsBoolTrue<boolean>>;

type t_InvertTrue = Invert<Yes> extends No ? Yes : No;
type t_InvertFalse = Invert<No>;

type t_IsTrue1 = IsTrue<Yes>;
type t_IsTrue2 = Invert<IsTrue<Yes | No>>;
type t_IsTrue3 = Invert<IsTrue<No>>;
type t_IsTrue4 = Invert<IsTrue<boolean>>;
type t_IsTrue5 = Invert<IsTrue<any>>;
// type t_IsTrue6 = Invert<IsTrue<never>>;

type TESTAGG_TruthTests = t_IsBoolTrueT & t_IsBoolTrueF & t_IsBoolTrueBool
    & t_InvertTrue & t_InvertFalse
    & t_IsTrue1 & t_IsTrue2 & t_IsTrue3 & t_IsTrue4 & t_IsTrue5;

export type ArrayFieldsOf<X> = {
    [F in keyof X]: X[F] extends any[] ? F: never;
}[keyof X];

export type TypeEquals<X, Y> =
    BothBool<X, Y> extends Yes ? Yes :
    BothAny<X, Y> extends Yes ? Yes :
    X extends OnlyAny<X> ? No :
    Y extends OnlyAny<Y> ? No :
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? Yes : No;

export type TypeNotEquals<X, Y> = Invert<TypeEquals<X, Y>>;

/**
 * Checks if the type of each array is equal to the other; uses hackery to ensure
 * that bad types don't get compared as valid but will break if you try to compare
 * '`'[] with '~'[] =]
 */
export type ArrayTypeEquals<X, Y> = TypeEquals<X extends any[] ? X[number] : '`', Y extends any[] ? Y[number] : '~'>;

type t_BothAnyTrue = BothAny<any, any>;
type t_BothAnyJustX = Invert<BothAny<any, string>>;
type t_BothAnyJustY = Invert<BothAny<boolean, any>>;

type TESTAGG_BothAnyTests = t_BothAnyTrue & t_BothAnyJustX & t_BothAnyJustY;

type t_BothBoolTrue = BothBool<boolean, boolean>;
type t_BothBoolJustX = Invert<BothBool<false, boolean>>;
type t_BothBoolJustY = Invert<BothBool<boolean, true>>;
type t_BothBoolAnyX = Invert<BothBool<any, true>>;
type t_BothBoolAnyY = Invert<BothBool<boolean, any>>;

type TESTAGG_BothBoolTests = t_BothBoolTrue & t_BothBoolJustX & t_BothBoolJustY & t_BothBoolAnyX & t_BothBoolAnyY;

// if both are any, should return Yes
type t_TypeEqualsSupportsAnyBoth = IsTrue<TypeEquals<any, any>>;
// if only one is any should return No
type t_TypeEqualsSupportsAnyJustX = Invert<TypeEquals<any, string>>;
type t_TypeEqualsSupportsAnyJustX2 = Invert<TypeEquals<any, boolean>>;
type t_TypeEqualsSupportsAnyJustY = Invert<TypeEquals<string, any>>;
type t_TypeEqualsSupportsAnyJustY2 = Invert<TypeEquals<boolean, any>>;

// Check type equals against some different types
type t_TypeEqualsSupportsDate = TypeEquals<Date, Date>;
type t_TypeEqualsSupportsString = TypeEquals<string, string>;
type t_TypeEqualsSupportsNumber = TypeEquals<number, number>;
type t_TypeEqualsSupportsBool = TypeEquals<boolean, boolean>;
type t_TypeEqualsSupportsTrue = TypeEquals<true, true>;
type t_TypeEqualsSupportsFalse = TypeEquals<false, false>;
type t_TypeEqualsSupportsStringLit = TypeEquals<'false', 'false'>;

type TESTAGG_TypeEqualsTests = Yes
    & t_TypeEqualsSupportsAnyBoth
    & t_TypeEqualsSupportsAnyJustX
    & t_TypeEqualsSupportsAnyJustX2
    & t_TypeEqualsSupportsAnyJustY
    & t_TypeEqualsSupportsAnyJustY2
    & t_TypeEqualsSupportsDate
    & t_TypeEqualsSupportsString
    & t_TypeEqualsSupportsNumber
    & t_TypeEqualsSupportsBool
    & t_TypeEqualsSupportsTrue
    & t_TypeEqualsSupportsFalse
    & t_TypeEqualsSupportsStringLit;


export type FieldsCheckEqual<X, Y, Keys extends keyof X | keyof Y = keyof X | keyof Y> = {
    [Key in Keys]: Key extends FilterKeys<X> ? Key extends FilterKeys<Y> ? (Yes & (
        X[Key] extends any[] ? 
            ArrayTypeEquals<X[Key], Y[Key]> : TypeEquals<X[Key], Y[Key]>
        )) : No : No;
};
export type FieldsConfirmCheck<T> = Invert<T[keyof T] extends Yes ? No : Yes>;
// When FieldsCheckEqual fails this can be used to help understand what is going on
export type FieldsCheckEqual_Test<X, Y, Keys extends keyof X | keyof Y = keyof X | keyof X> = {
    [Key in Keys]: [Key extends FilterKeys<X> ? Key extends FilterKeys<Y> ? (Yes & (
        X[Key] extends any[] ?
        ArrayTypeEquals<X[Key], Y[Key]> : TypeEquals<X[Key], Y[Key]>
        )) : No : No];
};

interface testFieldCheck {
    foo: any;
    bar: string;
    baz: number;
}
interface testFieldCheckExtra extends testFieldCheck {
    meh: boolean;
}
interface testFieldCheckWithNever extends testFieldCheck {
    something: never;
}
type TestCompareGood = FieldsCheckEqual<testFieldCheck, testFieldCheck>;
type TestCompareBad1 = FieldsCheckEqual<testFieldCheck, testFieldCheckExtra>;
type TestCompareBad2 = FieldsCheckEqual<testFieldCheckExtra, testFieldCheck>;
type TestCompareBad3 = FieldsCheckEqual<testFieldCheckWithNever, testFieldCheckWithNever>;

type t_TestFieldCompareGood = FieldsConfirmCheck<TestCompareGood>;
type t_TestFieldCompareBad1 = Invert<FieldsConfirmCheck<TestCompareBad1>>;
type t_TestFieldCompareBad2 = Invert<FieldsConfirmCheck<TestCompareBad2>>;
type t_TestFieldCompareBad3 = Invert<FieldsConfirmCheck<TestCompareBad3>>;

type TESTAGG_FieldCheck = NotAny<Yes
    & t_TestFieldCompareGood
    & t_TestFieldCompareBad1 & t_TestFieldCompareBad2 & t_TestFieldCompareBad3
>;

// If this type is not 'pass' (exported as Yes) then this file is not working correctly
export type TypeChecks = NotAny<Yes
    & TESTAGG_TruthTests
    & TESTAGG_FilterTests
    & TESTAGG_KeyIsInTests
    & TESTAGG_AndTests
    & TESTAGG_OrTests
    & TESTAGG_BothAnyTests
    & TESTAGG_BothBoolTests
    & TESTAGG_TypeEqualsTests
    & TESTAGG_FieldCheck
>;
