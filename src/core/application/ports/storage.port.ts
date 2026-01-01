export interface StoragePort {
  createSignedUploadUrl(opts: { bucket: string; path: string; contentType: string }): Promise<{ url: string; path: string }>;
  createSignedDownloadUrl(opts: { bucket: string; path: string; expiresIn: number }): Promise<{ url: string }>;
}
