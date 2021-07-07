import { it } from '../src/index'

describe('index.ts', () => {
  const resolve = { status: true }
  const reject = new Error('Give me a reason.')
  const defaultReject = new Error('Rejection reason unspecified.')

  describe('result', () => {
    test('result should contain what promise resolves', async () => {
      const [res1] = await it(Promise.resolve(resolve))
      const [res2] = await it(Promise.all([Promise.resolve('one'), Promise.resolve('two')]))

      expect(res1).toEqual(resolve)
      expect(res2).toEqual(['one', 'two'])
    })

    test('result should be `undefined` on rejection', async () => {
      const [res] = await it(Promise.reject())

      expect(res).toBeUndefined()
    })
  })

  describe('error', () => {
    test('error should be `null` on resolve', async () => {
      const [_, err] = await it(Promise.resolve(resolve))

      expect(err).toBeNull()
    })

    test('error should be `default` on rejection without a message', async () => {
      const [_, err] = await it(Promise.reject())

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toBe(defaultReject.message)
    })

    test('error should be what promise rejects', async () => {
      const [_, err] = await it(Promise.reject(reject))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toBe(reject.message)
    })
  })
})
