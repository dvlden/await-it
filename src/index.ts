type Ok<T> = Readonly<[T, null]>
type Err<T> = Readonly<[null, T]>
type Result<O, E> = Promise<Ok<O> | Err<E>>

export const it = <T, F = Error>(promise: Promise<T>): Result<T, F> => {
  return promise
    .then<Ok<T>>((res: T) => [res, null])
    .catch<Err<F>>((err: F) => [null, err])
}
