/**
 * LAD (Local Authority District) to County mapping for England & Wales.
 * Used when Excel has county-level data but GeoJSON has LAD-level boundaries.
 * Based on ONS Local Authority District structure (pre-2023 reorg where applicable).
 */

/** Map: normalized LAD name -> normalized county name */
export const LAD_TO_COUNTY: Record<string, string> = {
  // Surrey (125-128)
  elmbridge: 'surrey',
  'epsom and ewell': 'surrey',
  guildford: 'surrey',
  'mole valley': 'surrey',
  'reigate and banstead': 'surrey',
  runnymede: 'surrey',
  spelthorne: 'surrey',
  'surrey heath': 'surrey',
  tandridge: 'surrey',
  waverley: 'surrey',
  woking: 'surrey',

  // Lincolnshire (87-89)
  boston: 'lincolnshire',
  'east lindsey': 'lincolnshire',
  lincoln: 'lincolnshire',
  'north kesteven': 'lincolnshire',
  'south holland': 'lincolnshire',
  'south kesteven': 'lincolnshire',
  'west lindsey': 'lincolnshire',
  'north east lincolnshire': 'lincolnshire',
  'north lincolnshire': 'lincolnshire',

  // Northamptonshire (90-92)
  corby: 'northamptonshire',
  daventry: 'northamptonshire',
  'east northamptonshire': 'northamptonshire',
  kettering: 'northamptonshire',
  northampton: 'northamptonshire',
  'south northamptonshire': 'northamptonshire',
  wellingborough: 'northamptonshire',

  // Derbyshire (93-95)
  'amber valley': 'derbyshire',
  bolsover: 'derbyshire',
  chesterfield: 'derbyshire',
  'derbyshire dales': 'derbyshire',
  erewash: 'derbyshire',
  'high peak': 'derbyshire',
  'north east derbyshire': 'derbyshire',
  'south derbyshire': 'derbyshire',

  // Hampshire (30-34)
  'basingstoke and deane': 'hampshire',
  'east hampshire': 'hampshire',
  eastleigh: 'hampshire',
  fareham: 'hampshire',
  gosport: 'hampshire',
  hart: 'hampshire',
  havant: 'hampshire',
  'new forest': 'hampshire',
  rushmoor: 'hampshire',
  'test valley': 'hampshire',
  winchester: 'hampshire',
  portsmouth: 'hampshire',
  southampton: 'hampshire',

  // Isle of Wight (30-34) - unitary, same name
  'isle of wight': 'isle of wight',

  // Leicestershire (36-37)
  blaby: 'leicestershire',
  charnwood: 'leicestershire',
  harborough: 'leicestershire',
  'hinckley and bosworth': 'leicestershire',
  melton: 'leicestershire',
  'north west leicestershire': 'leicestershire',
  'oadby and wigston': 'leicestershire',
  leicester: 'leicestershire',

  // Rutland (36-37)
  rutland: 'rutland',

  // Gloucestershire (38-40)
  cheltenham: 'gloucestershire',
  cotswold: 'gloucestershire',
  'forest of dean': 'gloucestershire',
  gloucester: 'gloucestershire',
  stroud: 'gloucestershire',
  tewkesbury: 'gloucestershire',

  // Herefordshire (38-40) - unitary
  'herefordshire, county of': 'herefordshire',

  // Bristol (45-46) - unitary
  'bristol, city of': 'bristol',

  // Cumbria (47-48)
  allerdale: 'cumbria',
  'barrow-in-furness': 'cumbria',
  carlisle: 'cumbria',
  copeland: 'cumbria',
  eden: 'cumbria',
  'south lakeland': 'cumbria',

  // Wiltshire (49-50) - unitary
  wiltshire: 'wiltshire',

  // West Sussex (104-106)
  adur: 'west sussex',
  arun: 'west sussex',
  chichester: 'west sussex',
  crawley: 'west sussex',
  horsham: 'west sussex',
  'mid sussex': 'west sussex',
  worthing: 'west sussex',

  // East Sussex (51-52)
  eastbourne: 'east sussex',
  hastings: 'east sussex',
  lewes: 'east sussex',
  rother: 'east sussex',
  wealden: 'east sussex',
  'brighton and hove': 'east sussex',

  // Buckinghamshire (53-55)
  'aylesbury vale': 'buckinghamshire',
  chiltern: 'buckinghamshire',
  'south bucks': 'buckinghamshire',
  wycombe: 'buckinghamshire',
  'milton keynes': 'buckinghamshire',

  // Cornwall (56-59) - unitary
  cornwall: 'cornwall',
  'isles of scilly': 'cornwall',

  // Somerset (60-62)
  mendip: 'somerset',
  sedgemoor: 'somerset',
  'south somerset': 'somerset',
  'taunton deane': 'somerset',
  'west somerset': 'somerset',
  'bath and north east somerset': 'somerset',
  'north somerset': 'somerset',

  // Worcestershire (63-66)
  bromsgrove: 'worcestershire',
  'malvern hills': 'worcestershire',
  redditch: 'worcestershire',
  worcester: 'worcestershire',
  wychavon: 'worcestershire',
  'wyre forest': 'worcestershire',

  // Warwickshire (67-70)
  'north warwickshire': 'warwickshire',
  'nuneaton and bedworth': 'warwickshire',
  rugby: 'warwickshire',
  'stratford-on-avon': 'warwickshire',
  warwick: 'warwickshire',

  // North Yorkshire (71-73)
  craven: 'north yorkshire',
  hambleton: 'north yorkshire',
  harrogate: 'north yorkshire',
  richmondshire: 'north yorkshire',
  ryedale: 'north yorkshire',
  scarborough: 'north yorkshire',
  selby: 'north yorkshire',
  york: 'north yorkshire',

  // Cambridgeshire (74-76)
  cambridge: 'cambridgeshire',
  'east cambridgeshire': 'cambridgeshire',
  fenland: 'cambridgeshire',
  huntingdonshire: 'cambridgeshire',
  'south cambridgeshire': 'cambridgeshire',
  peterborough: 'cambridgeshire',

  // Bedfordshire (77-79)
  bedford: 'bedfordshire',
  'central bedfordshire': 'bedfordshire',
  luton: 'bedfordshire',

  // Oxfordshire (80-82)
  cherwell: 'oxfordshire',
  oxford: 'oxfordshire',
  'south oxfordshire': 'oxfordshire',
  'vale of white horse': 'oxfordshire',
  'west oxfordshire': 'oxfordshire',

  // Suffolk (83-86)
  babergh: 'suffolk',
  'forest heath': 'suffolk',
  ipswich: 'suffolk',
  'mid suffolk': 'suffolk',
  'st edmundsbury': 'suffolk',
  'suffolk coastal': 'suffolk',
  waveney: 'suffolk',

  // Staffordshire (101-103)
  'cannock chase': 'staffordshire',
  'east staffordshire': 'staffordshire',
  lichfield: 'staffordshire',
  'newcastle-under-lyme': 'staffordshire',
  'south staffordshire': 'staffordshire',
  stafford: 'staffordshire',
  'staffordshire moorlands': 'staffordshire',
  tamworth: 'staffordshire',
  'stoke-on-trent': 'staffordshire',

  // West Sussex (104-106)
  // (same as East Sussex districts - Adur, Arun, Chichester, Crawley, Horsham, Mid Sussex, Worthing are in West Sussex)
  // Actually Adur, Arun, Chichester, Crawley, Horsham, Mid Sussex, Worthing are West Sussex
  // East Sussex: Eastbourne, Hastings, Lewes, Rother, Wealden, Brighton and Hove
  // Updating: West Sussex LADs
  // Adur, Arun, Chichester, Crawley, Horsham, Mid Sussex, Worthing = West Sussex

  // Norfolk (107-109)
  breckland: 'norfolk',
  broadland: 'norfolk',
  'great yarmouth': 'norfolk',
  "king's lynn and west norfolk": 'norfolk',
  'north norfolk': 'norfolk',
  norwich: 'norfolk',
  'south norfolk': 'norfolk',

  // Berkshire (110-112)
  'bracknell forest': 'berkshire',
  'west berkshire': 'berkshire',
  reading: 'berkshire',
  slough: 'berkshire',
  'windsor and maidenhead': 'berkshire',
  wokingham: 'berkshire',

  // Cheshire (113-116)
  'cheshire east': 'cheshire',
  'cheshire west and chester': 'cheshire',
  halton: 'cheshire',
  warrington: 'cheshire',

  // Tyne and Wear (117-120)
  'newcastle upon tyne': 'tyne and wear',
  'north tyneside': 'tyne and wear',
  'south tyneside': 'tyne and wear',
  sunderland: 'tyne and wear',
  gateshead: 'tyne and wear',

  // Hertfordshire (121-124)
  broxbourne: 'hertfordshire',
  dacorum: 'hertfordshire',
  'east hertfordshire': 'hertfordshire',
  hertsmere: 'hertfordshire',
  'north hertfordshire': 'hertfordshire',
  'st albans': 'hertfordshire',
  stevenage: 'hertfordshire',
  'three rivers': 'hertfordshire',
  watford: 'hertfordshire',
  'welwyn hatfield': 'hertfordshire',

  // South Yorkshire (129-132)
  barnsley: 'south yorkshire',
  doncaster: 'south yorkshire',
  rotherham: 'south yorkshire',
  sheffield: 'south yorkshire',

  // Merseyside (133-137)
  knowsley: 'merseyside',
  liverpool: 'merseyside',
  'st. helens': 'merseyside',
  sefton: 'merseyside',
  wirral: 'merseyside',

  // Lancashire (138-142)
  burnley: 'lancashire',
  chorley: 'lancashire',
  fylde: 'lancashire',
  hyndburn: 'lancashire',
  lancaster: 'lancashire',
  pendle: 'lancashire',
  preston: 'lancashire',
  'ribble valley': 'lancashire',
  rossendale: 'lancashire',
  'south ribble': 'lancashire',
  'west lancashire': 'lancashire',
  wyre: 'lancashire',
  blackpool: 'lancashire',
  'blackburn with darwen': 'lancashire',

  // Kent (143-147)
  ashford: 'kent',
  canterbury: 'kent',
  dartford: 'kent',
  dover: 'kent',
  gravesham: 'kent',
  maidstone: 'kent',
  sevenoaks: 'kent',
  shepway: 'kent',
  swale: 'kent',
  thanet: 'kent',
  'tonbridge and malling': 'kent',
  'tunbridge wells': 'kent',
  medway: 'kent',

  // Essex (148-152)
  basildon: 'essex',
  braintree: 'essex',
  brentwood: 'essex',
  'castle point': 'essex',
  chelmsford: 'essex',
  colchester: 'essex',
  'epping forest': 'essex',
  harlow: 'essex',
  maldon: 'essex',
  rochford: 'essex',
  tendring: 'essex',
  uttlesford: 'essex',
  'southend-on-sea': 'essex',
  thurrock: 'essex',

  // Devon (96-98)
  'east devon': 'devon',
  exeter: 'devon',
  'mid devon': 'devon',
  'north devon': 'devon',
  'south hams': 'devon',
  teignbridge: 'devon',
  torridge: 'devon',
  'west devon': 'devon',
  plymouth: 'devon',
  torbay: 'devon',

  // Nottinghamshire (99-101)
  ashfield: 'nottinghamshire',
  bassetlaw: 'nottinghamshire',
  broxtowe: 'nottinghamshire',
  gedling: 'nottinghamshire',
  mansfield: 'nottinghamshire',
  'newark and sherwood': 'nottinghamshire',
  rushcliffe: 'nottinghamshire',
  nottingham: 'nottinghamshire',

  // West Yorkshire (153-158)
  bradford: 'west yorkshire',
  calderdale: 'west yorkshire',
  kirklees: 'west yorkshire',
  leeds: 'west yorkshire',
  wakefield: 'west yorkshire',

  // Greater Manchester (159-164)
  bolton: 'greater manchester',
  bury: 'greater manchester',
  manchester: 'greater manchester',
  oldham: 'greater manchester',
  rochdale: 'greater manchester',
  salford: 'greater manchester',
  stockport: 'greater manchester',
  tameside: 'greater manchester',
  trafford: 'greater manchester',
  wigan: 'greater manchester',

  // West Midlands (165-172)
  birmingham: 'west midlands',
  coventry: 'west midlands',
  dudley: 'west midlands',
  sandwell: 'west midlands',
  solihull: 'west midlands',
  walsall: 'west midlands',
  wolverhampton: 'west midlands',

  // Northumberland (35)
  northumberland: 'northumberland',

  // Shropshire (41)
  shropshire: 'shropshire',
  'telford and wrekin': 'shropshire',

  // East Riding of Yorkshire (42) - unitary
  'east riding of yorkshire': 'east riding of yorkshire',

  // Dorset (split - some in Devon territory)
  christchurch: 'dorset',
  'east dorset': 'dorset',
  'north dorset': 'dorset',
  purbeck: 'dorset',
  'west dorset': 'dorset',
  'weymouth and portland': 'dorset',
  bournemouth: 'dorset',
  poole: 'dorset',

  // County Durham
  'county durham': 'county durham',
  darlington: 'county durham',
  hartlepool: 'county durham',
  middlesbrough: 'county durham',
  'redcar and cleveland': 'county durham',
  'stockton-on-tees': 'county durham',
}

/** Get county name for a normalized LAD name, or undefined if not found */
export function getCountyForLad(normalizedLadName: string): string | undefined {
  return LAD_TO_COUNTY[normalizedLadName]
}
