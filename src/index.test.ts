import { describe, expect, test } from 'vitest'
import { it } from './index'

describe('index.ts', () => {
  const resolve = { status: true }
  const reject = new Error('Give me a reason.')

  describe('result', () => {
    test('result should contain what promise resolves', async () => {
      const [res1] = await it(Promise.resolve(resolve))
      const [res2] = await it(
        Promise.all([Promise.resolve('one'), Promise.resolve('two')]),
      )

      expect(res1).toEqual(resolve)
      expect(res2).toEqual(['one', 'two'])
    })

    test('result should be `null` on rejection', async () => {
      const [res] = await it(Promise.reject())

      expect(res).toBeNull()
    })
  })

  describe('error', () => {
    test('error should be `null` on resolve', async () => {
      const [_, err] = await it(Promise.resolve(resolve))

      expect(err).toBeNull()
    })

    test('error should be what promise rejects', async () => {
      const [_, err] = await it(Promise.reject(reject))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toBe(reject.message)
    })
  })
})
