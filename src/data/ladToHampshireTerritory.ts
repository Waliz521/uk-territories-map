/**
 * Hampshire split: LAD (Local Authority District) → territory ID.
 * Client requested split of Hampshire county into 4 territories (all Available).
 * Rushmoor is not in the client's split - currently mapped to hampshire-unassigned (gray).
 * See CLIENT_MESSAGE_RUSHMOR below for message to ask client.
 */

/** Map: normalized LAD name → territory ID */
export const LAD_TO_HAMPSHIRE_TERRITORY: Record<string, string> = {
  // South Hampshire: Portsmouth, Fareham, Gosport
  portsmouth: 'hampshire-south',
  fareham: 'hampshire-south',
  gosport: 'hampshire-south',

  // East Hampshire: Havant, East Hampshire, Southampton
  havant: 'hampshire-east',
  'east hampshire': 'hampshire-east',
  southampton: 'hampshire-east',

  // North Hampshire: Basingstoke and Deane, Hart, Test Valley
  'basingstoke and deane': 'hampshire-north',
  hart: 'hampshire-north',
  'test valley': 'hampshire-north',

  // New Forest: Winchester, New Forest, Eastleigh
  winchester: 'hampshire-new-forest',
  'new forest': 'hampshire-new-forest',
  eastleigh: 'hampshire-new-forest',

  // Rushmoor: not in client's split - left as unassigned (gray) until client confirms
  rushmoor: 'hampshire-unassigned',
}

/** Message to send to client about Rushmoor */
export const CLIENT_MESSAGE_RUSHMOR =
  "Rushmoor (borough including Aldershot and Farnborough) is part of Hampshire but wasn't included in your 4-territory split. How would you like us to handle it? Options: (1) Assign it to one of the four territories (e.g. North Hampshire), (2) Leave it as 'Not available' (gray), or (3) Create a fifth territory for Rushmoor."
