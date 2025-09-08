function getCoarseLocation(ip) {
  if (!ip) return 'unknown'
  const segments = ip.split('.')
  return segments.slice(0, 2).join('.') + '.x.x'
}

export default getCoarseLocation;