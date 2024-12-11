import { t } from 'elysia'

export const ReportModel = t.Object({
  name: t.String({ default: '' }),
  ad: t.Boolean({ default: false }),
  dhcp: t.Boolean({ default: false }),
  bitdefender: t.Boolean({ default: false }),
  kace: t.Boolean({ default: false }),
})

export interface ReportProps {
  name: string
  ad: boolean
  dhcp: boolean
  bitdefender: boolean
  kace: boolean
}
