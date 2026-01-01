import type { StoragePort } from '../../application/ports/storage.port';

export class SupabaseStorageAdapter implements StoragePort {
  async createSignedUploadUrl(opts: { bucket: string; path: string; contentType: string }) {
    // TODO: implement Supabase signed upload
    return { url: 'TODO_SIGNED_UPLOAD_URL', path: opts.path };
  }

  async createSignedDownloadUrl(_opts: { bucket: string; path: string; expiresIn: number }) {
    // TODO: implement Supabase signed download
    return { url: 'TODO_SIGNED_DOWNLOAD_URL' };
  }
}
