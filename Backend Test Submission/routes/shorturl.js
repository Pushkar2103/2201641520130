import express from 'express'
import Url from '../models/Url.js'
import { nanoid } from 'nanoid'
import { Log } from '../logger.js'
import getCoarseLocation from '../utils/geo.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { url, validity, shortcode } = req.body
  if (!url) return res.status(400).json({ error: 'URL is required' })

  let code = shortcode || nanoid(6)
  if (!/^[a-zA-Z0-9]{4,10}$/.test(code)) code = nanoid(6)

  const exists = await Url.findOne({ shortcode: code })
  if (exists) return res.status(409).json({ error: 'Shortcode already exists' })

  const now = new Date()
  const expiry = new Date(now.getTime() + ((validity || 30) * 60000))

  const newUrl = new Url({
    originalUrl: url,
    shortcode: code,
    createdAt: now,
    expiry,
    clicks: []
  })

  await newUrl.save()
  Log('backend', 'info', 'controller', `Shortened URL created: ${code}`)

  res.status(201).json({
    shortLink: `${process.env.BASE_URL}/${code}`,
    expiry: expiry.toISOString()
  })
})

router.get('/:shortcode', async (req, res) => {
  const { shortcode } = req.params
  const urlDoc = await Url.findOne({ shortcode })

  if (!urlDoc) return res.status(404).json({ error: 'Shortcode not found' })
  if (new Date() > urlDoc.expiry) return res.status(410).json({ error: 'Link expired' })

  res.json({
    originalUrl: urlDoc.originalUrl,
    createdAt: urlDoc.createdAt,
    expiry: urlDoc.expiry,
    totalClicks: urlDoc.clicks.length,
    clickDetails: urlDoc.clicks
  })
})

router.get('/:shortcode/redirect', async (req, res) => {
  const { shortcode } = req.params
  const urlDoc = await Url.findOne({ shortcode })

  if (!urlDoc) return res.status(404).json({ error: 'Shortcode not found' })
  if (new Date() > urlDoc.expiry) return res.status(410).json({ error: 'Link expired' })

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const referrer = req.headers.referer || 'direct'
  const location = getCoarseLocation(ip)

  urlDoc.clicks.push({
    timestamp: new Date(),
    source: referrer,
    location
  })

  await urlDoc.save()
  Log('backend', 'info', 'controller', `Redirected: ${shortcode} from ${referrer}`)

  res.redirect(urlDoc.originalUrl)
})

export default router
