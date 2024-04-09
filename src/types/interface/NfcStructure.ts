interface NfcStructure {
  id: string,
  isWritable: boolean | null,
  canMakeReadOnly: boolean | null,
  maxSize: number | null,
  ndefMessage: [{
    id: string | null,
    payload: [] | null,
    tnf: number | null,
    type: [] | null,
  }] | null,
  type: string | null,
  techTypes: string[] | null
}
