import axios from 'axios'

export function uploadFile(file: File) {
  const data = new FormData()
  data.append('contentType', 'multipart/form-data')
  data.append('files', file, file.name)

  return axios({
    url: '/file',
    method: 'POST',
    withToken: true,
    data,
  }) as Promise<string[]>
}

export function uploadFiles(files: FileList, compressImage = true) {
  const data = new FormData()
  data.append('contentType', 'multipart/form-data')
  Array.from(files).forEach(file => data.append('files', file, file.name))

  return axios({
    url: '/file',
    params: {
      compressImage,
    },
    withToken: true,
    method: 'POST',
    data,
  }) as Promise<string[]>
}
