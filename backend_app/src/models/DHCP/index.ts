import { t } from 'elysia'

export const DHCPUploadModel = t.Object({
  data: t.String({ default: '' }),
  filePath: t.File(),
})

export interface DHCPUploadProps {
  data?: string
  filePath: File
}
