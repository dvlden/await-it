type Ok<T> = Readonly<[T, null]>
type Err<T> = Readonly<[undefined, T]>
type Result<O, E> = Promise<Ok<O> | Err<E>>

export const it = <T>(
  promise: Promise<T>
): Result<T, Error> => {
  return promise
    .then<Ok<T>>(
      (res: T) => [res, null]
    )
    .catch<Err<Error>>(
      (err?: Error) => [undefined, err || new Error('Rejection reason unspecified.')]
    )
}
