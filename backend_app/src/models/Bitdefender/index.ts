import { t } from 'elysia'

export const BitdefenderUploadModel = t.Object({
  data: t.String({ default: '' }),
  filePath: t.File(),
})

export interface BitdefenderUploadProps {
  data?: string
  filePath: File
}
