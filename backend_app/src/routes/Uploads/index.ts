import { Elysia } from 'elysia'
import { ADService } from '../../services/AD'
import { BitdefenderService } from '../../services/Bitdefender'
import { DHCPService } from '../../services/DHCP'
import { KaceService } from '../../services/Kace'
import { ADUploadModel } from '../../models/AD'
import { BitdefenderUploadModel } from '../../models/Bitdefender'
import { DHCPUploadModel } from '../../models/DHCP'
import { KaceUploadModel } from '../../models/Kace'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleUpload = (service: any, handleMethod: string) => async ({ body }: { body: any }) => {
  const filePath = body.filePath;
  return service[handleMethod](filePath);
};

export const Uploads = new Elysia()

// Usando a função genérica para cada tipo de upload
Uploads.group('/upload', upload => {
  upload.post(
    '/ad',
    handleUpload(ADService, 'handlePopulateTempAD'),
    {
      body: ADUploadModel,
      tags: ['Uploads'],
      type: 'multipart/form-data',
    }
  )

  upload.post(
    '/bitdefender',
    handleUpload(BitdefenderService, 'handlePopulateTempBitDefender'),
    {
      body: BitdefenderUploadModel,
      tags: ['Uploads'],
      type: 'multipart/form-data',
    }
  )

  upload.post(
    '/dhcp',
    handleUpload(DHCPService, 'handlePopulateTempDHCP'),
    {
      body: DHCPUploadModel,
      tags: ['Uploads'],
      type: 'multipart/form-data',
    }
  )

  upload.post(
    '/kace',
    handleUpload(KaceService, 'handlePopulateTempKace'),
    {
      body: KaceUploadModel,
      tags: ['Uploads'],
      type: 'multipart/form-data',
    }
  )

  return upload
})
