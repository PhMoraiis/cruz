import { t } from 'elysia'

export const KaceUploadModel = t.Object({
  data: t.String({ default: '' }),
  filePath: t.File(),
})

export interface KaceUploadProps {
  data?: string
  filePath: File
}
