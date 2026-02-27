// LinkedIn Insight Tag global type declaration
interface Window {
  lintrk: ((action: string, data?: Record<string, unknown>) => void) & {
    q: unknown[][]
  }
  _linkedin_partner_id: string
  _linkedin_data_partner_ids: string[]
}
