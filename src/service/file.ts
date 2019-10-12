import axios from 'axios'

export function uploadFile(file: File) {
  const data = new FormData()
  data.append('contentType', 'multipart/form-data')
  data.append('files', file, file.name)

  return axios({
    url: '/file',
    method: 'POST',
    needAuth: true,
    data,
  }) as Promise<string[]>
}
