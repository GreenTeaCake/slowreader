import { cleanStores } from 'nanostores'
import { setTimeout } from 'timers/promises'
import { test } from 'uvu'
import { equal } from 'uvu/assert'

import {
  addFeed,
  enableClientTest,
  Feed,
  organizeFeeds,
  organizeLoading,
  userId
} from '../index.js'

test.before.each(() => {
  enableClientTest()
  userId.set('10')
})

test.after.each(async () => {
  cleanStores(Feed, userId, organizeFeeds, organizeLoading)
})

test('adds feed', async () => {
  organizeLoading.listen(() => {})
  organizeFeeds.listen(() => {})

  equal(organizeLoading.get(), true)

  await setTimeout(10)
  equal(organizeLoading.get(), false)
  equal(organizeFeeds.get(), [])

  await addFeed({
    id: 'id',
    loader: 'rss',
    title: 'RSS',
    url: 'https://example.com/'
  })
  equal(organizeFeeds.get(), [
    {
      id: 'id',
      isLoading: false,
      loader: 'rss',
      title: 'RSS',
      url: 'https://example.com/'
    }
  ])
})

test.run()