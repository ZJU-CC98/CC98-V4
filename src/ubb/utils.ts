import { TagNode } from '@cc98/ubb-core/dist'

export function getTagDataByIndex(node: TagNode, index: number): string | undefined {
  // eslint-disable-next-line no-underscore-dangle
  return node._rawText.slice(node.tagName.length + 2, node._rawText.length - 1)[index]
}
