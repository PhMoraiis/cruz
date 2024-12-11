import { t } from 'elysia'

export const ADUploadModel = t.Object({
  data: t.String({ default: '' }),
  filePath: t.File(),
})

export interface ADUploadProps {
  data: string
  filePath: File
}
